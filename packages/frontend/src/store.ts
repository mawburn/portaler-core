import { createStore } from 'redux'
import { combineReducers } from 'redux'
import zoneReducer, { ZoneState } from './App/zoneReducer'

export interface RootState {
  zones: ZoneState
}

const rootReducer = combineReducers<RootState>({
  zones: zoneReducer,
})

const store = createStore(
  rootReducer,
  (window as any).__REDUX_DEVTOOLS_EXTENSION__ &&
    (window as any).__REDUX_DEVTOOLS_EXTENSION__()
)

export default store
