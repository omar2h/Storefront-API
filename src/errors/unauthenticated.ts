import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-error'

class unauthenticated extends CustomAPIError {
  public readonly statusCode: StatusCodes
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.UNAUTHORIZED
  }
}

export default unauthenticated
