import express from 'express'
const router = express()

import {
  getAllProducts,
  getProduct,
  createProduct,
} from '../controllers/products.controllers'

router.route('/').get(getAllProducts).post(createProduct)
router.route('/:id').get(getProduct)

export default router
