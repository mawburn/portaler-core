import 'dotenv/config'
import FullZone from './FullZone'
import fs from 'fs'

import getNewFile from './getNewFile'
import worldProcess from './worldProcess'

// 86400 seconds in a day
const twoDays = 86400 * 2 * 1000

const fileGetter = async () => {
  const fileData: FullZone[] | null = await getNewFile()

  if (!fileData) {
    return
  }

  const inserts = worldProcess(fileData)

  inserts.forEach((file, i) => {
    fs.writeFileSync(`./file-${i}.sql`, file)
  })
}

fileGetter()

setInterval(() => fileGetter, twoDays)
