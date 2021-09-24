import cn from 'clsx'
import clone from 'lodash/cloneDeep'
import React, {
  FormEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Button, FormControl, FormLabel, TextField } from '@material-ui/core'
import AddLocationIcon from '@material-ui/icons/AddLocation'
import { PortalSize, Zone } from '@portaler/types'

import { DEFAULT_ZONE } from '../common/data/constants'
import useZoneListSelector from '../common/hooks/useZoneListSelector'
import { RootState } from '../reducers'
import { InputError } from '../types'
import ZoneSearch from '../ZoneSearch'
import PortalSizeSelector from './PortalSizeSelector'
import styles from './styles.module.scss'
import useAddPortal from './useAddPortal'
import { PortalMapActionTypes } from '../reducers/portalMapReducer'

const portalSizeValid = (size: PortalSize | null) =>
  size !== null && [0, 2, 7, 20].includes(size)

const formValidator = (
  from: Zone,
  to: Zone,
  portalSize: number | null,
  hours: number | null,
  minutes: number | null
): InputError[] => {
  const errors: InputError[] = []

  if (from.id === DEFAULT_ZONE.id || !from) {
    errors.push({ fieldName: 'from', errorText: 'Insert From Zone' })
  }

  if (to.id === DEFAULT_ZONE.id || !to) {
    errors.push({ fieldName: 'to', errorText: 'Insert To Zone' })
  }

  if (portalSize === null) {
    errors.push({ fieldName: 'size', errorText: 'Select One' })
  } else if (portalSize !== 0) {
    if (!minutes && !hours) {
      errors.push({ fieldName: 'timer', errorText: 'Insert Time' })
    }
  }

  return errors
}

const getError = (name: string, errors: InputError[]): string | null => {
  if (!errors.length) {
    return null
  }

  const errorVal = errors.find((e) => e.fieldName === name)

  if (!errorVal) {
    return null
  }

  return errorVal.errorText
}

const MappingBar = () => {
  const fromId = useSelector(
    (state: RootState) => state.portalMap.inspectFromId
  )
  const toId = useSelector((state: RootState) => state.portalMap.inspectToId)

  const size = useSelector((state: RootState) => state.portalMap.size)

  const timeLeft = useSelector((state: RootState) => state.portalMap.timeLeft)

  const dispatch = useDispatch()

  const oldFromId = useRef<number>(0)
  const oldToId = useRef<number>(0)
  const oldSize = useRef<PortalSize | null>(null)
  const oldTime = useRef<number | null>(0)
  const [from, setFrom] = useState<Zone>(DEFAULT_ZONE)
  const [to, setTo] = useState<Zone>(DEFAULT_ZONE)
  const [portalSize, setPortalSize] = useState<PortalSize | null>(null)
  const [hours, setHours] = useState<number | null>(null)
  const [minutes, setMinutes] = useState<number | null>(null)
  const [errors, setErrors] = useState<InputError[]>([])
  const [focusCounter, setFocusCounter] = useState<number>(0)

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
    } else if (!fromId) {
      const newZone = DEFAULT_ZONE
      setFrom(clone(newZone))
      oldFromId.current = DEFAULT_ZONE.id
    }
  }, [fromId, setFrom, zones])

  useEffect(() => {
    if (toId && toId !== oldToId.current) {
      const newZone = zones.find((z) => z.id === toId) || DEFAULT_ZONE
      setTo(clone(newZone))
      oldToId.current = toId
    } else if (!toId) {
      const newZone = DEFAULT_ZONE
      setTo(clone(newZone))
      oldToId.current = DEFAULT_ZONE.id
    }
  }, [toId, setTo, zones])

  useEffect(() => {
    if (size !== oldSize.current) {
      setPortalSize(size)
      oldSize.current = size
    }
  }, [size, setPortalSize])

  useEffect(() => {
    if (timeLeft && timeLeft !== oldTime.current) {
      const newHours = Math.floor(timeLeft / 3600)
      const newMinutes = Math.floor((timeLeft - newHours * 3600) / 60)

      setHours(newHours)
      setMinutes(newMinutes)

      oldTime.current = timeLeft
    } else if (!timeLeft) {
      setHours(null)
      setMinutes(null)

      oldTime.current = null
    }
  }, [timeLeft, setHours, setMinutes])

  const handleSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()

      const err = formValidator(from, to, portalSize, hours, minutes)

      if (err.length > 0) {
        setErrors(err)
        return
      }

      setErrors([])

      try {
        const hr = Number(hours)
        const min = Number(minutes)

        if (
          from?.name &&
          to?.name &&
          portalSizeValid(portalSize) &&
          (hr + min > 0 || portalSize === 0)
        ) {
          addPortal({
            connection: [from.name, to.name],
            size: portalSize as PortalSize,
            hours: hr,
            minutes: min,
          })

          dispatch({
            type: PortalMapActionTypes.CLEARINSPECT,
          })

          setFocusCounter((x) => ++x)
        } else {
          throw new Error('you suck')
        }
      } catch (err) {
        console.error(err)
      }
    },
    [from, to, portalSize, hours, minutes, addPortal, dispatch]
  )

  const sizeError = getError('size', errors)

  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      <div className={styles.mappingBar}>
        <div className={styles.row}>
          <ZoneSearch
            setFocus={focusCounter}
            error={getError('from', errors)}
            value={from}
            update={setFrom}
            label="From"
            zoneList={filteredFrom}
          />
        </div>
        <div className={styles.row}>
          <ZoneSearch
            error={getError('to', errors)}
            value={to}
            update={setTo}
            label="To"
            zoneList={filteredTo}
          />
        </div>
        <div className={cn(styles.row, styles.portalSize)}>
          <FormLabel
            error={!!sizeError}
            component="legend"
            className={styles.sizePad}
          >
            Size {!!sizeError && `(${sizeError})`}
          </FormLabel>

          <PortalSizeSelector size={portalSize} update={setPortalSize} />
        </div>
        <div className={styles.row}>
          <FormControl fullWidth component="fieldset">
            <FormLabel component="legend">Time Left</FormLabel>
            <div className={styles.flexColumn}>
              <TextField
                error={!!getError('timer', errors)}
                helperText={getError('timer', errors)}
                disabled={portalSize === 0}
                id="time-hour"
                className={cn(styles.durationField, {
                  [styles.disabled]: portalSize === 0,
                })}
                type="number"
                label="Hour(s)"
                InputProps={{
                  inputProps: { min: 0, max: 24 },
                  value: hours ?? '',
                }}
                onChange={(e) => setHours(Number(e.currentTarget.value))}
              />
              <TextField
                error={!!getError('timer', errors)}
                helperText={getError('timer', errors)}
                disabled={portalSize === 0}
                id="time-minute"
                className={cn(styles.durationField, {
                  [styles.disabled]: portalSize === 0,
                })}
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
              endIcon={<AddLocationIcon />}
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
