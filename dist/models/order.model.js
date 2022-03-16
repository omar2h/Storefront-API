"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../db/connect"));
class OrderModel {
    async index() {
        try {
            const result = await connect_1.default.query(`SELECT * FROM orders`);
            return result.rows;
        }
        catch (error) {
            throw new Error();
        }
    }
    async show(id) {
        try {
            const result = await connect_1.default.query(`SELECT * FROM orders WHERE order_uid=($1)`, [id]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error();
        }
    }
    async create(newOrder) {
        try {
            const result = await connect_1.default.query('INSERT INTO orders (user_uid, status) VALUES ($1, $2) RETURNING *', [newOrder.user_uid, newOrder.status]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error();
        }
    }
    async addProduct(orderId, productId, quantity) {
        try {
            const result = await connect_1.default.query('INSERT INTO order_products (order_uid, product_uid, quantity) VALUES ($1, $2, $3) RETURNING *', [orderId, productId, quantity]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error();
        }
    }
}
exports.default = OrderModel;
