"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.addProduct = exports.createOrder = exports.getOrder = exports.getAllOrders = void 0;
const order_model_1 = __importDefault(require("../models/order.model"));
const errors_1 = __importDefault(require("../errors"));
const orderModel = new order_model_1.default();
const getAllOrders = async (req, res) => {
    try {
        const orders = await orderModel.index();
        res.json({ orders });
    }
    catch (err) {
        throw new Error();
    }
};
exports.getAllOrders = getAllOrders;
const getOrder = async (req, res) => {
    try {
        const order = await orderModel.show(req.params.id);
        if (!order)
            throw new errors_1.default.NotFoundError(`Order with ID: ${req.params.id} doesn't exist`);
        res.json({ order });
    }
    catch (err) {
        throw new Error();
    }
};
exports.getOrder = getOrder;
const createOrder = async (req, res) => {
    try {
        const order = await orderModel.create(req.body);
        if (!order)
            throw new errors_1.default.BadRequestError('Invalid order information');
        res.json({ order });
    }
    catch (err) {
        throw new Error();
    }
};
exports.createOrder = createOrder;
const addProduct = async (req, res) => {
    try {
        const orderId = req.params.id;
        const productId = req.body.productId;
        const quantity = parseInt(req.body.quantity);
        if (!orderId || !productId || !quantity)
            throw new errors_1.default.BadRequestError('Please provide order id, product id and quantity');
        const addedProduct = await orderModel.addProduct(orderId, productId, quantity);
        res.json({ addedProduct });
    }
    catch (err) {
        throw new Error();
    }
};
exports.addProduct = addProduct;
