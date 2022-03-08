import express from 'express'
const router = express()

import { getAllOrders, createOrder } from '../controllers/orders.controller'

router.route('/').post(createOrder)
router.route('/:id').get(getAllOrders)

export default router
