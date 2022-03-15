"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../db/connect"));
const errors_1 = __importDefault(require("../errors"));
class OrderModel {
    async index() {
        const result = await connect_1.default.query('SELECT * FROM orders');
        return result.rows;
    }
    async showAll(id, status) {
        if (!status) {
            const result = await connect_1.default.query('SELECT * FROM orders WHERE user_uid=$1', [
                id,
            ]);
            if (!result.rows)
                throw new errors_1.default.NotFoundError(`User with id: ${id} doesn't exist`);
            return result.rows;
        }
        const result = await connect_1.default.query('SELECT * FROM orders WHERE user_uid=$1 AND status=$2', [id, status]);
        return result.rows;
    }
    async create(newOrder) {
        const result = await connect_1.default.query('INSERT INTO orders (user_uid, status) VALUES ($1, $2) RETURNING *', [newOrder.user_uid, newOrder.status]);
        return result.rows[0];
    }
    async addProduct(orderId, productId, quantity) {
        const result = await connect_1.default.query('INSERT INTO order_products (order_uid, product_uid, quantity) VALUES ($1, $2, $3) RETURNING *', [orderId, productId, quantity]);
        return result.rows[0];
    }
}
exports.default = OrderModel;
