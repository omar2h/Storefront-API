"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../db/connect"));
class ProductModel {
    async index() {
        const result = await connect_1.default.query('SELECT * FROM products');
        return result.rows;
    }
    async create(newProduct) {
        const result = await connect_1.default.query('INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *', [newProduct.name, newProduct.price, newProduct.category]);
        return result.rows[0];
    }
    async show(id) {
        const result = await connect_1.default.query('SELECT * FROM products WHERE product_uid=($1)', [id]);
        return result.rows[0];
    }
}
exports.default = ProductModel;
