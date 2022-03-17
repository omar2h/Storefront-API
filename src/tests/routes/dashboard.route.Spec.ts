import supertest from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { v4 as uuidv4 } from 'uuid'

import db from '../../db/connect'
import app from '../../app'
import UserModel from '../../models/user.model'
import ProductModel from '../../models/product.model'
import OrderModel from '../../models/order.model'

const request = supertest(app)
const userModel = new UserModel()
const productModel = new ProductModel()
const orderModel = new OrderModel()

describe('Test products endpoints \n', () => {
  let token: string
  const order_uid = uuidv4()
  const product_uid = uuidv4()
  const user_uid = uuidv4()
  const order = {
    order_uid: order_uid,
    user_uid: user_uid,
    status: 'active',
  }

  const product = {
    product_uid: product_uid,
    name: 'wand',
    price: 150.65,
    category: 'magic',
  }

  const user4 = {
    user_uid: user_uid,
    email: 'user4@mail.com',
    firstname: 'user1',
    lastname: 'user2',
    password: '123',
  }

  beforeAll(async () => {
    await userModel.create(user4)
    await productModel.create(product)
    await orderModel.create(order)
  })

  afterAll(async () => {
    db.query(
      'DELETE FROM order_products; DELETE FROM orders; DELETE FROM products; DELETE FROM users;'
    )
  })

  it(`Test login: '/api/v1/auth/login' to get token`, async () => {
    const resonse = await request
      .post('/api/v1/auth/login')
      .set('Content-type', 'application/json')
      .send({
        email: 'user4@mail.com',
        password: '123',
      })
    expect(resonse.status).toBe(StatusCodes.OK)
    token = resonse.body.user.token as string
  })

  it(`Test allOrdersWithProducts: 'api/v1/dashboard/orders-products (GET)',
      expect to return orders with thier products with OK status`, async () => {
    const response = await request
      .get('/api/v1/dashboard/orders-products')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)

    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body.orders.length).toBe(1)
    expect(response.body.orders[0].order_uid).toBe(order_uid)
  })
  it(`Test singleOrderWithProducts: 'api/v1/dashboard/orders-products/:id' (GET),
      expect to return single order with its products with OK status`, async () => {
    const response = await request
      .get(`/api/v1/dashboard/orders-products/${order_uid}`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body.order.order_uid).toBe(order_uid)
  })
  it(`Test getUserOrders: 'api/v1/dashboard/user-orders/:id' (GET),
     expect to return orders with their products of a single user with OK status`, async () => {
    const response = await request
      .get(`/api/v1/dashboard/user-orders/${user_uid}`)
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body.orders.length).toBe(1)
    expect(response.body.orders[0].user_uid).toBe(user_uid)
  })
})
