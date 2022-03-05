import { Request, Response } from 'express'

const getAllOrders = (req: Request, res: Response) => {
  res.send('get all orders')
}

export { getAllOrders }
