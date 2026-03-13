import type { Express } from 'express';
import eventTypeRouter from '../modules/eventTypes/eventType.routes';
import availabilityRouter from '../modules/availability/availability.routes';
import bookingRouter from '../modules/bookings/booking.routes';
import slotsRouter from '../modules/slots/slots.routes';

export const registerRoutes = (app: Express): void => {
  app.use('/api/event-types', eventTypeRouter);
  app.use('/api/availability', availabilityRouter);
  app.use('/api/bookings', bookingRouter);
  app.use('/api/slots', slotsRouter);
};