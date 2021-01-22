import fetch from 'node-fetch'

import { db } from './db'
import FullZone from './FullZone'

const accessToken: string = process.env.ACCESS_TOKEN!
const fileUrl: string = process.env.WORLD_FILE_URL!
let oldHash: string = ''

const gqlQuery = `
  query {
    repository(owner: "broderickhyman", name: "ao-bin-dumps") {
      ref(qualifiedName: "refs/heads/master") {
        target {
          ... on Commit {
            history(first: 1, path: "cluster/world.json") {
              edges {
                node {
                  oid
                }
              }
            }
          }
        }
      }
    }
  }
`

const getNewFile = async (): Promise<FullZone[] | null> => {
  try {
    if (oldHash === '') {
      const logRows = await db.dbQuery(`
        SELECT log_data::text FROM server_logs
        WHERE log_type = 'etl-update'
        ORDER BY created_on DESC
        LIMIT 1;`)

      if (logRows.rowCount) {
        oldHash = JSON.parse(logRows.rows[0].log_data).hash
      }
    }

    const githubResponse = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({ query: `${gqlQuery}` }),
    })

    if (!githubResponse.ok) {
      throw new Error('Github API Failure')
    }

    const json = await githubResponse.json()

    const hash = json.data.repository.ref.target.history.edges[0].node.oid

    if (hash === oldHash) {
      return null
    }

    await db.dbQuery(
      `
      INSERT INTO server_logs (log_type, log_data) VALUES
      ('etl-update', $1);
    `,
      [JSON.stringify({ hash })]
    )

    const fileJson = await fetch(fileUrl, { method: 'GET' }).then((res) => {
      if (!res.ok) {
        throw new Error('Get File Error')
      }

      return res.json()
    })

    const fileData: FullZone = fileJson.world.clusters.cluster
    const fileString = JSON.stringify(fileData).replace(/@/gi, '')

    return JSON.parse(fileString)
  } catch (err) {
    console.error(err)
    return null
  }
}

export default getNewFile
