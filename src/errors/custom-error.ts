import { StatusCodes } from 'http-status-codes'

class CustomAPIError {
  public readonly message: string
  public readonly statusCode: StatusCodes | undefined

  constructor(message: string) {
    this.message = message
  }
}

export default CustomAPIError
