declare namespace Express {
  export interface Request {
    userId: number
    serverId: number
    isReadOnly: boolean
    isPublic: boolean
  }
}
