import { Action, Reducer } from 'redux'

export interface DrawerAction {
  type: 'drawer/toggle'
}

const drawerOpen: Reducer<any, Action> = (
  state: boolean = true,
  DrawerAction
): boolean => {
  if (DrawerAction.type === 'drawer/toggle') {
    return !state
  }

  return state
}

export default drawerOpen
