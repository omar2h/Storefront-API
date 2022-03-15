import { Request, Response } from 'express'
import OrderModel from '../models/order.model'
import CustomError from '../errors'

const orderModel = new OrderModel()

const getAllOrders = async (req: Request, res: Response) => {
  const orders = await orderModel.index()
  res.json({ orders })
}

const getOrdersSingleUser = async (req: Request, res: Response) => {
  const orders = await orderModel.showAll(
    req.params.id,
    req.query.status as string
  )
  if (!orders)
    throw new CustomError.NotFoundError(`ID: ${req.params.id} doesn't exist`)
  res.json({ orders })
}

const createOrder = async (req: Request, res: Response) => {
  const order = await orderModel.create(req.body)
  if (!order) throw new CustomError.BadRequestError('Invalid order information')
  res.json({ order })
}

const addProduct = async (req: Request, res: Response) => {
  const orderId: string = req.params.id
  const productId: string = req.body.productId
  const quantity: number = parseInt(req.body.quantity)

  const addedProduct = await orderModel.addProduct(orderId, productId, quantity)
  res.json({ addedProduct })
}

export { getAllOrders, getOrdersSingleUser, createOrder, addProduct }
