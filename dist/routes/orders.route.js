"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = (0, express_1["default"])();
var orders_controller_1 = require("../controllers/orders.controller");
router.route('/:id').get(orders_controller_1.getAllOrders);
exports["default"] = router;
