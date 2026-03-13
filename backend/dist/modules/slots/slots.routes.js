"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const slots_controller_1 = require("./slots.controller");
const router = (0, express_1.Router)();
router.get('/:slug', slots_controller_1.getSlotsHandler);
exports.default = router;
