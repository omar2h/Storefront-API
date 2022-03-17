"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var app_1 = __importDefault(require("./app"));
var port = process.env.PORT || 3000;
app_1["default"].listen(port, function () {
    console.log("App running on port: ".concat(port));
});
