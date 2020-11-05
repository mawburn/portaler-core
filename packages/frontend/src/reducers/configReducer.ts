import clone from 'lodash/cloneDeep'
import { Reducer } from 'react'

export const BAD_PASS: string = '🙅‍♀️bad password🤦‍♂️'

export enum ConfigActionTypes {
  TOKEN = 'config/token',
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
  if (action.type === ConfigActionTypes.TOKEN) {
    window.localStorage.setItem('token', action.token ?? BAD_PASS)
    return { ...state, token: action.token ?? BAD_PASS }
  } else if (action.type === ConfigActionTypes.SETPUBLIC) {
    return { ...state, isPublic: !!action.isPublic }
  }

  return state
}

export default configReducer
