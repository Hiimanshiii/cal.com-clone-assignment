"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEventType = exports.updateEventType = exports.getEventTypeBySlug = exports.getAllEventTypes = exports.getEventTypesByUser = exports.createEventType = exports.DuplicateSlugError = void 0;
const eventType_repository_1 = require("./eventType.repository");
class DuplicateSlugError extends Error {
    constructor(slug) {
        super(`Event type slug "${slug}" is already in use`);
        this.name = 'DuplicateSlugError';
    }
}
exports.DuplicateSlugError = DuplicateSlugError;
const createEventType = async (data) => {
    const existing = await (0, eventType_repository_1.getEventTypeBySlug)(data.slug);
    if (existing) {
        throw new DuplicateSlugError(data.slug);
    }
    return (0, eventType_repository_1.createEventType)(data);
};
exports.createEventType = createEventType;
const getEventTypesByUser = async (userId) => {
    return (0, eventType_repository_1.getEventTypesByUser)(userId);
};
exports.getEventTypesByUser = getEventTypesByUser;
// Backwards-compatible alias used elsewhere in the codebase
exports.getAllEventTypes = exports.getEventTypesByUser;
const getEventTypeBySlug = async (slug) => {
    return (0, eventType_repository_1.getEventTypeBySlug)(slug);
};
exports.getEventTypeBySlug = getEventTypeBySlug;
const updateEventType = async (id, updates) => {
    if (updates.slug) {
        const existing = await (0, eventType_repository_1.getEventTypeBySlug)(updates.slug);
        if (existing && existing.id !== id) {
            throw new DuplicateSlugError(updates.slug);
        }
    }
    return (0, eventType_repository_1.updateEventType)(id, updates);
};
exports.updateEventType = updateEventType;
const deleteEventType = async (id) => {
    return (0, eventType_repository_1.deleteEventType)(id);
};
exports.deleteEventType = deleteEventType;
