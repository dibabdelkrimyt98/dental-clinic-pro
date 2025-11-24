// --- Database Client Logic (INLINED) ---
const { Client } = require('pg');

async function getClient() {
    const client = new Client({
        connectionString: process.env.DB_CONN_STRING,
        ssl: { rejectUnauthorized: false }
    });
    // Use try/finally to ensure connection closing is always attempted
    await client.connect();
    return client;
}
// --- END Database Client Logic ---


exports.handler = async (event, context) => {
    if (event.httpMethod !== 'POST') {
        return { 
            statusCode: 405, 
            body: JSON.stringify({ error: 'Method Not Allowed' }) 
        };
    }

    let client;
    
    try {
        const data = JSON.parse(event.body);
        const { fullname, phone, reason, address, previous_treatment } = data;
        
        client = await getClient(); // Opens the secure connection to Supabase

        // Convert boolean to PostgreSQL compatible string
        const isPrevious = previous_treatment === true ? 'TRUE' : 'FALSE';

        // PostgreSQL Query
        const sql = `
            INSERT INTO appointments (fullname, phone, reason, address, previous_treatment, submission_date) 
            VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id
        `;
        
        const res = await client.query(sql, [
            fullname, 
            phone, 
            reason, 
            address, 
            isPrevious
        ]);
        
        // Success Response
        return {
            statusCode: 200,
            body: JSON.stringify({ 
                message: "RDV enregistré avec succès!", 
                id: res.rows[0].id 
            }),
        };

    } catch (error) {
        console.error("FUNCTION ERROR:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ 
                error: "Erreur lors de l'enregistrement du RDV.", 
                details: error.message 
            }),
        };
    } finally {
        // Ensure connection is closed whether successful or failed
        if (client) {
            await client.end();
        }
    }
};