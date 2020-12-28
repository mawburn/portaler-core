import { Link } from 'gatsby'
import React from 'react'

import Navbar from '../Navbar'

import logo from './header-logo.png'
import styles from './styles.module.scss'

const Header = () => (
  <header className={styles.header}>
    <div className={styles.logo}>
      <Link to="/" title="home">
        <img src={logo} alt="portaler" />
      </Link>
    </div>
    <Navbar current="x" />
  </header>
)

export default Header
