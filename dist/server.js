"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const address = '0.0.0.0:3000';
app_1.default.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
