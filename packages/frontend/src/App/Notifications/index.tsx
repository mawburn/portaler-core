import React from 'react'

import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'

import useBadCredentials from '../hooks/useBadCredentials'

const Notifications = () => {
  // TODO FIX THIS
  // const [badPass, reset] = useBadCredentials()

  const badPass = false
  const reset = () => null
  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={badPass}
      onClose={reset}
      autoHideDuration={4200}
    >
      <Alert severity="error">Bad password. Please log in again.</Alert>
    </Snackbar>
  )
}

export default Notifications
