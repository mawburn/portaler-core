import { Pool, QueryResult } from 'pg'

import config from '../config'

const pool = new Pool(config.db)

export const dbQuery = (
  text: string,
  params: (string | number)[]
): Promise<QueryResult> => pool.query(text, params)
