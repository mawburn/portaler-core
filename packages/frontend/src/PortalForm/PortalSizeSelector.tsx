import React, { FC, useCallback } from 'react'

import {
  Button,
  ButtonGroup,
  colors,
  Theme,
  withStyles,
} from '@material-ui/core'
import { PortalSize } from '@portaler/types'

const TwoButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(colors.lightGreen[500]),
    backgroundColor: colors.lightGreen[500],
    '&:hover': {
      backgroundColor: colors.lightGreen[600],
    },
    '&:disabled': {
      color: theme.palette.getContrastText(colors.lightGreen[900]),
      backgroundColor: colors.lightGreen[900],
    },
  },
}))(Button)

const SevenButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(colors.blue[500]),
    backgroundColor: colors.blue[500],
    '&:hover': {
      backgroundColor: colors.blue[600],
    },
    '&:disabled': {
      color: theme.palette.getContrastText(colors.blue[900]),
      backgroundColor: colors.blue[900],
    },
  },
}))(Button)

const TwentyButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText(colors.amber[500]),
    backgroundColor: colors.amber[500],
    '&:hover': {
      backgroundColor: colors.amber[600],
    },
    '&:disabled': {
      color: theme.palette.getContrastText(colors.amber[900]),
      backgroundColor: colors.amber[900],
    },
  },
}))(Button)

const RoyalButton = withStyles((theme: Theme) => ({
  root: {
    color: theme.palette.getContrastText('#aa00ff'),
    backgroundColor: '#aa00ff',
    '&:hover': {
      backgroundColor: '#d500f9',
    },
    '&:disabled': {
      color: theme.palette.getContrastText('#9700b2'),
      backgroundColor: '#9700b2',
    },
  },
}))(Button)

interface PortalSizeSelectorProps {
  size: PortalSize | null
  update: (size: PortalSize) => void
}

const PortalSizeSelector: FC<PortalSizeSelectorProps> = ({ size, update }) => {
  const handleClick = useCallback(
    (val: number) => {
      update(val as PortalSize)
    },
    [update]
  )

  return (
    <ButtonGroup
      variant="contained"
      color="primary"
      aria-label="contained primary button group"
      fullWidth
    >
      <TwoButton onClick={() => handleClick(2)} disabled={size === 2}>
        2
      </TwoButton>
      <SevenButton onClick={() => handleClick(7)} disabled={size === 7}>
        7
      </SevenButton>
      <TwentyButton onClick={() => handleClick(20)} disabled={size === 20}>
        20
      </TwentyButton>
      <RoyalButton onClick={() => handleClick(0)} disabled={size === 0}>
        Royal
      </RoyalButton>
    </ButtonGroup>
  )
}

export default PortalSizeSelector
