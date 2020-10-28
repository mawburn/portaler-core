import './App.scss'

import React, { useCallback, useEffect, useMemo, useState } from 'react'

import { createMuiTheme, CssBaseline, ThemeProvider } from '@material-ui/core'
import { blue } from '@material-ui/core/colors'

import Cyto from '../Cyto'
import MappingBar from '../MappingBar'
import PasswordForm from '../PasswordForm'
import DarkModeToggle from './DarkModeToggle'
import useGetConfig from './useGetConfig'
import useGetPortals from './useGetPortals'
import useGetZones from './useGetZones'
// import useGetLive from './useGetLive'
import github from './github.svg'
import twitch from './twitch.svg'

export const BAD_PASS = '🙅‍♀️bad password🤦‍♂️'

const prefersDark = localStorage.getItem('darkMode')
  ? localStorage.getItem('darkMode') !== 'false'
  : window.matchMedia('(prefers-color-scheme: dark)').matches

const storageToken = (): string => {
  const token = window.localStorage.getItem('token')

  if (token === null) {
    return BAD_PASS
  }

  return token
}

function App() {
  const [token, setToken] = useState<string>(storageToken())
  const [isDark, setIsDark] = useState<boolean>(prefersDark)

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

  const theme = useMemo(
    () =>
      createMuiTheme({
        palette: {
          background: {
            default: isDark ? '#333' : '#f0f0f0',
          },
          primary: isDark
            ? {
                main: '#81d4fa',
              }
            : blue,
          type: isDark ? 'dark' : 'light',
        },
        overrides: {
          MuiCssBaseline: {
            '@global': {
              html: {
                background: isDark ? '#333' : '#fff',
              },
              body: {
                background: isDark ? '#333' : '#fff',
              },
            },
          },
        },
      }),
    [isDark]
  )

  const updateTheme = useCallback((isDark: boolean) => {
    localStorage.setItem('darkMode', `${isDark}`)
    setIsDark(isDark)
  }, [])

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
                isDark={isDark}
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
              className="twitchlink"
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
              Github
            </a>
          </div>
          <DarkModeToggle isDark={isDark} update={updateTheme} />
        </footer>
      </div>
    </ThemeProvider>
  )
}

export default App
