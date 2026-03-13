"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
// Global error handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const errorHandler = (err, _req, res, next) => {
    if (res.headersSent) {
        return next(err);
    }
    const status = err.status || 500;
    return res.status(status).json({
        success: false,
        message: err.message || 'Internal server error',
    });
};
exports.errorHandler = errorHandler;
