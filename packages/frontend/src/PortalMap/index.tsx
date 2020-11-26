import cytoscape, { CytoscapeOptions } from 'cytoscape'
import COSEBilkent from 'cytoscape-cose-bilkent'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DateTime, Duration } from 'luxon'

import { PortalSize, Zone } from '@portaler/types'
import { hashKey } from '@portaler/utils'

import zoneTiers from '../common/data/zoneTiers'
import useZoneListSelector from '../common/hooks/useZoneListSelector'
import { tiers } from '../common/images'
import getHomeZone from '../common/utils/getHomeZone'
import { RootState } from '../reducers'
import { PortalMapActionTypes } from '../reducers/portalMapReducer'
import ControlBar from './ControlBar'
import { changeScore } from './cytoUtils'
import defaultSettings from './defaultSettings'
import graphStyle from './graphStyle'
import { portalSizeToColor, zoneColorToColor } from './mapStyle'
import styles from './styles.module.scss'

cytoscape.use(COSEBilkent)

interface CytoMapElement {
  added: boolean
  element: object
}

const updateLayout = {
  ...defaultSettings.layout,
  fit: false,
}

const future = Duration.fromObject({ hours: 500 }).as('seconds')

const PortalMap = () => {
  const dispatch = useDispatch()
  const zones = useZoneListSelector()
  const portals = useSelector((state: RootState) => state.portalMap.portals)

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
      const id = e.target.data('zoneId')

      dispatch({ type: PortalMapActionTypes.INSPECT, inspectId: id })
      setActiveZoneName(name)
    },
    [dispatch]
  )

  useEffect(() => {
    if (!cy.current) {
      cy.current = cytoscape({
        ...defaultSettings,
        style: graphStyle,
        container: containerRef.current,
      } as CytoscapeOptions)

      cy.current.on('tap', 'node', cyEventHandler)
    } else {
      cy.current.style(graphStyle)
    }
  }, [cyEventHandler])

  const filteredZones = useMemo(
    () =>
      zones.filter(
        (z) =>
          !!portals?.find(
            (p) =>
              p.connection[0] === z.name ||
              p.connection[1] === z.name ||
              z.name === home.name
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
        const id = hashKey(z.name)
        allKeys.push(id)

        const isHome = home.name === z.name

        const backgroundColor = zoneColorToColor[isHome ? 'home' : z.color]
        const width = isHome || z.color === 'city' ? 42 : 30
        const height = isHome || z.color === 'city' ? 42 : 30

        if (!elms.has(id)) {
          const zoneTier = zoneTiers.find(
            (zt) => zt.name.toLowerCase() === z.name.toLowerCase()
          )
          const imgUrl = zoneTier ? tiers[zoneTier.tier] : null
          const backgroundUrl = imgUrl ? `url(${imgUrl})` : 'none'

          elms.set(id, {
            added: false,
            element: {
              data: { id, zoneName: z.name, zoneId: z.id, label: z.name },
              css: {
                width,
                height,
                backgroundColor,
                'background-image': backgroundUrl,
                'background-height': height,
                'background-width': width,
                'background-repeat': 'no-repeat',
                'text-outline-color': '#222',
                'text-outline-width': 1,
                'text-outline-opacity': 0.5,
                'text-margin-y': -5,
                shape: z.type.includes('TUNNEL_HIDEOUT')
                  ? 'pentagon'
                  : z.type.includes('TUNNEL_')
                  ? 'cut-rectangle'
                  : z.color === 'city'
                  ? 'star'
                  : '',
              },
            },
          })
        }
      })

      if (allKeys.length === 0 && home) {
        const id = hashKey(home.name)
        allKeys.push(id)

        const homeZone = zones.find((z) => z.name === home.name)

        if (homeZone) {
          elms.set(id, {
            added: false,
            element: {
              data: { id, zoneName: home.name, label: home.name },
              css: {
                width: 42,
                height: 42,
                backgroundColor: zoneColorToColor.home,
                shape: homeZone.type.includes('TUNNEL_HIDEOUT')
                  ? 'pentagon'
                  : homeZone.type.includes('TUNNEL_')
                  ? 'cut-rectangle'
                  : '',
              },
            },
          })
        }
      }

      portals.forEach((p) => {
        const source = hashKey(p.connection[0])
        const target = hashKey(p.connection[1])

        // just to fix the score if the characteres end up being the same, add k e y
        const id = hashKey('e', p.id)
        allKeys.push(id)

        const timeLeft = p.timeLeft * 1000

        const label =
          timeLeft > future
            ? ''
            : Duration.fromMillis(timeLeft).toFormat("h'h' m'm'")

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
              css: {
                lineColor: portalSizeToColor[p.size as PortalSize],
                width: 5,
                'text-outline-color': '#222',
                'text-outline-width': 2,
                'text-outline-opacity': 0.5,
              },
            },
          })
        } else {
          const updateElm = cy.current.$(`#${id}`)
          updateElm.data('label', label)
          updateElm.css('lineColor', portalSizeToColor[p.size as PortalSize])

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
  }, [filteredZones, portals, zones, home])

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
          if (hashKey(home.name) !== k) {
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

  const handleHome = useCallback((zone: Zone) => {
    const home = cy.current.$(`#${hashKey(zone.name)}`)

    cy.current.zoom({ level: 1, position: home.position() }).center(home)
  }, [])

  const reloadMap = useCallback(() => {
    cy.current.layout(defaultSettings.layout).run()
  }, [])

  return (
    <div className={styles.mapContainer}>
      <ControlBar
        handleHome={handleHome}
        reloadMap={reloadMap}
        zone={activeZone || null}
      />
      <div className={styles.cyto}>
        <div ref={containerRef} />
      </div>
    </div>
  )
}

export default PortalMap
