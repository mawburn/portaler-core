import React, { useEffect, useState } from 'react'

import { Zone } from '@portaler/types'

import { DEFAULT_ZONE } from '../common/data/constants'
import ZoneSearch from '../ZoneSearch'
import useCurrentZones from './useCurrentZones'
import { useDispatch } from 'react-redux'
import { PortalMapActionTypes } from '../reducers/portalMapReducer'

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
