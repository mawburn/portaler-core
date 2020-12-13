import React, { FC } from 'react'
import cn from 'clsx'
import { Link } from 'gatsby'
import HomeWorkIcon from '@material-ui/icons/HomeWork'
import DashboardIcon from '@material-ui/icons/Dashboard'
import LinearScaleIcon from '@material-ui/icons/LinearScale'

import discordIcon from '../../images/discord-icon.svg'

import styles from './styles.module.scss'

interface NavbarProps {
  current: string
}

const Navbar: FC<NavbarProps> = ({ current }) => (
  <nav className={styles.nav}>
    <ul>
      <li>
        <Link to="/" className={cn({ [styles.active]: current === 'home' })}>
          <HomeWorkIcon />
          Home
        </Link>
      </li>
      <li>
        <Link to="/" className={cn({ [styles.active]: current === 'home' })}>
          <img
            className={styles.discordLogo}
            src={discordIcon}
            alt="signup with discord"
          />
          Sign Up
        </Link>
      </li>
      <li>
        <Link to="/" className={cn({ [styles.active]: current === 'home' })}>
          <DashboardIcon /> Dashboard
        </Link>
      </li>
      <li>
        <Link to="/" className={cn({ [styles.active]: current === 'home' })}>
          <LinearScaleIcon /> Demo
        </Link>
      </li>
    </ul>
  </nav>
)

export default Navbar
