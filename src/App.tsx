import React, { useState, useCallback, useEffect } from 'react';
import './App.css';
import DataDisplay from './DataDisplay';
import DataInput from './DataInput';
import { PortalSize, Zone, Portal, ZoneColor, ZoneTier } from './types';


function App() {
  const [password, setPassword] = useState("");
  const [activatePassword, setActivatePassword] = useState(false)
  const [zones, setZones] = useState<Zone[]>([]);
  const [portals, setPortals] = useState<Portal[]>([]);

  const retrieveZones = useCallback(async () => {
    const res = await fetch(`/api/zone`, {
      headers: {
        "X-Tebro-Auth": password
      }
      
    }).then(r => r.json())
    setZones(res);
  }, [ setZones, password ])

  const retrievePortals = useCallback(async () => {
    const res = await fetch(`/api/portal`, {
      headers: {
        "X-Tebro-Auth": password
      }
    }).then(r => r.json())
    setPortals(res)
  }, [setPortals, password])

  useEffect(() => {
    if (activatePassword) {
      retrieveZones().then(retrievePortals);

      const zonesInterval = setInterval(() => {
        retrieveZones();
      }, 60000);
      const portalsInterval = setInterval(() => {
        retrievePortals();
      }, 60000);

      return () => {
        clearInterval(zonesInterval);
        clearInterval(portalsInterval);
      }
    }
  }, [activatePassword, retrievePortals, retrieveZones]);

  const addZone = useCallback(async (name: string, color: ZoneColor, tier: ZoneTier) => {
    const data: Zone = {
      name,
      color,
      tier
    }
    setZones(zones => [...zones, data])
    fetch(`/api/zone`, {
      method: "POST",
      headers: {
        "X-Tebro-Auth": password
      },
      body: JSON.stringify(data)
    }).then(() => retrieveZones());
  }, [password, retrieveZones, setZones])

  const addPortal = useCallback(async (source: string, target: string, size: PortalSize, hours: number, minutes: number) => {
    const data = {source, target, size, hours, minutes}
    fetch(`/api/portal`, {
      method: "POST",
      headers: {
        "X-Tebro-Auth": password
      },
      body: JSON.stringify(data)
    }).then(() => retrievePortals());
  }, [password, retrievePortals])

  return (
    <div className="App">
      {!activatePassword && <div>
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={() => setActivatePassword(true)}>Log in</button>
      </div>}
      <DataInput existingNames={zones.map((n) => n.name)} addZone={addZone} addPortal={addPortal}/>

      <DataDisplay zones={zones} portals={portals} />
    </div>
  );
}

export default App;
