import React, { FC } from 'react'

import styles from './styles.module.scss'

interface SideBarProps {}

const SideBar: FC<SideBarProps> = () => (
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
      <PasswordForm password={token ?? ''} setPassword={setToken} />
    ) : (
      <MappingBar
        fromId={sourceZone}
        zones={zones}
        token={token}
        updatePortals={updatePortals}
      />
    )}
  </aside>
)

export default SideBar
