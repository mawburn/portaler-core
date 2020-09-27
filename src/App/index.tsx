import '../App.css'

import React, { useState } from 'react'

import DataDisplay from '../DataDisplay'
import DataInput from '../DataInput'
import MappingBar from '../MappingBar'
import useGetZones from './useGetZones'
import useGetPortals from './useGetPortals'
import useGetConfig from './useGetConfig'
import useAddPortal from './useAddPortal'

function App() {
  const [password, setPassword] = useState('test')

  const config = useGetConfig()
  const zones = useGetZones(password, config?.publicRead)
  const { portals, updatePortals } = useGetPortals(password, config?.publicRead)
  const addPortal = useAddPortal(password, updatePortals)

  const [sourceZone, setSourceZone] = useState('')

  const activatePassword = !!password

  return (
    <div className="App">
      {/* {(!activatePassword || !publicRead) && (
        <div className="login">
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button onClick={() => setActivatePassword(true)}>Log in</button>
        </div>
      )} */}
      {(activatePassword || config?.publicRead) && (
        <>
          <header>
            <h1>Albion Mapper</h1>
          </header>
          <main className="layout">
            <aside className="search-side">
              <MappingBar zones={zones} />
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
