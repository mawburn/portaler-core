/// <reference types="typescript" />
export type ZoneColor = 'black' | 'red' | 'yellow' | 'blue' | 'road'

export type Tier = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII'

// 0 is a royal to royal connection
export type PortalSize = 0 | 2 | 7 | 20

export type ZoneId = string

export interface Resource {
  name: string
  tier: Tier
}

export interface ZoneInfo {
  markers?: string[]
  resources?: Resource[]
  royalConnections?: ZoneId[]
  miniMapUrl?: string
}

export interface Zone {
  id: ZoneId
  name: string
  color: ZoneColor
  type: string
  tier: Tier
  info?: ZoneInfo
}

export interface Portal {
  connection: [string, string] // sorted alphabetically
  size: PortalSize
  expiresUtc: Date
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
