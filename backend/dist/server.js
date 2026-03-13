"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const PORT = 5000;
app_1.default.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log('Server running on http://localhost:5000');
});
