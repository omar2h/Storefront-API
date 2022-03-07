import { Request, Response } from 'express'
import OrderModel from '../models/order.model'

const orderModel = new OrderModel()

const getAllOrders = async (req: Request, res: Response) => {
  const orders = await orderModel.index(req.params.id)
  res.json({ orders })
}

const getAllActiveOrders = async (req: Request, res: Response) => {
  const status = 'active'
  const orders = await orderModel.index(req.params.id, status)
  res.json({ orders })
}

const getAllCompleteOrders = async (req: Request, res: Response) => {
  const status = 'complete'
  const orders = await orderModel.index(req.params.id, status)
  res.json({ orders })
}

const createOrder = async (req: Request, res: Response) => {
  const order = await orderModel.create(req.body)
  console.log(order)
  res.json({ order })
}

export { getAllOrders, createOrder, getAllActiveOrders, getAllCompleteOrders }
