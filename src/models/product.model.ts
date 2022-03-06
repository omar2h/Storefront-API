import Product from '../types/product.type'
import db from '../db/connect'

class ProductModel {
  async index(): Promise<Product[]> {
    const result = await db.query('SELECT * FROM products')
    return result.rows
  }

  async create(newProduct: Product): Promise<Product> {
    const result = await db.query(
      'INSERT INTO products (name, price, category) VALUES ($1, $2, $3) RETURNING *',
      [newProduct.name, newProduct.price, newProduct.category]
    )
    return result.rows[0]
  }

  async show(id: string): Promise<Product> {
    const result = await db.query(
      'SELECT * FROM products WHERE product_uid=($1)',
      [id]
    )
    return result.rows[0]
  }
}

export default ProductModel
