import { Pool, PoolConfig, QueryResult } from 'pg';
import ServerModel from './models/Server';
import UserModel from './models/User';
export default class DatabaseConnector {
    pool: Pool;
    constructor(config: PoolConfig);
    dbQuery: (query: string, params: (string | number)[]) => Promise<QueryResult>;
    Server: ServerModel;
    User: UserModel;
}
