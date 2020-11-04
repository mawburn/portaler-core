import React from 'react'
import { useSelector } from 'react-redux'
import PasswordForm from '../../PasswordForm'
import { RootState } from '../../store'
import useToken, { BAD_PASS } from '../../utils/hooks/useToken'
import PortalForm from '../../PortalForm'

import styles from './styles.module.scss'

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
            className="logo"
          />
          Portaler
        </h1>
      </header>
      {token === BAD_PASS || zones === null ? (
        <PasswordForm />
      ) : (
        <PortalForm fromId={sourceZone} updatePortals={updatePortals} />
      )}
    </aside>
  )
}

export default SideBar
