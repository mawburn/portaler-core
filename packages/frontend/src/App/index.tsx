import './App.scss'

import React, { useEffect, useState } from 'react'

import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'

import Cyto from '../Cyto'
import MappingBar from '../MappingBar'
import PasswordForm from '../PasswordForm'
import useGetConfig from './useGetConfig'
import useGetPortals from './useGetPortals'
import useGetZones from './useGetZones'
// import useGetLive from './useGetLive'
import github from './github.svg'
import twitch from './twitch.svg'
import discord from './discord.svg'

export const BAD_PASS = '🙅‍♀️bad password🤦‍♂️'

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
          <aside className="search-side">
            <header className="main-header">
              <h1>
                <img
                  alt="logo"
                  src={`${process.env.PUBLIC_URL}/android-chrome-192x192.png`}
                  className="logo"
                />
                Portaler
              </h1>
            </header>
            {token === BAD_PASS || zones === null ? (
              <PasswordForm password={token ?? ''} setPassword={setToken} />
            ) : (
              <MappingBar
                fromId={sourceZone}
                zones={zones}
                token={token}
                updatePortals={updatePortals}
              />
            )}
          </aside>
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
        <footer className="footer">
          <div>
            <a
              href="https://www.twitch.tv/hypnocode"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={twitch} className="twitchlogo" alt="twitch" /> Follow
              Portaler dev on Twitch
              {/* !isLive ? (
              ) : (
                <div className="stream">
                  <div className="isOnline"></div> Dev Streaming now!
                </div>
              )*/}
            </a>
          </div>
          <div className="github">
            <a
              href="https://github.com/Portaler-Zone/portaler-core"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={github} className="githublogo" alt="github" />
              GitHub
            </a>
          </div>
          <div className="discord">
            <a
              href="https://discord.gg/frwgWCm"
              className="link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img src={discord} className="discordlogo" alt="discord" />
            </a>
          </div>
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App
