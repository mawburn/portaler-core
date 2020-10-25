import './MappingBar.scss'

import React, {
  FC,
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { Button, FormControl, FormLabel, TextField } from '@material-ui/core'
import DeviceHubIcon from '@material-ui/icons/DeviceHub'

import { DEFAULT_PORTAL_SIZE, DEFAULT_ZONE } from '../data/constants'
import { PortalSize, Zone } from '../types'
import PortalSizeSelector from './PortalSizeSelector'
import useAddPortal from './useAddPortal'
import ZoneSearch from './ZoneSearch'
import { ZoneLight } from './zoneSearchUtils'

interface MappingBarProps {
  zones: Zone[]
  fromId: string | null
  token: string
  updatePortals: () => void
}

const MappingBar: FC<MappingBarProps> = ({
  zones,
  fromId,
  token,
  updatePortals,
}) => {
  const oldFromId = useRef<string>(fromId?.toLowerCase() ?? '')
  const [from, setFrom] = useState<ZoneLight>(DEFAULT_ZONE)
  const [to, setTo] = useState<ZoneLight>(DEFAULT_ZONE)
  const [portalSize, setPortalSize] = useState<PortalSize>(DEFAULT_PORTAL_SIZE)
  const [hours, setHours] = useState<number | null>(null)
  const [minutes, setMinutes] = useState<number | null>(null)

  const zoneNames = useMemo<ZoneLight[]>(
    () =>
      zones
        .map((n) => ({ name: n.name, value: n.name.toLowerCase() }))
        .sort((a, b) => a.value.localeCompare(b.value)),
    [zones]
  )

  const addPortal = useAddPortal(token, updatePortals)

  const filteredFrom = useMemo<ZoneLight[]>(() => {
    const zones = zoneNames.filter((z) => z?.value !== to?.value)
    zones.unshift(DEFAULT_ZONE) // allow user to clear input
    return zones
  }, [to, zoneNames])

  const filteredTo = useMemo<ZoneLight[]>(() => {
    const zones = zoneNames.filter((z) => z?.value !== from?.value)
    zones.unshift(DEFAULT_ZONE) // allow user to clear input
    return zones
  }, [from, zoneNames])

  useEffect(() => {
    if (fromId && fromId?.toLocaleLowerCase() !== oldFromId.current) {
      setFrom({ name: fromId, value: fromId?.toLowerCase() })
      oldFromId.current = fromId.toLowerCase()
    }
  }, [fromId, setFrom])

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        const hr = Number(hours)
        const min = Number(minutes)

        if (from?.name && to?.name && portalSize && hr + min > 0) {
          addPortal(from.name, to.name, portalSize, hr, min)
          setTo(DEFAULT_ZONE)
          setHours(null)
          setMinutes(null)
          setPortalSize(DEFAULT_PORTAL_SIZE)
        } else {
          throw new Error('you suck')
        }
      } catch (err) {
        console.error(err)
      }
    },
    [from, to, portalSize, hours, minutes, addPortal]
  )

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className="mapping-bar">
        <div className="row">
          <ZoneSearch
            value={from}
            update={setFrom}
            label="From"
            zoneList={filteredFrom}
          />
        </div>
        <div className="row">
          <ZoneSearch
            value={to}
            update={setTo}
            label="To"
            zoneList={filteredTo}
          />
        </div>
        <div className="row">
          <PortalSizeSelector size={portalSize} update={setPortalSize} />
        </div>
        <div className="row">
          <FormControl fullWidth component="fieldset">
            <FormLabel component="legend">Time Left</FormLabel>
            <div className="flex-column">
              <TextField
                id="time-hour"
                className="duration-field"
                type="number"
                label="Hour(s)"
                InputProps={{
                  inputProps: { min: 0, max: 24 },
                  value: hours ?? '',
                }}
                onChange={(e) => setHours(Number(e.currentTarget.value))}
              />
              <TextField
                id="time-minute"
                className="duration-field"
                type="number"
                label="Minute(s)"
                InputProps={{
                  inputProps: { min: 0, max: 59 },
                  value: minutes ?? '',
                }}
                onBlur={(e) =>
                  e.currentTarget.value === '0' ? setMinutes(null) : null
                }
                onChange={(e) => setMinutes(Number(e.currentTarget.value))}
              />
            </div>
          </FormControl>
        </div>
        <div className="row">
          <FormControl fullWidth>
            <Button
              className="create-btn"
              variant="contained"
              color="primary"
              type="submit"
              endIcon={<DeviceHubIcon />}
              size="large"
            >
              Create Connection
            </Button>
          </FormControl>
        </div>
      </div>
    </form>
  )
}

export default MappingBar
