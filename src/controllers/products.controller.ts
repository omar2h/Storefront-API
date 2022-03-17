import { Request, Response } from 'express'
import ProductModel from '../models/product.model'
import CustomError from '../errors'

const productModel = new ProductModel()

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const products = await productModel.index()
    res.json({ products })
  } catch (err) {
    throw new Error()
  }
}

const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await productModel.show(req.params.id)
    if (!product)
      throw new CustomError.NotFoundError(`ID: ${req.params.id} doesn't exist`)
    res.json({ product })
  } catch (err) {
    throw new Error()
  }
}

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = await productModel.create(req.body)
    if (!product)
      throw new CustomError.BadRequestError('Invalid product information')
    res.json({ product })
  } catch (err) {
    throw new Error()
  }
}

export { getAllProducts, getProduct, createProduct }
