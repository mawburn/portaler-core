import { Reducer } from 'react'
import { Portal } from '../types'
import clone from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'

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
}

const initialState: PortalMap = {
  portals: [],
  inspectPortalId: null,
}

const portalMapReducer: Reducer<any, PortalMapAction> = (
  state: PortalMap = clone(initialState),
  action: PortalMapAction
): PortalMap => {
  if (
    action.type === PortalMapActionTypes.UPDATEMAP &&
    !isEqual(action.portals, state.portals)
  ) {
    // TODO maybe do a smart compare here?
    return { ...state, portals: clone(action.portals) ?? [] }
  }

  switch (action.type) {
    case PortalMapActionTypes.INSPECT:
      return { ...state, inspectPortalId: action.inspectId! }
    case PortalMapActionTypes.CLEARINSPECT:
      return { ...state, inspectPortalId: null }
  }

  return state
}

export default portalMapReducer
