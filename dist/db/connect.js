"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const dotenv_1 = __importDefault(require("dotenv"));
const pg_1 = require("pg");
dotenv_1.default.config();
let pool;
const { POSTGRES_HOST, POSTGRES_USER, POSTGRES_PORT, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_DB_TEST, ENV, } = process.env;
if (ENV === 'dev') {
    pool = new pg_1.Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        port: parseInt(POSTGRES_PORT),
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB,
    });
}
if (ENV === 'test') {
    pool = new pg_1.Pool({
        host: POSTGRES_HOST,
        user: POSTGRES_USER,
        port: parseInt(POSTGRES_PORT),
        password: POSTGRES_PASSWORD,
        database: POSTGRES_DB_TEST,
    });
}
console.log(`====${ENV}====`);
module.exports = {
    query: (sql, params) => pool.query(sql, params),
};
