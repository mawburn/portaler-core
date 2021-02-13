import clone from 'lodash/cloneDeep'
import isEqual from 'lodash/isEqual'
import React, { FC, useCallback, useEffect, useRef, useState } from 'react'

import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { FilterOptionsState } from '@material-ui/lab/useAutocomplete'
import { Zone } from '@portaler/types'
import useEventListener from '@use-it/event-listener'

import { DEFAULT_ZONE } from '../common/data/constants'
import { filterZones, getMaxString } from './zoneSearchUtils'

interface ZoneSearchProps {
  zoneList: Zone[]
  label: string
  value: Zone
  update: (zone: Zone) => void
  variant?: 'filled' | 'outlined' | 'standard'
  error?: string | null
  setFocus?: number
}

const ZoneSearch: FC<ZoneSearchProps> = ({
  zoneList,
  label,
  value,
  update,
  variant = 'standard',
  error = null,
  setFocus = 0,
}) => {
  const acRef = useRef(null)
  const inputRef = useRef<HTMLInputElement | null>(null)
  const [currentZoneList, setCurrentZoneList] = useState<Zone[]>(zoneList)
  const [currentInput, setCurrentInput] = useState<string>(value.name)

  const keyEventHandler = useCallback(
    (e: KeyboardEvent) => {
      const currentVal = currentInput

      if (e.code.toLowerCase() === 'arrowright' && currentVal) {
        setCurrentInput(getMaxString(currentZoneList, currentInput))
      }
    },
    [currentZoneList, currentInput]
  )

  const filterOptions = useCallback(
    (options: Zone[], state: FilterOptionsState<Zone>): Zone[] => {
      const filteredZones = filterZones(options, state)

      if (currentInput && !isEqual(filteredZones, currentZoneList)) {
        setCurrentZoneList(clone(filteredZones))
      }

      return filteredZones
    },
    [currentInput, currentZoneList]
  )

  useEffect(() => {
    if (setFocus !== 0) {
      inputRef.current?.focus()
    }
  }, [setFocus])

  useEventListener('keydown', keyEventHandler, acRef.current)

  return (
    <Autocomplete
      ref={acRef}
      options={[value, ...zoneList]}
      noOptionsText="no valid zones found"
      fullWidth
      autoSelect
      autoHighlight
      includeInputInList
      value={value}
      inputValue={currentInput}
      onInputChange={(_, value) => setCurrentInput(value)}
      filterOptions={filterOptions}
      getOptionSelected={(o: Zone, val: Zone) => o.name === val.name}
      getOptionLabel={(o: Zone) => o.name}
      onChange={(_, val: Zone | null) => update(val ?? DEFAULT_ZONE)}
      renderInput={(params) => (
        <TextField
          {...params}
          error={!!error}
          helperText={error}
          label={label}
          variant={variant as any}
          inputRef={inputRef}
        />
      )}
    />
  )
}

export default ZoneSearch
