const fs = require('fs')

const tiers = require('./tiers')

const tierList = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

const excludeTypes = [
  'PLAYERCITY_SAFEAREA_NOFURNITURE',
  'PLAYERCITY_BLACK_ROYAL_NOFURNITURE',
]

const update = async () => {
  const trgx = /(.*)(\(T)(\d)(.*)/i

  const filteredTiers = []
  const compressedTiers = []

  for (let i = 0; i < tiers.length; i++) {
    const arr = trgx.exec(tiers[i].displayname) || ['', '', '']

    if (
      arr[1].length &&
      !excludeTypes.includes(tiers[i].type) &&
      !arr[1].trim().includes('RoadPve')
    ) {
      filteredTiers.push({
        id: tiers[i].id,
        name: arr[1].trim(),
        tier: tierList[arr[3]],
        type: tiers[i].type,
      })

      compressedTiers.push({
        name: arr[1].trim(),
        tier: tierList[arr[3]],
      })
    }
  }

  fs.writeFileSync(
    './output.json',
    JSON.stringify(filteredTiers, null, 2),
    (err) => {
      err && console.log(err)
    }
  )

  fs.writeFileSync(
    './compressed.json',
    JSON.stringify(compressedTiers, null, 2),
    (err) => {
      err && console.log(err)
    }
  )
}

update()
