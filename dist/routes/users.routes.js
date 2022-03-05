"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = (0, express_1["default"])();
var users_controllers_1 = require("../controllers/users.controllers");
router.route('/').get(users_controllers_1.getAllUsers).post(users_controllers_1.createUser);
router.route('/:id').get(users_controllers_1.getUser);
exports["default"] = router;
