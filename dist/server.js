"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = __importDefault(require("./app"));
const address = '0.0.0.0:3000';
// pool.on('connect', () => {
//   console.log('Connected to database')
// })
// pool.query('SELECT * FROM product', (err, res) => {
//   if (!err) {
//     console.log(res.rows)
//   } else {
//     console.log(err.message)
//   }
//   pool.end
// })
app_1.default.listen(3000, function () {
    console.log(`starting app on: ${address}`);
});
