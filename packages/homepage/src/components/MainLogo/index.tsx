import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import Img from 'gatsby-image'

import styles from './styles.module.scss'

const MainLogo = () => {
  const data = useStaticQuery(graphql`
    query {
      placeholderImage: file(relativePath: { eq: "portaler-splash.png" }) {
        childImageSharp {
          fluid(maxWidth: 375, quality: 100) {
            ...GatsbyImageSharpFluid
            ...GatsbyImageSharpFluidLimitPresentationSize
          }
        }
      }
    }
  `)

  if (!data?.placeholderImage?.childImageSharp?.fluid) {
    return <div>Picture not found</div>
  }

  return (
    <div className={styles.logo}>
      <Img
        durationFadeIn={100}
        fluid={data.placeholderImage.childImageSharp.fluid}
      />
    </div>
  )
}

export default MainLogo
