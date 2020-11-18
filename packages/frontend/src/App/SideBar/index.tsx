import React from 'react'

import useToken from '../../common/hooks/useToken'
import { portalerSmall } from '../../common/images'
import LoginButton from '../../LoginButton'
import PortalForm from '../../PortalForm'
import styles from '../styles.module.scss'

const SideBar = () => {
  const token = useToken()

  return (
    <aside className={styles.searchSide}>
      {token ? (
        <>
          <header className={styles.mainHeader}>
            <h1>
              <img alt="logo" src={portalerSmall} className={styles.logo} />
              Portaler
            </h1>
          </header>
          <PortalForm />
        </>
      ) : (
        <LoginButton />
      )}
    </aside>
  )
}

export default SideBar
