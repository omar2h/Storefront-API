"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var dotenv_1 = __importDefault(require("dotenv"));
var pg_1 = require("pg");
dotenv_1["default"].config();
var _a = process.env, POSTGRES_HOST = _a.POSTGRES_HOST, POSTGRES_USER = _a.POSTGRES_USER, POSTGRES_PORT = _a.POSTGRES_PORT, POSTGRES_PASSWORD = _a.POSTGRES_PASSWORD, POSTGRES_DB = _a.POSTGRES_DB;
var pool = new pg_1.Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    port: parseInt(POSTGRES_PORT),
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB
});
module.exports = {
    query: function (sql, params) {
        return pool.query(sql, params);
    }
};