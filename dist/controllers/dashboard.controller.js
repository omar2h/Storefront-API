"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserOrders = exports.getOrder = exports.getAllOrders = void 0;
const dashboard_service_1 = __importDefault(require("../services/dashboard.service"));
const errors_1 = __importDefault(require("../errors"));
const dashboard = new dashboard_service_1.default();
const getAllOrders = async (req, res) => {
    try {
        const orders = await dashboard.allOrdersWithProducts();
        res.json({ orders });
    }
    catch (err) {
        throw new Error();
    }
};
exports.getAllOrders = getAllOrders;
const getOrder = async (req, res) => {
    try {
        const order = await dashboard.singleOrderWithProducts(req.params.id);
        if (!order)
            throw new errors_1.default.NotFoundError(`Order with ID: ${req.params.id} doesn't exist`);
        res.json({ order });
    }
    catch (err) {
        throw new Error();
    }
};
exports.getOrder = getOrder;
const getUserOrders = async (req, res) => {
    try {
        const orders = await dashboard.getUserOrders(req.params.id, req.query.status);
        if (!orders)
            throw new errors_1.default.NotFoundError(`User with ID: ${req.params.id} doesn't exist`);
        res.json({ orders });
    }
    catch (err) {
        throw new Error();
    }
};
exports.getUserOrders = getUserOrders;
