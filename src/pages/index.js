import React, { useRef, useState } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import addToMailchimp from 'gatsby-plugin-mailchimp'

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
    color: #fff;
    &:after {
      font-size: 32px;
    }
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
    font-size: 16px;
    line-height: 1.42857143;
    color: #ff2b2b;
    outline: none;

    &:focus {
      border: 1px solid #3898EC;
      border-radius: 0;
    }

    &::placeholder {
      color: #ccc;
      font-size: 10px;
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

const Message = styled.div`
  display: none;
  border-radius: 0;
  border: 1px solid;
  font-size: 10px;

  ${props => props.success ? 
  `display: block;
   border-color: green;
   color: green;
  ` : ``
  }

  ${props => props.error ? 
    `display: block;
     border-color: red;
     color: red;
    ` : ``
  }

  p {
    margin-bottom: 0;
  }
`

const BotField = styled.div`
  position: absolute;
  left: -5000px;
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
    <SliderSection
      data-sal="fade"
      data-sal-duration="600"
      data-sal-easing="ease"
    >
      <Swiper
        speed={700}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        navigation
      >
        {props.slides.map( slide => (
          <SwiperSlide key={slide.title}>
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

  const [email, setEmail] = useState(null)
  const [listFields, setListFields] = useState({
    FNAME: null,
    PHONE: null
  })
  const [error, setError] = useState(false)
  const [success, setSuccess] = useState(false)

  const [honey, setHoney] = useState(null)

  const fNameInput = useRef(null)
  const emailInput = useRef(null)
  const phoneInput = useRef(null)
  const honeyInput =useRef(null)

  const handleSubmit = (e) => {
    e.preventDefault()

    if (email !=null && listFields.FNAME != null && honey == null) {
        addToMailchimp(email, listFields)
        .then(data => {
          if (data.result === "error") {
            setSuccess(false)
            setError(email + ` is already subscribed`)
            console.log(data)
          } else {
            setError(false)
            setSuccess(true)
          }
        })
        .catch(() => {
          console.log("error")
        })
      }
    else {
      setSuccess(false)
      let error = ""
        if (email != null) {
            error = "Please enter your name"
        } else if (listFields.FNAME != null){
            error = "Please enter your email"
        } else {
            error = "Please enter your name and email"
        }
        setError(error)
      }
    }

  const handleChange = e => {
    setEmail(emailInput.current.value ? emailInput.current.value : null)
    setListFields({
      FNAME: fNameInput.current.value ? fNameInput.current.value : null,
      PHONE: phoneInput.current.value ? phoneInput.current.value : null
    })
    setHoney(honeyInput.current.value ? honeyInput.current.value : null)
  }

  return (
    <section
      data-sal="fade"
      data-sal-duration="600"
      data-sal-easing="ease"
    >
      <Container>
        <div id="mc_embed_signup">
          <Form onSubmit={(e) => handleSubmit(e, emailInput.current.value, {
            FNAME: fNameInput.current.value,
            PHONE: phoneInput.current.value
          })}>
                <h2>{props.title}</h2>
                <label htmlFor="mce-FNAME">First Name </label>
                <input ref={fNameInput} onChange={handleChange} type="text" defaultValue="" name="FNAME" id="mce-FNAME" />

                <label htmlFor="mce-EMAIL">Email Address </label>
                <input ref={emailInput} onChange={handleChange} type="email" defaultValue="" name="EMAIL" id="mce-EMAIL" />

                <label htmlFor="mce-PHONE">Phone Number </label>
                <input ref={phoneInput} onChange={handleChange} type="text" name="PHONE" defaultValue="" id="mce-PHONE" placeholder="BE THE FIRST TO GET THE DROP" />
                <BotField aria-hidden="true">
                  <input ref={honeyInput} onChange={handleChange} type="text" name="b_70fbe7f7141fc7cf57a73a5aa_f2a93846ba" tabIndex="-1" value="" />
                </BotField>
                <Message error={error} success={success}>
                  {error && (<p>{error}</p>)}
                  {success && (<p>You've successfully joined</p>)}
                </Message>
                <input type="submit" value="Join Now" name="subscribe" id="mc-embedded-subscribe" />

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
        fluid(maxWidth:1000)  {
          ...GatsbyContentfulFluid
        }
      }
      slider {
        title
        description
        image {
          fluid(maxWidth:1000) {
            ...GatsbyContentfulFluid
          }
        }
      }
    }
  }
`

export default IndexPage
