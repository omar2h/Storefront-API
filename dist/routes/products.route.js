"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = (0, express_1["default"])();
var products_controller_1 = require("../controllers/products.controller");
router.route('/').get(products_controller_1.getAllProducts).post(products_controller_1.createProduct);
router.route('/:id').get(products_controller_1.getProduct);
exports["default"] = router;
