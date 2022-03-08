"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const products_route_1 = __importDefault(require("./routes/products.route"));
const users_route_1 = __importDefault(require("./routes/users.route"));
const orders_route_1 = __importDefault(require("./routes/orders.route"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, morgan_1.default)('tiny'));
app.use((0, cors_1.default)());
app.get('/', (req, res) => {
    res.send('<h1>StoreFront API</h1><a href="/api/v1/products">Products route</a> <a href="/api/v1/users">Users route</a>');
});
app.use('/api/v1/products', products_route_1.default);
app.use('/api/v1/users', users_route_1.default);
app.use('/api/v1/orders', orders_route_1.default);
exports.default = app;
