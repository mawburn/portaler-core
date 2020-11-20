import React, { MouseEvent } from 'react'

import { Button, FormControl, withStyles } from '@material-ui/core'

import { discordLogoWhite } from '../common/images'
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

const PasswordForm = () => (
  <div className={styles.btnContainer}>
    <h2>Login with</h2>
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
  </div>
)

export default PasswordForm
