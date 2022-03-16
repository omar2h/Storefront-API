"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const orders_controller_1 = require("../controllers/orders.controller");
const auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
router
    .route('/')
    .get(auth_middleware_1.default, orders_controller_1.getAllOrders)
    .post(auth_middleware_1.default, orders_controller_1.createOrder);
router.route('/:id').get(auth_middleware_1.default, orders_controller_1.getOrder);
router.route('/:id/products').post(auth_middleware_1.default, orders_controller_1.addProduct);
router.route('/showUserOrders/:id').get(auth_middleware_1.default, orders_controller_1.getUserOrders);
exports.default = router;
