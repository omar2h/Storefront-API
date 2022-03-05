import cors from 'cors'
import express, { Request, Response } from 'express'
import morgan from 'morgan'

const app: express.Application = express()
app.use(express.json())
app.use(morgan('tiny'))
app.use(cors())

app.get('/', function (req: Request, res: Response) {
  res.send('Hello World!')
})

export default app
