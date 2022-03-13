import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-error'

class badRequest extends CustomAPIError {
  public readonly statusCode: StatusCodes
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.BAD_REQUEST
  }
}

export default badRequest
