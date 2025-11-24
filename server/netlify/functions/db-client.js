const { Client } = require('pg');

/**
 * Creates and returns a connected PostgreSQL client instance.
 * @returns {Promise<Client>} A connected database client.
 */
async function getClient() {
    // ⬇️ Accesses the secure connection string stored in Netlify Environment Variables
    const client = new Client({
        connectionString: process.env.DB_CONN_STRING,
        // Netlify often requires rejectUnauthorized: false for connecting to cloud databases like Supabase/Postgres
        ssl: { rejectUnauthorized: false } 
    });

    try {
        await client.connect();
        return client;
    } catch (error) {
        // If connection fails, log the error and re-throw
        console.error("Database connection failed:", error.message);
        throw new Error("Database connection error");
    }
}

// Correct export for Node.js modules used in Netlify Functions
module.exports = { getClient };