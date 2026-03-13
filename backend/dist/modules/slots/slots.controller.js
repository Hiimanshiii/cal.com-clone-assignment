"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSlotsHandler = void 0;
const slots_service_1 = require("./slots.service");
const getSlotsHandler = async (req, res, next) => {
    try {
        const { slug } = req.params;
        const { date } = req.query;
        if (!slug) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'Slug is required',
            });
        }
        if (!date || typeof date !== 'string') {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'date query parameter (YYYY-MM-DD) is required',
            });
        }
        const requestDate = new Date(date);
        if (Number.isNaN(requestDate.getTime())) {
            return res.status(400).json({
                success: false,
                data: null,
                message: 'Invalid date format, expected YYYY-MM-DD',
            });
        }
        const slots = await (0, slots_service_1.getAvailableSlotsBySlugAndDate)(slug, date);
        if (slots === null) {
            return res.status(404).json({
                success: false,
                data: null,
                message: 'Event type not found',
            });
        }
        return res.json({
            success: true,
            data: slots,
        });
    }
    catch (error) {
        next(error);
    }
};
exports.getSlotsHandler = getSlotsHandler;
