"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const dashboard_controller_1 = require("../controllers/dashboard.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
router.route('/get-orders-products').get(auth_middleware_1.default, dashboard_controller_1.getAllOrders);
router.route('/get-orders-products/:id').get(auth_middleware_1.default, dashboard_controller_1.getOrder);
router.route('/user-orders/:id').get(auth_middleware_1.default, dashboard_controller_1.getUserOrders);
exports.default = router;
