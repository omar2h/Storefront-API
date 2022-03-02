"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, morgan_1["default"])('tiny'));
app.use((0, cors_1["default"])());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
exports["default"] = app;
