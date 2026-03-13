"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAvailability = exports.updateAvailability = exports.getAvailabilityByUser = exports.createAvailability = void 0;
const db_1 = require("../../db");
const TABLE_NAME = 'availability';
const mapRowToAvailability = (row) => ({
    id: Number(row.id),
    user_id: Number(row.user_id),
    day_of_week: Number(row.day_of_week),
    start_time: String(row.start_time),
    end_time: String(row.end_time),
    created_at: row.created_at instanceof Date ? row.created_at : new Date(row.created_at),
});
const getAvailabilityByIdInternal = async (id) => {
    const [rows] = await db_1.pool.query(`SELECT id, user_id, day_of_week, start_time, end_time, created_at
     FROM ${TABLE_NAME}
     WHERE id = ?`, [id]);
    if (rows.length === 0) {
        return null;
    }
    return mapRowToAvailability(rows[0]);
};
const createAvailability = async (data) => {
    const [result] = await db_1.pool.execute(`INSERT INTO ${TABLE_NAME}
      (user_id, day_of_week, start_time, end_time)
     VALUES (?, ?, ?, ?)`, [data.user_id, data.day_of_week, data.start_time, data.end_time]);
    const insertedId = result.insertId;
    const created = await getAvailabilityByIdInternal(insertedId);
    if (!created) {
        throw new Error('Failed to load created availability');
    }
    return created;
};
exports.createAvailability = createAvailability;
const getAvailabilityByUser = async (userId) => {
    const [rows] = await db_1.pool.query(`SELECT id, user_id, day_of_week, start_time, end_time, created_at
     FROM ${TABLE_NAME}
     WHERE user_id = ?
     ORDER BY day_of_week ASC, start_time ASC`, [userId]);
    return rows.map(mapRowToAvailability);
};
exports.getAvailabilityByUser = getAvailabilityByUser;
const updateAvailability = async (id, updates) => {
    const fields = [];
    const values = [];
    if (updates.day_of_week !== undefined) {
        fields.push('day_of_week = ?');
        values.push(updates.day_of_week);
    }
    if (updates.start_time !== undefined) {
        fields.push('start_time = ?');
        values.push(updates.start_time);
    }
    if (updates.end_time !== undefined) {
        fields.push('end_time = ?');
        values.push(updates.end_time);
    }
    if (fields.length === 0) {
        return getAvailabilityByIdInternal(id);
    }
    values.push(id);
    const [result] = await db_1.pool.execute(`UPDATE ${TABLE_NAME}
     SET ${fields.join(', ')}
     WHERE id = ?`, values);
    if (result.affectedRows === 0) {
        return null;
    }
    return getAvailabilityByIdInternal(id);
};
exports.updateAvailability = updateAvailability;
const deleteAvailability = async (id) => {
    const [result] = await db_1.pool.execute(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, [id]);
    return result.affectedRows > 0;
};
exports.deleteAvailability = deleteAvailability;
