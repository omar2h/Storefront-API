"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
var morgan_1 = __importDefault(require("morgan"));
var products_routes_1 = __importDefault(require("./routes/products.routes"));
var users_routes_1 = __importDefault(require("./routes/users.routes"));
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, morgan_1["default"])('tiny'));
app.use((0, cors_1["default"])());
app.get('/', function (req, res) {
    res.send('Hello World!');
});
app.use('/api/v1/products', products_routes_1["default"]);
app.use('/api/v1/users', users_routes_1["default"]);
exports["default"] = app;
