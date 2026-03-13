"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelBookingHandler = exports.getBookingsByEventTypeHandler = exports.createBookingHandler = void 0;
const booking_service_1 = require("./booking.service");
const email_1 = require("../../utils/email");
const createBookingHandler = async (req, res) => {
    try {
        const { event_type_id, user_id, name, email, start_time, end_time, status, custom_answers, } = req.body;
        if (!event_type_id ||
            !user_id ||
            !name ||
            !email ||
            !start_time ||
            !end_time) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
            });
        }
        const start = new Date(start_time);
        const end = new Date(end_time);
        if (Number.isNaN(start.getTime()) || Number.isNaN(end.getTime())) {
            return res.status(400).json({
                success: false,
                message: 'Invalid datetime format',
            });
        }
        const booking = await (0, booking_service_1.createBooking)({
            event_type_id: Number(event_type_id),
            user_id: Number(user_id),
            name,
            email,
            start_time: start,
            end_time: end,
            status: status || 'confirmed',
            custom_answers: custom_answers || null,
        });
        // Fire & forget email
        (0, email_1.sendBookingConfirmation)(booking.email, booking.name, 'Meeting Scheduled', start.toLocaleString()).catch(e => console.error(e));
        return res.status(201).json({
            success: true,
            data: booking,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.createBookingHandler = createBookingHandler;
const getBookingsByEventTypeHandler = async (req, res) => {
    try {
        const { eventTypeId } = req.query;
        const id = Number(eventTypeId);
        if (!eventTypeId || Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'Valid eventTypeId query parameter is required',
            });
        }
        const bookings = await (0, booking_service_1.getBookingsByEventType)(id);
        return res.json({
            success: true,
            data: bookings,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.getBookingsByEventTypeHandler = getBookingsByEventTypeHandler;
const cancelBookingHandler = async (req, res) => {
    try {
        const id = Number(req.params.id);
        if (!id || Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                message: 'Valid booking id is required',
            });
        }
        const booking = await (0, booking_service_1.cancelBooking)(id);
        if (!booking) {
            return res.status(404).json({
                success: false,
                message: 'Booking not found',
            });
        }
        // Fire & forget email
        (0, email_1.sendBookingCancellation)(booking.email, booking.name, 'Meeting Canceled', new Date(booking.start_time).toLocaleString()).catch(e => console.error(e));
        return res.json({
            success: true,
            message: 'Booking cancelled',
            data: booking,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};
exports.cancelBookingHandler = cancelBookingHandler;
