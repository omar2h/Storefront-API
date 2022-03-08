"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../db/connect"));
class OrderModel {
    async index(id, status) {
        if (!id) {
            console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxx');
            return [];
        }
        if (!status) {
            const result = await connect_1.default.query('SELECT * FROM orders WHERE user_uid=$1', [
                id,
            ]);
            console.log(`======================`);
            return result.rows;
        }
        const result = await connect_1.default.query('SELECT * FROM orders WHERE user_uid=$1 AND status=$2', [id, status]);
        console.log(`=========${result.rows.length}=============`);
        return result.rows;
    }
    async create(newOrder) {
        const result = await connect_1.default.query('INSERT INTO orders (product_uid, quantity, user_uid, status) VALUES ($1, $2, $3, $4) RETURNING *', [
            newOrder.product_uid,
            newOrder.quantity,
            newOrder.user_uid,
            newOrder.status,
        ]);
        console.log(result.rows[0]);
        return result.rows[0];
    }
}
exports.default = OrderModel;
