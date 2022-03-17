"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = (0, express_1["default"])();
var orders_controller_1 = require("../controllers/orders.controller");
var auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
router
    .route('/')
    .get(auth_middleware_1["default"], orders_controller_1.getAllOrders)
    .post(auth_middleware_1["default"], orders_controller_1.createOrder);
router.route('/:id').get(auth_middleware_1["default"], orders_controller_1.getOrder);
router.route('/:id/products').post(auth_middleware_1["default"], orders_controller_1.addProduct);
exports["default"] = router;
