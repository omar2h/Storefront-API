import dotenv from 'dotenv'
import { Client } from 'pg'

dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PORT,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env

const client = new Client({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  port: parseInt(POSTGRES_PORT as string),
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
})

export default client
