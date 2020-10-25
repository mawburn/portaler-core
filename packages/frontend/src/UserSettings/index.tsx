import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  InputLabel,
} from '@material-ui/core'
import React, { FC, useCallback, useState } from 'react'
import PersonIcon from '@material-ui/icons/Person'

import styles from './styles.module.scss'
import ZoneSearch from '../common/ZoneSearch'
import { DEFAULT_ZONE } from '../data/constants'
import { ZoneLight } from '../common/ZoneSearch/zoneSearchUtils'

interface UserSettingsProps {
  zones: ZoneLight[]
}

const getHomeZone = (): ZoneLight => {
  const home = window.localStorage.getItem('homeZone')

  if (home) {
    return JSON.parse(home) as ZoneLight
  }

  return DEFAULT_ZONE
}

const UserSettings: FC<UserSettingsProps> = ({ zones }) => {
  const [home, setHome] = useState<ZoneLight>(getHomeZone())

  const handleUpdate = useCallback((zone: ZoneLight) => {
    window.localStorage.setItem('homeZone', JSON.stringify(zone))
    setHome(zone)
  }, [])

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
    </div>
  )
}

export default UserSettings
