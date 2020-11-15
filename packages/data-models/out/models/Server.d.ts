import { QueryResult } from 'pg';
interface ServerRoles {
    id: number;
    discordRoleId: string;
    lastUpdated: string;
}
export interface IServerModel {
    id: number;
    discordId: string;
    discordName: string;
    roles: ServerRoles[];
    subdomain?: string | null;
    createdOn: Date;
}
export default class ServerModel {
    private query;
    constructor(dbQuery: (query: string, params: (string | number)[]) => Promise<QueryResult>);
    create: (discordId: string, discordName: string) => Promise<number>;
    createRole: (serverId: number, roleId: string) => Promise<number>;
    getServer: (id: number | string) => Promise<IServerModel | null>;
    getServerIdBySubdomain: (subDomain: string) => Promise<number>;
}
export {};
