import fs from 'fs'

const fileName = './worlds.json'
processFile(fileName)

function processFile(n: string) {
    fs.readFile(n, 'utf8', function (err,data) {
        if (err) {
          return console.log(err);
        }
        handleJson(JSON.parse(data))
      });
}

function handleJson(data: any) {
    const cluster = data.world.clusters.cluster
    const selectedFields = []
    for (let m of cluster) {
      const sf = {
        "name": m["@displayname"],
        "type": m["@type"],
        "resources": extractResources(m),
        "markers": extractMapMarkers(m),
      }
      selectedFields.push(sf)
    }
    const stringData = JSON.stringify(selectedFields.filter(isValidZone))
    fs.writeFileSync("data-dump.json", stringData)
}

function isValidZone(sf: any) {
  const type: String = sf.type
  return (type.startsWith("TUNNEL") || type.startsWith("OPENPVP") || type.startsWith("SAFEAREA"))
}

function extractResources(m: any) {
  return m.distribution?.resource ?? []
}

function extractMapMarkers(m: any) {
  return m.minimapmarkers?.marker ?? []
}
