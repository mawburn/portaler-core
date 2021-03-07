import Fetchler, { FetchlerOptions } from 'fetchler'

import { ConfigActionTypes } from './reducers/configReducer'
import { ErrorActionTypes } from './reducers/errorReducer'
import { PortalMapActionTypes } from './reducers/portalMapReducer'
import store from './store'

const opts: FetchlerOptions = {
  handler401: () => {
    store.dispatch({ type: ErrorActionTypes.ADD, error: 'Not Authorized' })
    store.dispatch({ type: ConfigActionTypes.CLEARTOKEN })
  },
  handler403: () => {
    store.dispatch({ type: ErrorActionTypes.ADD, error: 'Forbidden' })
    store.dispatch({ type: ConfigActionTypes.CLEARTOKEN })
    store.dispatch({ type: PortalMapActionTypes.CLEARALL })
  },
  handlerError: (res) =>
    store.dispatch({
      type: ErrorActionTypes.ADD,
      error: `Error ${res?.status}`,
    }),
}

const portalerFetchler = new Fetchler(opts)

export default portalerFetchler
