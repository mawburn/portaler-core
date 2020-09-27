import './App.css'

import React, { useCallback, useState } from 'react'

import DataDisplay from '../DataDisplay'
import DataInput from '../DataInput'
import MappingBar from '../MappingBar'
import PasswordForm from '../PasswordForm'
import useAddPortal from './useAddPortal'
import useGetConfig from './useGetConfig'
import useGetPortals from './useGetPortals'
import useGetZones from './useGetZones'

const locStore = window.localStorage

function App() {
  const [password, setPassword] = useState(locStore.getItem('token') || 'test')

  const config = useGetConfig()
  const zones = useGetZones(password, config?.publicRead)
  const { portals, updatePortals } = useGetPortals(password, config?.publicRead)
  const addPortal = useAddPortal(password, updatePortals)

  const [sourceZone, setSourceZone] = useState<string | null>(null)

  const updatePassword = useCallback(
    (password: string) => {
      locStore.setItem('token', password)
      setPassword(password)
    },
    [setPassword]
  )

  return (
    <div className="app-container">
      {!password && (
        <div>
          <PasswordForm password={password} setPassword={updatePassword} />
        </div>
      )}
      {(!!password || config?.publicRead) && (
        <>
          <header>
            <h1>Albion Mapper</h1>
          </header>
          <main className="layout">
            <aside className="search-side">
              <form onSubmit={() => null}>
                <MappingBar
                  fromId={sourceZone}
                  addPortal={addPortal}
                  zones={zones}
                />
              </form>
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <br />
              <DataInput
                existingNames={zones.map((n) => n.name)}
                addPortal={addPortal}
                from={sourceZone}
                setFrom={setSourceZone}
              />
            </aside>
            <div className="map-display">
              <DataDisplay
                zones={zones}
                portals={portals}
                onNodeClick={(n) => setSourceZone(n)}
              />
            </div>
          </main>
        </>
      )}
    </div>
  )
}

export default App
