import React from 'react'

import { CssBaseline, ThemeProvider } from '@material-ui/core'

import mistWalker from '../common/utils/mistWalker'
import Patreon from '../Patreon'
import SideBar from '../Sidebar'
import Footer from './Footer'
import useGetConfig from './hooks/useGetConfig'
import useGetPortalTimer from './hooks/useGetPortalTimer'
import useGetZones from './hooks/useGetZones'
import useSetToken from './hooks/useSetToken'
import MainLayout from './MainLayout'
import MapArea from './MapArea'
import MistBar from './MistBar'
import Notifications from './Notifications'
import styles from './styles.module.scss'
import theme from './theme'

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
        {mistWalker.isWalker && <MistBar />}
        <MainLayout>
          <SideBar />
          <MapArea />
        </MainLayout>
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
