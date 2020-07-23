import React from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'

import Img from "gatsby-image"
import Layout from "../components/layout"
import SEO from "../components/seo"

SwiperCore.use([Navigation])

const Container = styled.div`
  padding:0 1rem;
`

const HeroSection = styled.section`
  margin-top: -95px;

  h1 {
    text-align: center;
    font-size: 14px;
    line-height: 20px;
    max-width: 285px;
    display: block;
    position: absolute;
    margin: 0 auto;
    top: 205px;
    left: 0;
    right: 0;
    vertical-align: middle;
  }

  .gatsby-image-wrapper {
    height:400px;
  }
`

const SliderSection = styled.section`
  padding-bottom: 51px;

  h2 {
    font-size: 40px;
  }

  .swiper-container {
      height: 800px;
  }

  .gatsby-image-wrapper {
    height: 100%;
  }

  .swiper-button-next, .swiper-button-prev {
    color: #3898EC;
  }
`

const Form = styled.form`
  padding-bottom: 51px;

  h2 {
    font-size: 14px;
    text-align: center;
    line-height: 16px;
  }

  label {
    font-size: 12px;
    line-height: 20px;
    margin-bottom: 5px;
  }

  input[type="email"], input[type="text"] {
    display: block;
    background-color: #000;
    border: 1px solid #ccc;
    border-radius: 0px;
    width: 100%;
    height: 38px;
    padding: 8px 12px;
    margin-bottom: 10px;
    font-size: 14px;
    line-height: 1.42857143;

    &:focus {
      border: 1px solid #3898EC;
      border-radius: 0;
    }
  }

  input[type="submit"] {
    padding: 6px 15px;
    margin-top: 23px;
    border: 1px white solid;
    border-radius: 0px;
    background-color: #fff;
    color: #000;
    text-transform: uppercase;
  }

  .hidden {
    display: none;
  }
`

const Hero = (props) => (
  <HeroSection>
    <Container>
      <Img fluid={props.image} />
      <h1>{props.description}</h1>
    </Container>
  </HeroSection>
)

const Slider = (props) => {

  
  return (
    <SliderSection>
      <Swiper
        speed={700}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation
      >
        {props.slides.map( slide => (
          <SwiperSlide>
            <Container>
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </Container>
            <Img fluid={slide.image.fluid} />
          </SwiperSlide>
        ))}
      </Swiper>
    </SliderSection>
  )
}

const ContactForm = (props) => {
  return (
    <section>
      <Container>
        <div id="mc_embed_signup">
          <Form action="https://ockupy.us11.list-manage.com/subscribe/post?u=253768e3965b590e3a100c35d&amp;id=6c8e8c91e8" method="post" id="mc-embedded-subscribe-form" name="mc-embedded-subscribe-form" target="_blank" novalidate>
                <h2>{props.title}</h2>
                <label for="mce-FNAME">First Name </label>
                <input type="text" value="" name="FNAME" id="mce-FNAME" />

                <label for="mce-EMAIL">Email Address  <span>*</span></label>
                <input type="email" value="" name="EMAIL" id="mce-EMAIL" />

                <label for="mce-PHONE">Phone Number </label>
                <input type="text" name="PHONE" value="" id="mce-PHONE" />

                <div id="mce-responses">
                  <div id="mce-error-response"></div>
                  <div id="mce-success-response"></div>
                </div>
                <div aria-hidden="true" className="hidden"><input type="text" name="b_253768e3965b590e3a100c35d_6c8e8c91e8" tabindex="-1" value="" /></div>
                <input type="submit" value="Subscribe" name="subscribe" id="mc-embedded-subscribe" />
          </Form>
        </div>
      </Container>
    </section>
  )
}


const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" />
    <Hero image={data.contentfulLandingPage.heroImage.fluid} description={data.contentfulLandingPage.heroDescription.heroDescription} />
    <ContactForm title={data.contentfulLandingPage.formTitle} />
    <Slider slides={data.contentfulLandingPage.slider} />
  </Layout>
)

export const query = graphql`
  query HomePageQuery {
    contentfulLandingPage {
      formTitle
      heroDescription {
        heroDescription
      }
      heroImage {
        fluid {
          sizes
          src
          srcSet
        }
      }
      slider {
        title
        description
        image {
          fluid {
            src
            srcSet
            sizes
          }
        }
      }
    }
  }
`

export default IndexPage
