import 'dotenv/config';
import { createPool } from 'mysql2/promise';

// Helper to get trimmed env var
const getEnv = (key: string) => process.env[key]?.trim();

// Try all possible Railway/Standard URL variables
const dbUrl = getEnv('DATABASE_URL') || getEnv('MYSQL_URL') || getEnv('MYSQL_PUBLIC_URL') || getEnv('MYSQLURL');
const dbHost = getEnv('DB_HOST') || 'localhost';
const dbUser = getEnv('DB_USER') || 'root';
const dbPass = getEnv('DB_PASSWORD') || '';
const dbName = getEnv('DB_NAME') || 'railway';
const dbPort = Number(getEnv('DB_PORT') || 3306);

// Debugging logs to help the user verify Render Env Vars
console.log('[DB] Environment variable check (TRIMMED):');
[
  'DATABASE_URL', 'MYSQL_URL', 'MYSQL_PUBLIC_URL', 'MYSQLURL',
  'DB_HOST', 'DB_PORT', 'DB_USER', 'DB_PASSWORD', 'DB_NAME'
].forEach(key => {
  const val = process.env[key];
  if (val) {
    const trimmedVal = val.trim();
    // Only mask the middle part of URLs and Passwords to help debugging
    const masked = (key.includes('PASS') || key.includes('URL')) 
      ? `${trimmedVal.substring(0, 4)}... (length: ${trimmedVal.length})` 
      : `"${trimmedVal}"`;
    console.log(`[DB] Found ${key}: ${masked}`);
  }
});

if (dbUrl) {
  console.log('[DB] Connecting using Connection String (Strongly Recommended for Railway)');
} else {
  console.log('[DB] Connecting using individual variables');
}

export const pool = dbUrl 
  ? createPool(dbUrl) 
  : createPool({
      host: dbHost,
      port: dbPort,
      user: dbUser,
      password: dbPass,
      database: dbName,
      waitForConnections: true,
      connectionLimit: 10,
      queueLimit: 0,
      ssl: dbHost !== 'localhost' ? { rejectUnauthorized: false } : undefined,
    });

// Test connection immediately at startup
pool.getConnection()
  .then(conn => {
    console.log(`[DB] Success! Connected to ${dbUrl ? 'URL' : dbHost} as ${dbUser}`);
    conn.release();
  })
  .catch(err => {
    console.error('[DB] Connection Test FAILED!');
    console.error(`[DB] Error Code: ${err.code}`);
    console.error(`[DB] Error Message: ${err.message}`);
    
    if (err.message.includes('Access denied')) {
      console.error('[DB] Recommendation: Authentication failed. This usually means the password or user is wrong for external access.');
      console.error('[DB] ACTION: Please check Railway -> MySQL -> Connect -> "Public Connection URL" and use that as MYSQL_PUBLIC_URL in Render.');
    }
  });


export const runMigration = async () => {
    try {
        await pool.query(`ALTER TABLE bookings ADD COLUMN custom_answers JSON NULL;`);
        console.log("Migration successful");
    } catch(e) {
        console.log("Migration failed or already applied", e);
    }
}

export default pool;
