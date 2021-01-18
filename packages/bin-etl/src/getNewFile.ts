import fetch from 'node-fetch'
import md5 from 'md5'
import FullZone from './FullZone'

const fileUrl: string = process.env.WORLD_FILE_URL!
let oldMd5: string = ''

const getNewFile = async (): Promise<FullZone[] | null> => {
  try {
    const fileResponse = await fetch(fileUrl, { method: 'GET' })

    if (!fileResponse.ok) {
      throw new Error('File not found')
    }

    const fileData = (await fileResponse.json()).world.clusters.cluster
    const fileString = JSON.stringify(fileData)
    const newMd5 = md5(fileString)

    if (newMd5 !== oldMd5) {
      oldMd5 = newMd5

      return JSON.parse(fileString.replace(/@/gi, ''))
    }

    return null
  } catch (err) {
    console.error(err)
    return null
  }
}

export default getNewFile
