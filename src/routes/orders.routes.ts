import express from 'express'
const router = express()

import { getAllOrders } from '../controllers/orders.controllers'

router.route('/:id').get(getAllOrders)

export default router
