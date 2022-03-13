import cors from 'cors'
import express, { Request, Response } from 'express'
import 'express-async-errors'
import morgan from 'morgan'
import productsRouter from './routes/products.route'
import usersRouter from './routes/users.route'
import ordersRouter from './routes/orders.route'
import errorHandlerMiddleware from './middleware/error-handler'
import notFoundMiddleware from './middleware/not-found'

const app: express.Application = express()
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send(
    '<h1>StoreFront API</h1><a href="/api/v1/products">Products route</a> <a href="/api/v1/users">Users route</a>'
  )
})

app.use('/api/v1/products', productsRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/orders', ordersRouter)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

export default app
