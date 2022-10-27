import { chakra } from '@chakra-ui/system'
import { keyframes } from '@emotion/react'
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
// disable scroll: https://github.com/willmcpo/body-scroll-lock

/* -------------------------------------------------------------------------- */
/*                                  constants                                 */
/* -------------------------------------------------------------------------- */
const slide = keyframes`
  to {
    transform: translateX(-50%); 
  }
`

const bounce = keyframes`
  0%,
  to {
    transform: translateY(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }

  50% {
    transform: none;
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
`

const navList = [
  {
    text: 'Library',
    href: 'https://lotusgang.notion.site/Lotus-Library-e7df20a3dc4f45869e8adb24aa75fda2',
  },
  {
    text: 'Lotus Gang',
    href: 'https://magiceden.io/marketplace/lotus_gang_nft',
  },
  { text: 'LILY', href: '/#eligibility' },
  { text: 'Our Vision', href: '/vision' },
  { text: 'Our Team', href: '/team' },
  { text: 'FAQs', href: '/faq' },
  { text: 'Twitter', href: 'https://twitter.com/THELILYNFT' },
  { text: 'Discord', href: 'https://discord.gg/vs8VvHb35k' },
]

/* -------------------------------------------------------------------------- */
/*                                  displays                                  */
/* -------------------------------------------------------------------------- */
const HeaderItem = (props: {
  child?: boolean
  transitionDelay?: string

  children?: ReactNode
}) => {
  return (
    <chakra.li
      position="relative"
      width="100%"
      display="inline-block"
      opacity={props.child ? 0 : 1}
      borderBottomWidth="2px"
      borderColor="transparent"
      transitionProperty={props.child ? 'opacity' : 'border'}
      transitionTimingFunction="cubic-bezier(0.4, 0, 0.2, 1)"
      transitionDuration="0.3s"
      transitionDelay={props.transitionDelay}
      listStyleType="none"
      role="group"
      _hover={{ borderColor: 'black' }}
      _groupHover={{ opacity: props.child ? 1 : 0 }}
    >
      {props.children}
    </chakra.li>
  )
}

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
  children?: ReactNode
  showRainbowOnHover?: boolean
}) => {
  const [hovering, setHovering] = useState(props.showRainbowOnHover)

  /* -------------------------------- displays -------------------------------- */
  const rainbowChildrenDisplay = () => {
    return (
      <>
        <chakra.div
          paddingTop="2px"
          paddingBottom="2px"
          paddingLeft="1rem"
          paddingRight="1rem"
          backgroundColor="#7FFFB9"
        />
        <chakra.div
          paddingTop="2px"
          paddingBottom="2px"
          paddingLeft="1rem"
          paddingRight="1rem"
          backgroundColor="#FFD462"
        />
        <chakra.div
          paddingTop="2px"
          paddingBottom="2px"
          paddingLeft="1rem"
          paddingRight="1rem"
          backgroundColor="#FF9596"
        />
        <chakra.div
          paddingTop="2px"
          paddingBottom="2px"
          paddingLeft="1rem"
          paddingRight="1rem"
          backgroundColor="#91B9FF"
        />
        <chakra.div
          paddingTop="2px"
          paddingBottom="2px"
          paddingLeft="1rem"
          paddingRight="1rem"
          backgroundColor="#61FEFF"
        />
      </>
    )
  }

  /* ---------------------------------- main ---------------------------------- */
  return (
    <chakra.a
      display="inline-flex"
      alignItems="flex-start"
      flexDirection="column"
      transitionDuration="0.3s"
      transitionProperty="color,background-color,border-color,text-decoration-color,fill,stroke,opacity,box-shadow,transform,filter,backdrop-filter,-webkit-text-decoration-color,-webkit-backdrop-filter"
      transitionTimingFunction="cubic-bezier(.4,0,.2,1)"
      gap="0.25rem"
      paddingY="0.75rem"
      textTransform="uppercase"
      fontSize="1rem"
      lineHeight="1.5rem"
      onMouseEnter={() => {
        setHovering((hover) => !hover)
      }}
      onMouseLeave={() => {
        setHovering((hover) => !hover)
      }}
    >
      <chakra.div display="flex" justifyContent="space-between">
        {props.children}
      </chakra.div>

      {/* rainbow underline display */}
      <chakra.div
        width="120px"
        transition="all 0.3s ease 0s"
        opacity={hovering ? 1 : 0}
        overflowX="hidden"
        display="flex"
      >
        <chakra.div
          display="flex"
          flexDirection="row"
          alignItems="center"
          animation={`${slide} 1s linear infinite`}
        >
          {rainbowChildrenDisplay()}
          {rainbowChildrenDisplay()}
        </chakra.div>
      </chakra.div>
    </chakra.a>
  )
}

