const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const db = require('./database');
const emailjs = require('@emailjs/browser');
const nodemailer = require('nodemailer');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Get Services for the Grid
app.get('/api/services', (req, res) => {
  db.all("SELECT * FROM services", [], (err, rows) => {
    if (err) return res.status(400).json({ error: err.message });
    res.json({ data: rows });
  });
});
let transporter = nodemailer.createTransport({
  service: 'gmail', // Or 'outlook', 'sendgrid', etc.
  auth: {
      user: 'YOUR_EMAIL@gmail.com', // Replace with your email
      pass: 'YOUR_APP_PASSWORD' // Replace with your generated App Password
  }
});
// Handle Contact Form
app.post('/api/appointment', (req, res) => {
  const { fullname, phone, reason, address, previous_treatment } = req.body;
  const submission_date = new Date().toISOString();
  
  const sql = `INSERT INTO appointments (fullname, phone, reason, address, previous_treatment, submission_date) VALUES (?, ?, ?, ?, ?, ?)`;
  
  db.run(sql, [fullname, phone, reason, address, previous_treatment, submission_date], function(err) {
    if (err) {
      console.error(err);
      return res.status(400).json({ error: "Erreur lors de l'enregistrement du RDV." });
    }
    
    // --- Notification Email (Simulated for server-side) ---
    // In a real Node app, you'd use a service like Nodemailer or SendGrid.
    // For now, we'll just log success.
    console.log(`NEW APPOINTMENT: ${fullname} (ID: ${this.lastID})`);
    
    res.json({ message: "Rendez-vous enregistré avec succès!", id: this.lastID });
  });
});

app.listen(5000, () => console.log('Server running on port 5000'));