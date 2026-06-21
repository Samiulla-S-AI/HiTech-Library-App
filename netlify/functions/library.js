const sql = require('mssql');

// Mock Database (Fallback)
const mockData = {
    books: [
        {
            AccessionNumber: "10868",
            Title: "Aerodynamics selected topics (Mock)",
            Author: "THEODORE VON KARMAN",
            Department: "BE AERO",
            Availability: "Available"
        }
    ],
    students: []
};

// Database Config from Environment Variables
const dbConfig = {
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    server: process.env.DB_SERVER,
    options: {
        encrypt: false,
        trustServerCertificate: true
    }
};

exports.handler = async (event, context) => {
    // 🛡️ SECURITY CHECK: The "API Key"
    // You will set MY_SECRET_KEY in the Netlify Dashboard
    const clientKey = event.headers['x-api-key'];
    const serverKey = process.env.MY_SECRET_KEY || 'prototype_key_123';

    if (clientKey !== serverKey) {
        return {
            statusCode: 401,
            body: JSON.stringify({ message: "Invalid API Key. Access Denied." })
        };
    }

    const path = event.path.replace("/api/", "").split("/");
    const endpoint = path[0];
    const id = path[1];

    // IF DB_SERVER is provided, try real SQL connection
    if (process.env.DB_SERVER) {
        try {
            let pool = await sql.connect(dbConfig);

            if (endpoint === "books") {
                const search = event.queryStringParameters.q || '';
                const sort = event.queryStringParameters.sort || 'Title';

                let orderBy = "Title ASC";
                if (sort === "Author") orderBy = "Author ASC";
                if (sort === "Year") orderBy = "YearOfPublished DESC";

                const result = await pool.request()
                    .input('q', sql.VarChar, `%${search}%`)
                    .query(`SELECT AccessionNumber, Title, Author, Department, Availability, Edition, OnlineLink FROM BooksTable WHERE Title LIKE @q OR Author LIKE @q OR AccessionNumber LIKE @q ORDER BY ${orderBy}`);

                return { statusCode: 200, body: JSON.stringify(result.recordset) };
            }

            if (endpoint === "student" && id) {
                const result = await pool.request()
                    .input('roll', sql.VarChar, id)
                    .query('SELECT * FROM StudentsTable WHERE RollNumber = @roll');
                return { statusCode: 200, body: JSON.stringify(result.recordset[0]) };
            }
        } catch (err) {
            return { statusCode: 500, body: JSON.stringify({ error: err.message, note: "Check if your SQL Server is reachable from Netlify!" }) };
        }
    }

    // --- FALLBACK TO MOCK DATA (If no DB configured) ---
    if (endpoint === "books") {
        return { statusCode: 200, body: JSON.stringify(mockData.books) };
    }

    return { statusCode: 404, body: JSON.stringify({ message: "Not found" }) };
};
