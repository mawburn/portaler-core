import cytoscape, {
  CytoscapeOptions,
  EdgeSingular,
  EventObject,
} from 'cytoscape'
import COSEBilkent from 'cytoscape-cose-bilkent'
import isEqual from 'lodash/isEqual'
import { Duration } from 'luxon'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { PortalSize, Zone } from '@portaler/types'
import { hashKey } from '@portaler/utils'
import useEventListener from '@use-it/event-listener'

import { DEFAULT_ZONE } from '../common/data/constants'
import useZoneListSelector from '../common/hooks/useZoneListSelector'
import { tiers, ZoneTier } from '../common/images'
import callSign from '../common/utils/callSign'
import getHomeZone from '../common/utils/getHomeZone'
import { RootState } from '../reducers'
import { PortalMapActionTypes } from '../reducers/portalMapReducer'
import ControlBar from './ControlBar'
import { changeScore } from './cytoUtils'
import defaultSettings from './defaultSettings'
import graphStyle from './graphStyle'
import { getZoneColor, portalSizeToColor } from './mapStyle'
import styles from './styles.module.scss'

cytoscape.use(COSEBilkent)

interface CytoMapElement {
  added: boolean
  element: object
}

export interface CytoEdgeData {
  id: string
  label: string
  portalId: number
  source: string
  target: string
}

const updateLayout = {
  ...defaultSettings.layout,
  fit: false,
}

const future = Duration.fromObject({ hours: 500 }).as('milliseconds')

const getShape = (zone: Zone): string => {
  switch (zone.color) {
    case 'road':
      return 'cut-rectangle'
    case 'road-ho':
      return 'pentagon'
    case 'city':
      return 'star'
    default:
      return ''
  }
}

const PortalMap = () => {
  const controlBar = useRef<HTMLDivElement | null>(null)
  const dispatch = useDispatch()
  const zones = useZoneListSelector()
  const portals = useSelector((state: RootState) => state.portalMap.portals)
  const centerZone = useSelector(
    (state: RootState) => state.portalMap.centerZone
  )

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

  const [activeZoneEdgeData, setActiveZoneEdgeData] = useState<CytoEdgeData[]>(
    []
  )

  const clearActives = useCallback(() => {
    setActiveZoneEdgeData([])
    setActiveZoneName('')
    dispatch({ type: PortalMapActionTypes.CLEARINSPECT })
  }, [dispatch])

  const cyClickHandler = useCallback(
    (e: EventObject) => {
      const t = e.target

      if (t === cy.current) {
        clearActives()
        return
      }

      if (t.isNode()) {
        const name = t.data('zoneName')
        const id = t.data('zoneId')

        dispatch({ type: PortalMapActionTypes.INSPECTNODE, inspectFromId: id })
        setActiveZoneName(name)
        setActiveZoneEdgeData(
          t
            .connectedEdges()
            .toArray()
            .map((e: EdgeSingular) => e.data())
        )
      } else if (t.isEdge()) {
        dispatch({
          type: PortalMapActionTypes.EDIT,
          inspectFromId: t.data('fromInspectId'),
          inspectToId: t.data('toInspectId'),
          timeLeft: t.data('timeLeft'),
          size: t.data('size'),
        })
      }
    },
    [clearActives, dispatch]
  )

  const domEventHandler = useCallback((e: any) => {
    const t = e.target

    if (t.nodeName.toLowerCase() !== 'canvas') {
      return
    }
  }, [])

  // listen to all click events
  useEventListener('click', domEventHandler)

  useEffect(() => {
    if (!cy.current) {
      cy.current = cytoscape({
        ...defaultSettings,
        style: graphStyle,
        container: containerRef.current,
      } as CytoscapeOptions)

      cy.current.on('tap', cyClickHandler)
    } else {
      cy.current.style(graphStyle)
    }
  }, [cyClickHandler])

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

        const backgroundColor = getZoneColor(z.color, isHome, z.isDeep)
        const width = isHome || z.color === 'city' ? 42 : 30
        const height = isHome || z.color === 'city' ? 42 : 30

        if (!elms.has(id)) {
          const imgUrl = z.tier ? tiers[z.tier as ZoneTier] : null
          const backgroundUrl = imgUrl ? `url(${imgUrl})` : 'none'

          const label = z.type.startsWith('TUNNEL')
            ? `${z.name} (${callSign(z)})`
            : z.name

          elms.set(id, {
            added: false,
            element: {
              data: { id, zoneName: z.name, zoneId: z.id, label },
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
                shape: getShape(z),
              },
            },
          })
        }
      })

      if (allKeys.length === 0 && home) {
        const id = hashKey(home.name)
        allKeys.push(id)

        const homeZone = zones.find((z) => z.name === home.name)

        const label = home.type.startsWith('TUNNEL')
          ? `${home.name} (${callSign(home)})`
          : home.name

        if (homeZone) {
          elms.set(id, {
            added: false,
            element: {
              data: { id, zoneName: home.name, label },
              css: {
                width: 42,
                height: 42,
                backgroundColor: getZoneColor(home.color, true, false),
                shape: getShape(home),
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
          const from: Zone =
            zones.find((z) => z.name === p.connection[0]) ?? DEFAULT_ZONE
          const to: Zone =
            zones.find((z) => z.name === p.connection[1]) ?? DEFAULT_ZONE
          elms.set(id, {
            added: false,
            element: {
              data: {
                id,
                portalId: p.id,
                source,
                portalName: `${p.connection[0]} to ${p.connection[1]}`,
                target,
                label,
                connection: [...p.connection],
                fromInspectId: from.id,
                toInspectId: to.id,
                size: p.size,
                timeLeft: p.timeLeft,
              },
              classes: p.timeLeft < 3600 ? 'timeLow' : '',
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
          updateElm.data('size', p.size)
          updateElm.data('timeLeft', p.timeLeft)

          if (p.timeLeft < 3600) {
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

  const handleCenter = useCallback((zone: Zone) => {
    const home = cy.current.$(`#${hashKey(zone.name)}`)

    cy.current.zoom({ level: 2, position: home.position() }).center(home)
  }, [])

  useEffect(() => {
    if (!isEqual(centerZone, DEFAULT_ZONE)) {
      handleCenter(centerZone)
    }
  }, [centerZone, handleCenter])

  const reloadMap = useCallback(() => {
    cy.current.layout(defaultSettings.layout).run()
  }, [])

  return (
    <div className={styles.mapContainer}>
      <ControlBar
        ref={controlBar}
        handleHome={handleCenter}
        reloadMap={reloadMap}
        zone={activeZone || null}
        edgeData={activeZoneEdgeData}
      />
      <div className={styles.cyto}>
        <div ref={containerRef} />
      </div>
    </div>
  )
}

export default PortalMap
