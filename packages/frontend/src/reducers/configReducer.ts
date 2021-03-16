import clone from 'lodash/cloneDeep'
import { Reducer } from 'react'

import fetchler from '../fetchler'

export enum ConfigActionTypes {
  TOKEN = 'config/token',
  CLEARTOKEN = 'config/clearToken',
  SETCONFIG = 'config/set',
}

interface ConfigAction {
  type: ConfigActionTypes
  token?: string
  isPublic?: boolean
  discordUrl?: string
}

export interface ConfigState {
  token: string | null
  isPublic: boolean
  discordUrl: string | null
}

const tokenStore = (): string | null => {
  if (process.env.REACT_APP_DISABLE_AUTH === 'true') {
    return 'disabled'
  }

  const token = window.localStorage.getItem('token')

  if (token === null) {
    return null
  }

  console.log(token)
  fetchler.updateToken(token)
  return token
}

const initialState: ConfigState = {
  token: tokenStore(),
  isPublic: false,
  discordUrl: null,
}

const configReducer: Reducer<any, ConfigAction> = (
  state: ConfigState = clone(initialState),
  action: ConfigAction
): ConfigState => {
  switch (action.type) {
    case ConfigActionTypes.TOKEN:
      if (!!action.token) {
        window.localStorage.setItem('token', action.token)
        fetchler.updateToken(action.token)
        return { ...state, token: action.token }
      }

      return state
    case ConfigActionTypes.CLEARTOKEN:
      window.localStorage.removeItem('token')
      fetchler.updateToken(null)
      return { ...state, token: null }
    case ConfigActionTypes.SETCONFIG:
      return {
        ...state,
        isPublic: !!action.isPublic,
        discordUrl: action.discordUrl || null,
      }
    default:
      return state
  }
}

export default configReducer
