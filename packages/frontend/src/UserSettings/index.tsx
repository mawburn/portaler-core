import React, { FC, useCallback, useEffect, useRef, useState } from 'react'

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Snackbar,
} from '@material-ui/core'
import PersonIcon from '@material-ui/icons/Person'
import { Alert } from '@material-ui/lab'

import getHomeZone from '../common/utils/getHomeZone'
import ZoneSearch from '../components/ZoneSearch'
import { ZoneLight } from '../components/ZoneSearch/zoneSearchUtils'
import styles from './styles.module.scss'

interface UserSettingsProps {
  zones: ZoneLight[]
}

const UserSettings: FC<UserSettingsProps> = ({ zones }) => {
  const initialLoad = useRef<boolean>(true)
  const [home, setHome] = useState<ZoneLight>(getHomeZone())
  const [saved, setSaved] = useState<boolean>(false)

  const handleUpdate = useCallback((zone: ZoneLight) => {
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
          <PersonIcon className={styles.icon} /> User Settings
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
