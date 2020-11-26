import startsWith from 'lodash/startsWith' // lodash is faster than native implementation

import { FilterOptionsState } from '@material-ui/lab/useAutocomplete'
import { Zone } from '@portaler/types'

export const filterZones = (
  zoneList: Zone[],
  state: FilterOptionsState<Zone>
) => {
  const inputValueLower: string = state.inputValue.toLowerCase()

  const newZoneList = zoneList.filter((z) =>
    startsWith(z.name.toLowerCase(), inputValueLower)
  )

  if (newZoneList.length) {
    return newZoneList
  }

  const inputTerms = inputValueLower.split(' ')

  return inputTerms.reduce(
    (list: Zone[], term) =>
      list.filter((i) => i.name.toLowerCase().indexOf(term) >= 0),
    zoneList
  )
}

export const getMaxString = (curList: Zone[], input: string): string => {
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
