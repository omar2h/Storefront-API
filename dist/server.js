"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var app_1 = __importDefault(require("./app"));
var connect_1 = __importDefault(require("./db/connect"));
var address = '0.0.0.0:3000';
connect_1["default"].connect();
connect_1["default"].query('SELECT * FROM product', function (err, res) {
    if (!err) {
        console.log(res.rows);
    }
    else {
        console.log(err.message);
    }
    connect_1["default"].end;
});
app_1["default"].listen(3000, function () {
    console.log("starting app on: ".concat(address));
});
