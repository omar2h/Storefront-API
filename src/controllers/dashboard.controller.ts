import { Request, Response } from 'express'

import DashboardQueries from '../services/dashboard.service'
import CustomError from '../errors'
const dashboard = new DashboardQueries()

const getAllOrders = async (req: Request, res: Response) => {
  try {
    const orders = await dashboard.allOrdersWithProducts()
    res.json({ orders })
  } catch (err) {
    throw new Error()
  }
}

const getOrder = async (req: Request, res: Response) => {
  try {
    const order = await dashboard.singleOrderWithProducts(req.params.id)
    if (!order)
      throw new CustomError.NotFoundError(
        `Order with ID: ${req.params.id} doesn't exist`
      )
    res.json({ order })
  } catch (err) {
    throw new Error()
  }
}

const getUserOrders = async (req: Request, res: Response) => {
  try {
    const orders = await dashboard.getUserOrders(
      req.params.id,
      req.query.status as string
    )

    if (!orders)
      throw new CustomError.NotFoundError(
        `User with ID: ${req.params.id} doesn't exist`
      )
    res.json({ orders })
  } catch (err) {
    throw new Error()
  }
}

export { getAllOrders, getOrder, getUserOrders }
