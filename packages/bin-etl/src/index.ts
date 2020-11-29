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
    const selectedFields = cluster.map(buildSelectedField)
    const stringData = JSON.stringify(selectedFields.filter(isValidZone))
    fs.writeFileSync("data-dump.json", stringData)
}

function buildSelectedField(m: any): any {
  return {
    "name": m["@displayname"],
    "type": m["@type"],
    "resources": extractResources(m),
    "markers": extractMapMarkers(m),
  }
}

function isValidZone(sf: any) {
  const type: String = sf.type
  return (type.startsWith("TUNNEL") || type.startsWith("OPENPVP") || type.startsWith("SAFEAREA") || type.startsWith("PLAYERCITY"))
}

function extractResources(m: any) {
  return m.distribution?.resource ?? []
}

function extractMapMarkers(m: any) {
  return m.minimapmarkers?.marker ?? []
}
