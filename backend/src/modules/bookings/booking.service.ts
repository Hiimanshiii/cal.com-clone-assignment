import {
  createBooking as createBookingRepo,
  getBookingsByEventType as getBookingsByEventTypeRepo,
  getBookingsByDate as getBookingsByDateRepo,
  updateBookingStatus as updateBookingStatusRepo,
  type Booking,
  type CreateBookingInput,
} from './booking.repository';

export class DoubleBookingError extends Error {
  constructor(message = 'Time slot is already booked') {
    super(message);
    this.name = 'DoubleBookingError';
  }
}

const toDate = (value: Date | string): Date => {
  return value instanceof Date ? value : new Date(value);
};

const isOverlapping = (
  startA: Date,
  endA: Date,
  startB: Date,
  endB: Date,
): boolean => {
  return startA < endB && endA > startB;
};

/* ✅ convert to MySQL datetime format using LOCAL time */
const formatMySQLDate = (date: Date): string => {
  const pad = (n: number) => String(n).padStart(2, '0');

  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(
    date.getDate(),
  )} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(
    date.getSeconds(),
  )}`;
};

export const createBooking = async (
  data: CreateBookingInput,
): Promise<Booking> => {
  const start = toDate(data.start_time);
  const end = toDate(data.end_time);

  if (start >= end) {
    throw new Error('Booking end_time must be after start_time');
  }

  const existingForEventType = await getBookingsByEventTypeRepo(
    data.event_type_id,
  );

  const hasConflict = existingForEventType.some((booking) => {
    const existingStart = toDate(booking.start_time);
    const existingEnd = toDate(booking.end_time);
    return isOverlapping(start, end, existingStart, existingEnd);
  });

  if (hasConflict) {
    throw new DoubleBookingError();
  }

  /* ✅ format dates before saving to MySQL */
  const formattedData: CreateBookingInput = {
    ...data,
    start_time: formatMySQLDate(start),
    end_time: formatMySQLDate(end),
  };

  return createBookingRepo(formattedData);
};

export const getBookingsByEventType = async (
  eventTypeId: number,
): Promise<Booking[]> => {
  return getBookingsByEventTypeRepo(eventTypeId);
};

export const getBookingsByDate = async (
  eventTypeId: number,
  date: string,
): Promise<Booking[]> => {
  return getBookingsByDateRepo(eventTypeId, date);
};

export const cancelBooking = async (id: number): Promise<Booking | null> => {
  return updateBookingStatusRepo(id, 'cancelled');
};