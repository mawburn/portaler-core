import './styles.scss'

import cytoscape, { CytoscapeOptions } from 'cytoscape'
import COSEBilkent from 'cytoscape-cose-bilkent'
import React, {
  FC,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react'

import { Portal, Zone } from '../types'
import { changeScore } from './cytoUtils'
import defaultSettings from './defaultSettings'
import graphStyle from './graphStyle'
import { portalSizeToColor, zoneColorToColor } from './mapStyle'
import ControlBar from './ControlBar'
import { ZoneLight } from '../common/ZoneSearch/zoneSearchUtils'
import getHomeZone from '../utils/getHomeZone'

cytoscape.use(COSEBilkent)

interface CytoProps {
  isDark: boolean
  zones: Zone[]
  portals: Portal[]
  onNodeClick: (name: string) => void
}

interface CytoMapElement {
  added: boolean
  element: object
}

const updateLayout = {
  ...defaultSettings.layout,
  fit: false,
}

const Cyto: FC<CytoProps> = ({ isDark, portals, zones, onNodeClick }) => {
  const oldScore = useRef<number>(-1)
  const containerRef = useRef<HTMLDivElement | null>(null)

  const home = getHomeZone()

  const cy = useRef<any>(null)
  const elements = useRef<Map<string, CytoMapElement>>(new Map())

  const [score, setScore] = useState<number>(-1)
  const [remove, setRemove] = useState<string[]>([])
  const [activeZoneName, setActiveZoneName] = useState<string>('')

  const activeZone = useMemo<Zone | null>(
    () => zones.find((z) => z.name === activeZoneName) ?? null,
    [zones, activeZoneName]
  )

  const cyEventHandler = useCallback(
    (e: cytoscape.EventObject) => {
      const name = e.target.data('zoneName')
      onNodeClick(name)
      setActiveZoneName(name)
    },
    [onNodeClick]
  )

  useEffect(() => {
    if (!cy.current) {
      cy.current = cytoscape({
        ...defaultSettings,
        style: graphStyle(isDark),
        container: containerRef.current,
      } as CytoscapeOptions)

      cy.current.on('tap', 'node', cyEventHandler)
    } else {
      cy.current.style(graphStyle(isDark))
    }
  }, [isDark, cyEventHandler])

  const filteredZones = useMemo(
    () =>
      zones.filter(
        (z) =>
          !!portals?.find(
            (p) =>
              p.source === z.name || p.target === z.name || z.name === home.name
          )
      ),
    [zones, portals, home.name]
  )

  useEffect(() => {
    const elms = elements.current
    const allKeys: string[] = []

    if (filteredZones.length && cy.current) {
      filteredZones.forEach((z) => {
        // used to add portals first
        const id = 'azone' + z.name.toLowerCase().replace(/ /g, '')
        allKeys.push(id)

        const isHome = home.name === z.name

        const backgroundColor = zoneColorToColor[isHome ? 'home' : z.color]
        const width = isHome ? 42 : 30
        const height = isHome ? 42 : 30

        if (!elms.has(id)) {
          elms.set(id, {
            added: false,
            element: {
              data: { id, zoneName: z.name, label: z.name },
              style: {
                width,
                height,
                backgroundColor,
                shape: z.type.indexOf('TUNNEL_HIDEOUT') >= 0 ? 'pentagon' : '',
              },
            },
          })
        }
      })

      portals.forEach((p) => {
        const source = 'azone' + p.source.toLowerCase().replace(/ /g, '')
        const target = 'azone' + p.target.toLowerCase().replace(/ /g, '')

        // just to fix the score if the characteres end up being the same, add k e y
        const id = `edge${source}${target}`
        allKeys.push(id)

        const label = `${Math.floor(p.timeLeft / 60)}h ${Math.round(
          p.timeLeft % 60
        )}m`

        if (!elms.has(id)) {
          elms.set(id, {
            added: false,
            element: {
              data: {
                id,
                source,
                target,
                label,
              },
              classes: p.timeLeft < 30 ? 'timeLow' : '',
              style: {
                lineColor: portalSizeToColor[p.size],
                width: 5,
              },
            },
          })
        } else {
          const updateElm = cy.current.$(`#${id}`)
          updateElm.data('label', label)

          if (p.timeLeft < 30) {
            updateElm.addClass('timeLow')
          }
        }
      })

      const removeKeys: string[] = Array.from(elms.keys()).filter(
        (k) => !allKeys.includes(k)
      )

      if (removeKeys.length) {
        setRemove(removeKeys)
      }

      setScore(changeScore(allKeys))
    }
  }, [filteredZones, portals, zones, home.name])

  useEffect(() => {
    if (score !== oldScore.current) {
      const elms = elements.current

      // make sure we add the zones first, before the connetions
      const elmKeys = Array.from(elms.keys()).sort((a, b) => a.localeCompare(b))

      let updated = false

      elmKeys.forEach((key) => {
        const elm = elms.get(key)

        if (elm && !elm.added) {
          cy.current.add(elm.element)
          elms.set(key, { added: true, element: { ...elm.element } })
          updated = true
        }
      })

      if (remove.length) {
        remove.forEach((k) => {
          if (`azone${home.name}` !== k) {
            cy.current.remove(cy.current.$(`#${k}`))
            elements.current.delete(k)
          }
        })

        updated = true
        setRemove([])
      }

      if (updated) {
        const layout =
          oldScore.current === -1 ? defaultSettings.layout : updateLayout

        cy.current.layout(layout).run()
      }

      oldScore.current = score
    }
  }, [score, remove, home.name])

  const handleHome = useCallback((zone: ZoneLight) => {
    const home = cy.current.$(`#azone${zone.value.replace(/ /g, '')}`)

    cy.current.zoom({ level: 1, position: home.position() }).center(home)
  }, [])

  return (
    <div>
      <ControlBar handleHome={handleHome} info={activeZone} />
      <div className="cyto">
        <div ref={containerRef} />
      </div>
    </div>
  )
}

export default Cyto
