import React, { ChangeEvent, FC, useCallback, useState } from 'react'

import {
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core'
import { VisibilityOff } from '@material-ui/icons'
import Visibility from '@material-ui/icons/Visibility'

interface PasswordFormProps {
  password: string
  setPassword: (password: string) => void
}

const PasswordForm: FC<PasswordFormProps> = ({ password, setPassword }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false)

  const handlePasswordChange = useCallback(
    (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setPassword(e.currentTarget.value)
    },
    [setPassword]
  )

  return (
    <form onSubmit={() => null}>
      <FormControl>
        <InputLabel htmlFor="password-input">Password</InputLabel>
        <Input
          id="password-input"
          type={showPassword ? 'text' : 'password'}
          value={password}
          onChange={handlePasswordChange}
          endAdornment={
            <InputAdornment position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={() => setShowPassword(!showPassword)}
                // onMouseDown={handleMouseDownPassword}
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          }
        />
      </FormControl>
    </form>
  )
}

export default PasswordForm
