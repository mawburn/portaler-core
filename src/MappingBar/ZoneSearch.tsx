import React, { FC } from 'react'

import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

interface ZoneSearchProps {
  zoneNames: string[]
  label: string
  value: string | null
  update: (zone: string) => void
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
    value={value}
    getOptionLabel={(o) => o}
    onChange={(e: any) => update(e.currentTarget?.value)}
    renderInput={(params) => <TextField {...params} label={label} />}
  />
)

export default ZoneSearch
