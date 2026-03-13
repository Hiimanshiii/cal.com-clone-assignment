"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const routes_1 = require("./config/routes");
const error_middleware_1 = require("./middleware/error.middleware");
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get('/', (_req, res) => {
    res.send('API running');
});
app.get('/api/health', (_req, res) => {
    res.json({
        success: true,
        message: 'API running',
    });
});
(0, routes_1.registerRoutes)(app);
// Global error handler (must be after routes)
app.use(error_middleware_1.errorHandler);
exports.default = app;
