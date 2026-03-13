"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const booking_controller_1 = require("./booking.controller");
const router = (0, express_1.Router)();
/*
POST /api/bookings
Create a booking
*/
router.post('/', booking_controller_1.createBookingHandler);
/*
GET /api/bookings?eventTypeId=1
Fetch bookings for an event type, sorted by start_time
*/
router.get('/', booking_controller_1.getBookingsByEventTypeHandler);
/*
PATCH /api/bookings/:id/cancel
Cancel a booking (mark as cancelled)
*/
router.patch('/:id/cancel', booking_controller_1.cancelBookingHandler);
exports.default = router;
