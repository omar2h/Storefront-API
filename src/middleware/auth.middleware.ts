import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import CustomError from '../errors'

const jwtToken = process.env.TOKEN_SECRET as string

const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization as string

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new CustomError.UnauthenticatedError('No token provided')
    }

    const token = authHeader.split(' ')[1]
    const decoded = jwt.verify(token, jwtToken) as string
    if (!decoded)
      throw new CustomError.UnauthenticatedError(
        'Not authorized to access this route'
      )
    next()
  } catch (err) {
    throw new Error()
  }
}

export default authenticationMiddleware
