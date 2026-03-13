"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runMigration = exports.pool = void 0;
const promise_1 = require("mysql2/promise");
exports.pool = (0, promise_1.createPool)({
    host: 'localhost',
    user: 'root',
    password: '902496',
    database: 'calcom',
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
});
const runMigration = async () => {
    try {
        await exports.pool.query(`ALTER TABLE bookings ADD COLUMN custom_answers JSON NULL;`);
        console.log("Migration successful");
    }
    catch (e) {
        console.log("Migration failed or already applied", e);
    }
};
exports.runMigration = runMigration;
exports.default = exports.pool;
