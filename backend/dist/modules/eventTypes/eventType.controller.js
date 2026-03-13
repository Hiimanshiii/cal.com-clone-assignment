"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEventTypeHandler = exports.updateEventTypeHandler = exports.createEventTypeHandler = exports.getEventTypeBySlugHandler = exports.getEventTypesHandler = void 0;
const eventType_service_1 = require("./eventType.service");
const getEventTypesHandler = async (req, res, next) => {
    try {
        const userId = Number(req.user?.id ?? req.params.userId ?? req.query.userId);
        if (!userId || Number.isNaN(userId)) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'User id is required',
            });
        }
        const eventTypes = await (0, eventType_service_1.getEventTypesByUser)(userId);
        return res.json({
            success: true,
            data: eventTypes,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getEventTypesHandler = getEventTypesHandler;
const getEventTypeBySlugHandler = async (req, res, next) => {
    try {
        const { slug } = req.params;
        if (!slug) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'Slug is required',
            });
        }
        const eventType = await (0, eventType_service_1.getEventTypeBySlug)(slug);
        if (!eventType) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Event type not found',
            });
        }
        return res.json({
            success: true,
            data: eventType,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getEventTypeBySlugHandler = getEventTypeBySlugHandler;
const createEventTypeHandler = async (req, res, next) => {
    try {
        const userId = Number(req.user?.id ?? req.body.user_id);
        if (!userId || Number.isNaN(userId)) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'User id is required',
            });
        }
        const { title, description, duration_minutes, slug } = req.body;
        if (!title || !duration_minutes || !slug) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'title, duration_minutes and slug are required',
            });
        }
        const created = await (0, eventType_service_1.createEventType)({
            user_id: userId,
            title,
            description: description ?? null,
            duration_minutes: Number(duration_minutes),
            slug,
        });
        return res.status(201).json({
            success: true,
            data: created,
        });
    }
    catch (error) {
        if (error instanceof eventType_service_1.DuplicateSlugError) {
            return res.status(409).json({
                success: false,
                data: null,
                message: error.message,
            });
        }
        next(error);
    }
};
exports.createEventTypeHandler = createEventTypeHandler;
const updateEventTypeHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!id || Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'Valid event type id is required',
            });
        }
        const { title, description, duration_minutes, slug } = req.body;
        const updated = await (0, eventType_service_1.updateEventType)(id, {
            title,
            description,
            duration_minutes: duration_minutes !== undefined ? Number(duration_minutes) : undefined,
            slug,
        });
        if (!updated) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Event type not found',
            });
        }
        return res.json({
            success: true,
            data: updated,
        });
    }
    catch (error) {
        if (error instanceof eventType_service_1.DuplicateSlugError) {
            return res.status(409).json({
                success: false,
                data: null,
                message: error.message,
            });
        }
        next(error);
    }
};
exports.updateEventTypeHandler = updateEventTypeHandler;
const deleteEventTypeHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!id || Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'Valid event type id is required',
            });
        }
        const deleted = await (0, eventType_service_1.deleteEventType)(id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Event type not found',
            });
        }
        return res.json({
            success: true,
            data: { deleted: true },
        });
    }
    catch (error) {
        next(error);
    }
};
exports.deleteEventTypeHandler = deleteEventTypeHandler;
