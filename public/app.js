// ===== SMART API BASE URL =====
const TUNNEL_URL = 'https://library-app-sami.loca.lt';
const isLocalTunnel = window.location.hostname.includes('loca.lt') || window.location.hostname === 'localhost';
const API_BASE = isLocalTunnel ? '' : TUNNEL_URL;

// OTP API — always goes to Netlify (the function only lives there)
const NETLIFY_URL = 'https://college-library-app-demo.netlify.app';
const isNetlify = window.location.hostname.includes('netlify.app');
const OTP_BASE = isNetlify ? '' : NETLIFY_URL;

const API_HEADERS = {
    'x-api-key': 'prototype_key_123',
    'Bypass-Tunnel-Reminder': 'true'
};

const DEPT_ICONS = {
    'computer': 'fas fa-laptop-code', 'information': 'fas fa-microchip',
    'electrical': 'fas fa-bolt', 'eee': 'fas fa-bolt',
    'mechanical': 'fas fa-cogs', 'civil': 'fas fa-building',
    'ece': 'fas fa-satellite-dish', 'electronics': 'fas fa-microchip',
    'science': 'fas fa-flask', 'math': 'fas fa-calculator',
    'mba': 'fas fa-briefcase', 'mca': 'fas fa-desktop',
    'library': 'fas fa-book', 'automobile': 'fas fa-car',
    'general': 'fas fa-book-open', 'biomedical': 'fas fa-heartbeat',
    'textile': 'fas fa-tshirt', 'arts': 'fas fa-palette',
    'humanities': 'fas fa-users'
};

function getDeptIcon(deptName) {
    const lower = (deptName || '').toLowerCase();
    for (const [key, icon] of Object.entries(DEPT_ICONS)) {
        if (lower.includes(key)) return icon;
    }
    return 'fas fa-graduation-cap';
}

async function safeFetch(path) {
    const url = `${API_BASE}${path}`;
    const res = await fetch(url, { headers: API_HEADERS });
    if (!res.ok) throw new Error(`API returned ${res.status}`);
    const contentType = res.headers.get('content-type') || '';
    if (!contentType.includes('application/json')) throw new Error('Response is not JSON');
    return res.json();
}

