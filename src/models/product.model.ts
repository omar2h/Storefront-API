import Product from '../types/product.type'
import db from '../db/connect'

class ProductModel {
  async index(): Promise<Product[]> {
    try {
      const result = await db.query('SELECT * FROM products')
      return result.rows
    } catch (error) {
      throw new Error()
    }
  }

  async create(newProduct: Product): Promise<Product> {
    try {
      if (newProduct.product_uid) {
        const result = await db.query(
          'INSERT INTO products (product_uid, name, price, category) VALUES ($1, $2, $3, $4) RETURNING *',
          [
            newProduct.product_uid,
            newProduct.name,
            newProduct.price,
            newProduct.category,
          ]
        )
        return result.rows[0]
      } else {
        const result = await db.query(
          'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *',
          [newProduct.name, newProduct.price, newProduct.category]
        )
        return result.rows[0]
      }
    } catch (error) {
      throw new Error()
    }
  }

  async show(id: string): Promise<Product> {
    try {
      const result = await db.query(
        'SELECT * FROM products WHERE product_uid=($1)',
        [id]
      )
      return result.rows[0]
    } catch (error) {
      throw new Error()
    }
  }
}

export default ProductModel
