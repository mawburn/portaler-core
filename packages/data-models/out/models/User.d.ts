import { QueryResult } from 'pg';
import { DiscordMe, DiscordMeGuild } from '@portaler/types';
interface ServerRoleId {
    serverId: string;
    roleId: string;
}
export interface IUserModel {
    id: number;
    discordId: string;
    discordName: string;
    serverAccess?: ServerRoleId[];
    discordRefresh?: string | null;
    createdOn: Date;
}
export default class UserModel {
    private query;
    constructor(dbQuery: (query: string, params: (string | number)[]) => Promise<QueryResult>);
    create: (userInfo: DiscordMe, servers: DiscordMeGuild[], refreshToken: string) => Promise<number>;
    addRoles: (userId: number, roleId: number) => Promise<boolean>;
    getUser: (userId: number | string, serverId: number) => Promise<IUserModel>;
}
export {};
