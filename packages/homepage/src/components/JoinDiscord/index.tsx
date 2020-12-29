import React from 'react'

import Button from '@material-ui/core/Button'
import withStyles from '@material-ui/core/styles/withStyles'

import discord from '../../images/discord-white.svg'

const DiscordButton = withStyles(() => ({
  root: {
    backgroundColor: '#7289DA',
    '&:hover': {
      backgroundColor: '#869ADF',
    },
  },
}))(Button)

import styles from './styles.module.scss'

const JoinDiscord = () => (
  <div className={styles.container}>
    <h2>Join our Discord</h2>
    <DiscordButton
      variant="contained"
      href="https://discord.gg/W2NteY4dDS"
      size="small"
      title="join our discord"
    >
      <img className={styles.logo} src={discord} alt="discord" />{' '}
    </DiscordButton>
  </div>
)

export default JoinDiscord
