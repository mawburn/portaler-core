import React, { FC } from 'react';

import { TextField } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';

interface ZoneSearchProps {
  zoneNames: string[];
  label: string;
  value: string | null;
  update: (zone: string | null) => void;
}

const ZoneSearch: FC<ZoneSearchProps> = ({
  zoneNames,
  label,
  value,
  update,
}) => (
  <Autocomplete
    options={zoneNames}
    fullWidth
    autoSelect
    autoComplete
    value={value}
    getOptionLabel={(o) => o}
    onChange={(_, val) => update(val)}
    renderInput={(params) => <TextField {...params} label={label} />}
  />
);

export default ZoneSearch;
