"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = (0, express_1.default)();
const products_controller_1 = require("../controllers/products.controller");
router.route('/').get(products_controller_1.getAllProducts).post(products_controller_1.createProduct);
router.route('/:id').get(products_controller_1.getProduct);
exports.default = router;
