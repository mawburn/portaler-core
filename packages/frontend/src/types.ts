export type ZoneColor = 'black' | 'red' | 'yellow' | 'blue' | 'road';

export type PortalSize = 2 | 7 | 20;

export interface Resource {
  name: string;
  tier: string;
}

export interface Zone {
  color: ZoneColor;
  name: string;
  type: string;
  markers: string[];
  resources: Resource[];
}

export interface Portal {
  source: string;
  target: string;
  size: PortalSize;
  expires: Date;
  timeLeft: number;
}
