import express from 'express'
const router = express()

import { getAllOrders, createOrder } from '../controllers/orders.controller'
import authenticationMiddleware from '../middleware/auth.middleware'

router.route('/').post(authenticationMiddleware, createOrder)
router.route('/:id').get(authenticationMiddleware, getAllOrders)

export default router
