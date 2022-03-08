import { Request, Response } from 'express'
import OrderModel from '../models/order.model'

const orderModel = new OrderModel()

const getAllOrders = async (req: Request, res: Response) => {
  const orders = await orderModel.index(
    req.params.id,
    req.query.status as string
  )
  res.json({ orders })
}

const createOrder = async (req: Request, res: Response) => {
  const order = await orderModel.create(req.body)
  console.log(order)
  res.json({ order })
}

export { getAllOrders, createOrder }
