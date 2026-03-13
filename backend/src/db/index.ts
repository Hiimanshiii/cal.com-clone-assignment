import 'dotenv/config';
import { createPool } from 'mysql2/promise';

const dbConfig = process.env.DATABASE_URL || process.env.MYSQL_URL;

if (dbConfig) {
  console.log('[DB] Connecting using DATABASE_URL');
} else {
  console.log(`[DB] Connecting to host: ${process.env.DB_HOST || 'localhost'}`);
}

export const pool = createPool(dbConfig ? {
  uri: dbConfig,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: { rejectUnauthorized: false },
} : {
  host: process.env.DB_HOST ?? 'localhost',
  port: Number(process.env.DB_PORT ?? 3306),
  user: process.env.DB_USER ?? 'root',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? 'calcom',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: process.env.DB_HOST && process.env.DB_HOST !== 'localhost'
    ? { rejectUnauthorized: false }
    : undefined,
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
