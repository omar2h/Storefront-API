import db from '../db/connect'
import Order from '../types/order.type'

class OrderModel {
  async index(): Promise<Order[]> {
    try {
      const result = await db.query(`SELECT * FROM orders`)
      return result.rows
    } catch (error) {
      throw new Error()
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const result = await db.query(
        `SELECT * FROM orders WHERE order_uid=($1)`,
        [id]
      )
      return result.rows[0]
    } catch (error) {
      throw new Error()
    }
  }

  async create(newOrder: Order): Promise<Order> {
    try {
      // For testing to make sure we have same uid
      if (newOrder.order_uid) {
        const result = await db.query(
          'INSERT INTO orders (order_uid, user_uid, status) VALUES ($1, $2, $3) RETURNING *',
          [newOrder.order_uid, newOrder.user_uid, newOrder.status]
        )
        return result.rows[0]
      }
      const result = await db.query(
        'INSERT INTO orders (user_uid, status) VALUES ($1, $2) RETURNING *',
        [newOrder.user_uid, newOrder.status]
      )
      return result.rows[0]
    } catch (error) {
      throw new Error()
    }
  }

  async addProduct(
    orderId: string,
    productId: string,
    quantity: number
  ): Promise<Order> {
    try {
      const result = await db.query(
        'INSERT INTO order_products (order_uid, product_uid, quantity) VALUES ($1, $2, $3) RETURNING *',
        [orderId, productId, quantity]
      )
      return result.rows[0]
    } catch (error) {
      throw new Error()
    }
  }
}

export default OrderModel
