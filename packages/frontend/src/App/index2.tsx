import styles from './styles.module.scss'

import React, { useEffect, useState } from 'react'

import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'

import Cyto from '../Cyto'
import MappingBar from '../MappingBar'
import PasswordForm from '../PasswordForm'
import useGetConfig from './hooks/useGetConfig'
import useGetPortals from './hooks/useGetPortals'
import useGetZones from './hooks/useGetZones'

export const BAD_PASS = '🙅‍♀️bad password🤦‍♂️'

const isDemo = window.location.host.split('.')[0] === 'demo'

const theme = createMuiTheme({
  palette: {
    background: {
      default: '#333',
    },
    primary: {
      main: '#aa00ff',
    },
    secondary: {
      main: '#fdd835',
    },
    type: 'dark',
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        html: {
          background: '#333',
        },
        body: {
          background: '#333',
        },
      },
    },
  },
})

const storageToken = (): string => {
  const token = window.localStorage.getItem('token')

  if (token === null) {
    return BAD_PASS
  }

  return token
}

function App() {
  const [token, setToken] = useState<string>(storageToken())

  const config = useGetConfig()
  const zones = useGetZones(token, config?.publicRead)
  const [portals, updatePortals] = useGetPortals(
    token,
    zones?.length,
    config?.publicRead
  )

  // const isLive = useGetLive()

  const [sourceZone, setSourceZone] = useState<string | null>(null)

  useEffect(() => {
    if ((zones === null || portals === null) && token !== BAD_PASS) {
      setToken(BAD_PASS)
    }
  }, [zones, portals, token])

  useEffect(() => {
    if (token !== storageToken()) {
      window.localStorage.setItem('token', token)
    }
  }, [token])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        <main className="layout">
          {(token !== BAD_PASS || config?.publicRead) && (
            <div className="map-display">
              <Cyto
                zones={zones ?? []}
                portals={portals ?? []}
                onNodeClick={setSourceZone}
              />
            </div>
          )}
        </main>
      </div>
    </ThemeProvider>
  )
}

export default App
