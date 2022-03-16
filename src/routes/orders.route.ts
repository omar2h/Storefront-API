import express from 'express'
const router = express()

import {
  getAllOrders,
  getOrder,
  createOrder,
  getUserOrders,
  addProduct,
} from '../controllers/orders.controller'
import authenticationMiddleware from '../middleware/auth.middleware'

router
  .route('/')
  .get(authenticationMiddleware, getAllOrders)
  .post(authenticationMiddleware, createOrder)
router.route('/:id').get(authenticationMiddleware, getOrder)
router.route('/:id/products').post(authenticationMiddleware, addProduct)
router.route('/showUserOrders/:id').get(authenticationMiddleware, getUserOrders)

export default router
