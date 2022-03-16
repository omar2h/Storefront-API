import { Request, Response } from 'express'
import OrderModel from '../models/order.model'
import CustomError from '../errors'

const orderModel = new OrderModel()

const getAllOrders = async (req: Request, res: Response) => {
  const orders = await orderModel.index()
  res.json({ orders })
}

const getOrder = async (req: Request, res: Response) => {
  const order = await orderModel.show(req.params.id)
  if (!order)
    throw new CustomError.NotFoundError(
      `Order with ID: ${req.params.id} doesn't exist`
    )
  res.json({ order })
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
  if (!orderId || !productId || !quantity)
    throw new CustomError.BadRequestError(
      'Please provide order id, product id and quantity'
    )

  const addedProduct = await orderModel.addProduct(orderId, productId, quantity)
  res.json({ addedProduct })
}

export { getAllOrders, getOrder, createOrder, addProduct }
