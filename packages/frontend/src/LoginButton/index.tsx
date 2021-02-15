import React, { MouseEvent } from 'react'

import { Button, FormControl, Link, withStyles } from '@material-ui/core'

import useConfigSelector from '../common/hooks/useConfigSelector'
import { discordLogoWhite, portalerSmall } from '../common/images'
import styles from './styles.module.scss'

const DiscordButton = withStyles(() => ({
  root: {
    backgroundColor: '#7289DA',
    '&:hover': {
      backgroundColor: '#869ADF',
    },
  },
}))(Button)

const cookieAndRedirect = (e: MouseEvent<HTMLButtonElement>) => {
  e.preventDefault()
  e.stopPropagation()

  const host = window.location.hostname.split('.')
  document.cookie = `subdomain=${host[0]};path=/;domain=${host[1]}.${host[2]};SameSite=Lax`

  setTimeout(() => {
    const authUrl =
      process.env.NODE_ENV === 'production' ? '' : process.env.REACT_APP_AUTH
    window.location.href = `${authUrl}/api/auth/login`
  }, 5)
}

const PasswordForm = () => {
  const config = useConfigSelector()
  return (
    <div className={styles.btnContainer}>
      <img alt="logo" src={portalerSmall} />
      {config.isPublic ? (
        <>
          <h2 className={styles.publicNote}>This server is public.</h2>
          <h3>If you have write permissions, login with</h3>
        </>
      ) : (
        <h2>Login with</h2>
      )}

      <FormControl fullWidth>
        <DiscordButton
          variant="contained"
          onClick={cookieAndRedirect}
          size="large"
        >
          <img src={discordLogoWhite} alt="discord" className={styles.logo} />{' '}
        </DiscordButton>
      </FormControl>
      <div className={styles.disclaimer}>
        We use cookies to hold a user's login information. By clicking the login
        button above you consent to cookies.
      </div>
      {config.isPublic && config.discordUrl && (
        <div className={styles.discordLink}>
          Please visit the discord for this server for more information.{' '}
          <div>
            <Link href={config.discordUrl} color="secondary" target="_blank">
              {config.discordUrl.replace('https://', '')}
            </Link>
          </div>
        </div>
      )}
    </div>
  )
}

export default PasswordForm
