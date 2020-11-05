import React, { useState } from 'react'

import { CssBaseline, ThemeProvider } from '@material-ui/core'

import DemoBar from './DemoBar'
import Footer from './Footer'
import useGetPortals from './hooks/useGetPortals'
import useGetZones from './hooks/useGetZones'
import MainLayout from './MainLayout'
import SideBar from './SideBar'
import styles from './styles.module.scss'
import theme from './theme'

const App = () => {
  useGetZones()
  useGetPortals()

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={styles.appContainer}>
        <MainLayout>
          <SideBar />
        </MainLayout>
        <DemoBar />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
