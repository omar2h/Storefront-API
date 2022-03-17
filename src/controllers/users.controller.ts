import { Request, Response } from 'express'

import UserModel from '../models/user.model'
import CustomError from '../errors'

const userModel = new UserModel()

const getAllUsers = async (req: Request, res: Response) => {
  try {
    const users = await userModel.index()
    res.json({ users })
  } catch (err) {
    throw new Error()
  }
}

const getUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.show(req.params.id)
    if (!user)
      throw new CustomError.NotFoundError(`ID: ${req.params.id} doesn't exist`)
    res.json({ user })
  } catch (err) {
    throw new Error()
  }
}

const createUser = async (req: Request, res: Response) => {
  try {
    const user = await userModel.create(req.body)
    if (!user)
      throw new CustomError.BadRequestError('Please provide valid credentials')
    res.json({ user })
  } catch (err) {
    throw new Error()
  }
}

export { getAllUsers, getUser, createUser }
