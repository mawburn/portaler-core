import { DateTime } from 'luxon'
import React, { useEffect, useState } from 'react'

import { Button, Dialog, DialogActions } from '@material-ui/core'

import { githubLogo, patreonLogo } from '../common/images'
import styles from './styles.module.scss'

const isOctober = DateTime.now().month === 10

const Patreon = () => {
  const [open, setOpen] = useState<boolean>(false)

  useEffect(() => {
    if (!document.cookie.includes('patreonpop')) {
      const displayTimer = DateTime.utc().plus({ days: isOctober ? 1 : 3 })

      document.cookie = `patreonpop=true; expires=${displayTimer.toHTTP()}; SameSite=None; Secure`

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
        <div>This helps pay for server &amp; other related costs.</div>
      </div>
      <div className={styles.div}>
        Are you a developer or know one who's looking to contribute to an open
        source project?
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://www.reddit.com/r/albiononline/comments/p0qx4d/portaler_is_looking_for_code_contributors/"
        >
          <img src={githubLogo} className={styles.githubLogo} alt="github" />{' '}
          Portaler is looking for contributors!
        </a>
        Portaler is proudly 90% TypeScript with ReactJS &amp; NodeJS.
        {isOctober && (
          <>
            <h3>
              Plus we are participating in{' '}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href="https://hacktoberfest.digitalocean.com/"
              >
                Hacktoberfest!
              </a>
            </h3>
            <a
              target="_blank"
              rel="noopener noreferrer"
              href="https://hacktoberfest.digitalocean.com/"
            >
              <img
                src="https://hacktoberfest.digitalocean.com/_nuxt/img/logo-hacktoberfest-full.f42e3b1.svg"
                className={styles.hacktober}
                alt="Hacktoberfest"
              />
            </a>
          </>
        )}
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
