import React from 'react'

import Features from '../components/Features'
import JoinDiscord from '../components/JoinDiscord'
import Layout from '../components/Layout'
import MainLogo from '../components/MainLogo'
import OtherStuff from '../components/OtherStuff'
import SEO from '../components/seo'
import WhatIs from '../components/WhatIs'

import styles from './styles.module.scss'

const desc = `
Portaler is a Roads of Avalon mapping tool intended for groups, guilds, and alliances to share ever changing mapping information.
`

const IndexPage = () => (
  <Layout>
    <SEO description={desc} />
    <main className={styles.indexMain}>
      <MainLogo />
      <WhatIs />
      <JoinDiscord />
      <Features />
      <OtherStuff />
    </main>
  </Layout>
)

export default IndexPage
