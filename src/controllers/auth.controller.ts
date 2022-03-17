import { Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const jwtToken = process.env.TOKEN_SECRET as string
import UserModel from '../models/user.model'
import CustomError from '../errors'

const userModel = new UserModel()

const login = async (req: Request, res: Response) => {
  try {
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
  } catch (error) {
    throw new Error()
  }
}

export { login }
