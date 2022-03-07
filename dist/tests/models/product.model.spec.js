"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const product_model_1 = __importDefault(require("../../models/product.model"));
const productModel = new product_model_1.default();
describe('Product Model', () => {
    describe('test methods definition', () => {
        it('should have an index method', () => {
            expect(productModel.index).toBeDefined();
        });
        it('should have a show method', () => {
            expect(productModel.show).toBeDefined();
        });
        it('should have a create method', () => {
            expect(productModel.create).toBeDefined();
        });
    });
    describe('test methods', () => {
        const product = {
            name: 'wand',
            price: 150.65,
            category: 'magic',
        };
        const productJson = {
            name: 'wand',
            price: '150.65',
            category: 'magic',
        };
        it('create methode should return product', async () => {
            console.log(`--------------${{ product }}------------`);
            const newProduct = await productModel.create(product);
            console.log(`--------------${newProduct}------------`);
            expect(newProduct).toEqual(jasmine.objectContaining(productJson));
        });
    });
});
