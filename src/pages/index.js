import React, { useRef, useState, useEffect } from "react"
import { graphql } from "gatsby"
import styled from "styled-components"
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCore, { Navigation } from 'swiper'
import addToMailchimp from 'gatsby-plugin-mailchimp'
import { AnchorLink } from "gatsby-plugin-anchor-links"
import Countdown from 'react-countdown';

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
    top: 175px;
    left: 0;
    right: 0;
    vertical-align: middle;
  }

  .gatsby-image-wrapper {
    height:359px;
  }
`

const CountdownContainer = styled.div`
  display: flex;
  justify-content: center;
  text-align: center;
  margin-top: 10px;
  margin-bottom: 42px;
`

const CountdownItem = styled.div`
  padding: 0 2.5px;

  div {
    &:nth-of-type(1) {
      font-size: 2rem;
      margin-bottom: 10px;
    }

    &:nth-of-type(2){ 
      font-size: 11px;
    }
  }
`

const FeatureList = styled.ul`
  font-size: 12px;
  margin-bottom: 42px;

  li {
    margin-bottom: 0;
  }
`

const Form = styled.form`
  margin-bottom: 42px;

  h2 {
    font-size: 14px;
    text-align: center;
    line-height: 16px;
    margin-bottom: 34px;
    margin-top: 0px;
  }

  label {
    font-size: 12px;
    line-height: 20px;
    margin-bottom: 5px;
    font-weight: bold;
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
    color: #fff;
    outline: none;

    &:focus {
      border: 1px solid #3898EC;
      border-radius: 0;
    }

    &::placeholder {
      color: #ccc;
      font-size: 10px;
      line-height: 18px;
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

const SliderSection = styled.section`
  padding-bottom: 51px;

  h2 {
    font-size: 40px;
    margin-bottom: 16px;
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

const CallToAction = styled.div`
  padding: 2rem 1rem;
  text-align: center;

  a {
    padding: 6px 15px;
    margin-top: 23px;
    border: 1px white solid;
    border-radius: 0px;
    background-color: #fff;
    color: #000;
    text-transform: uppercase;
    text-decoration: none;
  }
`

const SlideContainer = styled(Container)`
  position: absolute;
  padding: 42px 1rem;
  top: 0;
  left: 0;
  z-index: 2;
  color: ${props => props.lightTheme ? `#000` : `#fff`};
`
 
// Renderer callback with condition
const renderer = ({ days, hours, minutes, seconds}) => {
return (
  <>
    <CountdownItem>
      <div>{days}</div>
      <div>days</div>
    </CountdownItem>
    <CountdownItem>
      <div>:</div>
    </CountdownItem>
    <CountdownItem>
      <div>{hours}</div>
      <div>hours</div>
    </CountdownItem>
    <CountdownItem>
      <div>:</div>
    </CountdownItem>
    <CountdownItem>
      <div>{minutes}</div>
      <div>minutes</div>
    </CountdownItem>
    <CountdownItem>
      <div>:</div>
    </CountdownItem>
    <CountdownItem>
      <div>{seconds}</div>
      <div>seconds</div>
    </CountdownItem>
  </>
  )
};

const Hero = (props) => (
  <>
  <HeroSection
    data-sal="fade"
    data-sal-duration="1000"
    data-sal-easing="ease"
  >
    <Container>
      <Img fluid={props.image} />
      <h1>{props.description}</h1>
    </Container>
  </HeroSection>
  {/* Remove for now 
  <div
    data-sal="fade"
    data-sal-delay="250"
    data-sal-duration="1000"
    data-sal-easing="ease"
  >
    <Container>
      <CountdownContainer>
        <Countdown
          date={"2020-12-08T12:00:00"}
          intervalDelay={0}
          precision={1}
          renderer={renderer}
        />
      </CountdownContainer>
    </Container>
  </div>
  */}
  </>
)

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

            if (typeof window !== "undefined") {
              if (window.fbq != null) { 
                window.fbq('track', 'CompleteRegistration', {currency: "USD", value: 0.00});
                dataLayer.push({'event': 'form-success'});
              }
            }
            
          }
        })
        .catch((e) => {
          console.log("error", e)
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
    <section id="form">
      <Container>
        <div id="mc_embed_signup">
          <Form onSubmit={(e) => handleSubmit(e, emailInput.current.value, {
            FNAME: fNameInput.current.value,
            PHONE: phoneInput.current.value
          })}>
                <div
                  data-sal="fade"
                  data-sal-delay="250"
                  data-sal-duration="1000"
                  data-sal-easing="ease">
                    <h2>{props.title}</h2>
                    <label htmlFor="mce-FNAME">Full Name </label>
                    <input ref={fNameInput} onChange={handleChange} type="text" defaultValue="" name="FNAME" id="mce-FNAME" />
                </div>
                <div
                  data-sal="fade"
                  data-sal-delay="500"
                  data-sal-duration="1000"
                  data-sal-easing="ease">
                    <label htmlFor="mce-EMAIL">Email Address </label>
                    <input ref={emailInput} onChange={handleChange} type="email" defaultValue="" name="EMAIL" id="mce-EMAIL" />
                </div>
                <div
                  data-sal="fade"
                  data-sal-delay="750"
                  data-sal-duration="1000"
                  data-sal-easing="ease">
                    <label htmlFor="mce-PHONE">Phone Number </label>
                    <input ref={phoneInput} onChange={handleChange} type="text" name="PHONE" defaultValue="" id="mce-PHONE" placeholder="BE THE FIRST TO GET THE DROP" />
                </div>
                <BotField aria-hidden="true">
                  <input ref={honeyInput} onChange={handleChange} type="text" name="b_70fbe7f7141fc7cf57a73a5aa_f2a93846ba" tabIndex="-1" value="" />
                </BotField>
                <Message error={error} success={success}>
                  {error && (<p>{error}</p>)}
                  {success && (<p>Success! Drops incoming - stay tuned</p>)}
                </Message>
                <div
                  data-sal="fade"
                  data-sal-delay="1000"
                  data-sal-duration="1000"
                  data-sal-easing="ease"
                  >
                    <input type="submit" value="Join Now" name="subscribe" id="mc-embedded-subscribe" />
                </div>
          </Form>
        </div>
      </Container>
    </section>
  )
}

const Features = (props) => {
    // Initialize state with undefined width/height so server and client renders match
    // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
    const [windowSize, setWindowSize] = useState({
      width: undefined,
      height: undefined,
    });

    useEffect(() => {
  
      // Handler to call on window resize
      function handleResize() {
        setWindowSize({
          width: window.innerWidth,
          height: window.innerHeight,
        });
      }

      // Add event listener
      window.addEventListener("resize", handleResize);

      // Call handler right away so state gets updated with initial window size 
      handleResize()

      // Remove event listener on cleanup
      return () => window.removeEventListener("resize", handleResize);

    }, []); // Empty array ensures that effect is only run on mount

  return(
  <section>
    <Container>
      <FeatureList>
        {props.list.map( (item, index) => (
          <li
          key={index}
          data-sal="fade"
          data-sal-delay={windowSize.height >= 720 ? `1000` : `0`}
          data-sal-duration="1000"
          data-sal-easing="ease"
          >{item}</li>
        ))}
      </FeatureList>
    </Container>
    <div
      data-sal="fade"
      data-sal-duration="800"
      data-sal-easing="ease"
      >
        <Img fluid={props.image} />
      </div>
  </section>
)}


const Slider = (props) => {
  
  return (
    <SliderSection
      data-sal="fade"
      data-sal-duration="700"
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
            <SlideContainer lightTheme={slide.textColorLight}>
              <h2>{slide.title}</h2>
              <p>{slide.description}</p>
            </SlideContainer>
            <Img fluid={slide.image.fluid} />
          </SwiperSlide>
        ))}
      </Swiper>
      <CallToAction>
        <AnchorLink to="/#form" title="Sign up" />
      </CallToAction>
    </SliderSection>
  )
}

const IndexPage = ({data}) => (
  <Layout>
    <SEO title="Home" />
    <Hero image={data.contentfulLandingPage.heroImage.fluid} description={data.contentfulLandingPage.heroDescription.heroDescription} />
    <ContactForm title={data.contentfulLandingPage.formTitle} />
    <Features image={data.contentfulLandingPage.featureListImage.fluid} list={data.contentfulLandingPage.featureList} />
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
          ...GatsbyContentfulFluid_withWebp
        }
      }
      featureList
      featureListImage {
        fluid(maxWidth:1000)  {
          ...GatsbyContentfulFluid_withWebp
        }
      }
      slider {
        title
        description
        image {
          fluid(maxWidth:1000) {
            ...GatsbyContentfulFluid_withWebp
          }
        }
        textColorLight
      }
    }
  }
`

export default IndexPage
