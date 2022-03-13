import BadRequestError from './bad-request'
import CustomAPIError from './custom-error'
import NotFoundError from './not-found'
import UnauthenticatedError from './unauthenticated'
import DatabaseConnectionError from './database-connection'

export default {
  BadRequestError,
  UnauthenticatedError,
  NotFoundError,
  DatabaseConnectionError,
  CustomAPIError,
}
