import clone from 'lodash/cloneDeep'
import { Reducer } from 'react'

import { Portal, PortalSize, Zone } from '@portaler/types'

import { DEFAULT_ZONE } from '../common/data/constants'

export enum PortalMapActionTypes {
  UPDATEMAP = 'portals/updateMap',
  EDIT = 'portals/edit',
  INSPECTNODE = 'portals/inspectNode',
  CLEARINSPECT = 'portals/clearInspectedPortal',
  CLEARALL = 'portals/clearAllPortals',
  CENTER = 'portals/centerZone',
  CLEARAFTERCREATE = 'portals/clearAfterCreate',
}

interface PortalMapAction {
  type: PortalMapActionTypes
  portals?: Portal[]
  inspectFromId?: number
  inspectToId?: number
  timeLeft?: number
  size?: PortalSize
  centerZone?: Zone
  editing: boolean
}

export interface PortalMap {
  portals: Portal[]
  inspectFromId: number | null
  inspectToId: number | null
  timeLeft: number | null
  size: PortalSize | null
  lastUpdated: number
  centerZone: Zone
  editing: boolean
}

const initialState: PortalMap = {
  portals: [],
  inspectFromId: null,
  inspectToId: null,
  timeLeft: null,
  size: null,
  lastUpdated: 0,
  centerZone: DEFAULT_ZONE,
  editing: false,
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
    case PortalMapActionTypes.EDIT:
      console.log('Edit from reducer')
      return {
        ...state,
        inspectFromId: action.inspectFromId!,
        inspectToId: action.inspectToId ?? DEFAULT_ZONE.id,
        size: action.size ?? null,
        timeLeft: action.timeLeft ?? null,
        editing: true,
      }
    case PortalMapActionTypes.INSPECTNODE:
      return {
        ...state,
        inspectFromId: action.inspectFromId!,
        inspectToId: DEFAULT_ZONE.id,
        size: null,
        timeLeft: null,
        editing: false,
      }
    case PortalMapActionTypes.CLEARINSPECT:
      console.log('Clear from reducer')
      return {
        ...state,
        inspectFromId: null,
        inspectToId: null,
        size: null,
        timeLeft: null,
        editing: false,
      }
    case PortalMapActionTypes.CLEARAFTERCREATE:
      console.log('Clear after Create from reducer')
      return {
        ...state,
        inspectFromId: null,
        inspectToId: null,
        size: null,
        timeLeft: null,
        editing: false,
      }
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
