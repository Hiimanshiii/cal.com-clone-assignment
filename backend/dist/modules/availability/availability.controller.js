"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteAvailabilityHandler = exports.updateAvailabilityHandler = exports.createAvailabilityHandler = exports.getAvailabilityHandler = void 0;
const availability_service_1 = require("./availability.service");
const getAvailabilityHandler = async (req, res, next) => {
    try {
        const userId = Number(req.user?.id ?? req.params.userId ?? req.query.userId);
        if (!userId || Number.isNaN(userId)) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'User id is required',
            });
        }
        const availability = await (0, availability_service_1.getAvailabilityByUser)(userId);
        return res.json({
            success: true,
            data: availability,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getAvailabilityHandler = getAvailabilityHandler;
const createAvailabilityHandler = async (req, res, next) => {
    try {
        const userId = Number(req.user?.id ?? req.body.user_id);
        if (!userId || Number.isNaN(userId)) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'User id is required',
            });
        }
        const { day_of_week, start_time, end_time } = req.body;
        if (day_of_week === undefined ||
            start_time === undefined ||
            end_time === undefined) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'day_of_week, start_time and end_time are required',
            });
        }
        const created = await (0, availability_service_1.createAvailability)({
            user_id: userId,
            day_of_week: Number(day_of_week),
            start_time,
            end_time,
        });
        return res.status(201).json({
            success: true,
            data: created,
        });
    }
    catch (error) {
        if (error instanceof availability_service_1.InvalidTimeRangeError) {
            return res.status(400).json({
                success: false,
                data: null,
                message: error.message,
            });
        }
        next(error);
    }
};
exports.createAvailabilityHandler = createAvailabilityHandler;
const updateAvailabilityHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!id || Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'Valid availability id is required',
            });
        }
        const { day_of_week, start_time, end_time } = req.body;
        const updated = await (0, availability_service_1.updateAvailability)(id, {
            day_of_week: day_of_week !== undefined ? Number(day_of_week) : undefined,
            start_time,
            end_time,
        });
        if (!updated) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Availability not found',
            });
        }
        return res.json({
            success: true,
            data: updated,
        });
    }
    catch (error) {
        if (error instanceof availability_service_1.InvalidTimeRangeError) {
            return res.status(400).json({
                success: false,
                data: null,
                message: error.message,
            });
        }
        next(error);
    }
};
exports.updateAvailabilityHandler = updateAvailabilityHandler;
const deleteAvailabilityHandler = async (req, res, next) => {
    try {
        const id = Number(req.params.id);
        if (!id || Number.isNaN(id)) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'Valid availability id is required',
            });
        }
        const deleted = await (0, availability_service_1.deleteAvailability)(id);
        if (!deleted) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Availability not found',
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
exports.deleteAvailabilityHandler = deleteAvailabilityHandler;
