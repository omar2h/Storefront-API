import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

import UserModel from '../models/user.model'
import CustomError from '../errors'

const jwtToken = process.env.TOKEN_SECRET as string
const userModel = new UserModel()

const getAllUsers = async (req: Request, res: Response) => {
  const users = await userModel.index()
  res.json({ users })
}

const getUser = async (req: Request, res: Response) => {
  const user = await userModel.show(req.params.id)
  if (!user)
    throw new CustomError.NotFoundError(`ID: ${req.params.id} doesn't exist`)
  res.json({ user })
}

const createUser = async (req: Request, res: Response) => {
  const user = await userModel.create(req.body)
  if (!user)
    throw new CustomError.BadRequestError('Please provide valid credentials')
  res.json({ user })
}

const login = async (req: Request, res: Response) => {
  const { email, password } = req.body
  if (!email || !password) {
    throw new CustomError.BadRequestError(
      'Please provide correct email and password'
    )
  }

  const user = await userModel.authenticate(email, password)
  if (!user) {
    throw new CustomError.UnauthenticatedError('Invalid Credentials')
  }

  const token = jwt.sign({ user_uid: user?.user_uid }, jwtToken, {
    expiresIn: '1d',
  })
  res.json({ user: { ...user, token } })
}

export { getAllUsers, getUser, createUser, login }
