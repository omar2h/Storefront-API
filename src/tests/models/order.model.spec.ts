import { v4 as uuidv4 } from 'uuid'
import db from '../../db/connect'
import UserModel from '../../models/user.model'
import User from '../../types/user.type'
import ProductModel from '../../models/product.model'
import Product from '../../types/product.type'
import OrderModel from '../../models/order.model'
import Order from '../../types/order.type'

const productModel = new ProductModel()
const userModel = new UserModel()
const orderModel = new OrderModel()

describe('Order Model', () => {
  describe('test methods definition', () => {
    it('should have an index method', () => {
      expect(orderModel.index).toBeDefined()
    })
  })

  describe('test methods', () => {
    // let testProduct: Product, testUser: User, order: Order
    const product_uid = uuidv4()
    const user_uid = uuidv4()

    const product = {
      product_uid: product_uid,
      name: 'car',
      price: 222,
      category: 'magic',
    }

    const user = {
      user_uid: user_uid,
      email: 'user3@mail.com',
      firstname: 'user',
      lastname: 'user',
      password: '123',
    }

    const order = {
      product_uid: product_uid,
      quantity: 1,
      user_uid: user_uid,
      status: 'active',
    }

    beforeAll(async () => {
      await productModel.create(product)
      await userModel.create(user)
    })

    afterAll(async () => {
      db.query('DELETE FROM orders; DELETE FROM products; DELETE FROM users;')
    })

    it('should create and return order for a user', async () => {
      const result = await orderModel.create(order)
      const tempOrder = {
        order_uid: result.order_uid,
        ...order,
      }
      expect(JSON.stringify(result)).toEqual(JSON.stringify(tempOrder))
    })

    it('should return list of orders for a user', async () => {
      const result = await orderModel.index(user.user_uid as string)
      console.log(`-------------------------------------------`)

      const ordersList = [
        {
          order_uid: result[0].order_uid,
          ...order,
        },
      ]
      expect(JSON.stringify(result)).toEqual(JSON.stringify(ordersList))
    })
  })
})
