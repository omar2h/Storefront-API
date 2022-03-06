import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()

const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PORT,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
} = process.env

const pool = new Pool({
  host: POSTGRES_HOST,
  user: POSTGRES_USER,
  port: parseInt(POSTGRES_PORT as string),
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
})

export = {
  query: (sql: string, params?: (string | number | undefined)[]) =>
    pool.query(sql, params),
}
