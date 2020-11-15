import { QueryResult } from 'pg';
import { DiscordMe, DiscordMeGuild } from '@portaler/types';
import { GuildMember } from 'discord.js';
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
    createUser: (member: GuildMember, serverId: number, roles: number[]) => Promise<QueryResult<any>[]>;
    createLogin: (userInfo: DiscordMe, servers: DiscordMeGuild[], refreshToken: string) => Promise<number>;
    addRoles: (userId: number, roleIds: number[]) => Promise<boolean>;
    getUserByDiscord: (userId: string) => Promise<IUserModel | null>;
    getFullUser: (userId: number | string, serverId: number) => Promise<IUserModel>;
    removeUserRoles: (userId: number, roleIds: number[]) => Promise<QueryResult<any>[]>;
    removeUserServer: (userId: number, serverId: number) => Promise<QueryResult<any>>;
}
export {};
