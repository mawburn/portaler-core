import { db } from '../db'

export const getServerPortals = async (serverId: number) =>
  (await db.dbQuery('SELECT * FROM portals WHERE server_id = $1;', [serverId]))
    .rows
