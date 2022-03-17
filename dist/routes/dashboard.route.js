"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = (0, express_1["default"])();
var dashboard_controller_1 = require("../controllers/dashboard.controller");
var auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
router.route('/orders-products').get(auth_middleware_1["default"], dashboard_controller_1.getAllOrders);
router.route('/orders-products/:id').get(auth_middleware_1["default"], dashboard_controller_1.getOrder);
router.route('/user-orders/:id').get(auth_middleware_1["default"], dashboard_controller_1.getUserOrders);
exports["default"] = router;
