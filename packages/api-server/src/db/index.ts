import { Pool, QueryResult } from 'pg'
import config from '../config'

const pool = new Pool(config.db)

export const query = (text: string, params: string[]): Promise<QueryResult> =>
  pool.query(text, params)
