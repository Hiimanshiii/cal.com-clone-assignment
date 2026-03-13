"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateTimeSlots = void 0;
const parseTimeToDate = (time) => {
    const [hoursStr, minutesStr] = time.split(':');
    const hours = Number(hoursStr);
    const minutes = Number(minutesStr);
    if (Number.isNaN(hours) ||
        Number.isNaN(minutes) ||
        hours < 0 ||
        hours > 23 ||
        minutes < 0 ||
        minutes > 59) {
        throw new Error(`Invalid time format: "${time}". Expected HH:MM.`);
    }
    const date = new Date();
    date.setHours(hours, minutes, 0, 0);
    return date;
};
const formatDateToTime = (date) => {
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const hoursStr = hours.toString().padStart(2, '0');
    const minutesStr = minutes.toString().padStart(2, '0');
    return `${hoursStr}:${minutesStr}`;
};
const generateTimeSlots = (start_time, end_time, duration_minutes) => {
    if (duration_minutes <= 0) {
        throw new Error('duration_minutes must be greater than 0');
    }
    const start = parseTimeToDate(start_time);
    const end = parseTimeToDate(end_time);
    if (start.getTime() >= end.getTime()) {
        throw new Error('end_time must be after start_time');
    }
    const slots = [];
    const slotLengthMs = duration_minutes * 60 * 1000;
    for (let current = new Date(start.getTime()); current.getTime() + slotLengthMs <= end.getTime();) {
        slots.push(formatDateToTime(current));
        current = new Date(current.getTime() + slotLengthMs);
    }
    return slots;
};
exports.generateTimeSlots = generateTimeSlots;
