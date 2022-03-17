"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const supertest_1 = __importDefault(require("supertest"));
const http_status_codes_1 = require("http-status-codes");
const uuid_1 = require("uuid");
const app_1 = __importDefault(require("../../app"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const request = (0, supertest_1.default)(app_1.default);
const userModel = new user_model_1.default();
describe('Test products endpoints \n', () => {
    let token;
    const product_uid = (0, uuid_1.v4)();
    const user_uid = (0, uuid_1.v4)();
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
    });
    it(`Test '/api/v1/auth/login' to get token`, async () => {
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
    it(`Test 'api/v1/products/ (POST)', expect to return product with OK status`, async () => {
        const response = await request
            .post('/api/v1/products/')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`)
            .send(product);
        expect(response.status).toBe(http_status_codes_1.StatusCodes.OK);
        expect(response.body.product.product_uid).toBe(product_uid);
    });
    it(`Test 'api/v1/products/' (GET), expect to return all products with OK status`, async () => {
        const response = await request
            .get('/api/v1/products/')
            .set('Content-type', 'application/json');
        expect(response.status).toBe(http_status_codes_1.StatusCodes.OK);
        expect(response.body.products[0].product_uid).toBe(product_uid);
    });
    it(`Test 'api/v1/products/:id' (GET), expect to return product with OK status`, async () => {
        const response = await request
            .get(`/api/v1/products/${product_uid}`)
            .set('Content-type', 'application/json');
        expect(response.status).toBe(http_status_codes_1.StatusCodes.OK);
        expect(response.body.product.product_uid).toBe(product_uid);
    });
});
