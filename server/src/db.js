const Database = require('better-sqlite3');
const fs = require('fs');
const path = require('path');

function getDbPath() {
  const envPath = process.env.SQLITE_PATH;
  if (envPath) {
    return path.isAbsolute(envPath) ? envPath : path.join(process.cwd(), envPath);
  }
  return path.join(__dirname, '..', 'data', 'vega.db');
}

function initDb() {
  const dbPath = getDbPath();
  const dir = path.dirname(dbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  const db = new Database(dbPath);
  db.pragma('journal_mode = WAL');

  db.exec(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      full_name TEXT NOT NULL,
      phone TEXT NOT NULL,
      email TEXT,
      service_interest TEXT NOT NULL,
      message TEXT,
      source TEXT NOT NULL DEFAULT 'contact',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE TABLE IF NOT EXISTS payments (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      razorpay_order_id TEXT UNIQUE NOT NULL,
      amount_paise INTEGER NOT NULL,
      currency TEXT NOT NULL DEFAULT 'INR',
      status TEXT NOT NULL DEFAULT 'created',
      contact_name TEXT,
      contact_phone TEXT,
      contact_email TEXT,
      service_note TEXT,
      razorpay_payment_id TEXT,
      razorpay_signature TEXT,
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at);
    CREATE INDEX IF NOT EXISTS idx_payments_order ON payments(razorpay_order_id);
  `);

  return db;
}

module.exports = { initDb };
