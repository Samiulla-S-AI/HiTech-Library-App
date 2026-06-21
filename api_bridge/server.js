require('dotenv').config();
const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const path = require('path');
const os = require('os');
const nodemailer = require('nodemailer');
const app = express();

// 🔧 CORS: Allow Netlify frontend to call this API directly (cross-origin)
app.use(cors({
    origin: [
        'https://college-library-app-demo.netlify.app',
        'https://library-app-sami.loca.lt',
        'http://localhost:3000'
    ],
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'x-api-key', 'Bypass-Tunnel-Reminder'],
    credentials: false
}));
app.use(express.json());

// --- SERVE THE FRONTEND WEBSITE ---
app.use(express.static(path.join(__dirname, '..', 'public')));

// --- API KEY CHECK (Only for /api/* routes) ---
app.use('/api', (req, res, next) => {
    // 🛡️ FIX: Allow OPTIONS requests (CORS preflight) to pass without a key
    if (req.method === 'OPTIONS') {
        return next();
    }

    const clientKey = req.headers['x-api-key'];
    const serverKey = process.env.MY_SECRET_KEY || 'prototype_key_123';

    if (clientKey !== serverKey) {
        return res.status(401).json({ message: "Invalid API Key. Access Denied." });
    }
    next();
});

// MSSQL Database Configuration (Production: LIPS5 on Windows Server 2008)
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    port: 1433,
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    }
};


// ===== GMAIL SMTP TRANSPORTER =====
let emailTransporter = null;

if (process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD) {
    emailTransporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_APP_PASSWORD
        }
    });

    // Verify SMTP connection on startup
    emailTransporter.verify().then(() => {
        console.log('✅ Gmail SMTP connection verified');
    }).catch(err => {
        console.error('❌ Gmail SMTP connection failed:', err.message);
    });
} else {
    console.warn('⚠️ Gmail credentials not found. Email sending will be disabled.');
}

// ===== HELPER: Generate 6-digit OTP =====
function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString();
}

