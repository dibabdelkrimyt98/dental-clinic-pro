const { getClient } = require('./db-client');

exports.handler = async (event, context) => {
    // 1. Method Check
    if (event.httpMethod !== 'POST') {
        return { 
            statusCode: 405, 
            body: JSON.stringify({ error: 'Method Not Allowed' }) 
        };
    }

    let client; // Declare client outside try/catch to ensure we can close it in finally
    
    try {
        const data = JSON.parse(event.body);
        const { fullname, phone, reason, address, previous_treatment } = data;
        
        client = await getClient(); // Open connection

        // 2. PostgreSQL Query
        // The NOW() function inserts the current timestamp directly via Supabase/PostgreSQL.
        const sql = `
            INSERT INTO appointments (fullname, phone, reason, address, previous_treatment, submission_date) 
            VALUES ($1, $2, $3, $4, $5, NOW()) RETURNING id
        `;
        
        // Ensure previous_treatment is a boolean string for the PostgreSQL driver
        const isPrevious = previous_treatment === true ? 'TRUE' : 'FALSE';

        const res = await client.query(sql, [
            fullname, 
            phone, 
            reason, 
            address, 
            isPrevious // Pass the explicit string value
        ]);
        
        // 3. Success Response
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
        // 4. Close Connection
        if (client) {
            await client.end();
        }
    }
};