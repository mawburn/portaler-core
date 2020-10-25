import { Button } from '@material-ui/core'
import React, { FC, useCallback } from 'react'
import HomeIcon from '@material-ui/icons/Home'
import { fontSize } from './constants'
import { ZoneLight } from '../../common/ZoneSearch/zoneSearchUtils'
import getHomeZone from '../../utils/getHomeZone'

export interface HomeButtonProps {
  handleHome: (zone: ZoneLight) => void
}

const HomeButton: FC<HomeButtonProps> = ({ handleHome }) => {
  const handleClick = useCallback(() => {
    handleHome(getHomeZone())
  }, [handleHome])

  return (
    <Button
      onClick={handleClick}
      variant="contained"
      color="primary"
      aria-label="home"
    >
      <HomeIcon style={{ fontSize }} />
    </Button>
  )
}

export default HomeButton
