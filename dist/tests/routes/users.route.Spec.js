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
describe('Test users endpoints \n', () => {
    let token;
    const user_uid = (0, uuid_1.v4)();
    const user_uid2 = (0, uuid_1.v4)();
    const user4 = {
        user_uid: user_uid,
        email: 'user4@mail.com',
        firstname: 'user1',
        lastname: 'user2',
        password: '123',
    };
    const user5 = {
        user_uid: user_uid2,
        email: 'user5@mail.com',
        firstname: 'user1',
        lastname: 'user2',
        password: '123',
    };
    beforeAll(async () => {
        await userModel.create(user4);
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
    it(`Test index: 'api/v1/users/ (GET)', expect to return all users with OK status`, async () => {
        const response = await request
            .get('/api/v1/users/')
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(http_status_codes_1.StatusCodes.OK);
        expect(response.body.users.length).toBe(1);
        expect(response.body.users[0].user_uid).toBe(user_uid);
    });
    it(`Test show: 'api/v1/users/:id' (GET), expect to user with OK status`, async () => {
        const response = await request
            .get(`/api/v1/users/${user_uid}`)
            .set('Content-type', 'application/json')
            .set('Authorization', `Bearer ${token}`);
        expect(response.status).toBe(http_status_codes_1.StatusCodes.OK);
        expect(response.body.user.user_uid).toBe(user_uid);
    });
    it(`Test create: 'api/v1/users/' (POST), expect to return user with OK status`, async () => {
        const response = await request
            .post(`/api/v1/users/`)
            .set('Content-type', 'application/json')
            .send(user5);
        expect(response.status).toBe(http_status_codes_1.StatusCodes.OK);
        expect(response.body.user.user_uid).toBe(user_uid2);
    });
});
