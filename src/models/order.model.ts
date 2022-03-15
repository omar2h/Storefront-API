import db from '../db/connect'
import CustomError from '../errors'
import Order from '../types/order.type'

class OrderModel {
  async index(): Promise<Order[]> {
    const result = await db.query('SELECT * FROM orders')
    return result.rows
  }

  async showAll(id: string, status: string): Promise<Order[]> {
    if (!status) {
      const result = await db.query('SELECT * FROM orders WHERE user_uid=$1', [
        id,
      ])
      if (!result.rows)
        throw new CustomError.NotFoundError(`User with id: ${id} doesn't exist`)
      return result.rows
    }

    const result = await db.query(
      'SELECT * FROM orders WHERE user_uid=$1 AND status=$2',
      [id, status]
    )
    return result.rows
  }

  async create(newOrder: Order): Promise<Order> {
    const result = await db.query(
      'INSERT INTO orders (user_uid, status) VALUES ($1, $2) RETURNING *',
      [newOrder.user_uid, newOrder.status]
    )
    return result.rows[0]
  }

  async addProduct(
    orderId: string,
    productId: string,
    quantity: number
  ): Promise<Order> {
    const result = await db.query(
      'INSERT INTO order_products (order_uid, product_uid, quantity) VALUES ($1, $2, $3) RETURNING *',
      [orderId, productId, quantity]
    )
    return result.rows[0]
  }
}

export default OrderModel
