import { Reducer } from 'redux'

import { DateTime } from 'luxon'
import clone from 'lodash/cloneDeep'
import { Zone } from '@portaler/types'

export interface ZoneState {
  lastUpdated: number
  list: Zone[]
}

export enum ZoneActionTypes {
  ADD = 'zone/add',
  HYDRATE = 'zone/hydrate',
  ADD_INFO = 'zone/addInfo',
}

export interface ZoneAction {
  type: ZoneActionTypes
  zones?: Zone[]
  zoneInfo?: Zone
  fullState?: ZoneState
}

const initialState = {
  lastUpdated: 0,
  list: [],
}

const zoneReducer: Reducer<ZoneState, ZoneAction> = (
  state: ZoneState = clone(initialState),
  action: ZoneAction
): ZoneState => {
  switch (action.type) {
    case ZoneActionTypes.ADD:
      const zoneState = {
        lastUpdated: DateTime.utc().toMillis(),
        list: clone(action.zones) as Zone[],
      }

      window.localStorage.setItem('zones', JSON.stringify(zoneState))

      return zoneState
    case ZoneActionTypes.HYDRATE:
      return action.fullState as ZoneState
    case ZoneActionTypes.ADD_INFO:
      if (action.zoneInfo) {
        const newZoneList = clone(state.list)

        const zoneIndex = newZoneList.findIndex(
          (z) => z.id === action.zoneInfo?.id
        )

        newZoneList[zoneIndex] = clone(action.zoneInfo)

        const newZoneState = {
          lastUpdated: DateTime.utc().toMillis(),
          list: newZoneList,
        }

        window.localStorage.setItem('zones', JSON.stringify(newZoneState))

        return newZoneState
      }
      return state
    default:
      return state
  }
}

export default zoneReducer
