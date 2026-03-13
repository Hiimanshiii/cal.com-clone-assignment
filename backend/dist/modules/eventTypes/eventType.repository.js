"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEventType = exports.updateEventType = exports.getEventTypeBySlug = exports.getEventTypesByUser = exports.createEventType = void 0;
const db_1 = require("../../db");
const TABLE_NAME = 'event_types';
const mapRowToEventType = (row) => ({
    id: Number(row.id),
    user_id: Number(row.user_id),
    title: String(row.title),
    description: row.description ?? null,
    duration_minutes: Number(row.duration_minutes),
    slug: String(row.slug),
    created_at: row.created_at instanceof Date ? row.created_at : new Date(row.created_at),
});
const getEventTypeByIdInternal = async (id) => {
    const [rows] = await db_1.pool.query(`SELECT id, user_id, title, description, duration_minutes, slug, created_at
     FROM ${TABLE_NAME}
     WHERE id = ?`, [id]);
    if (rows.length === 0) {
        return null;
    }
    return mapRowToEventType(rows[0]);
};
const createEventType = async (data) => {
    const [result] = await db_1.pool.execute(`INSERT INTO ${TABLE_NAME}
      (user_id, title, description, duration_minutes, slug)
     VALUES (?, ?, ?, ?, ?)`, [
        data.user_id,
        data.title,
        data.description ?? null,
        data.duration_minutes,
        data.slug,
    ]);
    const insertedId = result.insertId;
    const created = await getEventTypeByIdInternal(insertedId);
    if (!created) {
        throw new Error('Failed to load created event type');
    }
    return created;
};
exports.createEventType = createEventType;
const getEventTypesByUser = async (userId) => {
    const [rows] = await db_1.pool.query(`SELECT id, user_id, title, description, duration_minutes, slug, created_at
     FROM ${TABLE_NAME}
     WHERE user_id = ?
     ORDER BY created_at DESC`, [userId]);
    return rows.map(mapRowToEventType);
};
exports.getEventTypesByUser = getEventTypesByUser;
const getEventTypeBySlug = async (slug) => {
    const [rows] = await db_1.pool.query(`SELECT id, user_id, title, description, duration_minutes, slug, created_at
     FROM ${TABLE_NAME}
     WHERE slug = ?
     LIMIT 1`, [slug]);
    if (rows.length === 0) {
        return null;
    }
    return mapRowToEventType(rows[0]);
};
exports.getEventTypeBySlug = getEventTypeBySlug;
const updateEventType = async (id, updates) => {
    const fields = [];
    const values = [];
    if (updates.title !== undefined) {
        fields.push('title = ?');
        values.push(updates.title);
    }
    if (updates.description !== undefined) {
        fields.push('description = ?');
        values.push(updates.description);
    }
    if (updates.duration_minutes !== undefined) {
        fields.push('duration_minutes = ?');
        values.push(updates.duration_minutes);
    }
    if (updates.slug !== undefined) {
        fields.push('slug = ?');
        values.push(updates.slug);
    }
    if (fields.length === 0) {
        return getEventTypeByIdInternal(id);
    }
    values.push(id);
    const [result] = await db_1.pool.execute(`UPDATE ${TABLE_NAME}
     SET ${fields.join(', ')}
     WHERE id = ?`, values);
    if (result.affectedRows === 0) {
        return null;
    }
    return getEventTypeByIdInternal(id);
};
exports.updateEventType = updateEventType;
const deleteEventType = async (id) => {
    const [result] = await db_1.pool.execute(`DELETE FROM ${TABLE_NAME} WHERE id = ?`, [id]);
    return result.affectedRows > 0;
};
exports.deleteEventType = deleteEventType;
