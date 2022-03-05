import { Request, Response } from 'express'

const getAllUsers = (req: Request, res: Response) => {
  res.send('get All Users')
}

const getUser = (req: Request, res: Response) => {
  res.json({ id: req.params.id })
}

const createUser = (req: Request, res: Response) => {
  res.json(req.body)
}

export { getAllUsers, getUser, createUser }
