import express from 'express'
const router = express()

import {
  getAllOrders,
  createOrder,
  getOrdersSingleUser,
  addProduct,
} from '../controllers/orders.controller'
import authenticationMiddleware from '../middleware/auth.middleware'

router
  .route('/')
  .get(authenticationMiddleware, getAllOrders)
  .post(authenticationMiddleware, createOrder)
router.route('/:id').get(authenticationMiddleware, getOrdersSingleUser)
router.route('/:id/products').post(authenticationMiddleware, addProduct)

export default router
