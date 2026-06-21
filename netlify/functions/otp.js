const nodemailer = require('nodemailer');

// ─── Supabase Config ──────────────────────────────
const SUPABASE_URL = 'https://apgytadrsjtfhxwlpghn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwZ3l0YWRyc2p0Zmh4d2xwZ2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NTE0NTcsImV4cCI6MjA5MDQyNzQ1N30.Yoqfg9X8VtM0ooydriVGVjkiJ-YxK9ceap3m4xynd-0';

// ─── Supabase REST helpers ────────────────────────
async function supaFetch(path, options = {}) {
  const url = `${SUPABASE_URL}/rest/v1/${path}`;
  const res = await fetch(url, {
    ...options,
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
      'Prefer': options.prefer || 'return=representation',
      ...options.headers,
    },
  });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`Supabase ${res.status}: ${text}`);
  }
  const contentType = res.headers.get('content-type') || '';
  if (contentType.includes('application/json')) {
    return res.json();
  }
  return null;
}

// Store OTP in Supabase
async function storeOTP(email, otp) {
  // Delete any existing OTPs for this email first
  await supaFetch(`otp_store?email=eq.${encodeURIComponent(email)}`, {
    method: 'DELETE',
  });

  // Insert new OTP (expires in 5 minutes)
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();
  await supaFetch('otp_store', {
    method: 'POST',
    body: JSON.stringify({ email, otp, attempts: 0, expires_at: expiresAt, verified: false }),
  });
}

// Get OTP record from Supabase
async function getOTP(email) {
  const rows = await supaFetch(`otp_store?email=eq.${encodeURIComponent(email)}&order=created_at.desc&limit=1`, {
    method: 'GET',
  });
  return rows && rows.length > 0 ? rows[0] : null;
}

// Increment attempts
async function incrementAttempts(id, currentAttempts) {
  await supaFetch(`otp_store?id=eq.${id}`, {
    method: 'PATCH',
    body: JSON.stringify({ attempts: currentAttempts + 1 }),
  });
}

// Delete OTP record
async function deleteOTP(email) {
  await supaFetch(`otp_store?email=eq.${encodeURIComponent(email)}`, {
    method: 'DELETE',
  });
}

// Cleanup expired OTPs
async function cleanupExpired() {
  const now = new Date().toISOString();
  try {
    await supaFetch(`otp_store?expires_at=lt.${now}`, { method: 'DELETE' });
  } catch (e) {
    // Ignore cleanup errors
  }
}

// ─── Keep-Alive Ping ──────────────────────────────
async function pingKeepAlive() {
  try {
    await supaFetch('keep_alive?id=eq.1', {
      method: 'PATCH',
      body: JSON.stringify({ last_ping: new Date().toISOString() }),
    });
    console.log('🏓 Keep-alive ping sent to Supabase');
  } catch (e) {
    console.error('Keep-alive failed:', e.message);
  }
}

// ─── OTP Generation ──────────────────────────────
function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

// ─── Email Sender ─────────────────────────────────
async function sendOTPEmail(toEmail, otp) {
  const mailerConfigs = [
    { user: process.env.MAIL2_ID || 'ananyarao177@gmail.com', pass: process.env.MAIL2_PASS || 'qgqhinvnmcsurodi', label: 'Fallback' },
    { user: process.env.MAIL1_ID || 'vihaanvijay144@gmail.com', pass: process.env.MAIL1_PASS || 'mjurazgtdxruwxoi', label: 'Primary' },
  ];

  for (const { user, pass, label } of mailerConfigs) {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: { user, pass },
      });

      await transporter.sendMail({
        from: `"HiTECH Library 📚" <${user}>`,
        to: toEmail,
        subject: '🔐 Your OTP Code — HiTECH Library Portal',
        html: `
          <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 500px; margin: 0 auto; background: #f8fafc; border-radius: 16px; overflow: hidden; border: 1px solid #e2e8f0;">
            <div style="background: linear-gradient(135deg, #6366f1, #7c3aed); padding: 32px 24px; text-align: center;">
              <h1 style="color: white; margin: 0; font-size: 24px; font-weight: 800;">📚 HiTECH Library</h1>
              <p style="color: rgba(255,255,255,0.85); margin: 8px 0 0; font-size: 14px;">Hindusthan Institute of Technology</p>
            </div>
            <div style="padding: 32px 24px; text-align: center;">
              <h2 style="color: #6366f1; margin: 0 0 8px; font-size: 20px;">Verification Code</h2>
              <p style="color: #64748b; font-size: 14px; margin: 0 0 24px; line-height: 1.6;">
                Use this OTP to login to your library account. Valid for <strong style="color: #f59e0b;">5 minutes</strong>.
              </p>
              <div style="background: white; border: 2px dashed #6366f1; border-radius: 14px; padding: 24px 16px; margin: 0 auto; max-width: 300px;">
                <span style="font-size: 42px; font-weight: 900; letter-spacing: 12px; color: #6366f1; font-family: monospace;">${otp}</span>
              </div>
              <p style="color: #94a3b8; font-size: 12px; margin: 20px 0 0;">⏱️ Expires in <strong>5 minutes</strong></p>
              <p style="color: #cbd5e1; font-size: 11px; margin: 16px 0 0;">If you didn't request this, please ignore.</p>
            </div>
            <div style="background: #f1f5f9; padding: 16px 24px; text-align: center; border-top: 1px solid #e2e8f0;">
              <p style="color: #94a3b8; font-size: 11px; margin: 0;">Sent via ${label} mailer &bull; © 2026 HiTECH Library</p>
            </div>
          </div>
        `,
      });

      console.log(`✅ OTP sent via ${label} (${user}) → ${toEmail}`);
      return { success: true, mailer: label };
    } catch (err) {
      console.error(`❌ ${label} mailer failed:`, err.message);
    }
  }

  throw new Error('All mailers exhausted. OTP could not be sent.');
}

