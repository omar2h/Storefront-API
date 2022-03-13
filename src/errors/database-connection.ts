import { StatusCodes } from 'http-status-codes'
import CustomAPIError from './custom-error'

class databaseConnection extends CustomAPIError {
  public readonly statusCode: StatusCodes
  constructor(message: string) {
    super(message)
    this.statusCode = StatusCodes.INTERNAL_SERVER_ERROR
  }
}

export default databaseConnection
