import { PortalSize } from '@portaler/types'
import { db } from '../utils/db'

export interface IPortalModel {
  id: number
  serverId: number
  conn1: string
  conn2: string
  size: PortalSize
  expires: Date
  created_by: number
  created_on: Date
}

export const getServerPortals = async (
  serverId: number
): Promise<IPortalModel[]> =>
  (await db.dbQuery('SELECT * FROM portals WHERE server_id = $1;', [serverId]))
    .rows
