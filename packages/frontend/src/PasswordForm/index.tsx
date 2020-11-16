import React from 'react'

import { Button, FormControl } from '@material-ui/core'

import { discordLogo } from '../common/images'
import styles from './styles.module.scss'

const PasswordForm = () => {
  const authUrl =
    process.env.NODE_ENV === 'production' ? '' : process.env.REACT_APP_AUTH

  return (
    <FormControl fullWidth margin="normal">
      <Button
        variant="contained"
        href={`${authUrl}/api/auth/login`}
        size="large"
      >
        Login with{' '}
        <img src={discordLogo} alt="discord" className={styles.logo} />
      </Button>
    </FormControl>
  )
}

export default PasswordForm
