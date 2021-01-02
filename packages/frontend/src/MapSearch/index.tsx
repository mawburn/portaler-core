import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'

import { Zone } from '@portaler/types'

import { DEFAULT_ZONE } from '../common/data/constants'
import { PortalMapActionTypes } from '../reducers/portalMapReducer'
import ZoneSearch from '../ZoneSearch'
import useCurrentZones from './useCurrentZones'

const MapSearch = () => {
  const curZones = useCurrentZones()
  const dispatch = useDispatch()
  const [zone, setZone] = useState<Zone>(DEFAULT_ZONE)

  useEffect(() => {
    dispatch({ type: PortalMapActionTypes.CENTER, centerZone: zone })
  }, [zone, dispatch])

  return (
    <ZoneSearch
      zoneList={curZones}
      value={zone}
      update={setZone}
      label="Map Search"
    />
  )
}

export default MapSearch
