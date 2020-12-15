import React, { MouseEvent, useCallback } from 'react'
import { useDispatch } from 'react-redux'

import { Button } from '@material-ui/core'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'

import useToken from '../../common/hooks/useToken'
import { portalerSmall } from '../../common/images'
import LoginButton from '../../LoginButton'
import PortalForm from '../../PortalForm'
import { ConfigActionTypes } from '../../reducers/configReducer'
import styles from '../styles.module.scss'

const SideBar = () => {
  const token = useToken()
  const dispatch = useDispatch()

  const handleLogout = useCallback(
    (e: MouseEvent) => {
      e.preventDefault()
      e.stopPropagation()
      dispatch({ type: ConfigActionTypes.CLEARTOKEN })
    },
    [dispatch]
  )

  return (
    <aside className={styles.searchSide}>
      {token ? (
        <>
          <header className={styles.mainHeader}>
            <img alt="logo" src={portalerSmall} className={styles.logo} />
          </header>
          <PortalForm />
          <div className={styles.logout}>
            <Button
              size="small"
              onClick={handleLogout}
              startIcon={<ExitToAppIcon />}
            >
              Logout
            </Button>
          </div>
        </>
      ) : (
        <LoginButton />
      )}
    </aside>
  )
}

export default SideBar
