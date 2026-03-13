"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const eventType_controller_1 = require("./eventType.controller");
const router = (0, express_1.Router)();
/*
GET all event types for user
Example: /api/event-types?userId=1
*/
router.get('/', eventType_controller_1.getEventTypesHandler);
/*
GET event type by slug
Example: /api/event-types/60-min-meeting
*/
router.get('/:slug', eventType_controller_1.getEventTypeBySlugHandler);
/*
Create event type
*/
router.post('/', eventType_controller_1.createEventTypeHandler);
/*
Update event type
*/
router.put('/:id', eventType_controller_1.updateEventTypeHandler);
/*
Delete event type
*/
router.delete('/:id', eventType_controller_1.deleteEventTypeHandler);
exports.default = router;
