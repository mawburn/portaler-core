import { Link } from 'gatsby'
import React, { FC } from 'react'

import Navbar from '../Navbar'

import logo from './header-logo.png'

import styles from './styles.module.scss'

const Header: FC = ({ children }) => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <Link to="/">
        <img src={logo} alt="portaler" />
      </Link>
    </div>
    <Navbar current="x" />
  </header>
)

export default Header
