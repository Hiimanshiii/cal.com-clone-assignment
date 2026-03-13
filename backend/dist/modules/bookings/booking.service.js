"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBooking = exports.getBookingsByDate = exports.getBookingsByEventType = exports.createBooking = exports.DoubleBookingError = void 0;
const booking_repository_1 = require("./booking.repository");
class DoubleBookingError extends Error {
    constructor(message = 'Time slot is already booked') {
        super(message);
        this.name = 'DoubleBookingError';
    }
}
exports.DoubleBookingError = DoubleBookingError;
const toDate = (value) => {
    return value instanceof Date ? value : new Date(value);
};
const isOverlapping = (startA, endA, startB, endB) => {
    return startA < endB && endA > startB;
};
/* ✅ convert to MySQL datetime format using LOCAL time */
const formatMySQLDate = (date) => {
    const pad = (n) => String(n).padStart(2, '0');
    return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
};
const createBooking = async (data) => {
    const start = toDate(data.start_time);
    const end = toDate(data.end_time);
    if (start >= end) {
        throw new Error('Booking end_time must be after start_time');
    }
    const existingForEventType = await (0, booking_repository_1.getBookingsByEventType)(data.event_type_id);
    const hasConflict = existingForEventType.some((booking) => {
        const existingStart = toDate(booking.start_time);
        const existingEnd = toDate(booking.end_time);
        return isOverlapping(start, end, existingStart, existingEnd);
    });
    if (hasConflict) {
        throw new DoubleBookingError();
    }
    /* ✅ format dates before saving to MySQL */
    const formattedData = {
        ...data,
        start_time: formatMySQLDate(start),
        end_time: formatMySQLDate(end),
    };
    return (0, booking_repository_1.createBooking)(formattedData);
};
exports.createBooking = createBooking;
const getBookingsByEventType = async (eventTypeId) => {
    return (0, booking_repository_1.getBookingsByEventType)(eventTypeId);
};
exports.getBookingsByEventType = getBookingsByEventType;
const getBookingsByDate = async (eventTypeId, date) => {
    return (0, booking_repository_1.getBookingsByDate)(eventTypeId, date);
};
exports.getBookingsByDate = getBookingsByDate;
const cancelBooking = async (id) => {
    return (0, booking_repository_1.updateBookingStatus)(id, 'cancelled');
};
exports.cancelBooking = cancelBooking;
