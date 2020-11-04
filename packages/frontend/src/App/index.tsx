import { CssBaseline, ThemeProvider } from '@material-ui/core'
import React, { useState } from 'react'
import DemoBar from './DemoBar'
import Footer from './Footer'
import MainLayout from './MainLayout'
import SideBar from './SideBar'

import styles from './styles.module.scss'
import theme from './theme'
import tokenStore from './tokenStore'

const App = () => {
  const [token, setToken] = useState<string>(tokenStore())

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
