import { Request, Response } from 'express'
import ProductModel from '../models/product.model'

const productModel = new ProductModel()

const getAllProducts = async (req: Request, res: Response) => {
  const products = await productModel.index()
  res.json({ products })
}

const getProduct = async (req: Request, res: Response) => {
  const product = await productModel.show(req.params.id)
  res.json({ product })
}

const createProduct = async (req: Request, res: Response) => {
  const product = await productModel.create(req.body)
  res.json({ product })
}

export { getAllProducts, getProduct, createProduct }
