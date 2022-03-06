import User from '../types/user.type'
import db from '../db/connect'

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
    const result = await db.query(
      'INSERT INTO users (email, firstName, lastName, password) VALUES ($1, $2, $3, $4) RETURNING *',
      [newUser.email, newUser.firstName, newUser.lastName, newUser.password]
    )
    return result.rows[0]
  }
}

export default UserModel
