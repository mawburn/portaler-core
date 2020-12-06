import { IconButton } from '@material-ui/core'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../../reducers'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'

import styles from './styles.module.scss'

const OpenDrawer = () => {
  const drawerOpen = useSelector((state: RootState) => state.drawerOpen)
  const dispatch = useDispatch()

  return !drawerOpen ? (
    <div className={styles.control}>
      <IconButton
        onClick={() => dispatch({ type: 'drawer/toggle' })}
        aria-label="drawer toggle"
        title="open drawer"
      >
        <ChevronRightIcon fontSize="large" />
      </IconButton>
    </div>
  ) : null
}

export default OpenDrawer
