import { Request, Response } from 'express'
import UserModel from '../models/user.model'

const userModel = new UserModel()

const getAllUsers = async (req: Request, res: Response) => {
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
  res.json({ user })
}

export { getAllUsers, getUser, createUser, login }
