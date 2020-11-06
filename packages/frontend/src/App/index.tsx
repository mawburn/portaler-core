import React from 'react'

import { CssBaseline, ThemeProvider } from '@material-ui/core'

import Cyto from '../Cyto'
import DemoBar from './DemoBar'
import Footer from './Footer'
import useGetConfig from './hooks/useGetConfig'
import useGetPortalTimer from './hooks/useGetPortalTimer'
import useGetZones from './hooks/useGetZones'
import MainLayout from './MainLayout'
import SideBar from './SideBar'
import styles from './styles.module.scss'
import theme from './theme'
import Notifications from './Notifications'

const App = () => {
  useGetConfig()
  useGetZones()
  useGetPortalTimer()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.appContainer}>
        <Notifications />
        <MainLayout>
          <SideBar />
          <Cyto />
        </MainLayout>
        <DemoBar />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
