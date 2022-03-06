import cors from 'cors'
import express, { Request, Response } from 'express'
import morgan from 'morgan'
import products from './routes/products.route'
import users from './routes/users.route'
import orders from './routes/orders.route'

const app: express.Application = express()
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

require('./db/connect')
app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!')
})

app.use('/api/v1/products', products)
app.use('/api/v1/users', users)
app.use('/api/v1/orsers', orders)

export default app
