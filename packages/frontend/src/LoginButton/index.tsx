import React from 'react'

import { Button, FormControl, withStyles } from '@material-ui/core'

import { discordLogoWhite } from '../common/images'
import styles from './styles.module.scss'

const DiscordButton = withStyles(() => ({
  root: {
    color: '#FFF',
    backgroundColor: '#7289DA',
    '&:hover': {
      backgroundColor: '#7289DA',
    },
    fontWeight: 700,
    fontSize: '1.25rem',
    marginTop: '0.5rem',
  },
}))(Button)

const PasswordForm = () => {
  const authUrl =
    process.env.NODE_ENV === 'production' ? '' : process.env.REACT_APP_AUTH

  return (
    <div className={styles.btnContainer}>
      Login with
      <FormControl fullWidth>
        <DiscordButton
          variant="contained"
          href={`${authUrl}/api/auth/login`}
          size="large"
        >
          <img src={discordLogoWhite} alt="discord" className={styles.logo} />{' '}
        </DiscordButton>
      </FormControl>
    </div>
  )
}

export default PasswordForm
