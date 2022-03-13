import express from 'express'
const router = express()

import { login } from '../controllers/auth.controller'

router.route('/login').post(login)

export default router
