"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const errors_1 = __importDefault(require("../errors"));
const jwtToken = process.env.TOKEN_SECRET;
const authenticationMiddleware = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new errors_1.default.UnauthenticatedError('No token provided');
        }
        const token = authHeader.split(' ')[1];
        const decoded = jsonwebtoken_1.default.verify(token, jwtToken);
        if (!decoded)
            throw new errors_1.default.UnauthenticatedError('Not authorized to access this route');
        next();
    }
    catch (err) {
        throw new Error();
    }
};
exports.default = authenticationMiddleware;
