import db from '../db/connect'
import Order from '../types/order.type'

class OrderModel {
  async index(): Promise<Order[]> {
    try {
      const result = await db.query(
        `SELECT ord.order_uid, ord.status, ord.user_uid, usr.email, COUNT(prd.product_uid) products_count,
         JSON_AGG(JSONB_BUILD_OBJECT('product_uid', prd.product_uid, 'name', prd.name, 'category', prd.category,
         'price', prd.price, 'quantity', op.quantity)) AS products FROM orders AS ord
         LEFT JOIN order_products AS op ON ord.order_uid = op.order_uid
         LEFT JOIN products AS prd ON op.product_uid = prd.product_uid
         LEFT JOIN users AS usr ON usr.user_uid = ord.user_uid
         GROUP BY ord.order_uid, ord.user_uid, usr.email, ord.status`
      )
      return result.rows
    } catch (error) {
      throw new Error()
    }
  }

  async show(id: string): Promise<Order> {
    try {
      const result = await db.query(
        `SELECT ord.order_uid, ord.status, ord.user_uid, usr.email, COUNT(prd.product_uid) products_count,
         JSON_AGG(JSONB_BUILD_OBJECT('product_uid', prd.product_uid, 'name', prd.name, 'category', prd.category,
         'price', prd.price, 'quantity', op.quantity)) AS products FROM orders AS ord
         LEFT JOIN order_products AS op ON ord.order_uid = op.order_uid
         LEFT JOIN products AS prd ON op.product_uid = prd.product_uid
         LEFT JOIN users AS usr ON usr.user_uid = ord.user_uid
         WHERE ord.order_uid=$1
         GROUP BY ord.order_uid, ord.user_uid, usr.email, ord.status`,
        [id]
      )
      return result.rows[0]
    } catch (error) {
      throw new Error()
    }
  }

  async getUserOrders(id: string, status: string): Promise<Order[]> {
    try {
      if (!status) {
        const result = await db.query(
          `SELECT ord.order_uid, ord.status, ord.user_uid, usr.email, COUNT(prd.product_uid) products_count,
          JSON_AGG(JSONB_BUILD_OBJECT('product_uid', prd.product_uid, 'name', prd.name, 'category', prd.category,
          'price', prd.price, 'quantity', op.quantity)) AS products FROM orders AS ord
          LEFT JOIN order_products AS op ON ord.order_uid = op.order_uid
          LEFT JOIN products AS prd ON op.product_uid = prd.product_uid
          LEFT JOIN users AS usr ON usr.user_uid = ord.user_uid
          WHERE ord.user_uid=$1
          GROUP BY ord.order_uid, ord.user_uid, usr.email, ord.status`,
          [id]
        )
        return result.rows
      }

      const result = await db.query(
        `SELECT ord.order_uid, ord.status, ord.user_uid, usr.email, COUNT(prd.product_uid) products_count,
         JSON_AGG(JSONB_BUILD_OBJECT('product_uid', prd.product_uid, 'name', prd.name, 'category', prd.category,
         'price', prd.price, 'quantity', op.quantity)) AS products FROM orders AS ord
         LEFT JOIN order_products AS op ON ord.order_uid = op.order_uid
         LEFT JOIN products AS prd ON op.product_uid = prd.product_uid
         LEFT JOIN users AS usr ON usr.user_uid = ord.user_uid
         WHERE ord.user_uid=$1 AND ord.status=$2
         GROUP BY ord.order_uid, ord.user_uid, usr.email, ord.status`,
        [id, status]
      )
      return result.rows
    } catch (error) {
      throw new Error()
    }
  }

  async create(newOrder: Order): Promise<Order> {
    try {
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
