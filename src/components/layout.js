/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import styled, { createGlobalStyle } from "styled-components"

import "../fonts/fonts.css"
import "./layout.css"

const GlobalStyle = createGlobalStyle`
  h1, h2, h3, h4, h5, p {
    font-family: "Nhaasgrotesktxpro 55rg";
    font-weight: normal;
    font-style: normal;
  }

  body {
    color: #fff;
    background-color: #000;
    text-transform: uppercase;
    font-size: 14px;
    line-height: 20px;
  }
`

const Main = styled.main`
  max-width: 800px;
  margin: 0 auto;
`

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <GlobalStyle />
      <Main>{children}</Main>
    </>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
