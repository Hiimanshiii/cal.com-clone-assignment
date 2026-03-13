import { Router } from 'express';
import {
  createBookingHandler,
  getBookingsByEventTypeHandler,
  cancelBookingHandler,
} from './booking.controller';

const router = Router();

/*
POST /api/bookings
Create a booking
*/
router.post('/', createBookingHandler);

/*
GET /api/bookings?eventTypeId=1
Fetch bookings for an event type, sorted by start_time
*/
router.get('/', getBookingsByEventTypeHandler);

/*
PATCH /api/bookings/:id/cancel
Cancel a booking (mark as cancelled)
*/
router.patch('/:id/cancel', cancelBookingHandler);

export default router;