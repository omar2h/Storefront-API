import supertest from 'supertest'
import { StatusCodes } from 'http-status-codes'
import { v4 as uuidv4 } from 'uuid'

import db from '../../db/connect'
import app from '../../app'
import UserModel from '../../models/user.model'

const request = supertest(app)
const userModel = new UserModel()

describe('Test products endpoints \n', () => {
  let token: string
  const product_uid = uuidv4()
  const user_uid = uuidv4()
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
  })

  afterAll(async () => {
    db.query(
      'DELETE FROM order_products; DELETE FROM orders; DELETE FROM products; DELETE FROM users;'
    )
  })

  it(`Test '/api/v1/auth/login' to get token`, async () => {
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

  it(`Test create: 'api/v1/products/ (POST)', expect to return product with OK status`, async () => {
    const response = await request
      .post('/api/v1/products/')
      .set('Content-type', 'application/json')
      .set('Authorization', `Bearer ${token}`)
      .send(product)
    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body.product.product_uid).toBe(product_uid)
  })
  it(`Test index: 'api/v1/products/' (GET), expect to return all products with OK status`, async () => {
    const response = await request
      .get('/api/v1/products/')
      .set('Content-type', 'application/json')
    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body.products.length).toBe(1)
    expect(response.body.products[0].product_uid).toBe(product_uid)
  })
  it(`Test show: 'api/v1/products/:id' (GET), expect to return product with OK status`, async () => {
    const response = await request
      .get(`/api/v1/products/${product_uid}`)
      .set('Content-type', 'application/json')
    expect(response.status).toBe(StatusCodes.OK)
    expect(response.body.product.product_uid).toBe(product_uid)
  })
})
