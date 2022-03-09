import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import UserModel from '../models/user.model'

const jwtToken = process.env.TOKEN_SECRET as string
const userModel = new UserModel()

const getAllUsers = async (req: Request, res: Response) => {
  console.log(req.headers);
  
  const users = await userModel.index()
  res.json({ users })
}

const getUser = async (req: Request, res: Response) => {
  const user = await userModel.show(req.params.id)
  res.json({ user })
}

const createUser = async (req: Request, res: Response) => {
  const user = await userModel.create(req.body)
  res.json({ user })
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  const user = await userModel.authenticate(email, password)
  console.log({ user_uid: user?.user_uid })

  const token = jwt.sign({ user_uid: user?.user_uid }, jwtToken, {
    expiresIn: '30d',
  })
  res.json({ user: { ...user, token } })
}

export { getAllUsers, getUser, createUser, login }
