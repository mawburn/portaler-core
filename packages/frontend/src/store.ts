import { combineReducers, createStore } from 'redux'

import errorReducer from './App/errorReducer'
import zoneReducer, { ZoneState } from './App/zoneReducer'

export interface RootState {
  zones: ZoneState
  errors: string[]
}

const rootReducer = combineReducers<RootState>({
  zones: zoneReducer,
  errors: errorReducer,
})

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
