import express from 'express'
const router = express()

import {
  getAllOrders,
  getOrder,
  getUserOrders,
} from '../controllers/dashboard.controller'
import authenticationMiddleware from '../middleware/auth.middleware'

router.route('/get-orders-products').get(authenticationMiddleware, getAllOrders)

router.route('/get-orders-products/:id').get(authenticationMiddleware, getOrder)
router.route('/user-orders/:id').get(authenticationMiddleware, getUserOrders)

export default router
