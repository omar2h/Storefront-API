import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const jwtToken = process.env.TOKEN_SECRET as string
interface IGetUserAuthInfoRequest extends Request {
  user: string // or any other type
}

const authenticationMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.headers.authorization as string
  const token = authHeader.split(' ')[1]
  const decoded = jwt.verify(token, jwtToken) as string
  next()
}

export default authenticationMiddleware
