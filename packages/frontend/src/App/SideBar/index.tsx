import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Drawer, IconButton } from '@material-ui/core'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'

import useToken from '../../common/hooks/useToken'
import { portalerSmall } from '../../common/images'
import LoginButton from '../../LoginButton'
import PortalForm from '../../PortalForm'
import { RootState } from '../../reducers'
import styles from '../styles.module.scss'
import Twitch from '../Twitch'

const SideBar = () => {
  const token = useToken()
  const isOpen = useSelector((state: RootState) => state.drawerOpen)
  const dispatch = useDispatch()

  return (
    <Drawer
      variant="persistent"
      anchor="left"
      open={isOpen}
      className={styles.drawerSide}
    >
      <IconButton
        onClick={() => dispatch({ type: 'drawer/toggle' })}
        aria-label="drawer toggle"
        title="close drawer"
      >
        <ChevronLeftIcon />
      </IconButton>
      <aside className={styles.searchSide}>
        {token ? (
          <>
            <header className={styles.mainHeader}>
              <img alt="logo" src={portalerSmall} className={styles.logo} />
            </header>
            <PortalForm />
          </>
        ) : (
          <LoginButton />
        )}
      </aside>
      <div className={styles.twitchContainer}>
        <Twitch />
      </div>
    </Drawer>
  )
}

export default SideBar
