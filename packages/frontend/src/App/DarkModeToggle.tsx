import { Grid, Switch, Typography } from '@material-ui/core'
import React, { FC } from 'react'

interface DarkModeToggleProps {
  isDark: boolean
  update: (isDark: boolean) => void
}

const DarkModeToggle: FC<DarkModeToggleProps> = ({ update, isDark }) => (
  <Typography component="div">
    <Grid component="label" container alignItems="center" spacing={1}>
      <Grid item>Light</Grid>
      <Grid item>
        <Switch
          color="default"
          checked={isDark}
          onChange={() => update(!isDark)}
        />
      </Grid>
      <Grid item>Dark</Grid>
    </Grid>
  </Typography>
)

export default DarkModeToggle
