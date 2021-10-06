import cn from 'clsx'
import { Link } from 'gatsby'
import React, { FC } from 'react'

import styles from './styles.module.scss'

interface NavbarProps {
  current: string
}

const Navbar: FC<NavbarProps> = ({ current }) => (
  <nav className={styles.nav}>
    <ul>
      <li>
        <Link
          to="https://discord.gg/BRUmgF4Mnm"
          className={cn({ [styles.active]: current === 'signup' })}
          title="sign your discord server up to use portaler"
        >
          SignUp
        </Link>
      </li>
      <li>
        <Link
          to="https://public.portaler.zone"
          className={cn({ [styles.active]: current === 'dashboard' })}
          title="public map"
        >
          Public Map
        </Link>
      </li>
    </ul>
  </nav>
)

export default Navbar
