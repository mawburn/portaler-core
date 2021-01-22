import { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Zone } from '@portaler/types'

import { RootState } from '../../reducers'
import { ZoneActionTypes } from '../../reducers/zoneReducer'
import useZoneListSelector from './useZoneListSelector'

const useZoneInfo = (): Zone | null => {
  const dispatch = useDispatch()
  const zoneList = useZoneListSelector()
  const id = useSelector((state: RootState) => state.portalMap.inspectPortalId)
  const [zone, setZone] = useState<Zone | null>(null)

  const getZone = useCallback(
    async (id: number | null) => {
      let newZone: Zone | null = null

      if (id) {
        newZone = zoneList.find((z) => z.id === id) ?? null

        if (!newZone?.info?.markers) {
          const zoneInfoRes = await fetch(`/api/zone/info/${id}`, {
            method: 'GET',
          })

          if (zoneInfoRes.ok) {
            newZone = await zoneInfoRes.json()
            dispatch({ type: ZoneActionTypes.ADD_INFO, zoneInfo: newZone })
          }
        }
      }

      setZone(newZone)
    },
    [zoneList, dispatch]
  )

  useEffect(() => {
    getZone(id)
  }, [getZone, id])

  return zone
}

export default useZoneInfo
