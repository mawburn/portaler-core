import clone from 'lodash/cloneDeep'
import { Reducer } from 'react'

import { Portal } from '../common/types'

export enum PortalMapActionTypes {
  UPDATEMAP = 'portals/updateMap',
  INSPECT = 'portals/inspectPortal',
  CLEARINSPECT = 'portals/clearInspectedPortal',
  CLEARALL = 'portals/clearAllPortals',
}

interface PortalMapAction {
  type: PortalMapActionTypes
  portals?: Portal[]
  inspectId?: string
}

export interface PortalMap {
  portals: Portal[]
  inspectPortalId: string | null
  lastUpdated: number
}

const initialState: PortalMap = {
  portals: [],
  inspectPortalId: null,
  lastUpdated: 0,
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
      return { ...state, inspectPortalId: action.inspectId! }
    case PortalMapActionTypes.CLEARINSPECT:
      return { ...state, inspectPortalId: null }
    case PortalMapActionTypes.CLEARALL:
      return { portals: [], inspectPortalId: null, lastUpdated: now.getTime() }
    default:
      return state
  }
}

export default portalMapReducer
