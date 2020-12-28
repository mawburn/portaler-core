import { Link } from 'gatsby'
import React from 'react'

import styles from './styles.module.scss'

const WhatIs = () => (
  <div className={styles.container}>
    <article className={styles.what}>
      <h1>Portaler</h1> is a{' '}
      <strong>
        <Link to="https://wiki.albiononline.com/wiki/Roads_of_Avalon">
          Roads of Avalon
        </Link>
      </strong>{' '}
      mapping tool for the game{' '}
      <strong>
        <Link to="https://albiononline.com/?ref=XQDUDWAXG6">Albion Online</Link>
      </strong>
      .
      <p>
        Portaler is a web application that allows guilds, alliances, or other
        groups to share private maps with each other based on Discord
        authentication and roles.
      </p>
    </article>
  </div>
)

export default WhatIs
