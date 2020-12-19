import clsx from 'clsx'
import React, { FC } from 'react'

import mistWalker from '../../common/utils/mistWalker'
import styles from './styles.module.scss'

const MainLayout: FC = ({ children }) => (
  <main
    className={clsx(styles.layout, {
      [styles.hideSidebar]: !mistWalker.showSidebar,
    })}
  >
    {children}
  </main>
)
export default MainLayout
