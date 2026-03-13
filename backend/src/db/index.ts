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
        console.log("[DB] Running auto-migrations...");
        
        // 1. Users table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS users (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                PRIMARY KEY (id),
                UNIQUE KEY uq_users_email (email)
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 2. Event Types table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS event_types (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                user_id BIGINT UNSIGNED NOT NULL,
                title VARCHAR(255) NOT NULL,
                description TEXT NULL,
                duration_minutes INT UNSIGNED NOT NULL,
                slug VARCHAR(255) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                UNIQUE KEY uq_event_types_slug (slug),
                KEY idx_event_types_user_id (user_id),
                CONSTRAINT fk_event_types_user_id FOREIGN KEY (user_id)
                    REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 3. Availability table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS availability (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                user_id BIGINT UNSIGNED NOT NULL,
                day_of_week TINYINT UNSIGNED NOT NULL,
                start_time VARCHAR(8) NOT NULL,
                end_time VARCHAR(8) NOT NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                KEY idx_availability_user_id (user_id),
                CONSTRAINT fk_availability_user_id FOREIGN KEY (user_id)
                    REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 4. Bookings table
        await pool.query(`
            CREATE TABLE IF NOT EXISTS bookings (
                id BIGINT UNSIGNED NOT NULL AUTO_INCREMENT,
                event_type_id BIGINT UNSIGNED NOT NULL,
                user_id BIGINT UNSIGNED NOT NULL,
                name VARCHAR(255) NOT NULL,
                email VARCHAR(255) NOT NULL,
                start_time DATETIME NOT NULL,
                end_time DATETIME NOT NULL,
                status ENUM('pending', 'confirmed', 'cancelled') NOT NULL DEFAULT 'confirmed',
                custom_answers JSON NULL,
                created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
                PRIMARY KEY (id),
                KEY idx_bookings_event_type_id (event_type_id),
                KEY idx_bookings_user_id (user_id),
                CONSTRAINT fk_bookings_event_type_id FOREIGN KEY (event_type_id)
                    REFERENCES event_types(id) ON DELETE CASCADE ON UPDATE CASCADE,
                CONSTRAINT fk_bookings_user_id FOREIGN KEY (user_id)
                    REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE
            ) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;
        `);

        // 5. Default User
        await pool.query(`
            INSERT IGNORE INTO users (id, name, email) 
            VALUES (1, 'Default User', 'user@example.com');
        `);

        console.log("[DB] Auto-migrations completed successfully");
    } catch(e) {
        console.error("[DB] Migration FAILED:", e);
    }
}

export default pool;
