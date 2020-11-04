import React, { FC } from 'react'

import styles from './styles.module.scss'

const MainLayout: FC = ({ children }) => (
  <main className={styles.layout}>{children}</main>
)
export default MainLayout
