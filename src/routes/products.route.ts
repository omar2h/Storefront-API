import express from 'express'
const router = express()

import {
  getAllProducts,
  getProduct,
  createProduct,
} from '../controllers/products.controller'
import authenticationMiddleware from '../middleware/auth.middleware'

router
  .route('/')
  .get(getAllProducts)
  .post(authenticationMiddleware, createProduct)
router.route('/:id').get(getProduct)

export default router
