const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');

const DB_PATH = process.env.DB_PATH || '/home/team/shared/receptionist.db';

// Ensure the directory exists
const dbDir = path.dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
    fs.mkdirSync(dbDir, { recursive: true });
}

const db = new sqlite3.Database(DB_PATH, (err) => {
    if (err) {
        console.error('Error opening database:', err.message);
        process.exit(1);
    }
    console.log('Connected to the SQLite database.');
});

db.serialize(() => {
    // 1. Leads Table
    db.run(`CREATE TABLE IF NOT EXISTS leads (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        phone TEXT NOT NULL,
        email TEXT,
        vehicle_year INTEGER,
        vehicle_make TEXT,
        vehicle_model TEXT,
        service_interest TEXT,
        call_notes TEXT,
        status TEXT DEFAULT 'New Lead',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) console.error('Error creating leads table:', err.message);
        else console.log('Leads table created or already exists.');
    });

    // 2. Appointments Table
    db.run(`CREATE TABLE IF NOT EXISTS appointments (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        lead_id INTEGER,
        appointment_date TEXT NOT NULL,
        appointment_time TEXT NOT NULL,
        service_requested TEXT,
        mobile_address TEXT,
        status TEXT DEFAULT 'Scheduled',
        google_calendar_event_id TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (lead_id) REFERENCES leads (id)
    )`, (err) => {
        if (err) console.error('Error creating appointments table:', err.message);
        else console.log('Appointments table created or already exists.');
    });

    // 3. Logs Table
    db.run(`CREATE TABLE IF NOT EXISTS logs (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        sid TEXT,
        type TEXT CHECK(type IN ('call', 'sms')),
        direction TEXT CHECK(direction IN ('inbound', 'outbound')),
        content TEXT,
        notes TEXT,
        timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
    )`, (err) => {
        if (err) console.error('Error creating logs table:', err.message);
        else console.log('Logs table created or already exists.');
    });
});

db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    }
    console.log('Database connection closed.');
});
