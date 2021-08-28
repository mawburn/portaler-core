import { DateTime } from 'luxon'
import React, { useEffect, useState } from 'react'

import { Button, Dialog, DialogActions } from '@material-ui/core'

import { patreonLogo } from '../common/images'
import styles from './styles.module.scss'

const Patreon = () => {
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!document.cookie.includes('patreonpop')) {
      const threeDays = DateTime.utc().plus({ days: 3 })

      document.cookie = `patreonpop=true; expires=${threeDays.toHTTP()}; SameSite=None; Secure`

      if (window.location.host.split('.')[0] !== 'dwai') {
        setOpen(true)
      }
    }
  }, [])

  return open ? (
    <Dialog open={open} aria-labelledby="alert-dialog-title">
      <div className={styles.div}>
        <h3>Support the site!</h3>
        <a
          href="https://www.patreon.com/bePatron?u=30652180"
          target="_blank"
          rel="noopener noreferrer"
          title="Gain the @Patreon Supporter role in Discord PLUS if you're a streamer get your stream posted in #streams when you go live!"
        >
          <img src={patreonLogo} className={styles.patreonLogo} alt="patreon" />
        </a>
      </div>
      <div className={styles.div}>
        Or are you a developer or know a developer who's looking to contribute
        to an open source project?{' '}
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.reddit.com/r/albiononline/comments/p0qx4d/portaler_is_looking_for_code_contributors/"
        >
          Portaler is looking for contributors!
        </a>
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
