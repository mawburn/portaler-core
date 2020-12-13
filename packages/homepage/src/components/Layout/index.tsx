import './index.scss'

import React, { FC } from 'react'

import CssBaseline from '@material-ui/core/CssBaseline'
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'

import Footer from '../Footer'
import Header from '../Header'

import styles from './styles.module.scss'
import theme from './theme'

const Layout: FC = ({ children }) => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <Header />
    xyz
    <Footer />
  </ThemeProvider>
)

export default Layout
