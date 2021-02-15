import cn from 'clsx'
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { animated, useSpring } from 'react-spring'

import { IconButton, makeStyles, Tab, Tabs, Theme } from '@material-ui/core'
import AddLocationIcon from '@material-ui/icons/AddLocation'
import HideIcon from '@material-ui/icons/FirstPage'
import HelpIcon from '@material-ui/icons/HelpOutline'
import InfoIcon from '@material-ui/icons/InfoOutlined'
import SettingsIcon from '@material-ui/icons/Settings'

import useToken from '../common/hooks/useToken'
import { portalerSmall } from '../common/images'
import mistWalker from '../common/utils/mistWalker'
import LoginButton from '../LoginButton'
import MapInfo from '../MapInfo'
import PortalForm from '../PortalForm'
import { RootState } from '../reducers'
import { SidebarActionTypes } from '../reducers/sideBarReducer'
import UserSettings from '../UserSettings'
import Help from './Help'
import styles from './styles.module.scss'

type TabOpts = 'form' | 'info' | 'help' | 'settings'

const tabMap = (tabVal: number): TabOpts => {
  if (mistWalker.isWalker && !mistWalker.showSidebar) {
    switch (tabVal) {
      case 0:
        return 'info'
      case 1:
        return 'help'
      case 2:
        return 'settings'
    }
  }

  switch (tabVal) {
    case 0:
      return 'form'
    case 1:
      return 'info'
    case 2:
      return 'help'
    case 3:
      return 'settings'
    default:
      return 'form'
  }
}

const getTabVal = (tabOpt: TabOpts): number => {
  if (mistWalker.isWalker && !mistWalker.showSidebar) {
    switch (tabOpt) {
      case 'info':
        return 0
      case 'help':
        return 1
      case 'settings':
        return 2
    }
  }

  switch (tabOpt) {
    case 'form':
      return 0
    case 'info':
      return 1
    case 'help':
      return 2
    case 'settings':
      return 3
    default:
      return 0
  }
}

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
  const dispatch = useDispatch()

  const [tabValue, setTabValue] = useState<TabOpts>(tabMap(0))

  const handleChange = useCallback((_, newValue: number) => {
    setTabValue(tabMap(newValue))
  }, [])

  const handleSlide = useCallback(() => {
    dispatch({ type: SidebarActionTypes.TOGGLE })
  }, [dispatch])

  const classes = useStyles()

  const sideBar = useSelector((state: RootState) => state.sideBar)

  const opacity = useSpring({
    opacity: sideBar ? 1 : 0,
    config: { duration: sideBar ? 420 : 50 },
  })

  const props = useSpring({
    width: sideBar ? 'inherit' : 0,
    marginLeft: sideBar ? 'inherit' : 0,
    marginRight: sideBar ? 'inherit' : 0,
  })

  const headerProps = useSpring({
    paddingLeft: sideBar ? 'inherit' : 0,
    paddingRight: sideBar ? 'inherit' : 0,
  })

  return (!token && !mistWalker.isWalker) ||
    (!token && mistWalker.isWalker && mistWalker.showSidebar) ? (
    <LoginButton />
  ) : (
    <aside className={styles.searchSide}>
      <animated.div style={headerProps} className={styles.header}>
        <animated.div style={props}>
          <animated.img
            style={opacity}
            alt="logo"
            src={portalerSmall}
            className={styles.logo}
          />
        </animated.div>
        <div className={cn({ [styles.expand]: !sideBar })}>
          <IconButton onClick={handleSlide} aria-label="hide">
            <HideIcon fontSize="large" className={styles.hideIcon} />
          </IconButton>
        </div>
      </animated.div>
      <animated.div style={props} className={styles.content}>
        <animated.div style={opacity} className={styles.mainContent}>
          {tabValue === 'form' && <PortalForm />}
          {tabValue === 'info' && <MapInfo />}
          {tabValue === 'help' && <Help />}
          {tabValue === 'settings' && <UserSettings />}
        </animated.div>
        <animated.div style={opacity} className={styles.nav}>
          <Tabs
            orientation="vertical"
            value={getTabVal(tabValue)}
            textColor="secondary"
            indicatorColor="secondary"
            onChange={handleChange}
            aria-label="panel options"
            className={classes.tabs}
          >
            {(!mistWalker.isWalker || mistWalker.showSidebar) && (
              <Tab
                className={classes.tab}
                icon={<AddLocationIcon />}
                aria-label="Add location"
                title="Add location"
              />
            )}
            <Tab
              className={classes.tab}
              icon={<InfoIcon />}
              aria-label="Zone Info"
              title="Zone Info"
            />
            <Tab
              className={classes.tab}
              icon={<HelpIcon />}
              aria-label="Portaler Help"
              title="Portaler Help"
            />
            <Tab
              className={classes.tab}
              icon={<SettingsIcon />}
              aria-label="Settings"
              title="Settings"
            />
          </Tabs>
        </animated.div>
      </animated.div>
    </aside>
  )
}

export default SideBar
