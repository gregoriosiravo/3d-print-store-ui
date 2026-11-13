import { Pool } from 'pg'
import { apiEnv } from './env'

// Postgres is published on 127.0.0.1:5432 by docker compose
export function createPool() {
  const env = apiEnv()
  return new Pool({
    host: '127.0.0.1',
    port: 5432,
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,
  })
}
