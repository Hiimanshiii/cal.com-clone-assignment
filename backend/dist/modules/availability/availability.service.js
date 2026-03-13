"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InvalidTimeRangeError = exports.deleteAvailability = exports.updateAvailability = exports.getAvailabilityByUser = exports.createAvailability = void 0;
const availability_repository_1 = require("./availability.repository");
class InvalidTimeRangeError extends Error {
    constructor(message) {
        super(message);
        this.name = 'InvalidTimeRangeError';
    }
}
exports.InvalidTimeRangeError = InvalidTimeRangeError;
const isValidTimeFormat = (value) => {
    return /^([01]\d|2[0-3]):[0-5]\d$/.test(value);
};
const validateTimeRange = (start, end) => {
    if (!start || !end) {
        throw new InvalidTimeRangeError('start_time and end_time are required');
    }
    if (!isValidTimeFormat(start) || !isValidTimeFormat(end)) {
        throw new InvalidTimeRangeError('start_time and end_time must be in HH:MM format');
    }
    if (start >= end) {
        throw new InvalidTimeRangeError('end_time must be after start_time');
    }
};
const createAvailability = async (data) => {
    validateTimeRange(data.start_time, data.end_time);
    return (0, availability_repository_1.createAvailability)(data);
};
exports.createAvailability = createAvailability;
const getAvailabilityByUser = async (userId) => {
    return (0, availability_repository_1.getAvailabilityByUser)(userId);
};
exports.getAvailabilityByUser = getAvailabilityByUser;
const updateAvailability = async (id, updates) => {
    if (updates.start_time !== undefined || updates.end_time !== undefined) {
        // Use existing values when one of the times is omitted; the repository layer
        // will handle partial updates, so here we only validate when both are present.
        if (updates.start_time && updates.end_time) {
            validateTimeRange(updates.start_time, updates.end_time);
        }
    }
    return (0, availability_repository_1.updateAvailability)(id, updates);
};
exports.updateAvailability = updateAvailability;
const deleteAvailability = async (id) => {
    return (0, availability_repository_1.deleteAvailability)(id);
};
exports.deleteAvailability = deleteAvailability;
