import React, { useCallback, useEffect, useRef, useState } from 'react'

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Snackbar,
} from '@material-ui/core'
import HomeIcon from '@material-ui/icons/Home'
import Alert from '@material-ui/lab/Alert'
import { Zone } from '@portaler/types'

import useZoneListSelector from '../common/hooks/useZoneListSelector'
import getHomeZone from '../common/utils/getHomeZone'
import ZoneSearch from '../ZoneSearch'
import styles from './styles.module.scss'

const UserSettings = () => {
  const initialLoad = useRef<boolean>(true)
  const [home, setHome] = useState<Zone>(getHomeZone())
  const [saved, setSaved] = useState<boolean>(false)
  const zones = useZoneListSelector()

  const handleUpdate = useCallback((zone: Zone) => {
    window.localStorage.setItem('homeZone', JSON.stringify(zone))
    setHome(zone)
  }, [])

  useEffect(() => {
    if (!initialLoad.current) {
      setSaved(true)
    } else {
      initialLoad.current = false
    }
  }, [home])

  return (
    <div className={styles.accordion}>
      <Accordion>
        <AccordionSummary className={styles.main}>
          <HomeIcon className={styles.icon} /> Set Your Home
        </AccordionSummary>
        <AccordionDetails>
          <ZoneSearch
            variant="outlined"
            zoneList={zones}
            label="Set your home region"
            value={home}
            update={handleUpdate}
          />
        </AccordionDetails>
      </Accordion>

      <Snackbar
        open={saved}
        autoHideDuration={6000}
        onClose={() => setSaved(false)}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Alert
          onClose={() => setSaved(false)}
          severity="success"
          variant="filled"
        >
          Home set!
        </Alert>
      </Snackbar>
    </div>
  )
}

export default UserSettings
