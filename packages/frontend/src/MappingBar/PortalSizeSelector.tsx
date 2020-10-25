import React, { ChangeEvent, FC, useCallback } from 'react'

import {
  colors,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  withStyles,
} from '@material-ui/core'

import { PortalSize } from '../types'

const TwoPortal = withStyles({
  root: {
    color: colors.lightGreen[500],
    '&$checked': {
      color: colors.lightGreen[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />)

const SevenPortal = withStyles({
  root: {
    color: colors.blue[500],
    '&$checked': {
      color: colors.blue[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />)

const TwentyPortal = withStyles({
  root: {
    color: colors.amber[500],
    '&$checked': {
      color: colors.amber[600],
    },
  },
  checked: {},
})((props) => <Radio color="default" {...props} />)

interface PortalSizeSelectorProps {
  size: PortalSize
  update: (size: PortalSize) => void
}

const PortalSizeSelector: FC<PortalSizeSelectorProps> = ({ size, update }) => {
  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      update(Number(e.target.value) as PortalSize)
    },
    [update]
  )

  return (
    <FormControl fullWidth component="fieldset">
      <FormLabel component="legend">Portal Size</FormLabel>
      <RadioGroup
        row
        name="portalSize"
        value={`${size}`}
        onChange={handleChange}
      >
        <FormControlLabel value="2" control={<TwoPortal />} label="2" />
        <FormControlLabel value="7" control={<SevenPortal />} label="7" />
        <FormControlLabel value="20" control={<TwentyPortal />} label="20" />
      </RadioGroup>
    </FormControl>
  )
}

export default PortalSizeSelector
