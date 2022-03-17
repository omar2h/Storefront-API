"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const uuid_1 = require("uuid");
const connect_1 = __importDefault(require("../../db/connect"));
const user_model_1 = __importDefault(require("../../models/user.model"));
const product_model_1 = __importDefault(require("../../models/product.model"));
const order_model_1 = __importDefault(require("../../models/order.model"));
const productModel = new product_model_1.default();
const userModel = new user_model_1.default();
const orderModel = new order_model_1.default();
describe('Order Model', () => {
    describe('test methods definition', () => {
        it('should have an index method', () => {
            expect(orderModel.index).toBeDefined();
        });
    });
    describe('test methods', () => {
        // let testProduct: Product, testUser: User, order: Order
        const product_uid = (0, uuid_1.v4)();
        const user_uid = (0, uuid_1.v4)();
        const product = {
            product_uid: product_uid,
            name: 'car',
            price: 222,
            category: 'magic',
        };
        const user = {
            user_uid: user_uid,
            email: 'user3@mail.com',
            firstname: 'user',
            lastname: 'user',
            password: '123',
        };
        const order = {
            user_uid: user_uid,
            status: 'active',
        };
        beforeAll(async () => {
            await productModel.create(product);
            await userModel.create(user);
        });
        afterAll(async () => {
            connect_1.default.query('DELETE FROM order_products; DELETE FROM orders; DELETE FROM products; DELETE FROM users;');
        });
        it('should create and return order for a user', async () => {
            const result = await orderModel.create(order);
            const tempOrder = {
                order_uid: result.order_uid,
                ...order,
            };
            expect(JSON.stringify(result)).toEqual(JSON.stringify(tempOrder));
        });
        it('should return list of all orders', async () => {
            const result = await orderModel.index();
            const ordersList = [
                {
                    order_uid: result[0].order_uid,
                    ...order,
                },
            ];
            expect(JSON.stringify(result)).toEqual(JSON.stringify(ordersList));
        });
    });
});
