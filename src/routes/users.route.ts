import express from 'express'
const router = express()

import {
  getAllUsers,
  getUser,
  createUser,
} from '../controllers/users.controller'
import { login } from '../controllers/auth.controller'
import authenticationMiddleware from '../middleware/auth.middleware'

router.route('/').get(authenticationMiddleware, getAllUsers).post(createUser)
router.route('/:id').get(authenticationMiddleware, getUser)

export default router
