"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProduct = exports.getProduct = exports.getAllProducts = void 0;
const product_model_1 = __importDefault(require("../models/product.model"));
const errors_1 = __importDefault(require("../errors"));
const productModel = new product_model_1.default();
const getAllProducts = async (req, res) => {
    const products = await productModel.index();
    res.json({ products });
};
exports.getAllProducts = getAllProducts;
const getProduct = async (req, res) => {
    const product = await productModel.show(req.params.id);
    if (!product)
        throw new errors_1.default.NotFoundError(`ID: ${req.params.id} doesn't exist`);
    res.json({ product });
};
exports.getProduct = getProduct;
const createProduct = async (req, res) => {
    const product = await productModel.create(req.body);
    if (!product)
        throw new errors_1.default.BadRequestError('Invalid product information');
    res.json({ product });
};
exports.createProduct = createProduct;
