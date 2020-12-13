import React, { MouseEvent } from 'react'

import { Button, FormControl, withStyles } from '@material-ui/core'

import discord from './discord.svg'
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
}

const PasswordForm = () => (
  <div className={styles.btnContainer}>
    <h2>Sign up with Discord</h2>
    <FormControl fullWidth>
      <DiscordButton
        variant="contained"
        onClick={cookieAndRedirect}
        size="large"
      >
        <img src={discord} alt="discord" className={styles.logo} />{' '}
      </DiscordButton>
    </FormControl>
    <div className={styles.disclaimer}>
      We use cookies to hold a user's login information. By clicking the login
      button above you consent to cookies.
    </div>
  </div>
)

export default PasswordForm
