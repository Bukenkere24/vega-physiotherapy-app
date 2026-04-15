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
      preferred_date TEXT,
      preferred_time TEXT,
      message TEXT,
      source TEXT NOT NULL DEFAULT 'contact',
      created_at TEXT NOT NULL DEFAULT (datetime('now'))
    );

    CREATE INDEX IF NOT EXISTS idx_contact_created ON contact_submissions(created_at);
  `);

  const columns = db.prepare(`PRAGMA table_info(contact_submissions)`).all().map((col) => col.name);
  if (!columns.includes('preferred_date')) {
    db.exec(`ALTER TABLE contact_submissions ADD COLUMN preferred_date TEXT`);
  }
  if (!columns.includes('preferred_time')) {
    db.exec(`ALTER TABLE contact_submissions ADD COLUMN preferred_time TEXT`);
  }

  return db;
}

module.exports = { initDb };
