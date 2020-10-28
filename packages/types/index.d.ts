/// <reference types="typescript" />
export type ZoneColor = 'black' | 'red' | 'yellow' | 'blue' | 'road'

export type Tier = 'I' | 'II' | 'III' | 'IV' | 'V' | 'VI' | 'VII' | 'VIII'

export type PortalSize = 2 | 7 | 20

export type ZoneId = string

export interface Resource {
  name: string
  tier: Tier
}

export interface ZoneInfo {
  color: ZoneColor
  type: string
  tier: Tier
  markers: string[]
  resources: Resource[]
  royalConnections?: ZoneId[]
}

export interface Zone {
  id: ZoneId
  name: string
  info?: ZoneInfo
}

export interface Portal {
  source: string
  target: string
  size: PortalSize
  expires: Date
  timeLeft: number
}
