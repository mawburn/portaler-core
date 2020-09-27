import React, { FC } from 'react'

import { TextField } from '@material-ui/core'
import Autocomplete from '@material-ui/lab/Autocomplete'

interface ZoneSearchProps {
  zoneNames: string[]
  label: string
}

const ZoneSearch: FC<ZoneSearchProps> = ({ zoneNames, label }) => (
  <>
    <Autocomplete
      options={zoneNames}
      style={{ width: 300 }}
      renderInput={(params) => <TextField {...params} label={label} />}
    />
  </>
)

export default ZoneSearch
