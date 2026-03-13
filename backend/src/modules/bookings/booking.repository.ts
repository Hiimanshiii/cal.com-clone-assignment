import { pool } from '../../db';
import type { RowDataPacket, ResultSetHeader } from 'mysql2/promise';

export interface Booking {
  id: number;
  event_type_id: number;
  user_id: number;
  name: string;
  email: string;
  start_time: Date;
  end_time: Date;
  status: 'pending' | 'confirmed' | 'cancelled';
  custom_answers: Record<string, string> | null;
  created_at: Date;
}

export type CreateBookingInput = {
  event_type_id: number;
  user_id: number;
  name: string;
  email: string;
  start_time: Date | string;
  end_time: Date | string;
  status: 'pending' | 'confirmed' | 'cancelled';
  custom_answers: Record<string, string> | null;
};

const TABLE_NAME = 'bookings';

const mapRowToBooking = (row: RowDataPacket): Booking => ({
  id: Number(row.id),
  event_type_id: Number(row.event_type_id),
  user_id: Number(row.user_id),
  name: String(row.name),
  email: String(row.email),
  start_time: new Date(row.start_time),
  end_time: new Date(row.end_time),
  status: row.status as Booking['status'],
  custom_answers: typeof row.custom_answers === 'string' ? JSON.parse(row.custom_answers) : (row.custom_answers as Record<string, string> | null),
  created_at: new Date(row.created_at),
});

const getBookingByIdInternal = async (id: number): Promise<Booking | null> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM ${TABLE_NAME} WHERE id = ?`,
    [id] as any[],
  );

  if (rows.length === 0) return null;

  return mapRowToBooking(rows[0]);
};

export const createBooking = async (
  data: CreateBookingInput,
): Promise<Booking> => {
  // Check for conflicting bookings for the same event type
  const [conflictRows] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM ${TABLE_NAME}
     WHERE event_type_id = ?
       AND start_time < ?
       AND end_time > ?`,
    [data.event_type_id, data.end_time, data.start_time] as any[],
  );

  if (conflictRows.length > 0) {
    throw new Error('Slot already booked');
  }

  const [result] = await pool.execute<ResultSetHeader>(
    `INSERT INTO ${TABLE_NAME}
    (event_type_id, user_id, name, email, start_time, end_time, status, custom_answers)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [
      data.event_type_id,
      data.user_id,
      data.name,
      data.email,
      data.start_time,
      data.end_time,
      data.status,
      data.custom_answers ? JSON.stringify(data.custom_answers) : null,
    ] as any[],
  );

  const booking = await getBookingByIdInternal(result.insertId);

  if (!booking) throw new Error('Failed to load created booking');

  return booking;
};

export const getBookingsByEventType = async (
  eventTypeId: number,
): Promise<Booking[]> => {
  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM ${TABLE_NAME}
     WHERE event_type_id = ?
     ORDER BY start_time ASC`,
    [eventTypeId] as any[],
  );

  return rows.map(mapRowToBooking);
};

export const getBookingsByDate = async (
  eventTypeId: number,
  date: string,
): Promise<Booking[]> => {

  const [rows] = await pool.query<RowDataPacket[]>(
    `SELECT * FROM ${TABLE_NAME}
     WHERE event_type_id = ?
     AND DATE(start_time) = ?
     ORDER BY start_time ASC`,
    [eventTypeId, date] as any[],
  );

  return rows.map(mapRowToBooking);
};

export const updateBookingStatus = async (
  id: number,
  status: Booking['status'],
): Promise<Booking | null> => {
  const [result] = await pool.execute<ResultSetHeader>(
    `UPDATE ${TABLE_NAME}
     SET status = ?
     WHERE id = ?`,
    [status, id] as any[],
  );

  if (result.affectedRows === 0) {
    return null;
  }

  return getBookingByIdInternal(id);
};