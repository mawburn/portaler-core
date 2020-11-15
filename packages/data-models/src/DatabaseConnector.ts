import { Pool, PoolConfig, QueryResult } from 'pg'

export default class DatabaseConnector {
  pool: Pool

  constructor(config: PoolConfig) {
    this.pool = new Pool(config)
  }

  dbQuery = (
    query: string,
    params: (string | number)[]
  ): Promise<QueryResult> => this.pool.query(query, params)
}
