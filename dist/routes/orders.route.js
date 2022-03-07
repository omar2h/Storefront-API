"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const orders_controller_1 = require("../controllers/orders.controller");
router.route('/').post(orders_controller_1.createOrder);
router.route('/:id').get(orders_controller_1.getAllOrders);
router.route('/active/:id').get(orders_controller_1.getAllActiveOrders);
router.route('/complete/:id').get(orders_controller_1.getAllCompleteOrders);
exports.default = router;
