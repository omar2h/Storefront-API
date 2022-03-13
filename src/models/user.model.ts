import bcrypt from 'bcrypt'

import User from '../types/user.type'
import db from '../db/connect'
import CustomError from '../errors'

const saltRounds = parseInt(process.env.SALT_ROUNDS as string)
const pepper = process.env.BCRYPT_PASSWORD

class UserModel {
  async index(): Promise<User[]> {
    const result = await db.query('SELECT * FROM users')
    if (!result.rows)
      throw new CustomError.DatabaseConnectionError('Error getting users')
    return result.rows
  }

  async show(id: string): Promise<User> {
    const result = await db.query('SELECT * FROM users WHERE user_uid=$1', [id])
    if (!result.rows[0])
      throw new CustomError.DatabaseConnectionError('Error getting user')
    return result.rows[0]
  }

  async create(newUser: User): Promise<User> {
    if (newUser.user_uid) {
      const result = await db.query(
        'INSERT INTO users (user_uid, email, firstname, lastname, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [
          newUser.user_uid,
          newUser.email,
          newUser.firstname,
          newUser.lastname,
          newUser.password,
        ]
      )
      if (!result.rows[0])
        throw new CustomError.DatabaseConnectionError('Error getting users')
      return result.rows[0]
    } else {
      const hash = bcrypt.hashSync(
        (newUser.password as string) + pepper,
        saltRounds
      )
      const result = await db.query(
        'INSERT INTO users (email, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING *',
        [newUser.email, newUser.firstname, newUser.lastname, hash]
      )
      if (!result.rows[0])
        throw new CustomError.DatabaseConnectionError('Error getting users')
      return result.rows[0]
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    const result = await db.query('SELECT password FROM users WHERE email=$1', [
      email,
    ])

    if (!result.rows[0])
      throw new CustomError.NotFoundError(`Email: ${email} doesn't exist`)

    const { password: savedPassword } = result.rows[0]
    const isPasswordValid = await bcrypt.compare(
      `${password}${pepper}`,
      savedPassword
    )
    if (isPasswordValid) {
      const user = await db.query('SELECT * FROM users WHERE email=$1', [email])
      return user.rows[0]
    } else throw new CustomError.BadRequestError('Invalid password')
  }
}

export default UserModel
