// server/src/db.js
// PostgreSQL implementation using the `pg` driver.
// Replaces better-sqlite3.  All queries remain functionally identical.

const { Pool } = require('pg');

// Pool is created once and reused for the process lifetime.
// Connection params come entirely from DATABASE_URL (see .env.example).
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  // Uncomment below if your host requires SSL (e.g. Render, Railway, Supabase):
  ssl: { rejectUnauthorized: false },
});

pool.on('error', (err) => {
  console.error('Unexpected PostgreSQL pool error', err);
});

/**
 * Run the schema migration.  Uses IF NOT EXISTS so it is safe to call on
 * every startup — no separate migration runner needed for this single table.
 */
async function initDb() {
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_submissions (
      id               SERIAL PRIMARY KEY,
      full_name        TEXT        NOT NULL,
      phone            TEXT        NOT NULL,
      email            TEXT,
      service_interest TEXT        NOT NULL,
      preferred_date   TEXT,
      preferred_time   TEXT,
      message          TEXT,
      source           TEXT        NOT NULL DEFAULT 'contact',
      created_at       TIMESTAMPTZ NOT NULL DEFAULT NOW()
    );

    CREATE INDEX IF NOT EXISTS idx_contact_created
      ON contact_submissions (created_at DESC);
  `);

  console.log('PostgreSQL: schema ready');
  return pool;
}

module.exports = { pool, initDb };
