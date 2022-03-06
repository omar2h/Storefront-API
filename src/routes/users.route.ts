import express from 'express'
const router = express()

import {
  getAllUsers,
  getUser,
  createUser,
} from '../controllers/users.controller'

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser)

export default router
