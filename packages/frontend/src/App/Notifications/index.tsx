import React from 'react'

import { Snackbar } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert'
import { hashKey } from '@portaler/utils'

import useBadCredentials from '../hooks/useBadCredentials'
import { useSelector } from 'react-redux'
import { RootState } from '../../reducers'

const Notifications = () => {
  const errors = useSelector((state: RootState) => state.errors)
  useBadCredentials(errors)

  return (
    <Snackbar
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      open={errors.length > 0}
      autoHideDuration={4200}
    >
      <>
        {errors.map((err, i) => (
          <Alert key={hashKey(err, i)} severity="error">
            {err}
          </Alert>
        ))}
      </>
    </Snackbar>
  )
}

export default Notifications
