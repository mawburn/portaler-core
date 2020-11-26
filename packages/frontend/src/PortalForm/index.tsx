import clone from 'lodash/cloneDeep'
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useSelector } from 'react-redux'

import { Button, FormControl, FormLabel, TextField } from '@material-ui/core'
import DeviceHubIcon from '@material-ui/icons/DeviceHub'
import { PortalSize, Zone } from '@portaler/types'

import { DEFAULT_PORTAL_SIZE, DEFAULT_ZONE } from '../common/data/constants'
import useZoneListSelector from '../common/hooks/useZoneListSelector'
import { RootState } from '../reducers'
import UserSettings from '../UserSettings'
import ZoneSearch from '../ZoneSearch'
import PortalSizeSelector from './PortalSizeSelector'
import styles from './styles.module.scss'
import useAddPortal from './useAddPortal'

const MappingBar = () => {
  const fromId = useSelector(
    (state: RootState) => state.portalMap.inspectPortalId
  )

  const oldFromId = useRef<number>(0)
  const [from, setFrom] = useState<Zone>(DEFAULT_ZONE)
  const [to, setTo] = useState<Zone>(DEFAULT_ZONE)
  const [portalSize, setPortalSize] = useState<PortalSize>(DEFAULT_PORTAL_SIZE)
  const [hours, setHours] = useState<number | null>(null)
  const [minutes, setMinutes] = useState<number | null>(null)

  const zones: Zone[] = useZoneListSelector()

  const addPortal = useAddPortal()

  const filteredFrom = useMemo<Zone[]>(
    () => zones.filter((z) => z?.name !== to?.name),
    [to, zones]
  )

  const filteredTo = useMemo<Zone[]>(
    () => zones.filter((z) => z?.name !== from?.name),
    [from, zones]
  )

  useEffect(() => {
    if (fromId && fromId !== oldFromId.current) {
      const newZone = zones.find((z) => z.id === fromId) || DEFAULT_ZONE
      setFrom(clone(newZone))
      oldFromId.current = fromId
    }
  }, [fromId, setFrom, zones])

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      try {
        const hr = Number(hours)
        const min = Number(minutes)

        if (from?.name && to?.name && portalSize && hr + min > 0) {
          addPortal({
            connection: [from.name, to.name],
            size: portalSize,
            hours: hr,
            minutes: min,
          })
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
    <>
      <form onSubmit={handleSubmit} autoComplete="off">
        <div className={styles.mappingBar}>
          <div className={styles.row}>
            <ZoneSearch
              value={from}
              update={setFrom}
              label="From"
              zoneList={filteredFrom}
            />
          </div>
          <div className={styles.row}>
            <ZoneSearch
              value={to}
              update={setTo}
              label="To"
              zoneList={filteredTo}
            />
          </div>
          <div className={styles.row}>
            <PortalSizeSelector size={portalSize} update={setPortalSize} />
          </div>
          <div className={styles.row}>
            <FormControl fullWidth component="fieldset">
              <FormLabel component="legend">Time Left</FormLabel>
              <div className={styles.flexColumn}>
                <TextField
                  id="time-hour"
                  className={styles.durationField}
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
                  className={styles.durationField}
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
          <div className={styles.row}>
            <FormControl fullWidth>
              <Button
                className={styles.createBtn}
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
      <UserSettings zones={zones} />
    </>
  )
}

export default MappingBar