async function safePost(path, body) {
    const url = `${API_BASE}${path}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: { ...API_HEADERS, 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok) throw { status: res.status, ...data };
    return data;
}

// POST to OTP Netlify function (not tunnel)
async function otpPost(action, body) {
    const url = `${OTP_BASE}/api/otp/${action}`;
    const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
    });
    const data = await res.json();
    if (!res.ok) throw { status: res.status, ...data };
    return data;
}

function toggleMenu() {
    document.getElementById('navLinks').classList.toggle('active');
}

document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => document.getElementById('navLinks').classList.remove('active'));
});

// ═══════════════════════════════════════════════════
// ===== DEPARTMENTS =====
// ═══════════════════════════════════════════════════
async function loadDepartments() {
    const grid = document.getElementById('deptGrid');
    if (grid) {
        grid.innerHTML = `
            <div style="grid-column: 1 / -1; display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 3rem; color: var(--text-secondary);">
                <i class="fas fa-circle-notch fa-spin" style="font-size: 2.5rem; margin-bottom: 1rem; color: var(--primary);"></i>
                <p>Loading Departments...</p>
            </div>
        `;
    }

    try {
        const depts = await safeFetch('/api/departments');
        const filter = document.getElementById('deptFilter');

        if (filter) {
            filter.innerHTML = '<option value="">All Departments</option>';
            filter.innerHTML += depts.map(d => `<option value="${d.dept_name}">${d.dept_name}</option>`).join('');
        }

        if (grid) {
            grid.innerHTML = depts.map(d => `
                <div class="dept-card" onclick="filterByDept('${(d.dept_name || '').replace(/'/g, "\\'")}')">\
                    <i class="${getDeptIcon(d.dept_name)}"></i>
                    <h3>${d.dept_name}</h3>
                </div>
            `).join('');
        }
    } catch (e) {
        console.error(e);
        if (grid) grid.innerHTML = '<div style="grid-column: 1 / -1; text-align: center; padding: 2rem;"><p>Could not load departments. Check if Server B is online.</p></div>';
    }
}

// ═══════════════════════════════════════════════════
// ===== BOOK SEARCH =====
// ═══════════════════════════════════════════════════
async function searchBooks() {
    const query = document.getElementById('searchInput').value;
    const dept = document.getElementById('deptFilter').value;
    const sortBy = document.getElementById('sortFilter').value || 'title';
    const resultsContainer = document.getElementById('results');

    resultsContainer.innerHTML = '<div class="empty-state"><i class="fas fa-circle-notch fa-spin"></i><p>Searching Library Resources...</p></div>';

    try {
        const books = await safeFetch(`/api/books?q=${encodeURIComponent(query)}&dept=${encodeURIComponent(dept)}&sort=${sortBy}`);

        if (!books.length) {
            resultsContainer.innerHTML = '<div class="empty-state"><i class="fas fa-search"></i><p>No books found.</p></div>';
            return;
        }

        resultsContainer.innerHTML = books.map(book => {
            const isAvailable = book.Available === 1;
            return `
            <div class="book-card" onclick='showBookDetails(${JSON.stringify(book).replace(/'/g, "&#39;")})'>
                <div class="status-ribbon ${isAvailable ? 'ribbon-available' : 'ribbon-issued'}">
                    ${isAvailable ? 'Available' : 'Issued'}
                </div>
                <div class="tag-row">
                    <span class="tag tag-dept">${book.Department || 'General'}</span>
                </div>
                <h3 style="margin-top:0.5rem">${book.Title}</h3>
                <p class="author">${book.Author || 'Unknown Author'}</p>
                <div class="footer-row">
                    <span>Acc No: <strong>${book.AccessionNumber}</strong></span>
                    <span>Year: <strong>${book.YearOfPublished || 'N/A'}</strong></span>
                </div>
            </div>
        `;
        }).join('');

        setTimeout(() => {
            resultsContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);

    } catch (error) {
        resultsContainer.innerHTML = '<div class="empty-state"><i class="fas fa-exclamation-circle" style="color:#ef4444"></i><p>Connection failed.</p></div>';
    }
}

window.filterByDept = function (dept) {
    const searchInput = document.getElementById('searchInput');
    const deptFilter = document.getElementById('deptFilter');
    if (searchInput) searchInput.value = '';
    if (deptFilter) deptFilter.value = dept;
    searchBooks();
};

// ═══════════════════════════════════════════════════
// ===== BOOK DETAILS MODAL =====
// ═══════════════════════════════════════════════════
let bookDetailsTimeout = null;

function showBookDetails(book) {
    if (bookDetailsTimeout) clearTimeout(bookDetailsTimeout);

    const modal = document.getElementById('bookModal');
    const body = document.getElementById('modalBody');

    body.innerHTML = `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; padding:5rem 2rem; color:var(--text-secondary);">
            <i class="fas fa-circle-notch fa-spin" style="font-size:3.5rem; margin-bottom:1.5rem; color:var(--primary);"></i>
            <p style="font-weight:700; font-size:1.1rem; color:var(--text-primary)">Loading Book Intelligence...</p>
        </div>
    `;
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';

    bookDetailsTimeout = setTimeout(() => {
        const isAvailable = book.Available === 1;
        const statusText = isAvailable ? 'Available' : 'Issued';

        body.innerHTML = `
            <div class="book-detail-header animate-in" style="margin-bottom:2rem; padding-bottom:1.5rem; border-bottom:1px solid #f1f5f9; display:flex; gap:1.25rem; align-items:flex-start;">
                <div class="book-detail-icon" style="background:linear-gradient(135deg, var(--primary), #818cf8); color:white; width:64px; height:64px; border-radius:16px; display:flex; align-items:center; justify-content:center; font-size:1.8rem; flex-shrink:0; box-shadow:0 10px 25px -5px rgba(99,102,241,0.4);">
                    <i class="fas fa-book-open"></i>
                </div>
                <div style="flex:1; min-width:0; padding-top:0.2rem;">
                    <h2 style="font-size:1.55rem; font-weight:900; color:var(--text-primary); line-height:1.3; margin:0 0 0.75rem 0; letter-spacing:-0.5px; word-break:break-word; display:flex; flex-direction:column; gap:4px">
                        <span style="font-size:0.75rem; text-transform:uppercase; font-weight:800; color:var(--primary); letter-spacing:1px;">Title:</span>
                        <span>${book.Title}</span>
                    </h2>
                    <p style="font-size:1.0rem; font-weight:600; color:var(--text-primary); margin:0 0 1rem 0; display:flex; flex-direction:column; gap:4px;">
                        <span style="font-size:0.75rem; text-transform:uppercase; font-weight:800; color:var(--text-secondary); letter-spacing:1px;">Author:</span>
                        <span style="display:flex; align-items:center; gap:6px;"><i class="fas fa-user-pen" style="color:var(--text-secondary); opacity:0.8; font-size:0.85rem"></i> ${book.Author || 'Unknown Author'}</span>
                    </p>
                    <div style="display:flex; gap:0.5rem; flex-wrap:wrap;">
                        <span class="tag ${isAvailable ? 'tag-available' : 'tag-issued'}" style="font-size:0.8rem; padding:0.4rem 0.8rem; border-radius:6px; font-weight:700;">
                            <i class="fas ${isAvailable ? 'fa-check-circle' : 'fa-clock'}" style="margin-right:4px;"></i>${statusText}
                        </span>
                        <span class="tag tag-acc" style="font-size:0.8rem; padding:0.4rem 0.8rem; border-radius:6px; font-weight:700;">
                            <i class="fas fa-hashtag" style="margin-right:4px; opacity:0.6;"></i>ACC No. ${book.AccessionNumber}
                        </span>
                    </div>
                </div>
            </div>

            <div class="book-info-grid animate-in delay-1">
                <div class="book-info-item">
                    <div class="info-label"><i class="fas fa-building-columns"></i> Department</div>
                    <div class="info-value" style="color:var(--primary)">${book.Department || 'General'}</div>
                </div>
                <div class="book-info-item">
                    <div class="info-label"><i class="fas fa-barcode"></i> ISBN</div>
                    <div class="info-value">${book.ISBN || 'N/A'}</div>
                </div>
                <div class="book-info-item">
                    <div class="info-label"><i class="fas fa-layer-group"></i> Subject</div>
                    <div class="info-value">${book.Subject || 'N/A'}</div>
                </div>
                <div class="book-info-item">
                    <div class="info-label"><i class="fas fa-code-branch"></i> Edition</div>
                    <div class="info-value">${book.Edition || 'N/A'}</div>
                </div>
                <div class="book-info-item">
                    <div class="info-label"><i class="fas fa-print"></i> Publisher</div>
                    <div class="info-value">${book.Publisher || 'N/A'}</div>
                </div>
                <div class="book-info-item">
                    <div class="info-label"><i class="fas fa-calendar-days"></i> Year</div>
                    <div class="info-value">${book.YearOfPublished || 'N/A'}</div>
                </div>
                <div class="book-info-item" style="border-left:4px solid var(--success); background:#f0fdf4">
                    <div class="info-label" style="color:#16a34a"><i class="fas fa-map-pin"></i> Call Number</div>
                    <div class="info-value" style="color:#16a34a; font-weight:900">${book.CallNumber || 'N/A'}</div>
                </div>
                <div class="book-info-item" style="border-left:4px solid var(--primary-light)">
                    <div class="info-label"><i class="fas fa-location-dot"></i> Shelf Location</div>
                    <div class="info-value">${book.Location || 'N/A'}</div>
                </div>
            </div>

            <div class="animate-in delay-3" style="text-align:center; padding:1.5rem; border-top:1px solid #f1f5f9; margin-top:0.5rem">
                <p style="color:var(--text-secondary); font-size:0.85rem; display:flex; align-items:center; justify-content:center; gap:8px">
                    <i class="fas fa-circle-info" style="opacity:0.5"></i>
                    Click the close button (top right) to return
                </p>
            </div>
        `;
    }, 700);
}

function closeModal() {
    if (bookDetailsTimeout) clearTimeout(bookDetailsTimeout);
    const bookModal = document.getElementById('bookModal');
    if (bookModal) bookModal.style.display = 'none';
    document.body.style.overflow = 'auto';
}

// ═══════════════════════════════════════════════════
// ===== 🔐 OTP AUTHENTICATION SYSTEM =====
// ═══════════════════════════════════════════════════

let currentRegNo = '';
let currentEmail = '';
let currentStudentData = null;

// Check for existing session on page load
function checkExistingSession() {
    const session = localStorage.getItem('lib_session');
    if (session) {
        try {
            const data = JSON.parse(session);
            // Session valid for 24 hours
            if (data.loginTime && (Date.now() - data.loginTime) < 24 * 60 * 60 * 1000) {
                currentRegNo = data.rollNo;
                currentEmail = `${data.rollNo.toLowerCase()}@hit.edu.in`;
                unlockLibrary();
                return;
            }
        } catch (e) { /* ignore */ }
        localStorage.removeItem('lib_session');
    }
}

// Step 1: User enters Reg No. → verify student exists → send OTP
async function handleSendOTP() {
    const regNoInput = document.getElementById('regNoInput');
    const sendBtn = document.getElementById('sendOtpBtn');
    const errorEl = document.getElementById('regNoError');
    const regNo = regNoInput.value.trim().toUpperCase();

    // Validate input
    if (!regNo || regNo.length < 3) {
        showOtpError(errorEl, 'Please enter a valid registration number.');
        return;
    }

    // Disable button
    sendBtn.disabled = true;
    sendBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Checking...';
    errorEl.classList.remove('visible');

    try {
        // Step A: Check if student exists in MSSQL via tunnel server
        const student = await safeFetch(`/api/student/${encodeURIComponent(regNo)}`);

        if (!student || !student.RollNumber) {
            showOtpError(errorEl, `Registration number "${regNo}" not found in the library database. Please check and try again.`);
            sendBtn.disabled = false;
            sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send OTP';
            return;
        }

        // Step B: Construct email and send OTP via Netlify function
        const email = `${regNo.toLowerCase()}@hit.edu.in`;
        currentRegNo = regNo;
        currentEmail = email;

        sendBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Sending OTP...';

        await otpPost('send', { email });

        // Show step 2
        document.getElementById('stepRegNo').classList.remove('active');
        document.getElementById('stepOTP').classList.add('active');
        document.getElementById('otpEmailDisplay').textContent = email;
        document.getElementById('otpInput').focus();

        showToast(`OTP sent to ${email}`, 'success');

    } catch (err) {
        console.error('Send OTP error:', err);
        const msg = err.error || err.message || 'Failed to send OTP. Check if the server is online.';
        showOtpError(errorEl, msg);
    } finally {
        sendBtn.disabled = false;
        sendBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Send OTP';
    }
}

// Step 2: User enters OTP → verify → load dashboard
async function handleVerifyOTP() {
    const otpInput = document.getElementById('otpInput');
    const verifyBtn = document.getElementById('verifyOtpBtn');
    const errorEl = document.getElementById('otpError');
    const otp = otpInput.value.trim();

    if (!otp || otp.length !== 6) {
        showOtpError(errorEl, 'Please enter the 6-digit OTP.');
        return;
    }

    verifyBtn.disabled = true;
    verifyBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Verifying...';
    errorEl.classList.remove('visible');

    try {
        // Step A: Verify OTP with Supabase via Netlify function
        await otpPost('verify', { email: currentEmail, otp });

        // Step B: OTP verified! Now fetch full student dashboard from tunnel server
        verifyBtn.innerHTML = '<i class="fas fa-circle-notch fa-spin"></i> Loading account...';

        const result = await safePost('/api/auth/clerk-login', { email: currentEmail });

        currentStudentData = result.student;

        // Save session
        localStorage.setItem('lib_session', JSON.stringify({
            rollNo: result.student.RollNumber,
            name: result.student.Name,
            loginTime: Date.now()
        }));

        // Unlock and show dashboard
        unlockLibrary();
        showToast(`Welcome to HiTECH, ${result.student.Name}!`, 'success');
        showStudentDashboard(result.student);

    } catch (err) {
        console.error('Verify OTP error:', err);
        const msg = err.error || err.message || 'Verification failed. Please try again.';
        showOtpError(errorEl, msg);
    } finally {
        verifyBtn.disabled = false;
        verifyBtn.innerHTML = '<i class="fas fa-shield-check"></i> Verify & Login';
    }
}

// Resend OTP
async function handleResendOTP() {
    const errorEl = document.getElementById('otpError');
    errorEl.classList.remove('visible');

    try {
        await otpPost('send', { email: currentEmail });
        showToast('New OTP sent! Check your email.', 'success');
    } catch (err) {
        const msg = err.error || err.message || 'Could not resend OTP.';
        showOtpError(errorEl, msg);
    }
}

// Go back to reg no step
function goBackToRegNo() {
    document.getElementById('stepOTP').classList.remove('active');
    document.getElementById('stepRegNo').classList.add('active');
    document.getElementById('otpInput').value = '';
    document.getElementById('otpError').classList.remove('visible');
}

function showOtpError(el, msg) {
    el.textContent = msg;
    el.classList.add('visible');
}

// ═══════════════════════════════════════════════════
// ===== UNLOCK / LOCK / LOGOUT =====
// ═══════════════════════════════════════════════════
function unlockLibrary() {
    document.getElementById('authGate').style.display = 'none';
    document.getElementById('mainContent').classList.add('authenticated');
}

function lockLibrary() {
    document.getElementById('mainContent').classList.remove('authenticated');
    document.getElementById('authGate').style.display = 'flex';
    // Reset form
    document.getElementById('stepOTP').classList.remove('active');
    document.getElementById('stepRegNo').classList.add('active');
    document.getElementById('regNoInput').value = '';
    document.getElementById('otpInput').value = '';
    document.getElementById('regNoError').classList.remove('visible');
    document.getElementById('otpError').classList.remove('visible');
}

function showMyAccount() {
    if (currentStudentData) {
        showStudentDashboard(currentStudentData);
    } else if (currentRegNo) {
        // Re-fetch student data
        safePost('/api/auth/clerk-login', { email: currentEmail })
            .then(result => {
                currentStudentData = result.student;
                showStudentDashboard(result.student);
            })
            .catch(err => {
                showToast('Could not load account. Please try again.', 'error');
            });
    } else {
        showToast('Please login first.', 'warning');
    }
}

function logout() {
    localStorage.removeItem('lib_session');
    currentRegNo = '';
    currentEmail = '';
    currentStudentData = null;
    closeModal();
    lockLibrary();
    showToast('Logged out successfully', 'info');
}

// ═══════════════════════════════════════════════════
// ===== TOAST NOTIFICATION =====
// ═══════════════════════════════════════════════════
function showToast(message, type = 'info') {
    document.querySelectorAll('.toast-notification').forEach(t => t.remove());

    const icons = {
        success: 'fa-check-circle',
        error: 'fa-times-circle',
        warning: 'fa-exclamation-triangle',
        info: 'fa-info-circle'
    };

    const toast = document.createElement('div');
    toast.className = `toast-notification toast-${type}`;
    toast.innerHTML = `<i class="fas ${icons[type] || icons.info}"></i><span>${message}</span>`;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add('show'), 10);
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => toast.remove(), 400);
    }, 4000);
}

// ═══════════════════════════════════════════════════
// ===== STUDENT DASHBOARD =====
// ═══════════════════════════════════════════════════
function showStudentDashboard(student) {
    document.getElementById('bookModal').style.display = 'block';
    document.body.style.overflow = 'hidden';

    const unpaid = (student.Fines || []).filter(f => f.IsPaid === 0);
    const total = unpaid.reduce((sum, f) => sum + (f.FineAmount || 0), 0);
    const borrowedBooks = student.BorrowedBooks || [];
    const overdueCount = borrowedBooks.filter(b => b.IsOverdue).length;
    const initial = student.Name ? student.Name.charAt(0).toUpperCase() : '?';

    document.getElementById('modalBody').innerHTML = `
        <div class="dash-profile-section animate-in">
            <div class="dash-avatar">${initial}</div>
            <div class="dash-name">${student.Name || 'Student'}</div>
            <div class="dash-sub">${student.RollNumber || ''} &bull; ${student.Department || ''}</div>
            <div class="dash-sub" style="font-size:0.78rem; margin-top:0.3rem; opacity:0.7;">
                <i class="fas fa-envelope" style="margin-right:4px"></i>${student.Email || `${(student.RollNumber || '').toLowerCase()}@hit.edu.in`}
            </div>
        </div>

        <div class="dash-stats-row animate-in delay-1">
            <div class="dash-stat-card">
                <div class="stat-num">${borrowedBooks.length}</div>
                <div class="stat-label">Issued</div>
            </div>
            <div class="dash-stat-card">
                <div class="stat-num" style="color:${overdueCount > 0 ? 'var(--danger)' : 'var(--primary)'}">${overdueCount}</div>
                <div class="stat-label">Overdue</div>
            </div>
            <div class="dash-stat-card">
                <div class="stat-num" style="color:${total > 0 ? 'var(--danger)' : 'var(--success)'}">
                    ${total > 0 ? '₹' + total.toFixed(0) : '₹0'}
                </div>
                <div class="stat-label">Fine Due</div>
            </div>
        </div>

        <div class="dash-info-grid animate-in delay-2">
            <div class="dash-info-item">
                <div class="di-label">Class</div>
                <div class="di-value">${student.Class || 'N/A'}</div>
            </div>
            <div class="dash-info-item">
                <div class="di-label">Reg Number</div>
                <div class="di-value">${student.RegNumber || 'N/A'}</div>
            </div>
            <div class="dash-info-item">
                <div class="di-label">Category</div>
                <div class="di-value">${student.Category || 'N/A'}</div>
            </div>
            <div class="dash-info-item">
                <div class="di-label">Account Status</div>
                <div class="di-value" style="color:var(--success); font-weight:800;">✓ Active</div>
            </div>
            <div class="dash-info-item">
                <div class="di-label">Book Limit</div>
                <div class="di-value">${student.MaxBooks || 0} books</div>
            </div>
            <div class="dash-info-item">
                <div class="di-label">Max Borrow Days</div>
                <div class="di-value">${student.MaxDays || 0} days</div>
            </div>
        </div>

        ${total > 0 ? `
        <div class="fine-alert-box animate-in delay-2">
            <div class="fine-icon">⚠️</div>
            <div class="fine-text">
                <strong>Fine Due: ₹${total.toFixed(2)}</strong>
                <small>Please clear your dues at the library counter.</small>
            </div>
        </div>` : ''}

        ${unpaid.length > 0 ? `
        <div class="section-heading animate-in delay-2" style="margin-top:0.5rem">
            <i class="fas fa-receipt"></i>
            Fine Details
            <span class="count-badge" style="background:var(--danger)">${unpaid.length}</span>
        </div>
        <div style="display:flex; flex-direction:column; gap:0.5rem; margin-bottom:1.5rem" class="animate-in delay-2">
            ${unpaid.map(f => `
                <div class="issued-book-card" style="border-left:3px solid var(--danger)">
                    <div class="issued-book-icon overdue">
                        <i class="fas fa-indian-rupee-sign"></i>
                    </div>
                    <div class="issued-book-info">
                        <div class="ib-title">${f.Title || 'Book Fine'}</div>
                        <div class="ib-due"><i class="fas fa-calendar" style="margin-right:4px;opacity:0.7"></i>${new Date(f.FineDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                        <div class="ib-overdue">
                            <i class="fas fa-indian-rupee-sign" style="margin-right:4px"></i>₹${f.FineAmount} — ${f.OverdueDays} days overdue — 
                            <span style="color:${f.IsPaid ? 'var(--success)' : 'var(--danger)'}; font-weight:800">${f.IsPaid ? '✓ Paid' : '✗ Unpaid'}</span>
                        </div>
                    </div>
                </div>
            `).join('')}
        </div>` : ''}

        <div class="section-heading animate-in delay-3">
            <i class="fas fa-book-open"></i>
            Current Borrowings
            <span class="count-badge">${borrowedBooks.length}</span>
        </div>

        <div style="display:flex; flex-direction:column; gap:0.65rem; margin-bottom:1.5rem" class="animate-in delay-3">
            ${borrowedBooks.map(b => {
        const isOverdue = b.IsOverdue;
        const currentFineHtml = (b.CurrentFine && b.CurrentFine > 0) ? ` | <span style="color:var(--danger)">Fine: ₹${b.CurrentFine}</span>` : '';
        return `
                <div class="issued-book-card">
                    <div class="issued-book-icon ${isOverdue ? 'overdue' : ''}">
                        <i class="fas ${isOverdue ? 'fa-triangle-exclamation' : 'fa-book'}"></i>
                    </div>
                    <div class="issued-book-info">
                        <div class="ib-title">${b.Title}</div>
                        <div class="ib-due"><i class="fas fa-calendar-clock" style="margin-right:4px;opacity:0.7"></i>Due: ${new Date(b.DueDate).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</div>
                        ${isOverdue ? `<div class="ib-overdue"><i class="fas fa-clock" style="margin-right:4px"></i>Overdue by ${b.DaysOverdue} days${currentFineHtml}</div>` : ''}
                    </div>
                </div>`;
    }).join('') || `
            <div style="text-align:center; padding:2rem; color:var(--text-secondary);">
                <i class="fas fa-check-circle" style="font-size:2rem; color:var(--success); display:block; margin-bottom:0.75rem;"></i>
                No books currently issued.
            </div>`}
        </div>

        <button class="modal-btn modal-btn-dark animate-in delay-4" onclick="logout()">
            <i class="fas fa-right-from-bracket"></i> Logout
        </button>
    `;
}

// ═══════════════════════════════════════════════════
// ===== STATUS CHECK =====
// ═══════════════════════════════════════════════════
async function checkStatus() {
    try {
        const data = await safeFetch('/api/status');
        const el = document.getElementById('systemStatus');
        if (el) el.innerHTML = `✅ Server: ${data.os.name} | Auth: 🔐 OTP Verified`;
    } catch (e) {
        const el = document.getElementById('systemStatus');
        if (el) el.innerHTML = `❌ Server Offline`;
    }
}

// ═══════════════════════════════════════════════════
// ===== INIT =====
// ═══════════════════════════════════════════════════
document.getElementById('searchInput').onkeypress = (e) => { if (e.keyCode === 13) searchBooks(); };
document.getElementById('regNoInput').onkeypress = (e) => { if (e.keyCode === 13) handleSendOTP(); };
document.getElementById('otpInput').onkeypress = (e) => { if (e.keyCode === 13) handleVerifyOTP(); };

window.onload = () => {
    checkExistingSession();
    loadDepartments();
    checkStatus();
};