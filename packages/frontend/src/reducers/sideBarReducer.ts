import { Reducer } from 'react'

export enum SidebarActionTypes {
  TOGGLE = 'sidebar/toggle',
}

export interface SidebarAction {
  type: SidebarActionTypes.TOGGLE
}

const sidebarReducer: Reducer<any, SidebarAction> = (
  state: boolean = true,
  action: SidebarAction
): boolean => {
  if (action.type === SidebarActionTypes.TOGGLE) {
    return !state
  }

  return state
}

export default sidebarReducer
