import { v4 as uuidv4 } from 'uuid'

import db from '../../db/connect'
import UserModel from '../../models/user.model'
import User from '../../types/user.type'

const userModel = new UserModel()

describe('User Model', () => {
  describe('test methods definition', () => {
    it('should have an index method', () => {
      expect(userModel.index).toBeDefined()
    })

    it('should have a show method', () => {
      expect(userModel.show).toBeDefined()
    })

    it('should have a create method', () => {
      expect(userModel.create).toBeDefined()
    })
  })

  describe('test methods', () => {
    const user_uid1 = uuidv4()
    const user_uid2 = uuidv4()
    const user1: User = {
      user_uid: user_uid1,
      email: 'user1@mail.com',
      firstname: 'user1',
      lastname: 'user2',
      password: '123',
    }

    const user2: User = {
      user_uid: user_uid2,
      email: 'user2@mail.com',
      firstname: 'user1',
      lastname: 'user2',
      password: '123',
    }
    // afterAll(async () => {
    //   db.query('DELETE FROM users CASCADE;')
    // })

    it('create method should return user', async () => {
      const result = await userModel.create(user1)
      const testUser = {
        user_uid: result.user_uid,
        ...user1,
      }
      expect(result).toEqual(testUser)
    })

    it('index method should return list of users', async () => {
      const result = await userModel.index()
      const usersList = [
        {
          user_uid: result[0].user_uid,
          ...user1,
        },
      ]
      expect(JSON.stringify(result)).toEqual(JSON.stringify(usersList))
    })

    it('show method should return user', async () => {
      const newUser = await userModel.create(user2)
      const result = await userModel.show(newUser.user_uid as string)

      const testUser = {
        user_uid: result.user_uid,
        ...user2,
      }
      expect(JSON.stringify(result)).toEqual(JSON.stringify(testUser))
    })
  })
})
