"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateBookingStatus = exports.getBookingsByDate = exports.getBookingsByEventType = exports.createBooking = void 0;
const db_1 = require("../../db");
const TABLE_NAME = 'bookings';
const mapRowToBooking = (row) => ({
    id: Number(row.id),
    event_type_id: Number(row.event_type_id),
    user_id: Number(row.user_id),
    name: String(row.name),
    email: String(row.email),
    start_time: new Date(row.start_time),
    end_time: new Date(row.end_time),
    status: row.status,
    custom_answers: typeof row.custom_answers === 'string' ? JSON.parse(row.custom_answers) : row.custom_answers,
    created_at: new Date(row.created_at),
});
const getBookingByIdInternal = async (id) => {
    const [rows] = await db_1.pool.query(`SELECT * FROM ${TABLE_NAME} WHERE id = ?`, [id]);
    if (rows.length === 0)
        return null;
    return mapRowToBooking(rows[0]);
};
const createBooking = async (data) => {
    // Check for conflicting bookings for the same event type
    const [conflictRows] = await db_1.pool.query(`SELECT * FROM ${TABLE_NAME}
     WHERE event_type_id = ?
       AND start_time < ?
       AND end_time > ?`, [data.event_type_id, data.end_time, data.start_time]);
    if (conflictRows.length > 0) {
        throw new Error('Slot already booked');
    }
    const [result] = await db_1.pool.execute(`INSERT INTO ${TABLE_NAME}
    (event_type_id, user_id, name, email, start_time, end_time, status, custom_answers)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`, [
        data.event_type_id,
        data.user_id,
        data.name,
        data.email,
        data.start_time,
        data.end_time,
        data.status,
        data.custom_answers ? JSON.stringify(data.custom_answers) : null,
    ]);
    const booking = await getBookingByIdInternal(result.insertId);
    if (!booking)
        throw new Error('Failed to load created booking');
    return booking;
};
exports.createBooking = createBooking;
const getBookingsByEventType = async (eventTypeId) => {
    const [rows] = await db_1.pool.query(`SELECT * FROM ${TABLE_NAME}
     WHERE event_type_id = ?
     ORDER BY start_time ASC`, [eventTypeId]);
    return rows.map(mapRowToBooking);
};
exports.getBookingsByEventType = getBookingsByEventType;
const getBookingsByDate = async (eventTypeId, date) => {
    const [rows] = await db_1.pool.query(`SELECT * FROM ${TABLE_NAME}
     WHERE event_type_id = ?
     AND DATE(start_time) = ?
     ORDER BY start_time ASC`, [eventTypeId, date]);
    return rows.map(mapRowToBooking);
};
exports.getBookingsByDate = getBookingsByDate;
const updateBookingStatus = async (id, status) => {
    const [result] = await db_1.pool.execute(`UPDATE ${TABLE_NAME}
     SET status = ?
     WHERE id = ?`, [status, id]);
    if (result.affectedRows === 0) {
        return null;
    }
    return getBookingByIdInternal(id);
};
exports.updateBookingStatus = updateBookingStatus;
