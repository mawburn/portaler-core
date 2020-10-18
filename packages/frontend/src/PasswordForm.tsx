import React, { FC, FormEvent, useCallback, useState } from 'react';

import {
  Button,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
} from '@material-ui/core';
import { VisibilityOff } from '@material-ui/icons';
import Visibility from '@material-ui/icons/Visibility';

interface PasswordFormProps {
  password: string;
  setPassword: (password: string) => void;
}

const PasswordForm: FC<PasswordFormProps> = ({ password, setPassword }) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [localPassword, setLocalPassword] = useState<string>(password || '');

  const handleFormSubmit = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      setPassword(localPassword);
    },
    [setPassword, localPassword]
  );

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
  );
};

export default PasswordForm;
