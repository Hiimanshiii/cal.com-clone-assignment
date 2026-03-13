import { Router } from 'express';

import {
  getEventTypesHandler,
  getEventTypeBySlugHandler,
  createEventTypeHandler,
  updateEventTypeHandler,
  deleteEventTypeHandler,
} from './eventType.controller';

const router = Router();

/*
GET all event types for user
Example: /api/event-types?userId=1
*/
router.get('/', getEventTypesHandler);

/*
GET event type by slug
Example: /api/event-types/60-min-meeting
*/
router.get('/:slug', getEventTypeBySlugHandler);

/*
Create event type
*/
router.post('/', createEventTypeHandler);

/*
Update event type
*/
router.put('/:id', updateEventTypeHandler);

/*
Delete event type
*/
router.delete('/:id', deleteEventTypeHandler);

export default router;