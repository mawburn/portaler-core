
export type ZoneColor = "black" | "red" | "yellow" | "blue" | "road";

export type PortalSize = 2 | 7 | 20;

export interface Zone {
  color: ZoneColor;  
  name: string;
}

export interface Portal {
  source: string;
  target: string;
  size: PortalSize;
  expires: Date;
  timeLeft: number;
}
