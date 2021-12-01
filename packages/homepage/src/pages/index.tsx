import React from 'react'

import Layout from '../components/Layout'
import MainLogo from '../components/MainLogo'
import OtherStuff from '../components/OtherStuff'
import SEO from '../components/seo'
// @ts-expect-error
import jakeWebp from '../images/jake.webp'

import styles from './styles.module.scss'

const desc = `
Portaler is a Roads of Avalon mapping tool intended for groups, guilds, and alliances to share ever changing mapping information.
`

const IndexPage = () => (
  <Layout>
    <SEO description={desc} />
    <main className={styles.indexMain}>
      <MainLogo />
      <section>
        <h2>🪦 Nov 2020 - Dec 2021</h2>
        <p>
          Portaler <strong>was</strong> a collaborative mapping for the Roads of
          Avalon in Albion Online.
        </p>
        <img className={styles.jake} src={jakeWebp} loading="lazy" alt="cya" />
      </section>
      <section>
        <h2>Portaler is still an open source application</h2>
        <p>
          Check out the{' '}
          <a href="https://github.com/Portaler-Zone/portaler-core">
            GitHub Repo
          </a>{' '}
          for more info. The main Discord was shut down, but there is a Discord
          link in the repo's README that points to a developer Discord.
        </p>
      </section>
      <OtherStuff />
    </main>
  </Layout>
)

export default IndexPage
