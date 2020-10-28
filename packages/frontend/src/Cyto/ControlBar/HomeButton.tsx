import { IconButton } from '@material-ui/core'
import React, { FC, useCallback } from 'react'
import HomeIcon from '@material-ui/icons/Home'
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
    <IconButton onClick={handleClick} aria-label="home">
      <HomeIcon fontSize="large" />
    </IconButton>
  )
}

export default HomeButton
