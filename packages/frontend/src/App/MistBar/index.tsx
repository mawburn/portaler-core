import React from 'react'

import { Link } from '@material-ui/core'

import mistWalkerShield from './mistWalkerShield.png'
import styles from './styles.module.scss'

const MistBar = () => (
  <div className={styles.mist}>
    <div>
      <img
        className={styles.bannerImg}
        src={mistWalkerShield}
        alt="Mist Walker Shield"
      />
    </div>
    <div className={styles.centerText}>
      <p>
        This public curated map is provided by the volunteers from the guild
        <strong className={styles.mistColor}>Mist Walkers</strong>. The
        information in this map is not guaranteed to be 100% correct, but it's
        as accurate as we are human.
        <br /> Come say hi to us or request help on{' '}
        <Link
          href="https://discord.gg/tCjd7FC5ys"
          color="secondary"
          target="_new"
        >
          Discord
        </Link>
        . Or if you see us in game, say hi and Silver tips to fund gear
        replacement and tomes are always welcome!
      </p>
    </div>
    <div>
      <img
        className={styles.bannerImg}
        src={mistWalkerShield}
        alt="Mist Walker Shield"
      />
    </div>
  </div>
)

export default MistBar
