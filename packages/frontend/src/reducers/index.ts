import { combineReducers } from 'redux'

import config, { ConfigState } from './configReducer'
import drawerOpen from './drawerOpen'
import errors from './errorReducer'
import portalMap, { PortalMap } from './portalMapReducer'
import zones, { ZoneState } from './zoneReducer'

export interface RootState {
  config: ConfigState
  drawerOpen: boolean
  errors: string[]
  portalMap: PortalMap
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
  drawerOpen,
  errors,
  portalMap,
  zones,
})

export default rootReducer
