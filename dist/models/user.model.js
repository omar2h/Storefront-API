"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var bcrypt_1 = __importDefault(require("bcrypt"));
var connect_1 = __importDefault(require("../db/connect"));
var saltRounds = parseInt(process.env.SALT_ROUNDS);
var pepper = process.env.BCRYPT_PASSWORD;
var UserModel = /** @class */ (function () {
    function UserModel() {
    }
    UserModel.prototype.index = function () {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, connect_1["default"].query('SELECT * FROM users')];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.rows];
                    case 2:
                        error_1 = _a.sent();
                        throw new Error();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.show = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, connect_1["default"].query('SELECT * FROM users WHERE user_uid=$1', [
                                id,
                            ])];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.rows[0]];
                    case 2:
                        error_2 = _a.sent();
                        throw new Error();
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.create = function (newUser) {
        return __awaiter(this, void 0, void 0, function () {
            var hash, result, hash, result, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        if (!newUser.user_uid) return [3 /*break*/, 2];
                        hash = bcrypt_1["default"].hashSync(newUser.password + pepper, saltRounds);
                        return [4 /*yield*/, connect_1["default"].query('INSERT INTO users (user_uid, email, firstname, lastname, password) VALUES ($1, $2, $3, $4, $5) RETURNING *', [
                                newUser.user_uid,
                                newUser.email,
                                newUser.firstname,
                                newUser.lastname,
                                hash,
                            ])];
                    case 1:
                        result = _a.sent();
                        return [2 /*return*/, result.rows[0]];
                    case 2:
                        hash = bcrypt_1["default"].hashSync(newUser.password + pepper, saltRounds);
                        return [4 /*yield*/, connect_1["default"].query('INSERT INTO users (email, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING *', [newUser.email, newUser.firstname, newUser.lastname, hash])];
                    case 3:
                        result = _a.sent();
                        return [2 /*return*/, result.rows[0]];
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        error_3 = _a.sent();
                        throw new Error();
                    case 6: return [2 /*return*/];
                }
            });
        });
    };
    UserModel.prototype.authenticate = function (email, password) {
        return __awaiter(this, void 0, void 0, function () {
            var result, savedPassword, isPasswordValid, user, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        return [4 /*yield*/, connect_1["default"].query('SELECT password FROM users WHERE email=$1', [email])];
                    case 1:
                        result = _a.sent();
                        savedPassword = result.rows[0].password;
                        return [4 /*yield*/, bcrypt_1["default"].compare("".concat(password).concat(pepper), savedPassword)];
                    case 2:
                        isPasswordValid = _a.sent();
                        if (!isPasswordValid) return [3 /*break*/, 4];
                        return [4 /*yield*/, connect_1["default"].query('SELECT * FROM users WHERE email=$1', [
                                email,
                            ])];
                    case 3:
                        user = _a.sent();
                        return [2 /*return*/, user.rows[0]];
                    case 4: return [2 /*return*/, null];
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        error_4 = _a.sent();
                        throw new Error();
                    case 7: return [2 /*return*/];
                }
            });
        });
    };
    return UserModel;
}());
exports["default"] = UserModel;
