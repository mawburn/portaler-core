import { Reducer } from 'redux'

export enum ErrorActionTypes {
  ADD = 'error/add',
  CLEAR = 'error/clear',
}

export interface ErrorAction {
  type: ErrorActionTypes
  errors?: string | string[]
}

const errorReducer: Reducer<string[], ErrorAction> = (
  state: string[] = [],
  action: ErrorAction
): string[] => {
  if (action.type === ErrorActionTypes.ADD) {
    if (Array.isArray(action.errors)) {
      return state.concat(action.errors)
    }

    return [...state, action.errors] as string[]
  } else if (action.type === ErrorActionTypes.CLEAR) {
    if (action.errors) {
      const filterFn = Array.isArray(action.errors)
        ? (e: string) => !action.errors?.includes(e)
        : (e: string) => e !== action.errors

      return state.filter(filterFn)
    }

    return []
  }

  return state
}

export default errorReducer
