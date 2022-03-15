"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = exports.createOrder = exports.getOrdersSingleUser = exports.getAllOrders = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const errors_1 = __importDefault(require("../errors"));
const orderModel = new order_model_1.default();
const getAllOrders = async (req, res) => {
    const orders = await orderModel.index();
    res.json({ orders });
};
exports.getAllOrders = getAllOrders;
const getOrdersSingleUser = async (req, res) => {
    const orders = await orderModel.showAll(req.params.id, req.query.status);
    if (!orders)
        throw new errors_1.default.NotFoundError(`ID: ${req.params.id} doesn't exist`);
    res.json({ orders });
};
exports.getOrdersSingleUser = getOrdersSingleUser;
const createOrder = async (req, res) => {
    const order = await orderModel.create(req.body);
    if (!order)
        throw new errors_1.default.BadRequestError('Invalid order information');
    res.json({ order });
};
exports.createOrder = createOrder;
const addProduct = async (req, res) => {
    const orderId = req.params.id;
    const productId = req.body.productId;
    const quantity = parseInt(req.body.quantity);
    const addedProduct = await orderModel.addProduct(orderId, productId, quantity);
    res.json({ addedProduct });
};
exports.addProduct = addProduct;
