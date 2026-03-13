import { pool } from '../../db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export interface Availability {
  id: number;
  user_id: number;
  day_of_week: number;
  start_time: string;
  end_time: string;
  created_at: Date;
}

export type CreateAvailabilityInput = Omit<Availability, 'id' | 'created_at'>;

export type UpdateAvailabilityInput = Partial<
  Pick<Availability, 'day_of_week' | 'start_time' | 'end_time'>
>;

const TABLE_NAME = 'availability';

const mapRowToAvailability = (row: RowDataPacket): Availability => ({
  id: Number(row.id),
  user_id: Number(row.user_id),
  day_of_week: Number(row.day_of_week),
  start_time: String(row.start_time),
  end_time: String(row.end_time),
  created_at: row.created_at instanceof Date ? row.created_at : new Date(row.created_at),
});

const getAvailabilityByIdInternal = async (
  id: number,
): Promise<Availability | null> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT id, user_id, day_of_week, start_time, end_time, created_at
     FROM ${TABLE_NAME}
     WHERE id = ?`,
    [id] as any[],
  );

  if (rows.length === 0) {
    return null;
  }

  return mapRowToAvailability(rows[0]);
};

export const createAvailability = async (
  data: CreateAvailabilityInput,
): Promise<Availability> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO ${TABLE_NAME}
      (user_id, day_of_week, start_time, end_time)
     VALUES (?, ?, ?, ?)`,
    [data.user_id, data.day_of_week, data.start_time, data.end_time] as any[],
  );

  const insertedId = result.insertId;
  const created = await getAvailabilityByIdInternal(insertedId);

  if (!created) {
    throw new Error('Failed to load created availability');
  }

  return created;
};

export const getAvailabilityByUser = async (
  userId: number,
): Promise<Availability[]> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT id, user_id, day_of_week, start_time, end_time, created_at
     FROM ${TABLE_NAME}
     WHERE user_id = ?
     ORDER BY day_of_week ASC, start_time ASC`,
    [userId] as any[],
  );

  return rows.map(mapRowToAvailability);
};

export const updateAvailability = async (
  id: number,
  updates: UpdateAvailabilityInput,
): Promise<Availability | null> => {
  const fields: string[] = [];
  const values: unknown[] = [];

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

  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE ${TABLE_NAME}
     SET ${fields.join(', ')}
     WHERE id = ?`,
    values as any[],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return getAvailabilityByIdInternal(id);
};

export const deleteAvailability = async (id: number): Promise<boolean> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `DELETE FROM ${TABLE_NAME} WHERE id = ?`,
    [id] as any[],
  );

  return result.affectedRows > 0;
};

