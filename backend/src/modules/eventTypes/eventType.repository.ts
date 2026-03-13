import { pool } from '../../db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export interface EventType {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  duration_minutes: number;
  slug: string;
  created_at: Date;
}

export type CreateEventTypeInput = Omit<EventType, 'id' | 'created_at'>;

export type UpdateEventTypeInput = Partial<
  Pick<EventType, 'title' | 'description' | 'duration_minutes' | 'slug'>
>;

const TABLE_NAME = 'event_types';

const mapRowToEventType = (row: RowDataPacket): EventType => ({
  id: Number(row.id),
  user_id: Number(row.user_id),
  title: String(row.title),
  description: row.description ?? null,
  duration_minutes: Number(row.duration_minutes),
  slug: String(row.slug),
  created_at: row.created_at instanceof Date ? row.created_at : new Date(row.created_at),
});

const getEventTypeByIdInternal = async (id: number): Promise<EventType | null> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT id, user_id, title, description, duration_minutes, slug, created_at
     FROM ${TABLE_NAME}
     WHERE id = ?`,
    [id] as any[],
  );

  if (rows.length === 0) {
    return null;
  }

  return mapRowToEventType(rows[0]);
};

export const createEventType = async (
  data: CreateEventTypeInput,
): Promise<EventType> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO ${TABLE_NAME}
      (user_id, title, description, duration_minutes, slug)
     VALUES (?, ?, ?, ?, ?)`,
    [
      data.user_id,
      data.title,
      data.description ?? null,
      data.duration_minutes,
      data.slug,
    ] as any[],
  );

  const insertedId = result.insertId;
  const created = await getEventTypeByIdInternal(insertedId);

  if (!created) {
    throw new Error('Failed to load created event type');
  }

  return created;
};

export const getEventTypesByUser = async (
  userId: number,
): Promise<EventType[]> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT id, user_id, title, description, duration_minutes, slug, created_at
     FROM ${TABLE_NAME}
     WHERE user_id = ?
     ORDER BY created_at DESC`,
    [userId] as any[],
  );

  return rows.map(mapRowToEventType);
};

export const getEventTypeBySlug = async (
  slug: string,
): Promise<EventType | null> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT id, user_id, title, description, duration_minutes, slug, created_at
     FROM ${TABLE_NAME}
     WHERE slug = ?
     LIMIT 1`,
    [slug] as any[],
  );

  if (rows.length === 0) {
    return null;
  }

  return mapRowToEventType(rows[0]);
};

export const updateEventType = async (
  id: number,
  updates: UpdateEventTypeInput,
): Promise<EventType | null> => {
  const fields: string[] = [];
  const values: unknown[] = [];

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

  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE ${TABLE_NAME}
     SET ${fields.join(', ')}
     WHERE id = ?`,
    values as any[],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return getEventTypeByIdInternal(id);
};

export const deleteEventType = async (id: number): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `DELETE FROM ${TABLE_NAME} WHERE id = ?`,
    [id] as any[],
  );

  return result.affectedRows > 0;
};

