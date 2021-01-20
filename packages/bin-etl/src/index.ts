import 'dotenv/config'

import fs from 'fs'

import getDb from './db'
import FullZone from './FullZone'
import getNewFile from './getNewFile'
import worldProcess from './worldProcess'

const twoHours = 7200 * 1000

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

;(async () => {
  await getDb()

  fileGetter()

  setInterval(fileGetter, twoHours)
})()
