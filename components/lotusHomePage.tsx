import { css, keyframes } from '@emotion/react'
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger'
import { ReactNode, useEffect, useRef, useState } from 'react'

gsap.registerPlugin(ScrollTrigger)

/* -------------------------------------------------------------------------- */
/*                                  constants                                 */
/* -------------------------------------------------------------------------- */
const slide = keyframes`
  to {
    transform: translateX(-50%); 
  }
`

/* -------------------------------------------------------------------------- */
/*                                  displays                                  */
/* -------------------------------------------------------------------------- */
// ref: https://samuelkraft.com/blog/spring-parallax-framer-motion-guide
const ParallaxDisplay = (props: {
  children: ReactNode
  offset?: number
  clampInitial?: boolean
  clampFinal?: boolean
}) => {
  /* --------------------------------- states --------------------------------- */
  const [elementTop, setElementTop] = useState(0)
  const [clientHeight, setClientHeight] = useState(0)
  const [clientWidth, setClientWidth] = useState(0)
  const divRef = useRef<HTMLDivElement>(null!)

  // framer motion properties
  const offset = props.offset === undefined ? 50 : props.offset
  const prefersReducedMotion = useReducedMotion()
  const { scrollY } = useScroll() // scroll value
  const yValue = useTransform(
    scrollY,
    [elementTop, elementTop + offset + clientHeight * 0.5],
    [props.clampInitial ? 0 : offset, props.clampFinal ? 0 : -offset]
  ) // transform
  const animatedYValue = useSpring(yValue, { stiffness: 400, damping: 90 })

  /* --------------------------------- effects -------------------------------- */
  useEffect(() => {
    const onResize = () => {
      if (window.innerWidth > 500) {
        setElementTop(
          divRef.current.getBoundingClientRect().top + window.scrollY ||
            window.pageYOffset
        )

        setClientHeight(window.innerHeight)
        setClientWidth(window.innerWidth)
      }
    }
    onResize()

    window.addEventListener('resize', onResize)
    return () => window.removeEventListener('resize', onResize)
  }, [])

  /* ---------------------------------- main ---------------------------------- */
  return (
    <>
      {prefersReducedMotion ? (
        <motion.div ref={divRef}>{props.children}</motion.div>
      ) : (
        <motion.div ref={divRef} style={{ y: animatedYValue }}>
          {props.children}
        </motion.div>
      )}
    </>
  )
}

const ColorfulButtonDisplay = (props: {
  text: string
  showRainbowOnHover?: boolean
}) => {
  const [hovering, setHovering] = useState(props.showRainbowOnHover)

  /* -------------------------------- displays -------------------------------- */
  const rainbowChildrenDisplay = () => {
    return (
      <>
        <div
          css={css({
            paddingTop: '2px',
            paddingBottom: '2px',
            paddingLeft: '1rem',
            paddingRight: '1rem',

            backgroundColor: '#7FFFB9',
          })}
        />
        <div
          css={css({
            paddingTop: '2px',
            paddingBottom: '2px',
            paddingLeft: '1rem',
            paddingRight: '1rem',

            backgroundColor: '#FFD462',
          })}
        />
        <div
          css={css({
            paddingTop: '2px',
            paddingBottom: '2px',
            paddingLeft: '1rem',
            paddingRight: '1rem',

            backgroundColor: '#FF9596',
          })}
        />
        <div
          css={css({
            paddingTop: '2px',
            paddingBottom: '2px',
            paddingLeft: '1rem',
            paddingRight: '1rem',

            backgroundColor: '#91B9FF',
          })}
        />
        <div
          css={css({
            paddingTop: '2px',
            paddingBottom: '2px',
            paddingLeft: '1rem',
            paddingRight: '1rem',

            backgroundColor: '#61FEFF',
          })}
        />
      </>
    )
  }

  /* ---------------------------------- main ---------------------------------- */
  return (
    <a
      css={css({
        paddingTop: '0.75rem',
        paddingBottom: '0.75rem',
        transitionDuration: '0.3s',
        transitionProperty:
          'color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-text-decoration-color,-webkit-backdrop-filter',
        transitionTimingFunction: 'cubic-bezier(.4,0,.2,1)',

        textTransform: 'uppercase',
        fontSize: '1rem',
        lineHeight: '1.5rem',
        gap: '0.25rem',

        display: 'inline-flex',
        alignItems: 'flex-start',
        flexDirection: 'column',
      })}
      onMouseEnter={() => {
        setHovering((hover) => !hover)
      }}
      onMouseLeave={() => {
        setHovering((hover) => !hover)
      }}
    >
      <div
        css={css({
          display: 'flex',
          justifyContent: 'space-between',
        })}
      >
        {props.text}
      </div>

      {/* rainbow underline display */}
      <div
        css={css({
          width: '120px',
          transition: 'all 0.3s ease 0s',
          opacity: hovering ? 1 : 0,

          overflowX: 'hidden',
          display: 'flex',
        })}
      >
        <div
          css={css({
            flex: '0 0 auto',
            minWidth: '100%',
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',

            animation: `${slide} 1s linear infinite`,
          })}
        >
          {rainbowChildrenDisplay()}
          {rainbowChildrenDisplay()}
        </div>
      </div>
    </a>
  )
}

