import React, { FormEvent, useCallback, useState } from 'react'

import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility'
import VisibilityOff from '@material-ui/icons/VisibilityOff'

import useToken from '../common/hooks/useToken'

const PasswordForm = () => {
  const [token, updateToken] = useToken()

  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [localPassword, setLocalPassword] = useState<string>(token)

  const handleFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault()
      updateToken(localPassword)
    },
    [localPassword, updateToken]
  )

  return (
    <form onSubmit={handleFormSubmit}>
      <FormControl fullWidth margin="normal">
        <InputLabel htmlFor="password-input">Password</InputLabel>
        <Input
          id="password-input"
          type={showPassword ? 'text' : 'password'}
          value={localPassword}
          onChange={(e) => setLocalPassword(e.currentTarget.value)}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
      <FormControl fullWidth margin="normal">
        <Button type="submit" variant="contained" color="primary" size="large">
          Login
        </Button>
      </FormControl>
    </form>
  )
}

export default PasswordForm
