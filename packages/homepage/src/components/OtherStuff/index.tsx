import React from 'react'

import styles from './styles.module.scss'

const OtherStuff = () => (
  <div className={styles.otherStuff}>
    <div className={styles.mistWalkers}>
      <h3 className={styles.color}>Mist Walkers</h3>
      <article>
        <p>
          Portaler also runs a public map that can be found here:{' '}
          <strong>
            <a href="https://map.portaler.zone">map.portaler.zone</a>
          </strong>
        </p>
        <p>
          This map is provided by a volunteer guild of alts, called the{' '}
          <span className={styles.color}>Mist Walkers</span>. If you see one, be
          sure to say hi!
        </p>
      </article>
      <div>
        <h4>
          Mapping for the <span className={styles.color}>Mist Walkers</span> can
          be rough...
        </h4>
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
  </div>
)

export default OtherStuff
