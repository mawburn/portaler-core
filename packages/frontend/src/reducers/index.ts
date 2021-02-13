import { combineReducers } from 'redux'

import config, { ConfigState } from './configReducer'
import errors from './errorReducer'
import portalMap, { PortalMap } from './portalMapReducer'
import sideBar from './sideBarReducer'
import zones, { ZoneState } from './zoneReducer'

export interface RootState {
  config: ConfigState
  errors: string[]
  portalMap: PortalMap
  sideBar: boolean
  zones: ZoneState
}

// TODO look at why we need Reducer<any, T>
/**
 * I think the issue with needing Reducer<any, T> is from the
 * optional props in the action for some reason.
 * Will look into later.
 **/

const rootReducer = combineReducers<RootState>({
  config,
  errors,
  portalMap,
  sideBar,
  zones,
})

export default rootReducer
