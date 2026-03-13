"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerRoutes = void 0;
const eventType_routes_1 = __importDefault(require("../modules/eventTypes/eventType.routes"));
const availability_routes_1 = __importDefault(require("../modules/availability/availability.routes"));
const booking_routes_1 = __importDefault(require("../modules/bookings/booking.routes"));
const slots_routes_1 = __importDefault(require("../modules/slots/slots.routes"));
const registerRoutes = (app) => {
    app.use('/api/event-types', eventType_routes_1.default);
    app.use('/api/availability', availability_routes_1.default);
    app.use('/api/bookings', booking_routes_1.default);
    app.use('/api/slots', slots_routes_1.default);
};
exports.registerRoutes = registerRoutes;
