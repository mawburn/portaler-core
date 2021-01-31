import cn from 'clsx'
import React, { MouseEvent, useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'

import {
  Button,
  IconButton,
  makeStyles,
  Tab,
  Tabs,
  Theme,
} from '@material-ui/core'
import AddLocationIcon from '@material-ui/icons/AddLocation'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HideIcon from '@material-ui/icons/FirstPage'
import InfoIcon from '@material-ui/icons/Info'
import SettingsIcon from '@material-ui/icons/Settings'

import useToken from '../common/hooks/useToken'
import { portalerSmall } from '../common/images'
import LoginButton from '../LoginButton'
import MapInfo from '../MapInfo'
import PortalForm from '../PortalForm'
import { ConfigActionTypes } from '../reducers/configReducer'
import UserSettings from '../UserSettings'
import styles from './styles.module.scss'

const useStyles = makeStyles((theme: Theme) => ({
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
  tab: {
    minWidth: 0,
  },
  selected: {
    backgroundColor: `rgba(255, 255, 255, 0.05)`,
  },
}))

const SideBar = () => {
  const token = useToken()

  const [tabValue, setTabValue] = useState(0)

  const handleChange = useCallback((_, newValue: number) => {
    setTabValue(newValue)
  }, [])

  const classes = useStyles()

  return (
    <aside className={styles.searchSide}>
      <div className={styles.header}>
        <div>
          <img alt="logo" src={portalerSmall} className={styles.logo} />
        </div>
        <div>
          <IconButton aria-label="hide">
            <HideIcon fontSize="large" className={styles.hideIcon} />
          </IconButton>
        </div>
      </div>
      <div className={styles.content}>
        <div className={styles.mainContent}>
          {tabValue === 0 && <PortalForm />}
          {tabValue === 1 && <MapInfo />}
          {tabValue === 2 && <UserSettings />}
        </div>
        <div className={styles.nav}>
          <Tabs
            orientation="vertical"
            value={tabValue}
            textColor="secondary"
            indicatorColor="secondary"
            onChange={handleChange}
            aria-label="panel options"
            className={classes.tabs}
          >
            <Tab
              className={cn(classes.tab, {
                [classes.selected]: tabValue === 0,
              })}
              icon={<AddLocationIcon />}
              aria-label="Add location"
              title="Add location"
            />
            <Tab
              className={cn(classes.tab, {
                [classes.selected]: tabValue === 1,
              })}
              icon={<InfoIcon />}
              aria-label="Zone Info"
              title="Zone Info"
            />
            <Tab
              className={cn(classes.tab, {
                [classes.selected]: tabValue === 2,
              })}
              icon={<SettingsIcon />}
              aria-label="Settings"
              title="Settings"
            />
          </Tabs>
        </div>
      </div>
    </aside>
  )
}

export default SideBar
