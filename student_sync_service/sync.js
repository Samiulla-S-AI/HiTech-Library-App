require('dotenv').config();
const sql = require('mssql');
const fetch = require('node-fetch');

// --- Supabase Config ---
const SUPABASE_URL = process.env.SUPABASE_URL || 'https://apgytadrsjtfhxwlpghn.supabase.co';
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY; // Need the Service Role key for bulk upsert

// --- MSSQL Config ---
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    port: 1433,
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    }
};

async function syncStudents() {
    console.log('🚀 Starting Student Sync (Computer B → Supabase)...');
    
    try {
        // 1. Connect to MSSQL
        console.log('🔗 Connecting to MSSQL Database...');
        let pool = await sql.connect(dbConfig);
        
        // 2. Fetch student data (Read-Only)
        console.log('📖 Fetching students from [dbo].[personal]...');
        const query = `
            SELECT 
                reg_no AS regno, 
                e_mail AS email, 
                name AS name 
            FROM [dbo].[personal]
            WHERE reg_no IS NOT NULL AND reg_no != ''
        `;
        let result = await pool.request().query(query);
        const students = result.recordset;
        console.log(`✅ Loaded ${students.length} students from MSSQL.`);

        if (students.length === 0) {
            console.log('⚠️ No students found to sync.');
            return;
        }

        // 3. Batch Sync to Supabase
        // We'll sync in batches of 100 to avoid request size limits
        const BATCH_SIZE = 100;
        let syncedCount = 0;

        for (let i = 0; i < students.length; i += BATCH_SIZE) {
            const batch = students.slice(i, i + BATCH_SIZE).map(s => ({
                reg_no: s.regno.toString().trim(),
                email: s.email ? s.email.trim() : null,
                name: s.name ? s.name.trim() : 'N/A',
                updated_at: new Date().toISOString()
            }));

            console.log(`📡 Syncing batch ${Math.floor(i/BATCH_SIZE) + 1} of ${Math.ceil(students.length/BATCH_SIZE)}...`);
            
            // Upsert into Supabase "students" table
            const response = await fetch(`${SUPABASE_URL}/rest/v1/students`, {
                method: 'POST',
                headers: {
                    'apikey': SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY,
                    'Authorization': `Bearer ${SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY}`,
                    'Content-Type': 'application/json',
                    'Prefer': 'resolution=merge-duplicates' // This performs an UPSERT if 'reg_no' is the Primary Key
                },
                body: JSON.stringify(batch)
            });

            if (!response.ok) {
                const error = await response.text();
                throw new Error(`Supabase Error: ${error}`);
            }

            syncedCount += batch.length;
        }

        console.log(`🎉 SUCCESS! Synced ${syncedCount} students to Supabase.`);

    } catch (err) {
        console.error('❌ Sync Failed:', err.message);
    } finally {
        await sql.close();
        process.exit();
    }
}

// Check if scheduled or one-off
syncStudents();
