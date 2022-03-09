import express from 'express'
const router = express()

import {
  getAllUsers,
  getUser,
  createUser,
  login,
} from '../controllers/users.controller'

router.route('/').get(getAllUsers).post(createUser)
router.route('/:id').get(getUser)
router.route('/login').post(login)

export default router
