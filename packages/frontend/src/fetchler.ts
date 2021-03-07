import Fetchler, { FetchlerOptions } from 'fetchler'
import store from './store'
import { ConfigActionTypes } from './reducers/configReducer'
import { ErrorActionTypes } from './reducers/errorReducer'

const opts: FetchlerOptions = {
  handler401: () => store.dispatch({ type: ConfigActionTypes.CLEARTOKEN }),
  handler403: () => store.dispatch({ type: ConfigActionTypes.CLEARTOKEN }),
  handlerError: (res) =>
    store.dispatch({
      type: ErrorActionTypes.ADD,
      error: `Error ${res?.status}`,
    }),
}

const portalerFetchler = new Fetchler(opts)

export default portalerFetchler
