import clone from 'lodash/cloneDeep';
import isEqual from 'lodash/isEqual';
import React, { FC, useCallback, useRef, useState } from 'react';

import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { FilterOptionsState } from '@material-ui/lab/useAutocomplete';

import { DEFAULT_ZONE } from '../data/constants';
import useEventListener from '../utils/hooks/useEventListener';
import { filterZones, getMaxString, ZoneLight } from './zoneSearchUtils';

interface ZoneSearchProps {
  zoneList: ZoneLight[];
  label: string;
  value: ZoneLight;
  update: (zone: ZoneLight) => void;
}

const ZoneSearch: FC<ZoneSearchProps> = ({
  zoneList,
  label,
  value,
  update,
}) => {
  const acRef = useRef(null);
  const [currentZoneList, setCurrentZoneList] = useState<ZoneLight[]>(zoneList);
  const [currentInput, setCurrentInput] = useState<string>(value.name);

  const keyEventHandler = useCallback(
    (e: KeyboardEvent) => {
      const currentVal = currentInput;

      if (e.code.toLowerCase() === 'arrowright' && currentVal) {
        setCurrentInput(getMaxString(currentZoneList, currentInput));
      }
    },
    [currentZoneList, currentInput]
  );

  const filterOptions = useCallback(
    (
      options: ZoneLight[],
      state: FilterOptionsState<ZoneLight>
    ): ZoneLight[] => {
      const filteredZones = filterZones(options, state);

      if (currentInput && !isEqual(filteredZones, currentZoneList)) {
        setCurrentZoneList(clone(filteredZones));
      }

      return filteredZones;
    },
    [currentInput, currentZoneList]
  );

  useEventListener('keydown', keyEventHandler, acRef.current);

  return (
    <Autocomplete
      ref={acRef}
      options={zoneList}
      noOptionsText="no valid zones found"
      fullWidth
      autoSelect
      autoHighlight
      includeInputInList
      value={value}
      inputValue={currentInput}
      onInputChange={(_, value) => setCurrentInput(value)}
      filterOptions={filterOptions}
      getOptionSelected={(o: ZoneLight, val: ZoneLight) =>
        o.value === val.value
      }
      getOptionLabel={(o: ZoneLight) => o.name}
      onChange={(_, val: ZoneLight | null) => update(val ?? DEFAULT_ZONE)}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  );
};

export default ZoneSearch;
