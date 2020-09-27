import React, { FC } from 'react'
import Autocomplete from '@material-ui/lab/Autocomplete'
import TextField from '@material-ui/core/TextField'

interface ZoneSearchProps {}

const ZoneSearch: FC<ZoneSearchProps> = () => (
  <>
    <Autocomplete
      id="combo-box-demo"
      options={[]}
      getOptionLabel={() => ''}
      style={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label="Combo box" variant="outlined" />
      )}
    />
  </>
)

export default ZoneSearch
