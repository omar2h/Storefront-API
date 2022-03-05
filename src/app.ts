import cors from 'cors'
import express, { Request, Response } from 'express'
import morgan from 'morgan'
import products from './routes/products.routes'
import users from './routes/users.routes'

const app: express.Application = express()
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!')
})

app.use('/api/v1/products', products)
app.use('/api/v1/users', users)

export default app
