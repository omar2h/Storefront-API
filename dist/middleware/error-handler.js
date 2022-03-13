"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var http_status_codes_1 = require("http-status-codes");
var custom_error_1 = __importDefault(require("../errors/custom-error"));
var errorHandlerMiddleware = function (err, _req, res, _next) {
    if (err instanceof custom_error_1["default"]) {
        return res.status(err.statusCode).json({ msg: err.message });
    }
    return res
        .status(http_status_codes_1.StatusCodes.INTERNAL_SERVER_ERROR)
        .send('Something went wrong try again later');
};
exports["default"] = errorHandlerMiddleware;
