import clsx from 'clsx'
import React, { FC } from 'react'
import { useSelector } from 'react-redux'
import { animated, useSpring } from 'react-spring'

import mistWalker from '../../common/utils/mistWalker'
import { RootState } from '../../reducers'
import styles from './styles.module.scss'

const MainLayout: FC = ({ children }) => {
  const sideBar = useSelector((state: RootState) => state.sideBar)

  const props = useSpring({
    gridTemplateColumns: `${sideBar ? '350px' : '68px'} auto`,
  })

  return (
    <animated.main
      style={props}
      className={clsx(styles.layout, {
        [styles.hideSidebar]: !mistWalker.showSidebar,
      })}
    >
      {children}
    </animated.main>
  )
}
export default MainLayout
