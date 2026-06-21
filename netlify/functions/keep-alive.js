// ═══════════════════════════════════════════════════
// Scheduled Netlify Function: Keep Supabase Alive
// Runs every 3 days to prevent 7-day inactivity pause
// ═══════════════════════════════════════════════════

const SUPABASE_URL = 'https://apgytadrsjtfhxwlpghn.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFwZ3l0YWRyc2p0Zmh4d2xwZ2huIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzQ4NTE0NTcsImV4cCI6MjA5MDQyNzQ1N30.Yoqfg9X8VtM0ooydriVGVjkiJ-YxK9ceap3m4xynd-0';

// Netlify scheduled function config — runs every 3 days
exports.config = {
  schedule: "@daily"
};

exports.handler = async (event, context) => {
  try {
    // 1. Ping keep_alive table
    const pingRes = await fetch(`${SUPABASE_URL}/rest/v1/keep_alive?id=eq.1`, {
      method: 'PATCH',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation',
      },
      body: JSON.stringify({ last_ping: new Date().toISOString() }),
    });

    // 2. Cleanup expired OTPs
    const now = new Date().toISOString();
    await fetch(`${SUPABASE_URL}/rest/v1/otp_store?expires_at=lt.${now}`, {
      method: 'DELETE',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    // 3. Also do a simple SELECT to generate DB activity
    await fetch(`${SUPABASE_URL}/rest/v1/keep_alive?select=last_ping&limit=1`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      },
    });

    console.log(`🏓 Keep-alive ping successful at ${new Date().toISOString()}`);

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Keep-alive ping sent', timestamp: new Date().toISOString() }),
    };
  } catch (err) {
    console.error('Keep-alive error:', err.message);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
