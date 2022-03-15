"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const jwtToken = process.env.TOKEN_SECRET;
const user_model_1 = __importDefault(require("../models/user.model"));
const errors_1 = __importDefault(require("../errors"));
const userModel = new user_model_1.default();
const login = async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        throw new errors_1.default.BadRequestError('Please provide correct email and password');
    }
    const user = await userModel.authenticate(email, password);
    if (!user) {
        throw new errors_1.default.UnauthenticatedError('Invalid Credentials');
    }
    const token = jsonwebtoken_1.default.sign({ user_uid: user?.user_uid }, jwtToken, {
        expiresIn: '1d',
    });
    res.json({ user: { ...user, token } });
};
exports.login = login;