const RoundedBoxDisplay = (props: {
  children?: ReactNode
  backgroundColor?: string
}) => {
  return (
    <chakra.div
      width={{ lg: '50%' }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      padding={{ base: '2rem', lg: '4rem' }}
      borderRadius="1rem"
      backgroundColor={props.backgroundColor ?? 'white'}
    >
      {props.children}
    </chakra.div>
  )
}

const FooterDisplay = () => {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger)

    setTimeout(() => {
      gsap.to('#footer-lily path', {
        scrollTrigger: {
          trigger: '#footer',
          start: 'top 100%',
          toggleActions: 'restart none none reverse',
        },
        duration: 0.75,
        y: 0,
        stagger: 0.1,
      })

      gsap.to('#footer-list li', {
        scrollTrigger: {
          trigger: '#footer',
          start: 'top 100%',
          toggleActions: 'restart none none reverse',
        },
        duration: 0.75,
        opacity: 1,
        stagger: 0.1,
      })
    }, 1e3)
  }, [])

  return (
    <chakra.div
      id="footer"
      width="100%"
      padding="2rem"
      zIndex={9999}
      position="relative"
      backgroundColor="rgb(97, 254, 255)"
      color="black"
    >
      {/* list */}
      <chakra.div
        width="100%"
        marginBottom="2rem"
        display={{ base: 'none', lg: 'block' }}
      >
        <chakra.ul
          id="footer-list"
          display="flex"
          justifyContent="space-between"
          width="100%"
        >
          {navList.map((nav, i) => {
            return (
              <chakra.li
                display="list-item"
                textAlign="match-parent"
                listStyleType="none"
                key={'navList' + i}
                opacity={0}
              >
                <chakra.a>{nav.text}</chakra.a>
              </chakra.li>
            )
          })}
        </chakra.ul>
      </chakra.div>

      <chakra.div display="flex" justifyContent="center">
        <chakra.svg
          id="footer-lily"
          viewBox="0 0 1619 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          width="100%"
        >
          <chakra.path
            d="M66.6 215H114.3V49.6998H180.9V4.9998H0V49.6998H66.6V215Z"
            fill="#222222"
            data-svg-origin="0 4.999800205230713"
            transform="translateY(600px)"
          ></chakra.path>
          <chakra.path
            d="M339.026 215H386.726V4.9998H339.026V85.6998H256.826V4.9998H209.126V215H256.826V130.4H339.026V215Z"
            fill="#222222"
            data-svg-origin="209.12600708007812 4.999800205230713"
            transform="translateY(600px)"
          ></chakra.path>
          <chakra.path
            d="M431.055 215H572.355V174.5H478.455V128.6H560.955V88.6998H478.455V45.1998H569.055V4.9998H431.055V215Z"
            fill="#222222"
            data-svg-origin="431.05499267578125 4.999800205230713"
            transform="translateY(600px)"
          ></chakra.path>
          <chakra.path
            d="M671.595 215H811.095V170.3H719.295V4.9998H671.595V215Z"
            fill="#222222"
            data-svg-origin="671.594970703125 4.999800205230713"
            transform="translateY(600px)"
          ></chakra.path>
          <chakra.path
            d="M925.741 219.2C991.441 219.2 1037.94 174.2 1037.94 110C1037.94 45.7998 991.441 0.799805 925.741 0.799805C860.041 0.799805 813.841 45.7998 813.841 110C813.841 174.2 860.041 219.2 925.741 219.2ZM862.441 110C862.441 72.1998 888.541 46.0998 925.741 46.0998C963.241 46.0998 989.041 72.1998 989.041 110C989.041 147.8 963.241 173.9 925.741 173.9C888.541 173.9 862.441 147.8 862.441 110Z"
            fill="#222222"
            data-svg-origin="813.8410034179688 0.7998049855232239"
            transform="translateY(600px)"
          ></chakra.path>
          <chakra.path
            d="M1108.72 215H1156.43V49.6998H1223.03V4.9998H1042.12V49.6998H1108.72V215Z"
            fill="#222222"
            data-svg-origin="1042.1199951171875 4.999800205230713"
            transform="translateY(600px)"
          ></chakra.path>
          <chakra.path
            d="M1337.05 219.2C1391.65 219.2 1424.95 185 1424.95 128.6V4.9998H1377.25V125.3C1377.25 157.4 1363.75 173.9 1337.05 173.9C1310.35 173.9 1296.85 157.4 1296.85 125.3V4.9998H1249.15V128.6C1249.15 185 1282.45 219.2 1337.05 219.2Z"
            fill="#222222"
            data-svg-origin="1249.1500244140625 4.999800205230713"
            transform="translateY(600px)"
          ></chakra.path>
          <chakra.path
            d="M1538.47 219.2C1588.27 219.2 1618.87 195.5 1618.87 155.9C1618.87 122.6 1596.97 102.8 1544.77 90.4998C1512.67 82.9998 1501.57 74.8998 1501.57 61.9998C1501.57 48.1998 1513.87 39.7998 1533.97 39.7998C1555.87 39.7998 1569.07 51.1998 1569.07 70.0998H1614.97C1614.97 27.7998 1583.17 0.799805 1533.37 0.799805C1485.07 0.799805 1455.07 24.4998 1455.07 62.8998C1455.07 97.0998 1478.17 117.5 1527.37 128C1557.07 134.3 1570.57 143 1570.57 157.7C1570.57 171.8 1557.97 179.9 1538.17 179.9C1515.07 179.9 1500.07 168.2 1500.07 148.1H1453.27C1453.27 191.6 1485.67 219.2 1538.47 219.2Z"
            fill="#222222"
            data-svg-origin="1453.27001953125 0.7998049855232239"
            transform="translateY(600px)"
          ></chakra.path>
        </chakra.svg>
      </chakra.div>
    </chakra.div>
  )
}

