"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var app_1 = __importDefault(require("./app"));
var address = '0.0.0.0:3000';
app_1["default"].listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
