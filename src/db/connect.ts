import dotenv from 'dotenv'
import { Pool } from 'pg'

dotenv.config()
let pool: Pool
const {
  POSTGRES_HOST,
  POSTGRES_USER,
  POSTGRES_PORT,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_DB_TEST,
  ENV,
} = process.env

if (ENV === 'dev') {
  pool = new Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    port: parseInt(POSTGRES_PORT as string),
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB,
  })
}

if (ENV === 'test') {
  pool = new Pool({
    host: POSTGRES_HOST,
    user: POSTGRES_USER,
    port: parseInt(POSTGRES_PORT as string),
    password: POSTGRES_PASSWORD,
    database: POSTGRES_DB_TEST,
  })
}

export = {
  query: (sql: string, params?: (string | number | undefined)[]) =>
    pool.query(sql, params),
}
