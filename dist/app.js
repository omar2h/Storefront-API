"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var cors_1 = __importDefault(require("cors"));
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var morgan_1 = __importDefault(require("morgan"));
// routes
var products_route_1 = __importDefault(require("./routes/products.route"));
var users_route_1 = __importDefault(require("./routes/users.route"));
var orders_route_1 = __importDefault(require("./routes/orders.route"));
var dashboard_route_1 = __importDefault(require("./routes/dashboard.route"));
var auth_routes_1 = __importDefault(require("./routes/auth.routes"));
// middleware
var error_handler_1 = __importDefault(require("./middleware/error-handler"));
var not_found_1 = __importDefault(require("./middleware/not-found"));
var app = (0, express_1["default"])();
app.use(express_1["default"].json());
app.use((0, morgan_1["default"])('tiny'));
app.use((0, cors_1["default"])());
app.get('/', function (req, res) {
    res.send('<h1>StoreFront API</h1>');
});
app.use('/api/v1/products', products_route_1["default"]);
app.use('/api/v1/users', users_route_1["default"]);
app.use('/api/v1/orders', orders_route_1["default"]);
app.use('/api/v1/dashboard', dashboard_route_1["default"]);
app.use('/api/v1/auth', auth_routes_1["default"]);
app.use(error_handler_1["default"]);
app.use(not_found_1["default"]);
exports["default"] = app;
