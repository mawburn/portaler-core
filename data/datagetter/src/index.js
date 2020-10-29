const fs = require('fs')

const zones = require('./zones')
const tiers = require('./tiers')

const tierList = ['0', 'I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII']

const update = async () => {
  const trgx = /(.*)(\(T)(\d)(.*)/i

  const filteredTiers = []

  for (let i = 0; i < tiers.length; i++) {
    const arr = trgx.exec(tiers[i].displayname) || ['', '', '']

    if (arr[1].length) {
      filteredTiers.push({
        id: tiers[i].id,
        name: arr[1].trim(),
        tier: tierList[arr[3]],
        type: tiers[i].type,
      })
    }

    console.log(tiers[i])
  }

  const missing = zones
    .map((z) => {
      const found = filteredTiers.find((f) =>
        f.name.toLowerCase().includes(z.toLowerCase())
      )

      if (found) {
        return null
      }

      return z
    })
    .filter(Boolean)

  console.log(filteredTiers.length)

  fs.writeFileSync(
    'output.json',
    JSON.stringify(filteredTiers, null, 2),
    (err) => {
      err && console.log(err)
    }
  )

  fs.writeFileSync('missing.json', JSON.stringify(missing, null, 2), (err) => {
    err && console.log(err)
  })
}

update()
