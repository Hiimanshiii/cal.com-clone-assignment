import { createPool } from 'mysql2/promise';

export const pool = createPool({
  host: 'localhost',
  user: 'root',
  password: '902496',
  database: 'calcom',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
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
