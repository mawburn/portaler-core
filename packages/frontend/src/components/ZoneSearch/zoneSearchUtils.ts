import startsWith from 'lodash/startsWith' // lodash is faster than native implementation

import { FilterOptionsState } from '@material-ui/lab/useAutocomplete'

export interface ZoneLight {
  name: string
  value: string
}

export const filterZones = (
  zoneList: ZoneLight[],
  state: FilterOptionsState<ZoneLight>
) => {
  const inputValueLower: string = state.inputValue.toLowerCase()

  const newZoneList = zoneList.filter((z) =>
    startsWith(z.value, inputValueLower)
  )

  if (newZoneList.length) {
    return newZoneList
  }

  const inputTerms = inputValueLower.split(' ')

  return inputTerms.reduce(
    (list: ZoneLight[], term) => list.filter((i) => i.value.indexOf(term) >= 0),
    zoneList
  )
}

export const getMaxString = (curList: ZoneLight[], input: string): string => {
  if (curList.length === 1) {
    return curList[0].name
  } else if (curList.length === 0) {
    return input
  }

  const lowInput = input.toLowerCase()

  if (curList.every((z) => startsWith(z.name.toLowerCase(), lowInput))) {
    return getMaxString(curList, curList[0].name.substr(0, input.length + 1))
  }

  return curList[0].name.substr(0, input.length - 1)
}
