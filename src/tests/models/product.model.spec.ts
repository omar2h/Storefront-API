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

    afterAll(async () => {
      db.query('DELETE FROM products CASCADE;')
    })
    it('create method should return product', async () => {
      const result = await productModel.create(product)
      const tempProduct = {
        product_uid: result.product_uid,
        ...productJson,
      }
      expect(JSON.stringify(result)).toEqual(JSON.stringify(tempProduct))
    })

    it('index method should return list of products', async () => {
      const result = await productModel.index()
      const productsList = [
        {
          product_uid: result[0].product_uid,
          ...productJson,
        },
      ]
      expect(JSON.stringify(result)).toEqual(JSON.stringify(productsList))
    })

    it('show method should return product', async () => {
      const newProduct = await productModel.create(product)
      const result = await productModel.show(newProduct.product_uid as string)
      const tempProduct = {
        product_uid: result.product_uid,
        ...productJson,
      }
      expect(JSON.stringify(result)).toEqual(JSON.stringify(tempProduct))
    })
  })
})
