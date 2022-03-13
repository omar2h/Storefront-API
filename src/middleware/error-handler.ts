import { NextFunction, Request, Response } from 'express'
import { StatusCodes } from 'http-status-codes'
import CustomAPIError from '../errors/custom-error'

const errorHandlerMiddleware = (
  err: Error | CustomAPIError,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode as StatusCodes).json({ msg: err.message })
  }
  return res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .send('Something went wrong try again later')
}

export default errorHandlerMiddleware
