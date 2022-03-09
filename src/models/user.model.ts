import bcrypt from 'bcrypt'

import User from '../types/user.type'
import db from '../db/connect'

const saltRounds = parseInt(process.env.SALT_ROUNDS as string)
const pepper = process.env.BCRYPT_PASSWORD

class UserModel {
  async index(): Promise<User[]> {
    const result = await db.query('SELECT * FROM users')
    return result.rows
  }

  async show(id: string): Promise<User> {
    const result = await db.query('SELECT * FROM users WHERE user_uid=$1', [id])
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
      return result.rows[0]
    } else {
      const hash = bcrypt.hashSync(newUser.password + pepper, saltRounds)
      const result = await db.query(
        'INSERT INTO users (email, firstname, lastname, password) VALUES ($1, $2, $3, $4) RETURNING *',
        [newUser.email, newUser.firstname, newUser.lastname, hash]
      )
      return result.rows[0]
    }
  }
}

export default UserModel
