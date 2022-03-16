import { Request, Response } from 'express'

import DashboardQueries from '../services/dashboard.service'
import CustomError from '../errors'
const dashboard = new DashboardQueries()

const getAllOrders = async (req: Request, res: Response) => {
  const orders = await dashboard.allOrdersWithProducts()
  res.json({ orders })
}

const getOrder = async (req: Request, res: Response) => {
  const order = await dashboard.singleOrderWithProducts(req.params.id)
  if (!order)
    throw new CustomError.NotFoundError(
      `Order with ID: ${req.params.id} doesn't exist`
    )
  res.json({ order })
}

const getUserOrders = async (req: Request, res: Response) => {
  const orders = await dashboard.getUserOrders(
    req.params.id,
    req.query.status as string
  )

  if (!orders)
    throw new CustomError.NotFoundError(
      `User with ID: ${req.params.id} doesn't exist`
    )
  res.json({ orders })
}

export { getAllOrders, getOrder, getUserOrders }
