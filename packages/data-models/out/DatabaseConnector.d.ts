import { Pool, PoolConfig, QueryResult } from 'pg';
export default class DatabaseConnector {
    pool: Pool;
    constructor(config: PoolConfig);
    dbQuery: (query: string, params: (string | number)[]) => Promise<QueryResult>;
}
