import cors from 'cors'
import express, { Request, Response } from 'express'
import 'express-async-errors'
import morgan from 'morgan'

// routes
import productsRouter from './routes/products.route'
import usersRouter from './routes/users.route'
import ordersRouter from './routes/orders.route'
import authRouter from './routes/auth.routes'

// middleware
import errorHandlerMiddleware from './middleware/error-handler'
import notFoundMiddleware from './middleware/not-found'

const app: express.Application = express()
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

app.get('/', (req: Request, res: Response) => {
  res.send('<h1>StoreFront API</h1>')
})

app.use('/api/v1/products', productsRouter)
app.use('/api/v1/users', usersRouter)
app.use('/api/v1/orders', ordersRouter)
app.use('/api/v1/auth', authRouter)

app.use(errorHandlerMiddleware)
app.use(notFoundMiddleware)

export default app
