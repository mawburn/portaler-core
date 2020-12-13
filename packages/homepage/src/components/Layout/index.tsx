import './index.scss'
import React, { FC } from 'react'

import Footer from '../Footer'

import Header from '../Header'

import styles from './styles.module.scss'

const Layout: FC = ({ children }) => (
  <>
    <div className={styles.baseContainer}>
      <header className={styles.header}>
        <Header />
      </header>
      <main className={styles.main}>{children}</main>
    </div>
    <Footer />
  </>
)

export default Layout
