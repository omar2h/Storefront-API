"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var express_1 = __importDefault(require("express"));
var router = (0, express_1["default"])();
var auth_controller_1 = require("../controllers/auth.controller");
router.route('/login').post(auth_controller_1.login);
exports["default"] = router;
