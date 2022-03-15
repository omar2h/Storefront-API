"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createUser = exports.getUser = exports.getAllUsers = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const errors_1 = __importDefault(require("../errors"));
const userModel = new user_model_1.default();
const getAllUsers = async (req, res) => {
    const users = await userModel.index();
    res.json({ users });
};
exports.getAllUsers = getAllUsers;
const getUser = async (req, res) => {
    const user = await userModel.show(req.params.id);
    if (!user)
        throw new errors_1.default.NotFoundError(`ID: ${req.params.id} doesn't exist`);
    res.json({ user });
};
exports.getUser = getUser;
const createUser = async (req, res) => {
    const user = await userModel.create(req.body);
    if (!user)
        throw new errors_1.default.BadRequestError('Please provide valid credentials');
    res.json({ user });
};
exports.createUser = createUser;
