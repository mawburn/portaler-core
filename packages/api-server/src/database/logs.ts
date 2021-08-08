import { UserAction } from '../../../../shared/data-models/out/models/User'
import { PortalPayload } from '../../../../shared/types'
import { db } from '../utils/db'

export interface UserLogs {
  name: stringx
  action: UserAction
  data: PortalPayload |
}

export const getServerLogs = async (
  serverId: number,
  action: UserAction,
  range: [number, number] = [0, 1000]
): Promise<any> => {
  const rows = await db.dbQuery(
    `
      SELECT
        ul.user_action,
        ul.details,
        ul.created_on
        u.discord_name,
        FROM user_logs ul
        JOIN users u ON u.id = ul.user_id
        WHERE server_id = $1 AND user_action <> "login"
        ORDER BY ul.created_on DESC
        LIMIT ($2, $3);
    `,
    [serverId, range[0], range[1]]
  )
}
