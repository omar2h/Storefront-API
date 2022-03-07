import express from 'express'
const router = express()

import {
  getAllOrders,
  createOrder,
  getAllActiveOrders,
  getAllCompleteOrders,
} from '../controllers/orders.controller'

router.route('/').post(createOrder)
router.route('/:id').get(getAllOrders)
router.route('/active/:id').get(getAllActiveOrders)
router.route('/complete/:id').get(getAllCompleteOrders)

export default router
