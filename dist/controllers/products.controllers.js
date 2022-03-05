"use strict";
exports.__esModule = true;
exports.createProduct = exports.getProduct = exports.getAllProducts = void 0;
var getAllProducts = function (req, res) {
    res.send('get All Products');
};
exports.getAllProducts = getAllProducts;
var getProduct = function (req, res) {
    res.json({ id: req.params.id });
};
exports.getProduct = getProduct;
var createProduct = function (req, res) {
    res.json(req.body);
};
exports.createProduct = createProduct;
