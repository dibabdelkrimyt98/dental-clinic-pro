// --- Database Client Logic (INLINED) ---
const { Client } = require('pg');

async function getClient() {
    // FIX: Remove 'const' and assign the environment variable directly to the connectionString property
    const client = new Client({
        connectionString: process.env.NETLIFY_DATABASE_URL, // <--- CORRECTED LINE
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
        
        // This function call will now correctly pass the connection string
        client = await getClient(); 

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