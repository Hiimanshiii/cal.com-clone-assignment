"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAvailableSlotsBySlugAndDate = void 0;
const eventType_service_1 = require("../eventTypes/eventType.service");
const availability_service_1 = require("../availability/availability.service");
const booking_repository_1 = require("../bookings/booking.repository");
const slot_util_1 = require("../../utils/slot.util");
const formatDateToHHMM = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${hours}:${minutes}`;
};
const getAvailableSlotsBySlugAndDate = async (slug, date) => {
    const eventType = await (0, eventType_service_1.getEventTypeBySlug)(slug);
    if (!eventType) {
        return null;
    }
    const requestDate = new Date(date);
    const dayOfWeek = requestDate.getDay(); // 0-6, Sunday-Saturday
    const availability = await (0, availability_service_1.getAvailabilityByUser)(eventType.user_id);
    const dayAvailability = availability.filter((slot) => slot.day_of_week === dayOfWeek);
    if (dayAvailability.length === 0) {
        return [];
    }
    const duration = eventType.duration_minutes;
    const allSlots = new Set();
    for (const slot of dayAvailability) {
        const candidateTimes = (0, slot_util_1.generateTimeSlots)(slot.start_time, slot.end_time, duration);
        for (const time of candidateTimes) {
            allSlots.add(time);
        }
    }
    // 1) Fetch existing bookings for the event type and date
    const bookings = await (0, booking_repository_1.getBookingsByDate)(eventType.id, date);
    // 2) Extract start_time of each booking
    // 3) Convert those times to HH:MM format
    const bookedTimes = new Set(bookings
        .filter((b) => b.status !== 'cancelled')
        .map((b) => formatDateToHHMM(new Date(b.start_time))));
    // 4) Remove booked start times from generated slots array
    const available = Array.from(allSlots).filter((time) => !bookedTimes.has(time));
    return available.sort();
};
exports.getAvailableSlotsBySlugAndDate = getAvailableSlotsBySlugAndDate;
