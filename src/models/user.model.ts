import bcrypt from 'bcrypt'

import User from '../types/user.type'
import db from '../db/connect'

const saltRounds = parseInt(process.env.SALT_ROUNDS as string)
const pepper = process.env.BCRYPT_PASSWORD

class UserModel {
  async index(): Promise<User[]> {
    try {
      const result = await db.query('SELECT * FROM users')
      return result.rows
    } catch (error) {
      throw new Error()
    }
  }

  async show(id: string): Promise<User> {
    try {
      const result = await db.query('SELECT * FROM users WHERE user_uid=$1', [
        id,
      ])
      return result.rows[0]
    } catch (error) {
      throw new Error()
    }
  }

  async create(newUser: User): Promise<User> {
    try {
      if (newUser.user_uid) {
        const hash = bcrypt.hashSync(
          (newUser.password as string) + pepper,
          saltRounds
        )
        const result = await db.query(
          'INSERT INTO users (user_uid, email, firstname, lastname, password) VALUES ($1, $2, $3, $4, $5) RETURNING *',
          [
            newUser.user_uid,
            newUser.email,
            newUser.firstname,
            newUser.lastname,
            hash,
          ]
        )
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
        return result.rows[0]
      }
    } catch (error) {
      throw new Error()
    }
  }

  async authenticate(email: string, password: string): Promise<User | null> {
    try {
      const result = await db.query(
        'SELECT password FROM users WHERE email=$1',
        [email]
      )

      const { password: savedPassword } = result.rows[0]

      const isPasswordValid = await bcrypt.compare(
        `${password}${pepper}`,
        savedPassword
      )
      if (isPasswordValid) {
        const user = await db.query('SELECT * FROM users WHERE email=$1', [
          email,
        ])
        return user.rows[0]
      } else return null
    } catch (error) {
      throw new Error()
    }
  }
}

export default UserModel
