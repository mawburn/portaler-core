import cn from 'clsx'
import React from 'react'

import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CardHeader from '@material-ui/core/CardHeader'
import CardMedia from '@material-ui/core/CardMedia'

import freeImg from './free.png'
import liveImg from './live.png'
import privateImg from './private.png'
import rolesImg from './roles.png'
import styles from './styles.module.scss'

const Features = () => (
  <div className={styles.container}>
    <Card raised className={styles.card}>
      <CardHeader title="Private Maps" />
      <CardMedia className={styles.media} image={privateImg} />
      <CardContent>
        Create private maps for your guild, alliance, or gang!
      </CardContent>
    </Card>
    <Card raised className={styles.card}>
      <CardHeader title="Role Based Auth" />
      <CardMedia className={styles.media} image={rolesImg} />
      <CardContent>Give access to only those you trust on Discord!</CardContent>
    </Card>
    <Card raised className={styles.card}>
      <CardHeader title="Live Updates" />
      <CardMedia className={styles.media} image={liveImg} />
      <CardContent>See the status of your map in real time!</CardContent>
    </Card>
    <Card raised className={styles.card}>
      <CardHeader title="Free Hosting" />
      <CardMedia className={cn(styles.media, styles.free)} image={freeImg} />
      <CardContent>Just sign up and for free hosting!</CardContent>
    </Card>
  </div>
)

export default Features