// ===== HELPER: Send OTP Email =====
async function sendOTPEmail(toEmail, otp, studentName) {
    if (!emailTransporter) throw new Error('Email service not configured');

    const mailOptions = {
        from: `"HiTECH Library 📚" <${process.env.GMAIL_USER}>`,
        to: toEmail,
        subject: `🔐 Your Library Login OTP: ${otp}`,
        html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
                <div style="background: linear-gradient(135deg, #6366f1, #7c3aed); padding: 32px 24px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800;">📚 HiTECH Library</h1>
                    <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Hindusthan Institute of Technology</p>
                </div>
                <div style="padding: 32px 24px; text-align: center;">
                    <p style="color: #475569; font-size: 15px; margin: 0 0 8px;">Hello <strong>${studentName || 'Student'}</strong>,</p>
                    <p style="color: #64748b; font-size: 14px; margin: 0 0 24px;">Use this OTP to login to your library account:</p>
                    <div style="background: white; border: 2px dashed #6366f1; border-radius: 12px; padding: 20px; margin: 0 auto; max-width: 280px;">
                        <div style="font-size: 36px; font-weight: 900; letter-spacing: 8px; color: #6366f1; font-family: monospace;">${otp}</div>
                    </div>
                    <p style="color: #94a3b8; font-size: 12px; margin: 20px 0 0;">⏱️ This code expires in <strong>5 minutes</strong></p>
                    <p style="color: #cbd5e1; font-size: 11px; margin: 16px 0 0;">If you didn't request this, please ignore this email.</p>
                </div>
                <div style="background: #f1f5f9; padding: 16px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="color: #94a3b8; font-size: 11px; margin: 0;">© 2026 HiTECH Library (Hindusthan Institute of Technology). All rights reserved.</p>
                </div>
            </div>
        `
    };

    return emailTransporter.sendMail(mailOptions);
}

// ===== HELPER: Send Notification Email =====
async function sendNotificationEmail(toEmail, subject, htmlContent) {
    if (!emailTransporter) throw new Error('Email service not configured');

    const mailOptions = {
        from: `"HiTECH Library 📚" <${process.env.GMAIL_USER}>`,
        to: toEmail,
        subject: subject,
        html: `
            <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
                <div style="background: linear-gradient(135deg, #6366f1, #7c3aed); padding: 24px; text-align: center;">
                    <h1 style="color: white; margin: 0; font-size: 20px; font-weight: 800;">📚 HiTECH Library</h1>
                    <p style="color: rgba(255,255,255,0.85); margin: 4px 0 0; font-size: 12px;">Hindusthan Institute of Technology</p>
                </div>
                <div style="padding: 24px;">
                    ${htmlContent}
                </div>
                <div style="background: #f1f5f9; padding: 16px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
                    <p style="color: #94a3b8; font-size: 11px; margin: 0;">© 2026 HiTECH Library (Hindusthan Institute of Technology). All rights reserved.</p>
                </div>
            </div>
        `
    };

    return emailTransporter.sendMail(mailOptions);
}

// ===== HELPER: Check if today is a holiday =====
async function isTodayHoliday() {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request().query(`
            SELECT COUNT(*) AS cnt FROM [dbo].[holiday]
            WHERE CAST(holy_date AS DATE) = CAST(GETDATE() AS DATE)
        `);
        return result.recordset[0].cnt > 0;
    } catch (err) {
        console.error('Holiday check error:', err.message);
        return false;
    }
}

// ===== HELPER: Get student email (rollNo@hit.edu.in) =====
function getStudentEmail(rollNo) {
    return `${rollNo.toLowerCase()}@hit.edu.in`;
}


// --- API ENDPOINTS ---

// 1. Health Check
app.get('/api/status', async (req, res) => {
    try {
        console.log("Attempting to connect to SQL Server at " + dbConfig.server + "...");
        let pool = await sql.connect(dbConfig);
        console.log("✅ Connection Successful!");

        const osVersion = os.release();
        let friendlyOS = "Windows (Unknown)";
        if (osVersion.startsWith('6.1')) friendlyOS = "Windows 7";
        else if (osVersion.startsWith('6.2')) friendlyOS = "Windows 8";
        else if (osVersion.startsWith('6.3')) friendlyOS = "Windows 8.1";
        else if (osVersion.startsWith('10.0')) {
            // Check build number for Win 11 (22000+)
            const build = parseInt(osVersion.split('.')[2]);
            friendlyOS = build >= 22000 ? "Windows 11" : "Windows 10";
        }

        res.json({
            status: "success",
            message: "Connected to LIPS5 Production Database at " + dbConfig.server,
            os: {
                name: friendlyOS,
                release: osVersion,
                isModern: osVersion.startsWith('10')
            },
            auth_enabled: true,
            auth_method: 'OTP'
        });
    } catch (err) {
        console.error("❌ DATABASE ERROR:", err.message);
        const osVersion = os.release();
        res.status(500).json({
            status: "error",
            message: "Database connection failed",
            error: err.message,
            os: { release: osVersion, isModern: osVersion.startsWith('10') }
        });
    }
});

// 2. Search Books (Main endpoint used by frontend)
app.get('/api/books', async (req, res) => {
    try {
        const search = req.query.q || '';
        const sort = req.query.sort || 'title';
        const dept = req.query.dept || '';

        let orderBy = "b.title ASC";
        if (sort === "Author") orderBy = "b.author ASC";
        if (sort === "Year") orderBy = "b.pub_year DESC";

        let pool = await sql.connect(dbConfig);

        let query = `
            SELECT TOP 100
                b.acc_no AS AccessionNumber,
                b.title AS Title,
                ISNULL(b.author, '') AS Author,
                ISNULL(b.sub_title, '') AS SubTitle,
                ISNULL(b.edition, 0) AS Edition,
                ISNULL(b.pub_year, 0) AS YearOfPublished,
                ISNULL(b.isbn, '') AS ISBN,
                ISNULL(b.call_no, '') AS CallNumber,
                ISNULL(b.subject, '') AS Subject,
                ISNULL(b.location, '') AS Location,
                ISNULL(b.price, 0) AS Price,
                ISNULL(b.page, '') AS Pages,
                b.avail AS Available,
                b.lost AS Lost,
                b.damaged AS Damaged,
                ISNULL(d.dept_name, '') AS Department,
                ISNULL(p.pub_name, '') AS Publisher
            FROM [dbo].[book] b
            LEFT JOIN [dbo].[department] d ON b.dept_no = d.dept_no
            LEFT JOIN [dbo].[publisher] p ON b.pub_no = p.pub_no
            WHERE (b.title LIKE @q OR b.author LIKE @q OR CAST(b.acc_no AS VARCHAR) LIKE @q OR b.isbn LIKE @q)
        `;

        if (dept) {
            query += ` AND d.dept_name LIKE @dept`;
        }

        query += ` ORDER BY ${orderBy}`;

        let request = pool.request().input('q', sql.NVarChar, `%${search}%`);
        if (dept) {
            request = request.input('dept', sql.NVarChar, `%${dept}%`);
        }

        let result = await request.query(query);
        console.log(`📚 Search: "${search}" | Dept: "${dept}" | Found: ${result.recordset.length} books`);
        res.json(result.recordset);
    } catch (err) {
        console.error("❌ BOOKS SEARCH ERROR:", err.message);
        res.status(500).json({ error: err.message });
    }
});

// 3. Get Single Book Details by Accession Number
app.get('/api/book/:id', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('accNo', sql.Int, parseInt(req.params.id))
            .query(`
                SELECT 
                    b.acc_no AS AccessionNumber,
                    b.title AS Title,
                    ISNULL(b.author, '') AS Author,
                    ISNULL(b.sub_title, '') AS SubTitle,
                    ISNULL(b.edition, 0) AS Edition,
                    ISNULL(b.pub_year, 0) AS YearOfPublished,
                    ISNULL(b.isbn, '') AS ISBN,
                    ISNULL(b.call_no, '') AS CallNumber,
                    ISNULL(b.subject, '') AS Subject,
                    ISNULL(b.location, '') AS Location,
                    ISNULL(b.price, 0) AS Price,
                    ISNULL(b.page, '') AS Pages,
                    b.avail AS Available,
                    b.lost AS Lost,
                    ISNULL(d.dept_name, '') AS Department,
                    ISNULL(p.pub_name, '') AS Publisher,
                    ISNULL(b.keywords, '') AS Keywords
                FROM [dbo].[book] b
                LEFT JOIN [dbo].[department] d ON b.dept_no = d.dept_no
                LEFT JOIN [dbo].[publisher] p ON b.pub_no = p.pub_no
                WHERE b.acc_no = @accNo
            `);

        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).json({ message: "Book not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 4. Student Login & Details
app.get('/api/student/:rollno', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('idNo', sql.NVarChar, req.params.rollno)
            .query(`
                SELECT 
                    p.id_no AS RollNumber,
                    p.name AS Name,
                    ISNULL(p.class, '') AS Class,
                    ISNULL(p.e_mail, '') AS Email,
                    ISNULL(p.reg_no, '') AS RegNumber,
                    ISNULL(d.dept_name, '') AS Department,
                    ISNULL(c.cat_name, '') AS Category,
                    ISNULL(c.no_due, 0) AS MaxBooks,
                    ISNULL(c.due_day, 0) AS MaxDays
                FROM [dbo].[personal] p
                LEFT JOIN [dbo].[department] d ON p.dept_no = d.dept_no
                LEFT JOIN [dbo].[catagory] c ON p.cat_no = c.cat_no
                WHERE p.id_no = @idNo
            `);

        if (result.recordset.length > 0) {
            res.json(result.recordset[0]);
        } else {
            res.status(404).json({ message: "Student not found" });
        }
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 5. Get Currently Borrowed Books for a Student (Holiday-Aware Overdue)
app.get('/api/student/:rollno/borrowed', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('idNo', sql.NVarChar, req.params.rollno)
            .query(`
                SELECT 
                    bc.acc_no AS AccessionNumber,
                    ISNULL(b.title, '') AS Title,
                    ISNULL(b.author, '') AS Author,
                    bc.t_date AS IssueDate,
                    bc.due_date AS DueDate,
                    CASE WHEN bc.due_date < GETDATE() THEN 1 ELSE 0 END AS IsOverdue,
                    ISNULL(fr.noday, 0) AS DaysOverdue,
                    ISNULL(fr.rec_amt, 0) AS CurrentFine
                FROM [dbo].[book_circle] bc
                LEFT JOIN [dbo].[book] b ON bc.acc_no = CAST(b.acc_no AS VARCHAR)
                LEFT JOIN (
                    SELECT id_no, acc_no, max(noday) as noday, sum(rec_amt) as rec_amt
                    FROM [dbo].[fine_receipt1] WHERE paid = 0
                    GROUP BY id_no, acc_no
                ) fr ON bc.id_no = fr.id_no AND bc.acc_no = fr.acc_no
                WHERE bc.id_no = @idNo
                ORDER BY bc.due_date ASC
            `);

        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6. Get All Departments (for frontend department filter & cards)
app.get('/api/departments', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .query(`SELECT dept_no, dept_name FROM [dbo].[department] WHERE dept_name IS NOT NULL AND dept_name != '' ORDER BY dept_name`);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 6b. Get All Holidays (for reference)
app.get('/api/holidays', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .query(`SELECT holy_date AS HolidayDate, ISNULL(holy_reason, '') AS Reason FROM [dbo].[holiday] ORDER BY holy_date DESC`);
        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 7. Get Borrowing History for a Student
app.get('/api/student/:rollno/history', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('idNo', sql.NVarChar, req.params.rollno)
            .query(`
                SELECT TOP 50
                    bt.acc_no AS AccessionNumber,
                    ISNULL(b.title, '') AS Title,
                    ISNULL(b.author, '') AS Author,
                    bt.trans AS TransactionType,
                    bt.t_date AS TransactionDate
                FROM [dbo].[book_trans] bt
                LEFT JOIN [dbo].[book] b ON bt.acc_no = CAST(b.acc_no AS VARCHAR)
                WHERE bt.id_no = @idNo
                ORDER BY bt.t_date DESC
            `);

        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// 8. Get Fines for a Student (Holiday-Aware)
app.get('/api/student/:rollno/fines', async (req, res) => {
    try {
        let pool = await sql.connect(dbConfig);
        let result = await pool.request()
            .input('idNo', sql.NVarChar, req.params.rollno)
            .query(`
                SELECT 
                    fr.acc_no AS AccessionNumber,
                    ISNULL(b.title, '') AS Title,
                    fr.rec_date AS FineDate,
                    fr.rec_amt AS FineAmount,
                    fr.paid AS IsPaid,
                    ISNULL(fr.noday, 0) AS OverdueDays
                FROM [dbo].[fine_receipt1] fr
                LEFT JOIN [dbo].[book] b ON fr.acc_no = b.acc_no
                WHERE fr.id_no = @idNo
                ORDER BY fr.rec_date DESC
            `);

        res.json(result.recordset);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// ==========================================================
// ===== ⚙️ CONFIG ENDPOINT =====
// ==========================================================
app.get('/api/config', (req, res) => {
    res.json({
        authEnabled: true,
        authMethod: 'OTP'
    });
});


// ==========================================================
// ===== 🔐 AUTHENTICATION ENDPOINTS (OTP Login) =====
// ==========================================================

// Login via OTP-verified email (kept as /api/auth/clerk-login for backward compatibility)
app.post('/api/auth/clerk-login', async (req, res) => {
    try {
        const { email } = req.body;

        if (!email || !email.toLowerCase().endsWith('@hit.edu.in')) {
            return res.status(403).json({
                success: false,
                message: 'Invalid email domain. Only @hit.edu.in is allowed.'
            });
        }

        // Extract Roll Number from email (e.g. 21csr001@hit.edu.in -> 21CSR001)
        const rollNo = email.split('@')[0].toUpperCase();

        // 1. Fetch student details + borrowed books + fines from MSSQL
        let pool = await sql.connect(dbConfig);

        // Student details
        let studentResult = await pool.request()
            .input('idNo', sql.NVarChar, rollNo)
            .query(`
                SELECT 
                    p.id_no AS RollNumber,
                    p.name AS Name,
                    ISNULL(p.class, '') AS Class,
                    ISNULL(p.e_mail, '') AS Email,
                    ISNULL(p.reg_no, '') AS RegNumber,
                    ISNULL(d.dept_name, '') AS Department,
                    ISNULL(c.cat_name, '') AS Category,
                    ISNULL(c.no_due, 0) AS MaxBooks,
                    ISNULL(c.due_day, 0) AS MaxDays
                FROM [dbo].[personal] p
                LEFT JOIN [dbo].[department] d ON p.dept_no = d.dept_no
                LEFT JOIN [dbo].[catagory] c ON p.cat_no = c.cat_no
                WHERE p.id_no = @idNo
            `);

        if (studentResult.recordset.length === 0) {
            return res.status(404).json({ success: false, message: 'Student account not found in library database.' });
        }

        // Borrowed books
        let borrowedResult = await pool.request()
            .input('idNo', sql.NVarChar, rollNo)
            .query(`
                SELECT 
                    bc.acc_no AS AccessionNumber,
                    ISNULL(b.title, '') AS Title,
                    ISNULL(b.author, '') AS Author,
                    bc.t_date AS IssueDate,
                    bc.due_date AS DueDate,
                    CASE WHEN bc.due_date < GETDATE() THEN 1 ELSE 0 END AS IsOverdue,
                    ISNULL(fr.noday, 0) AS DaysOverdue,
                    ISNULL(fr.rec_amt, 0) AS CurrentFine
                FROM [dbo].[book_circle] bc
                LEFT JOIN [dbo].[book] b ON bc.acc_no = CAST(b.acc_no AS VARCHAR)
                LEFT JOIN (
                    SELECT id_no, acc_no, max(noday) as noday, sum(rec_amt) as rec_amt
                    FROM [dbo].[fine_receipt1] WHERE paid = 0
                    GROUP BY id_no, acc_no
                ) fr ON bc.id_no = fr.id_no AND bc.acc_no = fr.acc_no
                WHERE bc.id_no = @idNo
                ORDER BY bc.due_date ASC
            `);

        // Fines
        let finesResult = await pool.request()
            .input('idNo', sql.NVarChar, rollNo)
            .query(`
                SELECT 
                    fr.acc_no AS AccessionNumber,
                    ISNULL(b.title, '') AS Title,
                    fr.rec_date AS FineDate,
                    fr.rec_amt AS FineAmount,
                    fr.paid AS IsPaid,
                    ISNULL(fr.noday, 0) AS OverdueDays
                FROM [dbo].[fine_receipt1] fr
                LEFT JOIN [dbo].[book] b ON fr.acc_no = b.acc_no
                WHERE fr.id_no = @idNo
                ORDER BY fr.rec_date DESC
            `);

        // Build response
        const student = studentResult.recordset[0];
        student.Email = email; // Use the Clerk verified email
        student.BorrowedBooks = borrowedResult.recordset;
        student.Fines = finesResult.recordset;


        console.log(`✅ Student ${rollNo} logged in successfully via Clerk to HiTECH Library`);

        res.json({
            success: true,
            message: 'Login successful to HiTECH Library',
            student: student
        });

    } catch (err) {
        console.error('Clerk login error:', err.message);
        res.status(500).json({ success: false, message: 'Server error. Please try again.' });
    }
});


// ==========================================================
// ===== 📬 NOTIFICATION SYSTEM (Daily Reminders) =====
// ==========================================================

// 11. Manually trigger daily notifications (can be called via cron or manually)
app.post('/api/notifications/send-daily', async (req, res) => {
    try {
        if (!emailTransporter) {
            return res.status(503).json({ success: false, message: 'Email service not configured' });
        }

        // Check if today is a holiday
        const isHoliday = await isTodayHoliday();
        if (isHoliday) {
            console.log('🏖️ Today is a holiday. Skipping notifications.');
            return res.json({
                success: true,
                message: 'Today is a holiday. No notifications sent.',
                isHoliday: true,
                sent: 0
            });
        }

        let pool = await sql.connect(dbConfig);
        let emailsSent = 0;
        let errors = [];

        // --- A) DUE TOMORROW REMINDERS ---
        let dueTomorrowResult = await pool.request().query(`
            SELECT 
                bc.id_no AS RollNumber,
                p.name AS StudentName,
                b.title AS BookTitle,
                bc.due_date AS DueDate,
                bc.acc_no AS AccessionNumber
            FROM [dbo].[book_circle] bc
            LEFT JOIN [dbo].[book] b ON bc.acc_no = CAST(b.acc_no AS VARCHAR)
            LEFT JOIN [dbo].[personal] p ON bc.id_no = p.id_no
            WHERE CAST(bc.due_date AS DATE) = CAST(DATEADD(day, 1, GETDATE()) AS DATE)
        `);

        for (const record of dueTomorrowResult.recordset) {
            try {
                const email = getStudentEmail(record.RollNumber);
                const dueDate = new Date(record.DueDate).toLocaleDateString('en-IN', {
                    day: 'numeric', month: 'short', year: 'numeric'
                });

                await sendNotificationEmail(email,
                    `📅 Book Due Tomorrow — "${record.BookTitle}"`,
                    `
                    <h3 style="color: #f59e0b; margin: 0 0 12px;">⏰ Due Date Reminder</h3>
                    <p style="color: #475569; margin: 0 0 16px;">Hi <strong>${record.StudentName || 'Student'}</strong>,</p>
                    <div style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 16px; margin-bottom: 16px;">
                        <p style="margin: 0 0 8px; color: #92400e; font-weight: 700;">📖 ${record.BookTitle}</p>
                        <p style="margin: 0; color: #a16207; font-size: 14px;">Acc. No: ${record.AccessionNumber} | Due: <strong>${dueDate}</strong></p>
                    </div>
                    <p style="color: #64748b; font-size: 14px;">Please return this book <strong>by tomorrow</strong> to avoid fines. A fine of ₹1 per day will be charged for each overdue day (holidays excluded).</p>
                    `
                );
                emailsSent++;
            } catch (emailErr) {
                errors.push(`Due reminder for ${record.RollNumber}: ${emailErr.message}`);
            }
        }

        // --- B) OVERDUE / FINE ALERTS ---
        let overdueResult = await pool.request().query(`
            SELECT 
                bc.id_no AS RollNumber,
                p.name AS StudentName,
                b.title AS BookTitle,
                bc.due_date AS DueDate,
                bc.acc_no AS AccessionNumber,
                ISNULL(fr.noday, 0) AS OverdueDays,
                ISNULL(fr.rec_amt, 0) AS FineAmount
            FROM [dbo].[book_circle] bc
            LEFT JOIN [dbo].[book] b ON bc.acc_no = CAST(b.acc_no AS VARCHAR)
            LEFT JOIN [dbo].[personal] p ON bc.id_no = p.id_no
            LEFT JOIN (
                SELECT id_no, acc_no, max(noday) as noday, sum(rec_amt) as rec_amt
                FROM [dbo].[fine_receipt1] WHERE paid = 0
                GROUP BY id_no, acc_no
            ) fr ON bc.id_no = fr.id_no AND bc.acc_no = fr.acc_no
            WHERE bc.due_date < CAST(GETDATE() AS DATE)
        `);

        // Group overdue books by student to send 1 email per student
        const overdueByStudent = {};
        for (const record of overdueResult.recordset) {
            if (!overdueByStudent[record.RollNumber]) {
                overdueByStudent[record.RollNumber] = {
                    name: record.StudentName,
                    books: []
                };
            }
            overdueByStudent[record.RollNumber].books.push(record);
        }

        for (const [rollNo, data] of Object.entries(overdueByStudent)) {
            try {
                const email = getStudentEmail(rollNo);
                const totalFine = data.books.reduce((sum, b) => sum + (b.FineAmount || 0), 0);
                const booksList = data.books.map(b => {
                    const dueDate = new Date(b.DueDate).toLocaleDateString('en-IN', {
                        day: 'numeric', month: 'short', year: 'numeric'
                    });
                    return `
                        <tr>
                            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-size: 13px; color: #334155;">${b.BookTitle}</td>
                            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-size: 13px; text-align: center; color: #64748b;">${dueDate}</td>
                            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-size: 13px; text-align: center; color: #dc2626; font-weight: 700;">${Math.max(b.OverdueDays, 0)} days</td>
                            <td style="padding: 10px; border-bottom: 1px solid #f1f5f9; font-size: 13px; text-align: center; color: #dc2626; font-weight: 700;">₹${Math.max(b.FineAmount, 0)}</td>
                        </tr>`;
                }).join('');

                await sendNotificationEmail(email,
                    `⚠️ Overdue Alert — Fine: ₹${totalFine}`,
                    `
                    <h3 style="color: #dc2626; margin: 0 0 12px;">⚠️ Overdue Books Alert</h3>
                    <p style="color: #475569; margin: 0 0 16px;">Hi <strong>${data.name || 'Student'}</strong>,</p>
                    <p style="color: #64748b; font-size: 14px; margin: 0 0 16px;">You have <strong>${data.books.length} overdue book(s)</strong>. Please return them immediately to stop accumulating fines.</p>
                    
                    <table style="width: 100%; border-collapse: collapse; margin-bottom: 16px;">
                        <thead>
                            <tr style="background: #f8fafc;">
                                <th style="padding: 10px; text-align: left; font-size: 12px; text-transform: uppercase; color: #64748b; letter-spacing: 0.5px;">Book</th>
                                <th style="padding: 10px; text-align: center; font-size: 12px; text-transform: uppercase; color: #64748b;">Due Date</th>
                                <th style="padding: 10px; text-align: center; font-size: 12px; text-transform: uppercase; color: #64748b;">Overdue</th>
                                <th style="padding: 10px; text-align: center; font-size: 12px; text-transform: uppercase; color: #64748b;">Fine</th>
                            </tr>
                        </thead>
                        <tbody>${booksList}</tbody>
                    </table>
                    
                    <div style="background: #fef2f2; border: 2px solid #fecaca; border-radius: 12px; padding: 16px; text-align: center;">
                        <p style="margin: 0; color: #7f1d1d; font-size: 13px;">Total Fine Amount</p>
                        <p style="margin: 4px 0 0; color: #dc2626; font-size: 28px; font-weight: 900;">₹${totalFine}</p>
                        <p style="margin: 8px 0 0; color: #991b1b; font-size: 12px;">Fine increases by ₹1 per book per working day</p>
                    </div>
                    
                    <p style="color: #94a3b8; font-size: 12px; margin: 16px 0 0; text-align: center;">
                        * Holidays and Sundays are excluded from fine calculation.
                    </p>
                    `
                );
                emailsSent++;
            } catch (emailErr) {
                errors.push(`Overdue alert for ${rollNo}: ${emailErr.message}`);
            }
        }

        console.log(`📬 Daily notifications: ${emailsSent} emails sent, ${errors.length} errors`);

        res.json({
            success: true,
            message: `Daily notifications processed`,
            isHoliday: false,
            sent: emailsSent,
            dueTomorrowCount: dueTomorrowResult.recordset.length,
            overdueStudents: Object.keys(overdueByStudent).length,
            errors: errors.length > 0 ? errors : undefined
        });

    } catch (err) {
        console.error('Daily notification error:', err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});

// 12. Send fine payment confirmation email
app.post('/api/notifications/fine-paid', async (req, res) => {
    try {
        if (!emailTransporter) {
            return res.status(503).json({ success: false, message: 'Email service not configured' });
        }

        const { rollNo, amount, bookTitle } = req.body;
        if (!rollNo || !amount) {
            return res.status(400).json({ success: false, message: 'rollNo and amount are required' });
        }

        const email = getStudentEmail(rollNo);

        // Get student name from DB
        let pool = await sql.connect(dbConfig);
        let studentResult = await pool.request()
            .input('idNo', sql.NVarChar, rollNo)
            .query(`SELECT name FROM [dbo].[personal] WHERE id_no = @idNo`);

        const studentName = studentResult.recordset.length > 0 ? studentResult.recordset[0].name : 'Student';

        await sendNotificationEmail(email,
            `✅ Fine Payment Confirmed — ₹${amount}`,
            `
            <h3 style="color: #16a34a; margin: 0 0 12px;">✅ Payment Received</h3>
            <p style="color: #475569; margin: 0 0 16px;">Hi <strong>${studentName}</strong>,</p>
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 20px; text-align: center; margin-bottom: 16px;">
                <p style="margin: 0 0 4px; color: #166534; font-size: 13px;">Amount Paid</p>
                <p style="margin: 0; color: #16a34a; font-size: 32px; font-weight: 900;">₹${amount}</p>
                ${bookTitle ? `<p style="margin: 8px 0 0; color: #15803d; font-size: 13px;">For: "${bookTitle}"</p>` : ''}
            </div>
            <p style="color: #64748b; font-size: 14px;">Your fine has been cleared. Thank you for using the HiTECH Library (Hindusthan Institute of Technology)! 📚</p>
            `
        );

        console.log(`💰 Fine paid confirmation sent to ${rollNo} for ₹${amount}`);

        res.json({ success: true, message: `Payment confirmation sent to ${email}` });

    } catch (err) {
        console.error('Fine paid notification error:', err.message);
        res.status(500).json({ success: false, message: err.message });
    }
});


// ==========================================================
// ===== ⏰ AUTOMATIC SCHEDULER REMOVED =====
// ==========================================================
// The librarian now manually sends emails via the desktop app
// (librarian_mailer.py). No automatic email triggers remain.


// Fallback: serve index.html for any non-API routes (SPA support)
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`🚀 Library API Bridge running on http://localhost:${PORT}`);
    console.log(`📂 Frontend served from: ${path.join(__dirname, '..', 'public')}`);
    console.log(`🗄️  Database: ${process.env.DB_NAME} @ ${process.env.DB_SERVER}`);
    console.log(`To make this public, run: lt --port ${PORT} --subdomain library-app-sami`);
    console.log(`📧 Email notifications are now handled by librarian_mailer.py (desktop app)`);
});