import { Reducer } from 'redux'

export enum ErrorActionTypes {
  ADD = 'error/add',
  CLEAR = 'error/clear',
}

export interface ErrorAction {
  type: ErrorActionTypes
  errors?: string[]
  error?: string
}

const errorReducer: Reducer<string[], ErrorAction> = (
  state: string[] = [],
  action: ErrorAction
): string[] => {
  if (action.type === ErrorActionTypes.ADD) {
    const stateSet = new Set<string>(state)

    if (action.errors) {
      action.errors.forEach((e) => stateSet.add(e))

      return Array.from(stateSet)
    }

    stateSet.add(action.error!)

    return Array.from(stateSet)
  } else if (action.type === ErrorActionTypes.CLEAR) {
    if (action.error || action.errors) {
      const filterFn = action.errors
        ? (e: string) => !action.errors?.includes(e)
        : (e: string) => e !== action.error

      return state.filter(filterFn)
    }

    return []
  }

  return state
}

export default errorReducer
