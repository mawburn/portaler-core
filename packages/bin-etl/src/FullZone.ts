export interface Connection {
  to: string
  type?: string // look at later
  costmodifier?: string
  noluggage?: string
}

export interface Territory {
  id: string
  name: string
  territorytype: string
  resourcetype: string
  center: string
  size: string
  monolith: string
  connections: null | {
    connection: Connection[]
  }
}

interface Exit {
  id: string
  targetid: string
  targettype: string
  territory: string
  restricted: string
  pos: string
  roadtype: string
}

interface PortalExit {
  id: string
  pos: string
  kind: string
  targetid: string
}

interface MapMarker {
  type: string
  pos: string
}

interface TravelPoint {
  id: string
  pos: string
  connections: {
    connection: Connection | Connection[]
  }
}

interface Outpost {
  id: string
  type: string
  pos: string
}

interface Road {
  nodes: string
  links: string
}

interface Resource {
  name: string
  tier: string
  count: string
}

interface Mob {
  name: string
  count: string
}

export default interface FullZone {
  id: string
  file: string
  displayname: string
  enabled: string
  type: string
  timeregion: string
  rareresourcedistribution: string
  speciallocation: string
  origin: string
  size: string
  categoryname: string
  editoroffset: string
  worldmapposition?: string
  minimapBoundsMin: string
  minimapBountsMax: string
  minimapHeightRange: string
  minimapBaseLevel: string
  territories?: {
    territory: Territory | Territory[]
  }
  exits: null | {
    exit: Exit | Exit[]
  }
  portalexits?: {
    portalexit: PortalExit | PortalExit[]
  }
  minimapmarkers?: {
    marker: MapMarker | MapMarker[]
  }
  travelpoints?: {
    travelpoint: TravelPoint | TravelPoint[]
  }
  worldmapmarkers?: {
    marker: MapMarker | MapMarker[]
  }
  hellgatemobspawnpoints?: {
    hellgatemobspawnpoint: MapMarker | MapMarker[]
  }
  outposts: {
    outpost: Outpost | Outpost[]
  }
  roads: Road
  distribution: {
    realestates: string
    resouce: Resource[]
  }
  mobcounts: {
    mob: Mob | Mob[]
  }
}
