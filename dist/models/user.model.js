"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const connect_1 = __importDefault(require("../db/connect"));
class UserModel {
    async index() {
        const result = await connect_1.default.query('SELECT * FROM users');
        return result.rows;
    }
    async show(id) {
        const result = await connect_1.default.query('SELECT * FROM users WHERE user_uid=$1', [id]);
        return result.rows[0];
    }
    async create(newUser) {
        if (newUser.user_uid) {
            const result = await connect_1.default.query('INSERT INTO users (user_uid, email, firstname, lastname, password) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
                newUser.user_uid,
                newUser.email,
                newUser.firstname,
                newUser.lastname,
                newUser.password,
            ]);
            return result.rows[0];
        }
        else {
            const result = await connect_1.default.query('INSERT INTO users (email, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING *', [newUser.email, newUser.firstname, newUser.lastname, newUser.password]);
            return result.rows[0];
        }
    }
}
exports.default = UserModel;
