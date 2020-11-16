import { RedisClient, ClientOpts } from 'redis';
export default class RedisConnector {
    client: RedisClient;
    getAsync: (key: string) => Promise<any>;
    setAsync: (key: string, value: string) => Promise<any>;
    delAsync: (key: string) => Promise<any>;
    constructor(config: ClientOpts);
    setUser: (token: string, userId: number, serverId: number) => Promise<[any, any]>;
    getUser: (token: string) => Promise<string>;
    getToken: (userId: number, serverId: number) => Promise<any>;
    delUser: (token: string, userId: number, serverId: number) => Promise<[any, any]>;
}
