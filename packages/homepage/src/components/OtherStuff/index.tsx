import React from 'react'

import styles from './styles.module.scss'

const OtherStuff = () => (
  <div className={styles.otherStuff}>
    <div className={styles.mistWalkers}>
      <h4>Mapping can be rough sometimes...</h4>
      <iframe
        loading="lazy"
        title="First Death - Portaler Mapping"
        className={styles.youtube}
        src="https://www.youtube.com/embed/pI81UkjKbKA?start=7"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      />
    </div>
  </div>
)

export default OtherStuff
