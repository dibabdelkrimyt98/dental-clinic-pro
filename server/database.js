const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./dental.db');

db.serialize(() => {
  // Create Services Table
  db.run(`CREATE TABLE IF NOT EXISTS services (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT,
    icon TEXT
  )`);

  // Seed Data (Matches the "Nos Services" section in image)
  db.run(`INSERT OR IGNORE INTO services (id, title, icon) VALUES 
    (1, 'Dentisterie Générale', 'tooth'),
    (2, 'Dentisterie Esthétique', 'sparkle'),
    (3, 'Orthodontie', 'braces'),
    (4, 'Implantologie', 'screw'),
    (5, 'Pédodontie', 'baby')
  `);

  // Create Appointments Table for the Contact Form
  db.run(`CREATE TABLE IF NOT EXISTS appointments (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fullname TEXT,
    phone TEXT,
    reason TEXT,
    address TEXT,
    previous_treatment BOOLEAN,
    submission_date TEXT
  )`);
});

module.exports = db;