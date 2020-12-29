import React from 'react'

import Layout from '../components/Layout'
import SEO from '../components/seo'

import MainLogo from '../components/MainLogo'

import WhatIs from '../components/WhatIs'

import Features from '../components/Features'

import JoinDiscord from '../components/JoinDiscord'

import OtherStuff from '../components/OtherStuff'

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
