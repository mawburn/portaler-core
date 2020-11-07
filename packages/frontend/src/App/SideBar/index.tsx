import React from 'react'
import { useSelector } from 'react-redux'

import { BAD_PASS } from '../../common/data/constants'
import useToken from '../../common/hooks/useToken'
import PasswordForm from '../../PasswordForm'
import PortalForm from '../../PortalForm'
import { RootState } from '../../reducers'
import styles from '../styles.module.scss'

const SideBar = () => {
  const [token] = useToken()
  const zones = useSelector((state: RootState) => state.zones.list)

  return (
    <aside className={styles.searchSide}>
      <header className={styles.mainHeader}>
        <h1>
          <img
            alt="logo"
            src={`${process.env.PUBLIC_URL}/android-chrome-192x192.png`}
            className={styles.logo}
          />
          Portaler
        </h1>
      </header>
      {token === BAD_PASS || zones === null ? <PasswordForm /> : <PortalForm />}
    </aside>
  )
}

export default SideBar
