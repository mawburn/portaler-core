import 'dotenv/config'
import FullZone from './FullZone'

import getNewFile from './getNewFile'
import worldProcess from './worldProcess'

// 86400 seconds in a day
const twoDays = 86400 * 2 * 1000

const fileGetter = async () => {
  const fileData: FullZone[] | null = await getNewFile()

  if (!fileData) {
    return
  }

  worldProcess(fileData)
}

fileGetter()

setInterval(() => fileGetter, twoDays)