// ═══════════════════════════════════════════════════
// ===== NETLIFY FUNCTION HANDLER =====
// ═══════════════════════════════════════════════════
exports.handler = async (event, context) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type, x-api-key',
    'Access-Control-Allow-Methods': 'OPTIONS, POST',
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  // Cleanup expired OTPs on every request
  await cleanupExpired();

  // Ping keep-alive on every request (prevents 7-day Supabase pause)
  await pingKeepAlive();

  const pathParts = event.path.split('/');
  const action = pathParts[pathParts.length - 1]; // "send" or "verify"

  try {
    const body = JSON.parse(event.body);

    // ─── SEND OTP ────────────────────────────────────
    if (action === 'send') {
      const { email } = body;
      if (!email) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Email is required.' }) };
      }

      // Rate limit: check if a recent OTP exists (less than 60s old)
      const existing = await getOTP(email);
      if (existing) {
        const createdAt = new Date(existing.created_at).getTime();
        if (Date.now() - createdAt < 60000) {
          return { statusCode: 429, headers, body: JSON.stringify({ error: 'Please wait 60 seconds before requesting a new OTP.' }) };
        }
      }

      const otp = generateOTP();
      await storeOTP(email, otp);
      await sendOTPEmail(email, otp);

      return {
        statusCode: 200, headers,
        body: JSON.stringify({ success: true, message: `OTP sent to ${email}` }),
      };
    }

    // ─── VERIFY OTP ──────────────────────────────────
    if (action === 'verify') {
      const { email, otp } = body;
      if (!email || !otp) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'Email and OTP are required.' }) };
      }

      const record = await getOTP(email);

      if (!record) {
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'No OTP found. Please request a new one.' }) };
      }

      // Check expiry
      if (new Date() > new Date(record.expires_at)) {
        await deleteOTP(email);
        return { statusCode: 400, headers, body: JSON.stringify({ error: 'OTP expired. Please request a new one.' }) };
      }

      // Check attempts
      if (record.attempts >= 3) {
        await deleteOTP(email);
        return { statusCode: 429, headers, body: JSON.stringify({ error: 'Too many failed attempts. Request a new OTP.' }) };
      }

      // Compare OTP
      if (record.otp !== otp.toString().trim()) {
        await incrementAttempts(record.id, record.attempts);
        const left = 3 - (record.attempts + 1);
        return {
          statusCode: 400, headers,
          body: JSON.stringify({ error: `Invalid OTP. ${left} attempt${left !== 1 ? 's' : ''} remaining.`, attemptsLeft: left }),
        };
      }

      // ✅ OTP matches — cleanup and confirm
      await deleteOTP(email);
      console.log(`✅ OTP verified for ${email}`);
      return {
        statusCode: 200, headers,
        body: JSON.stringify({ success: true, message: 'OTP verified successfully.' }),
      };
    }

    return { statusCode: 404, headers, body: JSON.stringify({ error: 'Use /send or /verify' }) };

  } catch (err) {
    console.error('OTP Function Error:', err);
    return { statusCode: 500, headers, body: JSON.stringify({ error: err.message || 'Server error' }) };
  }
};
