"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bcrypt_1 = __importDefault(require("bcrypt"));
const connect_1 = __importDefault(require("../db/connect"));
const saltRounds = parseInt(process.env.SALT_ROUNDS);
const pepper = process.env.BCRYPT_PASSWORD;
class UserModel {
    async index() {
        try {
            const result = await connect_1.default.query('SELECT * FROM users');
            return result.rows;
        }
        catch (error) {
            throw new Error();
        }
    }
    async show(id) {
        try {
            const result = await connect_1.default.query('SELECT * FROM users WHERE user_uid=$1', [
                id,
            ]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error();
        }
    }
    async create(newUser) {
        try {
            if (newUser.user_uid) {
                const hash = bcrypt_1.default.hashSync(newUser.password + pepper, saltRounds);
                const result = await connect_1.default.query('INSERT INTO users (user_uid, email, firstname, lastname, password) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
                    newUser.user_uid,
                    newUser.email,
                    newUser.firstname,
                    newUser.lastname,
                    hash,
                ]);
                return result.rows[0];
            }
            else {
                const hash = bcrypt_1.default.hashSync(newUser.password + pepper, saltRounds);
                const result = await connect_1.default.query('INSERT INTO users (email, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING *', [newUser.email, newUser.firstname, newUser.lastname, hash]);
                return result.rows[0];
            }
        }
        catch (error) {
            throw new Error();
        }
    }
    async authenticate(email, password) {
        try {
            const result = await connect_1.default.query('SELECT password FROM users WHERE email=$1', [email]);
            const { password: savedPassword } = result.rows[0];
            const isPasswordValid = await bcrypt_1.default.compare(`${password}${pepper}`, savedPassword);
            if (isPasswordValid) {
                const user = await connect_1.default.query('SELECT * FROM users WHERE email=$1', [
                    email,
                ]);
                return user.rows[0];
            }
            else
                return null;
        }
        catch (error) {
            throw new Error();
        }
    }
}
exports.default = UserModel;
