export interface ServerConfig {
  publicRead: boolean
  discordUrl: string | null
}

export type ZoneColor =
  | 'black'
  | 'red'
  | 'yellow'
  | 'blue'
  | 'road'
  | 'road-ho'
  | 'city'
  | 'home'

export type Tier = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII'

// 0 is a royal to royal connection
export type PortalSize = 0 | 2 | 7 | 20
export interface Resource {
  name: string
  tier: string
  count: number
}

export interface Marker {
  name: string
  pos: [number, number]
}

export interface Mob {
  name: string
  tier: string
  count: number
}

export interface ZoneLite {
  id: number
  name: string
  tier: string
  color: ZoneColor
  type: string
  isDeep?: boolean
}
export interface ZoneInfo {
  markers?: Marker[]
  resources?: Resource[]
  mobs?: Mob[]
  royalConnections?: ZoneLite[]
  miniMapUrl?: string
}

export interface Zone extends ZoneLite {
  albionId?: string
  info?: ZoneInfo
}

export interface PortalPayload {
  connection: [string, string] // sorted alphabetically
  size: PortalSize
  hours: number
  minutes: number
}
export interface Portal {
  id: number
  connection: [string, string] // sorted alphabetically
  size: PortalSize
  expiresUtc: string
  timeLeft: number
}

// Discord API
export interface DiscordMe {
  id: string
  username?: string
  discriminator?: string
}

export interface DiscordMeGuild {
  id: string
  name: string
  icon: string
  owner: boolean
  permissions: string
  features: string[]
}

// Database
export interface DBConfig {
  host: string
  user: string
  password: string
  database: string
  port: number
}

export interface RedisConfig {
  host: string
  password: string
  port: number
}

export interface IZoneModel {
  id: number
  albion_id: string
  zone_name: string
  tier: Tier
  zone_type: string
  color: ZoneColor
  is_deep_road: boolean
}
