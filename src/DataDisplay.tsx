import React, { useState, useEffect, useCallback } from 'react'
import { Zone, Portal } from './types'
import CytoscapeComponent from 'react-cytoscapejs'
import { ElementDefinition } from 'cytoscape'

interface DataDisplayProps {
  zones: Zone[]
  portals: Portal[]
  onNodeClick: (id: string) => void
}

const portalSizeToColor = {
  2: 'green',
  7: 'blue',
  20: 'orange',
}

const zoneColorToColor = {
  black: 'black',
  red: 'red',
  yellow: 'yellow',
  blue: 'blue',
  road: 'lightblue',
}

const defaultLayout = 'breadthfirst'

const DataDisplay: React.FC<DataDisplayProps> = ({
  zones,
  portals,
  onNodeClick,
}) => {
  const [layout, setLayout] = useState('random')

  const filteredZones = zones.filter(
    (z) => !!portals.find((p) => p.source === z.name || p.target === z.name)
  )

  const [activeZoneName, setActiveZoneName] = useState('')

  const activeZone = filteredZones.find((z) => z.name === activeZoneName)

  const cyEventHandler = useCallback(
    (e: cytoscape.EventObject) => {
      onNodeClick(e.target.id())
      setActiveZoneName(e.target.id())
    },
    [onNodeClick, setActiveZoneName]
  )

  useEffect(() => {
    setTimeout(() => setLayout(defaultLayout), 500)
  }, [])

  if (zones.length > 0) {
    const data: ElementDefinition[] = [
      ...filteredZones.map((z) => ({
        data: { id: z.name, label: z.name },
        style: {
          backgroundColor: zoneColorToColor[z.color],
          shape: z.type.indexOf('TUNNEL_HIDEOUT') >= 0 ? 'pentagon' : '',
        },
      })),
      ...portals.map((p) => ({
        data: {
          source: p.source,
          target: p.target,
          label: `${Math.floor(p.timeLeft / 60)}h ${Math.round(
            p.timeLeft % 60
          )}min`,
        },
        classes: p.timeLeft < 30 ? 'timeLow' : '',
        style: {
          lineColor: portalSizeToColor[p.size],
        },
      })),
    ]

    return (
      <>
        <CytoscapeComponent
          elements={data}
          cy={(cy) => {
            cy.on('tap', 'node', cyEventHandler)
          }}
          style={{ height: '720px', width: '800px', border: '1px solid red' }}
          stylesheet={[
            {
              selector: 'node[label]',
              style: {
                label: 'data(label)',
                color: 'black',
              },
            },
            {
              selector: 'edge[label]',
              style: {
                label: 'data(label)',
                width: 3,
                color: 'black',
              },
            },
            {
              selector: '.timeLow',
              style: {
                color: 'red',
              },
            },
          ]}
          layout={{ name: layout }}
        />
        <select onChange={(e) => setLayout(e.target.value)} value={layout}>
          <option value="random">random</option>
          <option value="grid">grid</option>
          <option value="circle">circle</option>
          <option value="cose">cose</option>
          <option value="concentric">concentric</option>
          <option value="breadthfirst">breadthfirst</option>
        </select>
        {activeZone && (
          <table>
            <tbody>
              <tr>
                <td>Name</td>
                <td>{activeZone.name}</td>
              </tr>
              <tr>
                <td>Type</td>
                <td>{activeZone.type}</td>
              </tr>
              <tr>
                <td>Resources</td>
                <td>
                  {activeZone.resources &&
                    activeZone.resources
                      .map((r) => `T${r.tier} ${r.name}`)
                      .join(', ')}
                </td>
              </tr>
              <tr>
                <td>Map markers</td>
                <td>{activeZone.markers && activeZone.markers.join(', ')}</td>
              </tr>
            </tbody>
          </table>
        )}
      </>
    )
  }
  return (
    <div>
      Unable to fetch zone information from the server, this could be a network
      issue, or invalid password
    </div>
  )
}

export default DataDisplay
