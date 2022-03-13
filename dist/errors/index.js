"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bad_request_1 = __importDefault(require("./bad-request"));
const custom_error_1 = __importDefault(require("./custom-error"));
const not_found_1 = __importDefault(require("./not-found"));
const unauthenticated_1 = __importDefault(require("./unauthenticated"));
const database_connection_1 = __importDefault(require("./database-connection"));
exports.default = {
    BadRequestError: bad_request_1.default,
    UnauthenticatedError: unauthenticated_1.default,
    NotFoundError: not_found_1.default,
    DatabaseConnectionError: database_connection_1.default,
    CustomAPIError: custom_error_1.default,
};
