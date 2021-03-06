"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../db/connect"));
class ProductModel {
    async index() {
        try {
            const result = await connect_1.default.query('SELECT * FROM products');
            return result.rows;
        }
        catch (error) {
            throw new Error();
        }
    }
    async create(newProduct) {
        try {
            if (newProduct.product_uid) {
                const result = await connect_1.default.query('INSERT INTO products (product_uid, name, price, category) VALUES ($1, $2, $3, $4) RETURNING *', [
                    newProduct.product_uid,
                    newProduct.name,
                    newProduct.price,
                    newProduct.category,
                ]);
                return result.rows[0];
            }
            else {
                const result = await connect_1.default.query('INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *', [newProduct.name, newProduct.price, newProduct.category]);
                return result.rows[0];
            }
        }
        catch (error) {
            throw new Error();
        }
    }
    async show(id) {
        try {
            const result = await connect_1.default.query('SELECT * FROM products WHERE product_uid=($1)', [id]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error();
        }
    }
}
exports.default = ProductModel;
