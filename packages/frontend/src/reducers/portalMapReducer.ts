import clone from 'lodash/cloneDeep'
import { Reducer } from 'react'

import { Portal } from '../types'

export enum PortalMapActionTypes {
  UPDATEMAP = 'portals/updateMap',
  INSPECT = 'portals/inspectPortal',
  CLEARINSPECT = 'portals/clearInspectedPortal',
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
  if (action.type === PortalMapActionTypes.UPDATEMAP) {
    // TODO maybe do a smart compare here?
    const now = new Date()
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
    default:
      return state
  }
}

export default portalMapReducer
