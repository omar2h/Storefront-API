import db from '../../db/connect'
import ProductModel from '../../models/product.model'
import Product from '../../types/product.type'

const productModel = new ProductModel()

describe('Product Model', () => {
  describe('test methods definition', () => {
    it('should have an index method', () => {
      expect(productModel.index).toBeDefined()
    })

    it('should have a show method', () => {
      expect(productModel.show).toBeDefined()
    })

    it('should have a create method', () => {
      expect(productModel.create).toBeDefined()
    })
  })

  describe('test methods', () => {
    const product: Product = {
      name: 'wand',
      price: 150.65,
      category: 'magic',
    }

    const productJson = {
      name: 'wand',
      price: '150.65',
      category: 'magic',
    }
    it('create methode should return product', async () => {
      const result = await productModel.create(product)
      expect(result).toEqual(jasmine.objectContaining(productJson))
    })
  })
})
