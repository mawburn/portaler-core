import clone from 'lodash/cloneDeep'
import { Reducer } from 'react'

import { BAD_PASS } from '../common/data/constants'

export enum ConfigActionTypes {
  TOKEN = 'config/token',
  CLEARTOKEN = 'config/clearToken',
  SETPUBLIC = 'config/setPublic',
}

interface ConfigAction {
  type: ConfigActionTypes
  token?: string
  isPublic?: boolean
}

export interface ConfigState {
  token: string
  isPublic: boolean
}

const tokenStore = (): string => {
  const token = window.localStorage.getItem('token')

  if (token === null) {
    return BAD_PASS
  }

  return token
}

const initialState: ConfigState = {
  token: tokenStore(),
  isPublic: false,
}

const configReducer: Reducer<any, ConfigAction> = (
  state: ConfigState = clone(initialState),
  action: ConfigAction
): ConfigState => {
  switch (action.type) {
    case ConfigActionTypes.TOKEN:
      window.localStorage.setItem('token', action.token ?? BAD_PASS)
      return { ...state, token: action.token ?? BAD_PASS }
    case ConfigActionTypes.CLEARTOKEN:
      window.localStorage.removeItem('token')
      return { ...state, token: BAD_PASS }
    case ConfigActionTypes.SETPUBLIC:
      return { ...state, isPublic: !!action.isPublic }
    default:
      return state
  }
}

export default configReducer