/* -------------------------------------------------------------------------- */
/*                                    main                                    */
/* -------------------------------------------------------------------------- */
export default function LotusHomePage() {
  /* -------------------------------- displays -------------------------------- */
  const titleDisplay = () => {
    return (
      <ParallaxDisplay offset={50} clampInitial>
        <h1
          css={css({
            marginLeft: 0,
            marginRight: 0,

            translate: 'none',
            rotate: 'none',
            scale: 'none',
            transform: 'translate(0, 0)',
            opacity: 1,

            width: '50%',
            maxWidth: 'none',
          })}
        >
          <span
            css={css({
              position: 'absolute',
              width: '1px',
              height: '1px',
              padding: 0,
              margin: '-1px',
              borderWidth: 0,

              overflow: 'hidden',
              whiteSpace: 'nowrap',
              clip: 'rect(0, 0, 0, 0)',
            })}
          >
            Lotus
          </span>
          <svg
            viewBox="0 0 730 183"
            // fill="#222"
            xmlns="http://www.w3.org/2000/svg"
            // class="w-full"
            width="100%"
            css={css({
              display: 'block',
              verticalAlign: 'middle',
              color: 'black',
            })}
          >
            <path
              d="M1.57952e-06 3.99999H39.75V158.75L22.75 141.75H116.25V179H1.57952e-06V3.99999ZM196.789 182.5C178.789 182.5 162.706 178.667 148.539 171C134.372 163.167 123.289 152.333 115.289 138.5C107.456 124.667 103.539 109 103.539 91.5C103.539 73.8333 107.456 58.1667 115.289 44.5C123.289 30.6667 134.372 19.9167 148.539 12.25C162.706 4.41665 178.789 0.499988 196.789 0.499988C214.956 0.499988 231.039 4.41665 245.039 12.25C259.206 19.9167 270.289 30.6667 278.289 44.5C286.289 58.3333 290.289 74 290.289 91.5C290.289 109.167 286.289 124.917 278.289 138.75C270.289 152.417 259.206 163.167 245.039 171C230.872 178.667 214.789 182.5 196.789 182.5ZM196.789 144.75C207.122 144.75 216.289 142.5 224.289 138C232.289 133.5 238.456 127.25 242.789 119.25C247.289 111.083 249.539 101.833 249.539 91.5C249.539 81.1667 247.289 72 242.789 64C238.456 55.8333 232.289 49.5 224.289 45C216.289 40.5 207.122 38.25 196.789 38.25C186.622 38.25 177.539 40.5 169.539 45C161.539 49.5 155.289 55.8333 150.789 64C146.289 72 144.039 81.1667 144.039 91.5C144.039 101.833 146.289 111.083 150.789 119.25C155.289 127.25 161.539 133.5 169.539 138C177.539 142.5 186.622 144.75 196.789 144.75ZM334.275 18.75H374.025V179H334.275V18.75ZM278.775 3.99999H429.525V41.25H278.775V3.99999ZM509.547 182.5C494.547 182.5 481.464 179.5 470.297 173.5C459.297 167.333 450.88 158.583 445.047 147.25C439.214 135.917 436.297 122.5 436.297 107V3.99999H476.047V104.25C476.047 117.75 478.88 127.917 484.547 134.75C490.214 141.417 498.547 144.75 509.547 144.75C520.714 144.75 529.047 141.417 534.547 134.75C540.214 127.917 543.047 117.75 543.047 104.25V3.99999H582.797V107C582.797 122.5 579.797 135.917 573.797 147.25C567.964 158.583 559.547 167.333 548.547 173.5C537.547 179.5 524.547 182.5 509.547 182.5ZM662.396 182.5C647.896 182.5 635.23 180.083 624.396 175.25C613.73 170.417 605.563 163.583 599.896 154.75C594.23 145.75 591.396 135.25 591.396 123.25H630.396C630.396 131.417 633.23 137.917 638.896 142.75C644.563 147.417 652.313 149.75 662.146 149.75C670.48 149.75 677.063 148.167 681.896 145C686.73 141.667 689.146 137.083 689.146 131.25C689.146 125.25 686.23 120.333 680.396 116.5C674.73 112.5 665.646 109.167 653.146 106.5C639.313 103.5 627.98 99.5833 619.146 94.75C610.313 89.9167 603.73 84 599.396 77C595.063 70 592.896 61.75 592.896 52.25C592.896 41.5833 595.48 32.4167 600.646 24.75C605.98 16.9167 613.563 10.9167 623.396 6.75C633.23 2.58332 644.813 0.499988 658.146 0.499988C671.813 0.499988 683.73 2.91665 693.896 7.74998C704.23 12.4167 712.146 19.0833 717.646 27.75C723.313 36.4167 726.146 46.5833 726.146 58.25H687.896C687.896 50.4167 685.313 44.25 680.146 39.75C674.98 35.25 667.813 33 658.646 33C653.146 33 648.313 33.75 644.146 35.25C640.146 36.5833 637.063 38.6667 634.896 41.5C632.73 44.3333 631.646 47.6667 631.646 51.5C631.646 57 634.313 61.5833 639.646 65.25C644.98 68.9167 654.313 72.25 667.646 75.25C689.48 80.4167 705.23 87.3333 714.896 96C724.563 104.5 729.396 115.75 729.396 129.75C729.396 146.25 723.396 159.167 711.396 168.5C699.563 177.833 683.23 182.5 662.396 182.5Z"
              fill="#222222"
            ></path>
          </svg>
        </h1>
      </ParallaxDisplay>
    )
  }

  const headlineDisplay = () => {
    return (
      <div
        css={css({
          textAlign: 'left',
          width: '70%',

          marginTop: '4rem',
          lineHeight: 1.625,
          fontWeight: 500,
          fontSize: '1.25rem',

          position: 'relative',
        })}
      >
        {/* headline */}
        <ParallaxDisplay offset={80} clampInitial>
          <h2
            css={css({
              fontSize: '65px',
              lineHeight: 1,
              margin: 0,
              fontWeight: 500,
              fontStyle: 'normal',
            })}
          >
            A community of optimalists.
          </h2>
        </ParallaxDisplay>

        {/* call to actions */}
        <ParallaxDisplay offset={100} clampInitial>
          <div
            css={css({
              display: 'flex',
              alignItems: 'flex-start',
              flexDirection: 'column',
              width: '300px',
              marginTop: '3rem',
            })}
          >
            {/* our vision */}
            <ColorfulButtonDisplay
              text="Our Vision"
              showRainbowOnHover={true}
            />

            <ColorfulButtonDisplay
              text="How can i mint lily"
              showRainbowOnHover={false}
            />

            <ColorfulButtonDisplay
              text="How can i mint lily"
              showRainbowOnHover={false}
            />
          </div>
        </ParallaxDisplay>
      </div>
    )
  }

  const homePageDisplay = () => {
    return (
      <div
        css={css({
          position: 'relative',
          width: '100%',
          height: '95vh',

          color: 'rgba(23, 23, 23, 1.0)',
          backgroundColor: 'rgba(255, 255, 255, 1.0)',

          borderBottomRightRadius: '1.5rem',
          borderBottomLeftRadius: '1.5rem',
        })}
      >
        <div
          css={css({
            position: 'relative',
            paddingTop: '4rem',
            paddingLeft: '2rem',
            paddingRight: '2rem',
            maxWidth: '80rem',
            width: '100%',
            height: '100%',
            marginLeft: 'auto',
            marginRight: 'auto',

            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            textAlign: 'center',
          })}
        >
          {/* title */}
          {titleDisplay()}

          {/* Headline */}
          {headlineDisplay()}
        </div>
      </div>
    )
  }

  const fillerContentDisplay = () => {
    return (
      <div
        css={css({
          paddingLeft: '1rem',
          paddingRight: '1rem',
          marginTop: '5vh',

          gap: '2rem',

          display: 'flex',
          flexDirection: 'column',
        })}
      >
        <div
          css={css({
            textAlign: 'center',
            padding: '2rem',
            backgroundColor: '#fff',
            color: '#000',

            borderRadius: '1rem',

            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
          })}
        >
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. In ante
          metus dictum at tempor commodo ullamcorper a. Tellus orci ac auctor
          augue mauris augue. Eget duis at tellus at urna condimentum. Convallis
          posuere morbi leo urna molestie at elementum. Sodales ut eu sem
          integer vitae justo eget magna fermentum. Viverra maecenas accumsan
          lacus vel facilisis volutpat. Sed nisi lacus sed viverra. Sagittis
          nisl rhoncus mattis rhoncus urna neque viverra. Risus nec feugiat in
          fermentum posuere. Tellus orci ac auctor augue mauris. Varius morbi
          enim nunc faucibus a pellentesque sit amet porttitor. Turpis egestas
          integer eget aliquet nibh praesent. Sit amet est placerat in egestas
          erat. Felis eget velit aliquet sagittis id. Vitae congue mauris
          rhoncus aenean vel elit. Enim eu turpis egestas pretium aenean
          pharetra magna ac. Ipsum nunc aliquet bibendum enim. Id semper risus
          in hendrerit. Aliquam etiam erat velit scelerisque. Quam elementum
          pulvinar etiam non quam lacus suspendisse faucibus. Lorem ipsum dolor
          sit amet consectetur adipiscing elit ut. Justo eget magna fermentum
          iaculis eu non diam phasellus. Morbi leo urna molestie at elementum eu
          facilisis sed odio. Eu turpis egestas pretium aenean pharetra magna.
          Orci phasellus egestas tellus rutrum. Risus pretium quam vulputate
          dignissim suspendisse in est ante. Vitae proin sagittis nisl rhoncus
          mattis rhoncus urna neque. Cursus metus aliquam eleifend mi in nulla
          posuere. Risus ultricies tristique nulla aliquet enim. Facilisi nullam
          vehicula ipsum a arcu cursus vitae. Turpis cursus in hac habitasse
          platea dictumst quisque sagittis purus. Mi quis hendrerit dolor magna
          eget est lorem. Lorem dolor sed viverra ipsum nunc aliquet bibendum
          enim. Et odio pellentesque diam volutpat commodo sed egestas egestas.
          Amet nisl suscipit adipiscing bibendum est ultricies integer quis
          auctor. Pellentesque habitant morbi tristique senectus et netus et.
          Aenean sed adipiscing diam donec adipiscing tristique risus. Curabitur
          vitae nunc sed velit dignissim. Arcu cursus vitae congue mauris. Dolor
          sed viverra ipsum nunc aliquet. Rhoncus dolor purus non enim. Vel quam
          elementum pulvinar etiam non quam. Convallis a cras semper auctor
          neque. At risus viverra adipiscing at. Suspendisse interdum
          consectetur libero id faucibus nisl tincidunt eget. Orci a scelerisque
          purus semper eget duis at. Ultrices sagittis orci a scelerisque purus
          semper. Quis blandit turpis cursus in hac habitasse platea. Convallis
          posuere morbi leo urna molestie at elementum eu facilisis. Ultrices in
          iaculis nunc sed augue lacus. Vestibulum sed arcu non odio euismod
          lacinia at quis risus. Nisi lacus sed viverra tellus in.
        </div>
      </div>
    )
  }

  return (
    <div>
      <div
        css={css({
          position: 'relative',
          width: '100vw',
          minHeight: '100vh',
          overflow: 'scroll',

          border: '0 solid #e5e7eb',
          backgroundColor: 'rgb(48, 48, 48)',

          paddingBottom: '100px',
        })}
      >
        {/* Main page */}
        {homePageDisplay()}

        {/* filler */}
        {fillerContentDisplay()}
        {fillerContentDisplay()}
        {fillerContentDisplay()}
        {fillerContentDisplay()}
        {fillerContentDisplay()}
      </div>
    </div>
  )
}
