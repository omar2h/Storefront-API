import { Request, Response } from 'express'

const getAllProducts = (req: Request, res: Response) => {
  res.send('get All Products')
}

const getProduct = (req: Request, res: Response) => {
  res.json({ id: req.params.id })
}

const createProduct = (req: Request, res: Response) => {
  res.json(req.body)
}

export { getAllProducts, getProduct, createProduct }
