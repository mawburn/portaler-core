import React from 'react'

import { CssBaseline, ThemeProvider } from '@material-ui/core'

import DemoBar from './DemoBar'
import Footer from './Footer'
import useGetConfig from './hooks/useGetConfig'
import useGetPortalTimer from './hooks/useGetPortalTimer'
import useGetZones from './hooks/useGetZones'
import MainLayout from './MainLayout'
import Notifications from './Notifications'
import SideBar from './SideBar'
import styles from './styles.module.scss'
import theme from './theme'
import useSetToken from './hooks/useSetToken'
import MapArea from './MapArea'

const App = () => {
  useGetConfig()
  useSetToken()
  useGetZones()
  useGetPortalTimer()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.appContainer}>
        <Notifications />
        <MainLayout>
          <SideBar />
          <MapArea />
        </MainLayout>
        <DemoBar />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
