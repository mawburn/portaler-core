import clone from 'lodash/cloneDeep'
import { Reducer } from 'react'

import { Portal, Zone, PortalSize } from '@portaler/types'

import { DEFAULT_ZONE } from '../common/data/constants'

export enum PortalMapActionTypes {
  UPDATEMAP = 'portals/updateMap',
  INSPECT = 'portals/inspectPortal',
  INSPECTNODE = 'portals/inspectNode',
  CLEARINSPECT = 'portals/clearInspectedPortal',
  CLEARALL = 'portals/clearAllPortals',
  CENTER = 'portals/centerZone',
}

interface PortalMapAction {
  type: PortalMapActionTypes
  portals?: Portal[]
  inspectFromId?: number
  inspectToId?: number
  timeLeft?: number
  size?: PortalSize
  centerZone?: Zone
}

export interface PortalMap {
  portals: Portal[]
  inspectFromId: number | null
  inspectToId: number | null
  timeLeft: number | null
  size: PortalSize | null
  lastUpdated: number
  centerZone: Zone
}

const initialState: PortalMap = {
  portals: [],
  inspectFromId: null,
  inspectToId: null,
  timeLeft: null,
  size: null,
  lastUpdated: 0,
  centerZone: DEFAULT_ZONE,
}

const portalMapReducer: Reducer<any, PortalMapAction> = (
  state: PortalMap = clone(initialState),
  action: PortalMapAction
): PortalMap => {
  const now = new Date()

  if (action.type === PortalMapActionTypes.UPDATEMAP) {
    return {
      ...state,
      lastUpdated: now.getTime(),
      portals: clone(action.portals) ?? [],
    }
  }

  switch (action.type) {
    case PortalMapActionTypes.INSPECT:
      return {
        ...state,
        inspectFromId: action.inspectFromId!,
        inspectToId: action.inspectToId ?? DEFAULT_ZONE.id,
        size: action.size ?? null,
        timeLeft: action.timeLeft ?? null,
      }
    case PortalMapActionTypes.INSPECTNODE:
      return {
        ...state,
        inspectFromId: action.inspectFromId!,
        inspectToId: DEFAULT_ZONE.id,
        size: null,
        timeLeft: null,
      }
    case PortalMapActionTypes.CLEARINSPECT:
      return { ...state, inspectFromId: null, inspectToId: null, size: null }
    case PortalMapActionTypes.CLEARALL:
      return {
        ...state,
        portals: [],
        inspectFromId: null,
        inspectToId: null,
        lastUpdated: now.getTime(),
      }
    case PortalMapActionTypes.CENTER:
      return {
        ...state,
        centerZone: clone(action.centerZone || DEFAULT_ZONE),
      }
    default:
      return state
  }
}

export default portalMapReducer
