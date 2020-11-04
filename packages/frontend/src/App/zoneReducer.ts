import { Reducer } from 'redux'
import { Zone } from '../types'
import { DateTime } from 'luxon'
import { clone } from 'lodash'

export interface ZoneState {
  lastUpdated: number
  zones: Zone[]
}

export enum ZoneActionTypes {
  ADD = 'zone/add',
  HYDRATE = 'zone/hydrate',
}

export interface ZoneAction {
  type: ZoneActionTypes
  zones?: Zone[]
  fullState?: ZoneState
}

const initialState = {
  lastUpdated: 0,
  zones: [],
}

const zoneReducer: Reducer<ZoneState, ZoneAction> = (
  state: ZoneState = initialState,
  action: ZoneAction
): ZoneState => {
  if (action.type === ZoneActionTypes.ADD) {
    const zoneState = {
      lastUpdated: DateTime.utc().toMillis(),
      zones: clone(action.zones) as Zone[],
    }

    window.localStorage.setItem('zones', JSON.stringify(zoneState))

    return zoneState
  } else if (action.type === ZoneActionTypes.HYDRATE) {
    return action.fullState as ZoneState
  }

  return state
}

export default zoneReducer
