import React, { useState } from 'react'

import { Button, Dialog, DialogActions } from '@material-ui/core'
import styles from './styles.module.scss'
import { githubLogo, thatsall } from '../common/images'

const Patreon = () => {
  const [open, setOpen] = useState<boolean>(true)

  return open ? (
    <Dialog open={open} aria-labelledby="alert-dialog-title">
      <div className={styles.div}>
        <div>
          <img
            src={thatsall}
            style={{ width: '242px', height: '242px' }}
            alt="That's all folks"
          />
        </div>
        <div>
          <p>
            It's been a fun ride. But, all good things have to come to an end.
            I'll be closing up shop December 1, 2021.
          </p>
          <p>
            The project will remain open source &amp; anyone is free to host
            themselves. I will still take PRs &amp; help those who need it. But
            I will also be shutting down the Discord server{' '}
            <span style={{ whiteSpace: 'nowrap' }}>2021-12-01</span>.
          </p>
          <div>
            <a
              href="https://github.com/Portaler-Zone/portaler-core"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={githubLogo}
                className={styles.githubLogo}
                alt="github"
              />
              Github Project
            </a>
          </div>
          <p>
            All the best. This has been a great community. I can't believe it.
            <span role="img" aria-label="heart" style={{ padding: '0 1ch' }}>
              ❤️
            </span>
            <br />
            <em>~hypnoCode</em>
          </p>
        </div>
      </div>
      <DialogActions>
        <Button onClick={() => setOpen(false)} color="secondary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  ) : null
}

export default Patreon
