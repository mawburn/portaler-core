import { Pool, PoolConfig, QueryResult } from 'pg'

export default class DatabaseConnector extends Pool {
  constructor(config: PoolConfig) {
    super(config)
  }

  dbQuery = (
    query: string,
    params: (string | number)[]
  ): Promise<QueryResult> => this.query(query, params)
}
