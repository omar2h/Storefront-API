"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createOrder = exports.getAllOrders = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const orderModel = new order_model_1.default();
const getAllOrders = async (req, res) => {
    const orders = await orderModel.index(req.params.id, req.query.status);
    res.json({ orders });
};
exports.getAllOrders = getAllOrders;
const createOrder = async (req, res) => {
    const order = await orderModel.create(req.body);
    console.log(order);
    res.json({ order });
};
exports.createOrder = createOrder;
