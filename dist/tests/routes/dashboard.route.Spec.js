"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const http_status_codes_1 = require("http-status-codes");
const uuid_1 = require("uuid");
const connect_1 = __importDefault(require("../../db/connect"));
const app_1 = __importDefault(require("../../app"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const product_model_1 = __importDefault(require("../../models/product.model"));
const order_model_1 = __importDefault(require("../../models/order.model"));
const request = (0, supertest_1.default)(app_1.default);
const userModel = new user_model_1.default();
const productModel = new product_model_1.default();
const orderModel = new order_model_1.default();
describe('Test products endpoints \n', () => {
    let token;
    const order_uid = (0, uuid_1.v4)();
    const product_uid = (0, uuid_1.v4)();
    const user_uid = (0, uuid_1.v4)();
    const order = {
        order_uid: order_uid,
        user_uid: user_uid,
        status: 'active',
    };
    const product = {
        product_uid: product_uid,
        name: 'wand',
        price: 150.65,
        category: 'magic',
    };
    const user4 = {
        user_uid: user_uid,
        email: 'user4@mail.com',
        firstname: 'user1',
        lastname: 'user2',
        password: '123',
    };
    beforeAll(async () => {
        await userModel.create(user4);
        await productModel.create(product);
        await orderModel.create(order);
    });
    afterAll(async () => {
        connect_1.default.query('DELETE FROM order_products; DELETE FROM orders; DELETE FROM products; DELETE FROM users;');
    });
    it(`Test login: '/api/v1/auth/login' to get token`, async () => {
        const resonse = await request
            .post('/api/v1/auth/login')
            .set('Content-type', 'application/json')
            .send({
            email: 'user4@mail.com',
            password: '123',
        });
        expect(resonse.status).toBe(http_status_codes_1.StatusCodes.OK);
        token = resonse.body.user.token;
    });
    it(`Test allOrdersWithProducts: 'api/v1/dashboard/orders-products (GET)',
      expect to return orders with thier products with OK status`, async () => {
        const response = await request
            .get('/api/v1/dashboard/orders-products')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(http_status_codes_1.StatusCodes.OK);
        expect(response.body.orders.length).toBe(1);
        expect(response.body.orders[0].order_uid).toBe(order_uid);
    });
    it(`Test singleOrderWithProducts: 'api/v1/dashboard/orders-products/:id' (GET),
      expect to return single order with its products with OK status`, async () => {
        const response = await request
            .get(`/api/v1/dashboard/orders-products/${order_uid}`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(http_status_codes_1.StatusCodes.OK);
        expect(response.body.order.order_uid).toBe(order_uid);
    });
    it(`Test getUserOrders: 'api/v1/dashboard/user-orders/:id' (GET),
     expect to return orders with their products of a single user with OK status`, async () => {
        const response = await request
            .get(`/api/v1/dashboard/user-orders/${user_uid}`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(http_status_codes_1.StatusCodes.OK);
        expect(response.body.orders.length).toBe(1);
        expect(response.body.orders[0].user_uid).toBe(user_uid);
    });
});
