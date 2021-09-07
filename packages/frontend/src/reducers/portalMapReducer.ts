import clone from 'lodash/cloneDeep'
import { Reducer } from 'react'

import { Portal, Zone } from '@portaler/types'

import { DEFAULT_ZONE } from '../common/data/constants'

export enum PortalMapActionTypes {
  UPDATEMAP = 'portals/updateMap',
  INSPECT = 'portals/inspectPortal',
  CLEARINSPECT = 'portals/clearInspectedPortal',
  CLEARALL = 'portals/clearAllPortals',
  CENTER = 'portals/centerZone',
}

interface PortalMapAction {
  type: PortalMapActionTypes
  portals?: Portal[]
  inspectFromId?: number
  inspectToId?: number
  centerZone?: Zone
}

export interface PortalMap {
  portals: Portal[]
  inspectFromId: number | null
  inspectToId: number | null
  lastUpdated: number
  centerZone: Zone
}

const initialState: PortalMap = {
  portals: [],
  inspectFromId: null,
  inspectToId: null,
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
      console.log(
        `inspecting a zone or connection, the inspectFromId is ${action.inspectFromId}, the inspectToId is ${action.inspectToId}`
      )
      return {
        ...state,
        inspectFromId: action.inspectFromId!,
        inspectToId: action.inspectToId || null,
      }
    case PortalMapActionTypes.CLEARINSPECT:
      return { ...state, inspectFromId: null, inspectToId: null }
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
