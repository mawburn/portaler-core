import BaseModel, { DBQuery } from './BaseModel'
import { WinstonLog } from '@portaler/logger'

export default class LogsModel extends BaseModel {
  constructor(dbQuery: DBQuery) {
    super(dbQuery)
  }

  winstonLog = (info: WinstonLog) => {
    this.query(
      `
      INSERT INTO server_logs (log_type, log_subtype, log_data)
      VALUES ($1, $2, $3);
    `,
      [`winston_${info.level}`, info.metadata.service, JSON.stringify(info)]
    )
  }

  getLatestCommit = async (): Promise<string> => {
    const log = await this.query(
      `
    SELECT log_data::text FROM server_logs
    WHERE log_type = 'etl-update'
    ORDER BY created_on DESC
    LIMIT 1;`,
      []
    )

    if (log.rowCount === 0) {
      return 'not here'
    }

    return JSON.parse(log.rows[0].log_data).hash
  }

  updateLatestCommit = async (hash: string): Promise<void> => {
    await this.query(
      `
    INSERT INTO server_logs (log_type, log_data) VALUES
    ('etl-update', $1);
  `,
      [JSON.stringify({ hash })]
    )

    return
  }
}
