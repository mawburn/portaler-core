import './index.scss'

import React, { FC } from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import { ThemeProvider } from '@material-ui/core/styles'

import Footer from '../Footer'

import styles from './styles.module.scss'
import theme from './theme'

const Layout: FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <div className={styles.baseContainer}>{children}</div>
    <Footer />
  </ThemeProvider>
)

export default Layout
