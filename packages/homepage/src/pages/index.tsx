import React from 'react'
import { Link } from 'gatsby'

import Layout from '../components/Layout'
import SEO from '../components/seo'

import Screenshot from '../components/screenshot'

import styles from './styles.module.scss'

const IndexPage = () => (
  <Layout>
    <SEO description="Portaler is an Avalonian Roads mapping tool intended for groups, guilds, and alliances to share ever changing mapping information." />
    <article className={styles.frontPage}>
      <div>
        <h1>Portaler</h1> is an Albion Online roads mapping tool that's
        currently in beta.
      </div>
      <p>
        Join our Discord for updates:{' '}
        <a href="https://discord.gg/QAjhJ4YNsD">discord.gg/QAjhJ4YNsD</a>
      </p>
      <p className="info">
        Once there, be sure to check out the{' '}
        <span className="join-test">#🔥join-demo</span> channel to see Portaler
        in action!
      </p>
      <p className="info">
        This project is open source. Check out our GitHub here:{' '}
        <a href="https://github.com/Portaler-Zone/portaler-core">
          github.com/Portaler-Zone/portaler-core
        </a>
      </p>
    </article>
    <Screenshot />
    <p className={styles.screenshot}>Screenshot 2020-11-22</p>
  </Layout>
)

export default IndexPage
