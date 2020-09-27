import React, { useState, useCallback, useEffect } from 'react'
import './App.css'
import DataDisplay from './DataDisplay'
import DataInput from './DataInput'
import { PortalSize, Zone, Portal } from './types'

function App() {
  const [password, setPassword] = useState('test')
  const [publicRead, setPublicRead] = useState<boolean | undefined>(undefined)
  const [activatePassword, setActivatePassword] = useState(false)
  const [zones, setZones] = useState<Zone[]>([])
  const [portals, setPortals] = useState<Portal[]>([])

  const retrieveZones = useCallback(async () => {
    const res = await fetch(`/api/zone`, {
      headers: {
        'X-Tebro-Auth': password,
      },
    }).then((r) => r.json())
    setZones(res)
  }, [setZones, password])

  const retrievePortals = useCallback(async () => {
    const res = await fetch(`/api/portal`, {
      headers: {
        'X-Tebro-Auth': password,
      },
    }).then((r) => r.json())
    setPortals(res)
  }, [setPortals, password])

  useEffect(() => {
    if (typeof publicRead === 'undefined') {
      fetch('/api/config')
        .then((r) => r.json())
        .then((r) => setPublicRead(r.publicRead))
    }

    if (activatePassword || publicRead) {
      retrieveZones().then(retrievePortals)

      const zonesInterval = setInterval(() => {
        retrieveZones()
      }, 60000)
      const portalsInterval = setInterval(() => {
        retrievePortals()
      }, 60000)

      return () => {
        clearInterval(zonesInterval)
        clearInterval(portalsInterval)
      }
    }
  }, [
    activatePassword,
    retrievePortals,
    retrieveZones,
    publicRead,
    setPublicRead,
  ])

  const addPortal = useCallback(
    async (
      source: string,
      target: string,
      size: PortalSize,
      hours: number,
      minutes: number
    ) => {
      const data = { source, target, size, hours, minutes }
      fetch(`/api/portal`, {
        method: 'POST',
        headers: {
          'X-Tebro-Auth': password,
        },
        body: JSON.stringify(data),
      }).then(() => retrievePortals())
    },
    [password, retrievePortals]
  )

  const [sourceZone, setSourceZone] = useState('')

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
      {(activatePassword || publicRead) && (
        <>
          <header>
            <h1>Albion Mapper</h1>
          </header>
          <main className="layout">
            <aside className="search-side">
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
