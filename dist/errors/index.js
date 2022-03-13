"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var bad_request_1 = __importDefault(require("./bad-request"));
var custom_error_1 = __importDefault(require("./custom-error"));
var not_found_1 = __importDefault(require("./not-found"));
var unauthenticated_1 = __importDefault(require("./unauthenticated"));
exports["default"] = {
    BadRequestError: bad_request_1["default"],
    UnauthenticatedError: unauthenticated_1["default"],
    NotFoundError: not_found_1["default"],
    CustomAPIError: custom_error_1["default"]
};
