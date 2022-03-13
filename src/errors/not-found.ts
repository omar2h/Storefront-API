import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-error'

class NotFound extends CustomAPIError {
  public readonly statusCode: StatusCodes
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.NOT_FOUND
  }
}

export default NotFound
