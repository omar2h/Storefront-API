"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = (0, express_1["default"])();
var users_controller_1 = require("../controllers/users.controller");
var auth_middleware_1 = __importDefault(require("../middleware/auth.middleware"));
router.route('/').get(auth_middleware_1["default"], users_controller_1.getAllUsers).post(users_controller_1.createUser);
router.route('/:id').get(auth_middleware_1["default"], users_controller_1.getUser);
exports["default"] = router;
