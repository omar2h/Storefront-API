import db from '../db/connect'
import { Order } from '../types/order.type'

class OrderModel {
  async index(id: string, status?: string): Promise<Order[]> {    
    if (!status) {
      const result = await db.query('SELECT * FROM orders WHERE user_uid=$1', [
        id,
      ])
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
      'INSERT INTO orders (product_uid, quantity, user_uid, status) VALUES ($1, $2, $3, $4) RETURNING *',
      [
        newOrder.product_uid,
        newOrder.quantity,
        newOrder.user_uid,
        newOrder.status,
      ]
    )
    console.log(result.rows[0])
    return result.rows[0]
  }
}

export default OrderModel
