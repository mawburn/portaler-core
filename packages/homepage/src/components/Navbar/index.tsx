import React, { FC } from 'react'
import cn from 'clsx'
import { Link } from 'gatsby'

import styles from './styles.module.scss'

interface NavbarProps {
  current: string
}

const Navbar: FC<NavbarProps> = ({ current }) => (
  <nav className={styles.nav}>
    <ul>
      <li>
        <Link
          to="/"
          className={cn({ [styles.active]: current === 'signup' })}
          title="sign your discord server up to use portaler"
        >
          SignUp
        </Link>
      </li>
      <li>
        <Link
          to="/"
          className={cn({ [styles.active]: current === 'dashboard' })}
          title="login and see your dashboard"
        >
          Dashboard
        </Link>
      </li>
      <li className="hideXs">
        <Link to="https://public.portaler.zone">Demo</Link>
      </li>
    </ul>
  </nav>
)

export default Navbar
