import React, { FC } from 'react'

import { Paper } from '@material-ui/core'
import { Zone } from '@portaler/types'

import styles from './styles.module.scss'

interface ZoneInfoProps {
  zone: Zone | null
}

const ZoneInfo: FC<ZoneInfoProps> = ({ zone }) =>
  // const resources = useMemo<ReactNode[] | null>(() => {
  //   if (!info) {
  //     return null
  //   }

  //   const sources: Resource = {}

  //   if (info?.resources?.length) {
  //     info.resources.forEach((r) => {
  //       if (sources[r.name]) {
  //         sources[r.name].push(Number(r.tier))
  //         sources[r.name].sort()
  //       } else {
  //         sources[r.name] = [Number(r.tier)]
  //       }
  //     })
  //   }

  //   const display = Object.keys(sources).map((k) => {
  //     const len = sources[k].length
  //     const tiers =
  //       len === 1
  //         ? `T${sources[k][0]}`
  //         : `T${sources[k][0]} - T${sources[k][len - 1]}`
  //     return (
  //       <>
  //         <strong className={styles.fixCase}>{k.toLowerCase()}</strong>: {tiers}
  //       </>
  //     )
  //   })

  //   return display
  // }, [info])

  !zone ? null : (
    <div className={styles.infoContainer}>
      Selected:
      <Paper variant="outlined" className={styles.zoneInfo}>
        <strong>Name:</strong> {zone.name}
      </Paper>
      <Paper variant="outlined" className={styles.zoneInfo}>
        <strong>Type:</strong> {zone.info?.type}
      </Paper>
      {/* {resources &&
        resources.map((r, i) => (
          <Paper
            key={`${info.name}-${info.type}-${i}`}
            variant="outlined"
            className={styles.zoneInfo}
          >
            {r}
          </Paper>
        ))} */}
    </div>
  )

export default ZoneInfo