/* -------------------------------------------------------------------------- */
/*                                    main                                    */
/* -------------------------------------------------------------------------- */
export default function LotusHomePage() {
  /* --------------------------------- states --------------------------------- */
  const [clientHeight, setClientHeight] = useState(0)
  const [clientWidth, setClientWidth] = useState(0)

  const loadingDivRef = useRef<HTMLDivElement>(null!)

  /* --------------------------------- effects -------------------------------- */

  useEffect(() => {
    setClientHeight(window.innerHeight)
    setClientWidth(window.innerWidth)
    document.body.style.overflow = 'hidden' // locks scroll

    // initial animation
    setTimeout(() => {
      requestAnimationFrame(() => {
        document.body.style.overflow = 'unset'
        loadingDivRef.current.style.zIndex = 'inherit'

        const x = gsap.timeline({ repeat: 0 })
        x.to('#main', {
          y: 0,
          duration: 0.75,
          ease: 'power2.out',
        })
          // show header
          .to('#header', {
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          })
          // show title + headline
          .to(
            '#content h1, #content h2',
            {
              opacity: 1,
              y: 0,
              duration: 1,
              delay: 1,
              ease: 'power2.out',
              stagger: 0.2,
            },
            '-=100%'
          )
          // show cta
          .to(
            '#content #ctas',
            { opacity: 1, y: 0, duration: 1, ease: 'power2.out' },
            '-=75%'
          )
      })
    }, 2e3)
  }, [])

  /* --------------------------------- display -------------------------------- */
  const loadingDisplay = () => {
    return (
      <chakra.div
        position="fixed"
        top={0}
        zIndex={50} // zIndex = {50} loading
        opacity={1}
        width="100vw"
        height="100vh"
        backgroundColor="rgb(38, 38, 38)"
        ref={loadingDivRef}
      >
        <chakra.svg
          viewBox={'0 0 '.concat(
            clientWidth.toString(),
            ' ',
            clientHeight.toString(),
            ' '
          )}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          objectFit="cover"
          width="100vw"
          height="100vh"
        >
          <g>
            {/* background */}
            <rect width={clientWidth} height={clientHeight} fill="white" />
            {/* first col */}
            <rect width="16.666666667%" height="90%" fill="#F9F7EF" />
            <rect y="90%" width="16.666666667%" height="10%" fill="#422F2E" />

            {/* second col */}
            <rect
              x="16.666666667%"
              width="16.666666667%"
              height="90%"
              fill="#7FFFB9"
            />
            <rect
              x="16.666666667%"
              y="90%"
              width="16.666666667%"
              height="10%"
              fill="#91B9FF"
            />

            {/* third col */}
            <rect
              x="33.333333334%"
              width="16.666666667%"
              height="90%"
              fill="#FFD462"
            />
            <rect
              x="33.333333334%"
              y="90%"
              width="16.666666667%"
              height="10%"
              fill="#422F2E"
            />

            {/* fourth col */}
            <rect
              x="50.000000001%"
              width="16.666666667%"
              height="90%"
              fill="#FF9596"
            />
            <rect
              x="50.000000001%"
              y="90%"
              width="16.666666667%"
              height="10%"
              fill="#00CCCC"
            />

            {/* fifth col */}
            <rect
              x="66.666666668%"
              width="16.666666667%"
              height="90%"
              fill="#91B9FF"
            />
            <rect
              x="66.666666668%"
              y="90%"
              width="16.666666667%"
              height="10%"
              fill="#422F2E"
            />

            {/* sixth col */}
            <rect
              x="83.333333335%"
              width="16.666666667%"
              height="90%"
              fill="#61FEFF"
            />
            <rect
              x="83.333333335%"
              y="90%"
              width="16.666666667%"
              height="10%"
              fill="#F9F7EF"
            />
          </g>
        </chakra.svg>
      </chakra.div>
    )
  }

  const headerDisplay = () => {
    return (
      <chakra.div
        id="header"
        opacity={0}
        zIndex={9999}
        position="fixed"
        top={0}
        width="100%"
        paddingX={{ base: '1rem', lg: '2rem' }}
        paddingY="1rem"
        display="flex"
        alignItems="center"
        color="rgb(23, 23, 23)"
        transition="0.3s"
      >
        {/* logo */}
        <chakra.a>
          <chakra.svg
            id="logo"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 41.05 40.98"
            width="3.5rem"
            transitionProperty="transform"
            transitionTimingFunction="cubic-bezier(0.4, 0, 0.2, 1)"
            transitionDuration="1s"
            _hover={{
              transform: 'rotate(360deg) ',
            }}
          >
            <g>
              <path d="M18.71,29.04c-1.52-.68-2.59-2.19-2.63-3.95h0V13.07h-4.39v11.91c0,.65,.07,1.28,.2,1.89,.43,1.97,1.52,3.7,3.02,4.94,.36,.3,.75,.57,1.16,.81,1.09,.64,2.34,1.05,3.66,1.17v-4.42c-.36-.06-.7-.17-1.03-.32h.01Zm22.06-12.06c-1.56,.02-3.08,.21-4.54,.57-1.87,.45-3.64,1.16-5.27,2.08v5.52c1.58-1.3,3.42-2.29,5.42-2.9-.46,4.08-2.47,7.7-5.42,10.24v5.6c5.74-3.39,9.68-9.49,10.06-16.54,.02-.38,.03-.76,.03-1.14,0-1.17-.1-2.31-.29-3.43h.01Zm-30.67,2.64c-1.63-.92-3.4-1.63-5.27-2.08-1.46-.35-2.98-.55-4.54-.57-.19,1.11-.29,2.26-.29,3.43,0,.38,0,.76,.03,1.14,.39,7.05,4.33,13.15,10.06,16.54v-5.6c-2.95-2.55-4.96-6.16-5.42-10.24,2,.61,3.84,1.61,5.42,2.9v-5.52h0Z"></path>
              <g>
                <path d="M20.54,5.85l4.46,5.63v4.07c1.81,.86,3.33,2.22,4.39,3.91v-7.97l-5.05-6.56L20.54,0l-3.79,4.92-5.05,6.56h4.39l4.46-5.63h-.01Z"></path>
                <path d="M24.92,17.3c-.11-.07-.23-.13-.35-.19-.04-.02-.08-.04-.13-.06-.15-.08-.31-.15-.47-.22h-.02c-.15-.07-.31-.13-.46-.19-.05-.02-.1-.03-.15-.05-.12-.04-.24-.08-.36-.11-.05-.01-.1-.03-.16-.04-.17-.04-.34-.09-.51-.12h-.02c-.16-.04-.33-.07-.5-.09-.05,0-.11-.01-.16-.02-.13-.02-.26-.03-.39-.04-.05,0-.11,0-.16-.01-.18-.01-.36-.02-.54-.02-1,0-1.97,.17-2.87,.48v4.96c.58-.49,1.29-.84,2.08-.98,.26-.05,.52-.07,.79-.07s.54,.03,.79,.07c1.44,.26,2.64,1.21,3.24,2.49,.24,.51,.39,1.08,.42,1.68h0v.35h0c-.04,1.76-1.11,3.27-2.63,3.95-.33,.15-.67,.26-1.03,.32v4.42c1.33-.12,2.57-.53,3.66-1.17v3.14l-.12,.03c-1.13,.32-2.32,.52-3.54,.58-.25,0-.51,.02-.76,.02h-.06c-.26,0-.51,0-.76-.02-1.22-.06-2.41-.26-3.54-.58l-.12-.03c-.07-.02-.14-.04-.22-.06-1.43-.44-2.78-1.07-4-1.87-.06-.03-.11-.07-.17-.11v5.24c1.27,.61,2.62,1.09,4.02,1.43,1.46,.35,2.98,.55,4.54,.57h.57c1.56-.02,3.08-.21,4.54-.57,1.4-.34,2.75-.82,4.02-1.43v-13.97c0-3.29-1.8-6.16-4.46-7.68v-.03Z"></path>
              </g>
            </g>
          </chakra.svg>
        </chakra.a>

        {/* list */}
        <chakra.ul
          display={{ base: 'none', lg: 'flex' }}
          marginLeft="auto"
          textTransform="uppercase"
          gap="3rem"
        >
          {/* library */}
          <HeaderItem>Library</HeaderItem>

          {/* collections */}
          <HeaderItem>
            Collections
            <chakra.ul
              position="absolute"
              width="100%"
              paddingTop="1rem"
              textAlign="center"
              display="flex"
              flexDirection="column"
              alignItems="center"
              gap="1rem"
            >
              <div>
                <HeaderItem child>LILY</HeaderItem>
              </div>
              <div>
                <HeaderItem child transitionDelay="0.2s">
                  Lotus Gang
                </HeaderItem>
              </div>
            </chakra.ul>
          </HeaderItem>
        </chakra.ul>
      </chakra.div>
    )
  }

  const bottomScrollDisplay = () => {
    return (
      <chakra.div
        zIndex={999999}
        position="absolute"
        top="90vh"
        width="100%"
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        fontSize="0.875rem"
        lineHeight="1.25rem"
        gap="0.5rem"
      >
        Scroll
        <chakra.svg
          stroke="currentColor"
          fill="currentColor"
          strokeWidth="0"
          viewBox="0 0 16 16"
          fontSize="1.125rem"
          lineHeight="1.75rem"
          animation={`${bounce} 1s infinite`}
          height="1em"
          width="1em"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"
          ></path>
        </chakra.svg>
      </chakra.div>
    )
  }

  const pageOneDisplay = () => {
    return (
      <chakra.div
        id="content"
        position="relative"
        width="100%"
        height="95vh"
        minHeight={{ lg: '900px' }}
        backgroundColor="white"
        color="rgb(23, 23, 23)"
        roundedBottom="1.5rem"
      >
        {/* title + heading + cta */}
        <chakra.div
          position="relative"
          width="100%"
          height="100%"
          maxWidth="80rem"
          paddingTop={{ base: '7rem', md: '4rem' }}
          paddingX="2rem"
          marginX="auto"
          display="flex"
          flexDirection="column"
          justifyContent={{ md: 'center' }}
          textAlign={{ base: 'center', xl: 'left' }}
        >
          {/* title */}
          <ParallaxDisplay offset={50} clampInitial>
            <chakra.h1
              opacity={0} // animation
              width={{ md: '50%' }}
              maxWidth={{ base: '400px', md: 'none' }}
              marginX={{ base: 'auto', md: '0' }}
              transform="translateY(2rem)" // animation
            >
              <chakra.svg
                viewBox="0 0 730 183"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                width="100%"
              >
                <path
                  d="M1.57952e-06 3.99999H39.75V158.75L22.75 141.75H116.25V179H1.57952e-06V3.99999ZM196.789 182.5C178.789 182.5 162.706 178.667 148.539 171C134.372 163.167 123.289 152.333 115.289 138.5C107.456 124.667 103.539 109 103.539 91.5C103.539 73.8333 107.456 58.1667 115.289 44.5C123.289 30.6667 134.372 19.9167 148.539 12.25C162.706 4.41665 178.789 0.499988 196.789 0.499988C214.956 0.499988 231.039 4.41665 245.039 12.25C259.206 19.9167 270.289 30.6667 278.289 44.5C286.289 58.3333 290.289 74 290.289 91.5C290.289 109.167 286.289 124.917 278.289 138.75C270.289 152.417 259.206 163.167 245.039 171C230.872 178.667 214.789 182.5 196.789 182.5ZM196.789 144.75C207.122 144.75 216.289 142.5 224.289 138C232.289 133.5 238.456 127.25 242.789 119.25C247.289 111.083 249.539 101.833 249.539 91.5C249.539 81.1667 247.289 72 242.789 64C238.456 55.8333 232.289 49.5 224.289 45C216.289 40.5 207.122 38.25 196.789 38.25C186.622 38.25 177.539 40.5 169.539 45C161.539 49.5 155.289 55.8333 150.789 64C146.289 72 144.039 81.1667 144.039 91.5C144.039 101.833 146.289 111.083 150.789 119.25C155.289 127.25 161.539 133.5 169.539 138C177.539 142.5 186.622 144.75 196.789 144.75ZM334.275 18.75H374.025V179H334.275V18.75ZM278.775 3.99999H429.525V41.25H278.775V3.99999ZM509.547 182.5C494.547 182.5 481.464 179.5 470.297 173.5C459.297 167.333 450.88 158.583 445.047 147.25C439.214 135.917 436.297 122.5 436.297 107V3.99999H476.047V104.25C476.047 117.75 478.88 127.917 484.547 134.75C490.214 141.417 498.547 144.75 509.547 144.75C520.714 144.75 529.047 141.417 534.547 134.75C540.214 127.917 543.047 117.75 543.047 104.25V3.99999H582.797V107C582.797 122.5 579.797 135.917 573.797 147.25C567.964 158.583 559.547 167.333 548.547 173.5C537.547 179.5 524.547 182.5 509.547 182.5ZM662.396 182.5C647.896 182.5 635.23 180.083 624.396 175.25C613.73 170.417 605.563 163.583 599.896 154.75C594.23 145.75 591.396 135.25 591.396 123.25H630.396C630.396 131.417 633.23 137.917 638.896 142.75C644.563 147.417 652.313 149.75 662.146 149.75C670.48 149.75 677.063 148.167 681.896 145C686.73 141.667 689.146 137.083 689.146 131.25C689.146 125.25 686.23 120.333 680.396 116.5C674.73 112.5 665.646 109.167 653.146 106.5C639.313 103.5 627.98 99.5833 619.146 94.75C610.313 89.9167 603.73 84 599.396 77C595.063 70 592.896 61.75 592.896 52.25C592.896 41.5833 595.48 32.4167 600.646 24.75C605.98 16.9167 613.563 10.9167 623.396 6.75C633.23 2.58332 644.813 0.499988 658.146 0.499988C671.813 0.499988 683.73 2.91665 693.896 7.74998C704.23 12.4167 712.146 19.0833 717.646 27.75C723.313 36.4167 726.146 46.5833 726.146 58.25H687.896C687.896 50.4167 685.313 44.25 680.146 39.75C674.98 35.25 667.813 33 658.646 33C653.146 33 648.313 33.75 644.146 35.25C640.146 36.5833 637.063 38.6667 634.896 41.5C632.73 44.3333 631.646 47.6667 631.646 51.5C631.646 57 634.313 61.5833 639.646 65.25C644.98 68.9167 654.313 72.25 667.646 75.25C689.48 80.4167 705.23 87.3333 714.896 96C724.563 104.5 729.396 115.75 729.396 129.75C729.396 146.25 723.396 159.167 711.396 168.5C699.563 177.833 683.23 182.5 662.396 182.5Z"
                  fill="#222222"
                ></path>
              </chakra.svg>
            </chakra.h1>
          </ParallaxDisplay>

          {/* heading + call to actions */}
          <chakra.div
            position="relative"
            width={{ md: '70%', lg: '60%' }}
            marginTop={{ base: '1.5rem', md: '4rem', xl: '3rem' }}
            fontWeight="medium"
            textAlign={{ base: 'center', md: 'left' }}
          >
            {/* heading */}
            <ParallaxDisplay offset={80} clampInitial>
              <chakra.h2
                fontSize={{
                  base: '2.25rem',
                  md: '40px',
                  lg: '50px',
                  xl: '80px',
                }}
                lineHeight={1}
                transform="translateY(2rem)" // animation
                opacity={0} // animation
              >
                A community of optimalists.
              </chakra.h2>
            </ParallaxDisplay>

            {/* call to actions */}
            <ParallaxDisplay offset={100} clampInitial>
              <chakra.div
                id="ctas"
                marginTop="1.5rem"
                display="flex"
                flexDirection="column"
                alignItems={{ base: 'center', md: 'start' }}
                textAlign="center"
                opacity={0} // animation
              >
                {/* our vision */}
                <ColorfulButtonDisplay showRainbowOnHover={true}>
                  Our Vision
                </ColorfulButtonDisplay>

                <ColorfulButtonDisplay showRainbowOnHover={false}>
                  How can i mint lily
                </ColorfulButtonDisplay>

                <ColorfulButtonDisplay showRainbowOnHover={false}>
                  How can i mint lily
                </ColorfulButtonDisplay>
              </chakra.div>
            </ParallaxDisplay>
          </chakra.div>
        </chakra.div>

        {/* scroll thingy */}
        {bottomScrollDisplay()}

        {/* image */}
        {/* nope not doing it */}
      </chakra.div>
    )
  }

  const pageTwoDisplay = () => {
    return (
      <chakra.div
        display="flex"
        flexDirection={{ base: 'column', lg: 'row' }}
        minHeight={{ lg: '100vh' }}
        marginTop="5vh"
        gap="2rem"
        paddingX={{ base: '1rem', lg: '2rem' }}
      >
        {/* collection #1 */}
        <RoundedBoxDisplay>
          {/* icon */}
          <chakra.svg
            viewBox="0 0 90 90"
            xmlns="http://www.w3.org/2000/svg"
            width="64px"
            marginX="auto"
            fill="#303030"
          >
            <path d="M40.7038 63.14C37.3916 61.6628 35.0712 58.3811 34.9826 54.5509H34.9738V28.4122H25.4266V54.3033C25.4266 55.7186 25.5772 57.0896 25.8694 58.4165C26.7993 62.7066 29.164 66.4483 32.4408 69.1462C33.2379 69.8008 34.0793 70.3934 34.9738 70.9065C37.3561 72.2952 40.0573 73.1886 42.9445 73.4452V63.83C42.1651 63.6885 41.4123 63.4496 40.7038 63.14ZM88.723 36.9482C85.3222 36.9924 82.0187 37.4082 78.8482 38.1777C74.7742 39.1507 70.9217 40.6899 67.3792 42.7067V54.7013C70.8243 51.8796 74.8185 49.7212 79.1759 48.3856C78.1662 57.2577 73.8 65.1126 67.3792 70.6588V82.8304C79.8666 75.462 88.4396 62.2024 89.281 46.873C89.3252 46.0503 89.3518 45.2277 89.3518 44.3962C89.3518 41.8575 89.1393 39.3719 88.7319 36.9482H88.723ZM21.9638 42.6978C18.4124 40.6899 14.5599 39.1596 10.4948 38.1866C7.32421 37.417 4.02079 36.9924 0.619945 36.957C0.212553 39.3807 0 41.8663 0 44.405C0 45.2365 0.0265691 46.0592 0.0708509 46.8818C0.912205 62.2024 9.48516 75.4708 21.9726 82.8392V70.6676C15.5518 65.1303 11.1767 57.2665 10.176 48.3944C14.5333 49.7212 18.5275 51.8884 21.9726 54.7102V42.7067L21.9638 42.6978Z"></path>
            <path d="M44.6721 12.7111L54.3698 24.9535V33.7991C58.3021 35.6655 61.6232 38.6288 63.917 42.2909V24.9535L52.9174 10.6943L44.6721 0L36.4268 10.6943L25.4272 24.9535H34.9744L44.6721 12.7111Z"></path>
            <path d="M54.2096 37.6027C53.9616 37.4612 53.7048 37.3197 53.4479 37.187C53.3594 37.1427 53.2708 37.0897 53.1734 37.0454C52.8368 36.8774 52.5003 36.7182 52.146 36.5766C52.1283 36.5766 52.1195 36.5678 52.1018 36.5589C51.7741 36.4174 51.4375 36.2936 51.0921 36.1697C50.9859 36.1343 50.8707 36.099 50.7645 36.0547C50.5076 35.9663 50.2419 35.8867 49.9762 35.8159C49.8611 35.7805 49.7548 35.754 49.6397 35.7186C49.2766 35.6213 48.9046 35.5328 48.5326 35.4532C48.5149 35.4532 48.4972 35.4532 48.4795 35.4444C48.1253 35.3736 47.7621 35.3117 47.3902 35.2586C47.275 35.2409 47.1599 35.2321 47.0359 35.2144C46.7525 35.179 46.4691 35.1525 46.1857 35.1259C46.0706 35.1171 45.9554 35.1083 45.8315 35.0994C45.4418 35.0729 45.0432 35.064 44.6447 35.064C42.4572 35.064 40.3582 35.4267 38.401 36.099V46.8818C39.6674 45.8114 41.2173 45.0596 42.9177 44.7588C43.4757 44.6615 44.0513 44.6084 44.6447 44.6084C45.2381 44.6084 45.8137 44.6615 46.3717 44.7588C49.498 45.3249 52.1106 47.3771 53.4214 50.1723C53.9527 51.2869 54.2716 52.5164 54.3336 53.8167C54.3336 53.8079 54.3336 53.799 54.3513 53.799V54.5509C54.2539 58.3811 51.9335 61.6539 48.6301 63.14C47.9216 63.4584 47.1688 63.6973 46.3806 63.8388V73.454C49.2677 73.1974 51.9778 72.304 54.3513 70.9153V77.7352C54.2627 77.7618 54.1742 77.7883 54.0856 77.806C51.6147 78.496 49.0375 78.9294 46.3806 79.0532C45.8315 79.0798 45.2735 79.0975 44.7244 79.0975H44.5916C44.0336 79.0975 43.4757 79.0798 42.9266 79.0532C40.2697 78.9206 37.6836 78.496 35.2215 77.806C35.133 77.7795 35.0444 77.7529 34.9558 77.7352C34.8053 77.691 34.6459 77.6379 34.4865 77.5937C31.369 76.6384 28.4464 75.2673 25.7718 73.5247C25.6478 73.454 25.5238 73.3744 25.4087 73.2859V84.6702C28.1807 85.997 31.1033 87.0408 34.1588 87.775C37.3294 88.5446 40.6416 88.9692 44.0425 89.0046C44.2462 89.0134 44.4587 89.0134 44.6624 89.0134C44.8661 89.0134 45.0787 89.0134 45.2824 89.0046C48.6832 88.9603 51.9866 88.5446 55.1572 87.775C58.2127 87.0408 61.1441 85.997 63.9073 84.6702V54.2944C63.9073 47.1471 59.9928 40.911 54.2007 37.6027H54.2096Z"></path>
          </chakra.svg>

          {/* title */}
          <chakra.h2 marginX="auto" width={{ xl: '440px' }} marginY="2rem">
            <chakra.svg
              viewBox="0 0 383 52"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
              fill="#303030"
            >
              <path d="M30.1991 50.8142H0.96875V1.65108H12.2729V39.5101H30.1991V50.8142Z"></path>
              <path d="M56.0087 1.65108C59.3977 1.65108 62.5861 2.29767 65.5738 3.59085C68.5615 4.88403 71.1701 6.64543 73.3997 8.87506C75.6294 11.0601 77.3908 13.6464 78.6839 16.6341C79.9771 19.6218 80.6237 22.8102 80.6237 26.1992C80.6237 29.5882 79.9771 32.7766 78.6839 35.7643C77.3908 38.752 75.6294 41.3606 73.3997 43.5903C71.1701 45.7753 68.5615 47.5144 65.5738 48.8076C62.5861 50.1008 59.3977 50.7473 56.0087 50.7473C52.6197 50.7473 49.4313 50.1008 46.4436 48.8076C43.4559 47.5144 40.8473 45.7753 38.6177 43.5903C36.4326 41.3606 34.6935 38.752 33.4003 35.7643C32.1072 32.7766 31.4606 29.5882 31.4606 26.1992C31.4606 22.8102 32.1072 19.6218 33.4003 16.6341C34.6935 13.6464 36.4326 11.0601 38.6177 8.87506C40.8473 6.64543 43.4559 4.88403 46.4436 3.59085C49.4313 2.29767 52.6197 1.65108 56.0087 1.65108ZM56.0087 39.4432C57.837 39.4432 59.5538 39.1087 61.1591 38.4398C62.7645 37.7264 64.1691 36.7676 65.3731 35.5636C66.5771 34.3596 67.5135 32.955 68.1824 31.3496C68.8959 29.7443 69.2526 28.0275 69.2526 26.1992C69.2526 24.3709 68.8959 22.6541 68.1824 21.0488C67.5135 19.4435 66.5771 18.0388 65.3731 16.8348C64.1691 15.6308 62.7645 14.6944 61.1591 14.0255C59.5538 13.312 57.837 12.9553 56.0087 12.9553C54.1804 12.9553 52.4636 13.312 50.8583 14.0255C49.2529 14.6944 47.8483 15.6308 46.6443 16.8348C45.4403 18.0388 44.4816 19.4435 43.7681 21.0488C43.0992 22.6541 42.7647 24.3709 42.7647 26.1992C42.7647 28.0275 43.0992 29.7443 43.7681 31.3496C44.4816 32.955 45.4403 34.3596 46.6443 35.5636C47.8483 36.7676 49.2529 37.7264 50.8583 38.4398C52.4636 39.1087 54.1804 39.4432 56.0087 39.4432Z"></path>
              <path d="M112.152 1.5173V12.8884H102.72V50.8142H91.4163V12.8884H82.0519V1.5173H112.152Z"></path>
              <path d="M135.641 50.8142C133.143 50.8142 130.78 50.3683 128.55 49.4765C126.321 48.54 124.336 47.2245 122.597 45.53C120.814 43.7463 119.431 41.7397 118.45 39.5101C117.514 37.2804 117.023 34.8947 116.979 32.353V1.65108H128.283V32.2861C128.283 34.2481 129.019 35.965 130.49 37.4365C131.962 38.8189 133.701 39.5101 135.708 39.5101C136.689 39.5101 137.625 39.3094 138.517 38.9081C139.409 38.5067 140.189 37.9716 140.858 37.3027C141.527 36.6338 142.04 35.8535 142.396 34.9616C142.753 34.0698 142.932 33.111 142.932 32.0854V1.65108H154.236V32.0185C154.28 34.5603 153.812 36.9683 152.831 39.2425C151.895 41.5167 150.579 43.5011 148.885 45.1956C147.235 46.8901 145.273 48.2502 142.998 49.2758C140.769 50.2568 138.383 50.7696 135.841 50.8142H135.641Z"></path>
              <path d="M175.587 51.7507C174.026 51.7507 172.465 51.5277 170.905 51.0818C169.388 50.6805 167.939 50.0339 166.557 49.142C164.149 47.5813 162.276 45.5746 160.938 43.122C159.6 40.6249 158.932 37.9047 158.932 34.9616H170.236C170.236 36.2994 170.526 37.3473 171.105 38.1054C171.685 38.8189 172.198 39.3094 172.644 39.5769C173.446 40.1121 174.316 40.4019 175.252 40.4465C176.189 40.4911 177.103 40.3127 177.995 39.9114C178.619 39.6438 179.11 39.3094 179.466 38.9081C179.868 38.5067 180.158 38.1277 180.336 37.771C180.559 37.3696 180.693 36.9906 180.737 36.6338C180.782 36.2771 180.804 35.9873 180.804 35.7643C180.804 35.5413 180.782 35.2515 180.737 34.8947C180.693 34.538 180.559 34.159 180.336 33.7576C180.158 33.3563 179.868 32.9773 179.466 32.6205C179.11 32.2192 178.619 31.8625 177.995 31.5503C177.504 31.3273 176.969 31.1267 176.389 30.9483C175.854 30.7699 175.275 30.5693 174.65 30.3463C173.536 29.9896 172.376 29.5882 171.172 29.1423C169.968 28.6964 168.764 28.0944 167.56 27.3363C165.999 26.3553 164.684 25.129 163.614 23.6574C162.544 22.1859 161.763 20.6029 161.273 18.9084C160.827 17.2138 160.671 15.4747 160.804 13.691C160.983 11.8628 161.496 10.1236 162.343 8.47373C163.145 6.95758 164.149 5.6421 165.353 4.52729C166.557 3.41249 167.895 2.54293 169.366 1.91864C170.838 1.24975 172.421 0.848419 174.115 0.714643C175.81 0.580865 177.527 0.736938 179.266 1.18286C180.96 1.58419 182.499 2.23078 183.881 3.12263C185.263 3.96989 186.445 5.01781 187.426 6.2664C188.452 7.47039 189.232 8.83046 189.767 10.3466C190.302 11.8628 190.57 13.4458 190.57 15.0957H179.266C179.266 14.0701 178.931 13.3566 178.262 12.9553C177.638 12.5539 177.081 12.2864 176.59 12.1526C176.501 12.1526 176.278 12.1303 175.921 12.0857C175.609 11.9965 175.23 11.9965 174.784 12.0857C174.383 12.1303 173.959 12.2864 173.513 12.5539C173.067 12.7769 172.711 13.1559 172.443 13.691C172.086 14.4045 172.019 15.1626 172.242 15.9653C172.465 16.7233 172.911 17.3253 173.58 17.7712C174.204 18.128 174.896 18.4624 175.654 18.7746C176.412 19.0421 177.214 19.3097 178.062 19.5772C178.82 19.8002 179.578 20.0455 180.336 20.313C181.139 20.5806 181.941 20.8927 182.744 21.2495C185.687 22.5872 187.983 24.5493 189.633 27.1357C191.328 29.722 192.175 32.5982 192.175 35.7643C192.175 38.8858 191.328 41.7397 189.633 44.326C187.983 46.9124 185.687 48.8745 182.744 50.2122C181.584 50.7473 180.403 51.1264 179.199 51.3493C177.995 51.6169 176.791 51.7507 175.587 51.7507Z"></path>
              <path d="M248.23 23.323V50.8142H236.859V49.6102C235.61 50.0562 234.317 50.3906 232.979 50.6136C231.686 50.7919 230.393 50.8811 229.1 50.8811C225.934 50.8811 222.835 50.2791 219.802 49.0751C216.77 47.8711 214.05 46.0651 211.642 43.6572C209.234 41.2492 207.428 38.5513 206.224 35.5636C205.064 32.5313 204.485 29.4322 204.485 26.2661C204.485 23.1 205.064 20.0009 206.224 16.9686C207.428 13.9363 209.234 11.2162 211.642 8.80817C214.05 6.40018 216.77 4.59418 219.802 3.39019C222.835 2.18619 225.934 1.58419 229.1 1.58419C232.266 1.58419 235.365 2.18619 238.397 3.39019C241.43 4.59418 244.15 6.40018 246.558 8.80817L238.531 16.8348C237.238 15.5416 235.766 14.5829 234.116 13.9586C232.467 13.2897 230.794 12.9553 229.1 12.9553C227.405 12.9553 225.733 13.2897 224.083 13.9586C222.433 14.5829 220.962 15.5416 219.668 16.8348C218.375 18.128 217.394 19.5995 216.725 21.2495C216.057 22.8994 215.722 24.5716 215.722 26.2661C215.722 27.9606 216.057 29.6328 216.725 31.2828C217.394 32.9327 218.375 34.4042 219.668 35.6974C220.828 36.8568 222.121 37.771 223.548 38.4398C225.02 39.0641 226.513 39.4432 228.03 39.5769C229.59 39.6661 231.129 39.5101 232.645 39.1087C234.161 38.7074 235.566 38.0385 236.859 37.1021V34.6272H227.026V23.323H248.23Z"></path>
              <path d="M281.658 50.8142L279.718 44.8611H264.267L262.26 50.8142H250.287L267.009 1.71797H277.712L293.564 50.8142H281.658ZM268.147 33.557H276.106L272.227 21.6508L268.147 33.557Z"></path>
              <path d="M325.232 1.71797H336.536V50.8142H324.295L308.242 22.1859V50.8142H296.938V1.85175H309.245L325.232 30.4132V1.71797Z"></path>
              <path d="M382.66 23.323V50.8142H371.289V49.6102C370.041 50.0562 368.748 50.3906 367.41 50.6136C366.117 50.7919 364.823 50.8811 363.53 50.8811C360.364 50.8811 357.265 50.2791 354.233 49.0751C351.2 47.8711 348.48 46.0651 346.072 43.6572C343.664 41.2492 341.858 38.5513 340.654 35.5636C339.495 32.5313 338.915 29.4322 338.915 26.2661C338.915 23.1 339.495 20.0009 340.654 16.9686C341.858 13.9363 343.664 11.2162 346.072 8.80817C348.48 6.40018 351.2 4.59418 354.233 3.39019C357.265 2.18619 360.364 1.58419 363.53 1.58419C366.696 1.58419 369.796 2.18619 372.828 3.39019C375.86 4.59418 378.58 6.40018 380.988 8.80817L372.962 16.8348C371.668 15.5416 370.197 14.5829 368.547 13.9586C366.897 13.2897 365.225 12.9553 363.53 12.9553C361.836 12.9553 360.164 13.2897 358.514 13.9586C356.864 14.5829 355.392 15.5416 354.099 16.8348C352.806 18.128 351.825 19.5995 351.156 21.2495C350.487 22.8994 350.153 24.5716 350.153 26.2661C350.153 27.9606 350.487 29.6328 351.156 31.2828C351.825 32.9327 352.806 34.4042 354.099 35.6974C355.258 36.8568 356.552 37.771 357.979 38.4398C359.45 39.0641 360.944 39.4432 362.46 39.5769C364.021 39.6661 365.559 39.5101 367.075 39.1087C368.592 38.7074 369.996 38.0385 371.289 37.1021V34.6272H361.457V23.323H382.66Z"></path>
            </chakra.svg>
          </chakra.h2>

          {/* content */}
          <chakra.p
            maxWidth="36rem"
            marginX="auto"
            fontSize={{ lg: '1.125rem' }}
            lineHeight={{ lg: '1.75rem' }}
          >
            The Lotus Gang collection contains 2,000 Lads and 2,000 Ladies in
            32x32 pixel art which give you access to our ongoing projects and
            closed community.
          </chakra.p>

          {/* button */}
          <chakra.a
            color="rgb(23, 23, 23)"
            lineHeight="1.75rem"
            fontSize="1.25rem"
            paddingX="1.75rem"
            paddingY="0.75rem"
            marginX="auto"
            marginTop="calc(2rem)"
            backgroundColor="rgb(255, 212, 98)"
            borderRadius="9999px"
          >
            View Project
          </chakra.a>
        </RoundedBoxDisplay>

        {/* collection #2 */}
        <RoundedBoxDisplay backgroundColor="rgb(255, 212, 98)">
          {/* icon */}
          <chakra.svg
            viewBox="0 0 439 439"
            xmlns="http://www.w3.org/2000/svg"
            width="60px"
            marginX="auto"
            fill="#303030"
          >
            <path d="M310.321 219.5C310.321 215.009 309.995 210.567 309.362 206.201L438.985 187.026L393.625 82.0007L345.554 93.4276L356.981 45.3563L251.963 0L232.788 129.625C228.423 128.993 223.986 128.667 219.49 128.667C214.994 128.667 210.557 128.993 206.191 129.625L187.022 0L82.0039 45.3614L93.4305 93.4327L45.3603 82.0058L0 187.026L129.617 206.302C128.985 210.637 128.664 215.039 128.664 219.495C128.664 223.951 128.985 228.352 129.617 232.688L0 251.969L45.3603 356.994L93.4305 345.567L82.0039 393.639L187.027 439L206.202 309.375C210.567 310.007 215.004 310.333 219.5 310.333C223.996 310.333 228.433 310.007 232.798 309.375L251.973 439L356.996 393.639L345.569 345.567L393.64 356.994L439 251.969L309.378 232.794C310.01 228.428 310.336 223.991 310.336 219.495L310.321 219.5ZM247.532 247.543C241.269 253.811 233.436 257.54 225.296 258.739C223.369 259.02 221.427 259.16 219.49 259.16C217.553 259.16 215.611 259.015 213.684 258.739C205.544 257.54 197.711 253.816 191.448 247.543C185.15 241.245 181.411 233.351 180.237 225.171C179.695 221.412 179.695 217.593 180.237 213.834C181.411 205.654 185.145 197.765 191.448 191.462C197.711 185.194 205.544 181.466 213.684 180.266C215.611 179.985 217.553 179.845 219.49 179.845C221.427 179.845 223.369 179.99 225.296 180.266C233.436 181.466 241.269 185.189 247.532 191.462C253.8 197.73 257.529 205.569 258.728 213.699C259.29 217.543 259.29 221.462 258.728 225.306C257.529 233.436 253.805 241.275 247.532 247.543Z"></path>
          </chakra.svg>

          {/* title */}
          <chakra.h2
            marginX="auto"
            fontWeight={700}
            fontSize="4.5rem"
            lineHeight={1}
            width="155px"
            marginTop="2rem"
          >
            <chakra.svg
              viewBox="0 0 1088 439"
              fill="#303030"
              xmlns="http://www.w3.org/2000/svg"
              width="100%"
            >
              <path d="M0 0H99.6855V388.084L57.0527 345.451H291.533V438.867H0V0Z"></path>
              <path d="M311.076 0H410.762V438.867H311.076V0Z"></path>
              <path d="M466.026 0H565.712V388.084L523.079 345.451H757.559V438.867H466.026V0Z"></path>
              <path d="M665.182 0H778.66L833.205 101.566L883.361 193.101H870.195L920.351 101.566L974.269 0H1087.75L916.59 301.564H836.34L665.182 0ZM826.936 255.17H926.621V438.867H826.936V255.17Z"></path>
            </chakra.svg>
          </chakra.h2>

          {/* text */}
          <chakra.p
            maxWidth="36rem"
            marginX="auto"
            fontSize={{ lg: '1.125rem' }}
            lineHeight={{ lg: '1.75rem' }}
            marginTop="2rem"
          >
            LILY is the second collection released by The Lotus. The entire
            collection was hand-drawn by Bunjil who is the founder and artist
            behind The Lotus.
          </chakra.p>

          {/* button */}
          <chakra.a
            display="inline-flex"
            alignItems="flex-start"
            flexDirection="column"
            gap="0.25rem"
            color="rgb(23, 23, 23)"
            lineHeight="1.75rem"
            fontSize="1.25rem"
            paddingX="1.75rem"
            paddingY="0.75rem"
            marginX="auto"
            marginTop="2rem"
            backgroundColor="rgb(255, 255, 255)"
            borderRadius="9999px"
            transition="all 0.25s"
            border="1px solid transparent"
            _hover={{
              backgroundColor: 'rgb(255, 212, 98)',
              border: '1px solid black',
            }}
          >
            Check Eligibility
          </chakra.a>
        </RoundedBoxDisplay>
      </chakra.div>
    )
  }

  const eligibilityDisplay = () => {
    return (
      <chakra.div
        position="relative"
        minHeight={{ lg: '100vh' }}
        width="100%"
        maxWidth="80rem"
        paddingX="2rem"
        marginX="auto"
        paddingTop={{ base: '5rem', lg: '0' }}
        paddingBottom={{ base: '7rem', lg: '0' }}
        display="flex"
        flexDirection="column"
        justifyContent={{ lg: 'center' }}
        textAlign={{ base: 'center', lg: 'left' }}
        color="white"
        backgroundColor="rgb(48, 48, 48)"
      >
        {/* grid */}
        <chakra.div
          width="100%"
          gridTemplateColumns="repeat(6, minmax(0, 1fr))"
          gap="1rem"
          display={{ lg: 'grid' }}
        >
          {/* left: title */}
          <chakra.div gridColumn="span 4/span 4">
            <chakra.h2
              fontSize={{ base: '3rem', md: '4.5rem', lg: '90px' }}
              lineHeight={1}
            >
              Check LILY Eligibility
            </chakra.h2>
          </chakra.div>

          {/* right: content */}
          <chakra.div
            marginTop={{ base: '4rem', lg: '0' }}
            display="flex"
            flexDirection="column"
            justifyContent="center"
            gridColumn="span 2/span 2"
          >
            {/* text */}
            <chakra.p
              marginX={{ base: 'auto', lg: 0 }}
              maxWidth="18rem"
              marginBottom="1rem"
              fontSize={{ base: '1.25rem', lg: '1.5rem' }}
              lineHeight={{ base: '1.75rem', lg: '2rem' }}
            >
              Connect your wallet to see if you can mint.
            </chakra.p>

            {/* button */}
            <chakra.div
              display="flex"
              marginX="auto"
              marginTop={{ base: '0.5rem', lg: 0 }}
              borderWidth="1px"
              borderRadius="9999px"
              marginLeft={{ lg: 0 }}
              marginRight={{ lg: 'auto' }}
              flexGrow={0}
            >
              <chakra.button
                height="48px"
                marginRight="auto"
                paddingX="1.75rem"
                paddingY="1.5rem"
                display="flex"
                alignItems="center"
                gap="0.25rem"
                borderRadius="9999px"
                borderColor="rgb(255, 212, 98)"
                borderWidth="1px"
                fontWeight={400}
                fontSize="1.25rem"
                lineHeight="1.75rem"
                color="white"
                backgroundColor="transparent"
                transitionTimingFunction="cubic-bezier(.4,0,.2,1)!important"
                transitionDuration="0.15s"
                _hover={{
                  backgroundColor: 'rgb(255, 212, 98)',
                  color: 'white',
                }}
              >
                Connect
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M6.56033 6.5L17.167 17.1067"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                  <path
                    d="M17.167 7.10742L17.167 17.1074H7.16699"
                    stroke="currentColor"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </chakra.button>
            </chakra.div>
          </chakra.div>
        </chakra.div>
      </chakra.div>
    )
  }

  const lotusGangMerchDisplay = () => {
    return (
      <chakra.div
        paddingX={{ base: '1rem', lg: '4rem' }}
        paddingY="4rem"
        backgroundColor="white"
      >
        <chakra.div
          marginX="auto"
          display="flex"
          flexDirection={{ base: 'column', lg: 'row' }}
          alignItems="center"
          textAlign={{ base: 'center', lg: 'left' }}
          maxWidth="80rem"
        >
          {/* left */}
          <chakra.div>
            {/* title */}
            <chakra.h2
              fontSize={{ base: '3rem', lg: '3.75rem' }}
              fontWeight={700}
            >
              Lotus Gang Merch
            </chakra.h2>

            {/* content */}
            <chakra.p
              marginX={{ base: 'auto', lg: 0 }}
              marginY="1.5rem"
              width={{ lg: '75%' }}
              fontSize={{ lg: '1.125rem' }}
              lineHeight={{ lg: '1.75rem' }}
            >
              <chakra.span fontStyle="italic">Sources</chakra.span> say this is
              the best merch in Web3. Each purchase comes with a bag of goodies.
            </chakra.p>

            <chakra.button
              display="inline-flex"
              alignItems="center"
              gap="0.25rem"
              borderRadius="9999px"
              textColor="rgb(23, 23, 23)"
              fontSize="1.25rem"
              lineHeight="1.75rem"
              paddingY="0.75rem"
              paddingX="1.75rem"
              cursor="help"
              backgroundColor="transparent"
              border="1px solid rgb(48, 48, 48)"
            >
              Coming soon...
            </chakra.button>
          </chakra.div>

          {/* right */}
          <chakra.img
            marginTop={{ base: '4rem', lg: '0' }}
            src="./lotus-gang-hoody.webp"
            maxWidth="100%"
            verticalAlign="middle"
          ></chakra.img>
        </chakra.div>
      </chakra.div>
    )
  }

  /* ---------------------------------- main ---------------------------------- */
  return (
    <chakra.div>
      {/* loading */}
      {loadingDisplay()}

      {/* header */}
      {headerDisplay()}

      {/* main */}
      <chakra.div
        id="main"
        position="relative"
        width="100vw"
        minHeight="100vh"
        backgroundColor="rgb(48, 48, 48)"
        color="rgb(23, 23, 23)"
        transform="translateY(100vh)" // animation
      >
        {/* page one */}
        {pageOneDisplay()}

        {/* collections */}
        {pageTwoDisplay()}

        {/* check eligibility */}
        {eligibilityDisplay()}

        {/* lotus gang merch */}
        {lotusGangMerchDisplay()}
      </chakra.div>

      {/* footer */}
      <FooterDisplay />
    </chakra.div>
  )
}
