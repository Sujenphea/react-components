import {
  Box,
  chakra,
  shouldForwardProp,
  useEditable,
  Text,
} from '@chakra-ui/react'
import {
  motion,
  isValidMotionProp,
  useTransform,
  useScroll,
  useSpring,
} from 'framer-motion'
import React, { ReactNode, useEffect, useState } from 'react'
import css from 'styled-jsx/css'

/* -------------------------------------------------------------------------- */
/*                                  displays                                  */
/* -------------------------------------------------------------------------- */
const MotionBox = chakra(motion.div, {
  /**
   * Allow motion props and non-Chakra props to be forwarded.
   */
  shouldForwardProp: (prop) =>
    isValidMotionProp(prop) || shouldForwardProp(prop),
})

const NumberDisplay = (props: { children: ReactNode }) => {
  return (
    <Box width="100%" height="100vh" position="relative">
      {props.children}
    </Box>
  )
}

const TextDisplay = (props: { children: ReactNode }) => {
  return (
    <Box
      display="flex"
      alignItems="center"
      width="100%"
      height="100vh"
      mx="auto"
      maxW="80rem"
    >
      <Text
        as="h1"
        px="1rem"
        mb="2rem"
        fontSize="3rem"
        textAlign="left"
        lineHeight="1.25"
      >
        {props.children}
      </Text>
    </Box>
  )
}

/* -------------------------------------------------------------------------- */
/*                                    main                                    */
/* -------------------------------------------------------------------------- */
export default function LotusVision() {
  const [clientHeight, setClientHeight] = useState(0)

  const { scrollY } = useScroll() // scroll value
  const newY = useTransform(
    scrollY,
    [0, 3 * clientHeight],
    [0, -3 * clientHeight]
  )
  const translateYNumbers = useSpring(newY, {
    stiffness: 800,
    damping: 200,
    restSpeed: 0.5,
  })
  const translateYTexts = useSpring(newY, {
    stiffness: 400,
    damping: 200,
    restSpeed: 0.5,
  })

  /* --------------------------------- effect --------------------------------- */
  useEffect(() => {
    setClientHeight(window.innerHeight)
  }, [])

  /* -------------------------------- displays -------------------------------- */
  const numbersDisplay = () => {
    return (
      <MotionBox
        opacity={0.7}
        width="100%"
        height="300vh"
        left={0}
        top={0}
        position="fixed"
        style={{ y: translateYNumbers }}
      >
        {/* 1 */}
        <NumberDisplay>
          <svg
            viewBox="0 0 224 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            css={{
              position: 'absolute',
              bottom: 0,
              left: '2rem',
              height: '60vh',
            }}
          >
            <path
              d="M129.2 560H223.6V0H150L140.4 35.2C129.2 76 109.2 88.8 57.2004 88.8H0.400391V176H129.2V560Z"
              fill="#61FEFF"
            ></path>
          </svg>
        </NumberDisplay>

        {/* 2 */}
        <NumberDisplay>
          <svg
            viewBox="0 0 403 571"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            css={{
              position: 'absolute',
              bottom: 0,
              left: '2rem',
              height: '60vh',
            }}
          >
            <path
              d="M0.599609 571H402.2V484.6H155L289.4 363C361.4 299.8 391.8 236.6 391.8 173.4C391.8 71.0001 311.8 0.600098 199 0.600098C83.7996 0.600098 9.39961 73.4001 6.19961 191.8H94.1996C96.5996 122.2 136.6 83.0001 199 83.0001C259 83.0001 299.8 119.8 299.8 175.8C299.8 215.8 278.2 252.6 231 295.8L0.599609 501.4V571Z"
              fill="#61FEFF"
            ></path>
          </svg>
        </NumberDisplay>

        {/* 3 */}
        <NumberDisplay>
          <svg
            viewBox="0 0 398 571"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            css={{
              position: 'absolute',
              bottom: 0,
              left: '2rem',
              height: '60vh',
            }}
          >
            <path
              d="M199.6 570.4C318.8 570.4 398 499.2 398 391.2C398 294.4 332.4 225.6 233.2 215.2L378 67.2V0H11.6004V85.6H243.6L104.4 228.8V291.2H199.6C262.8 291.2 304.4 328.8 304.4 386.4C304.4 444 263.6 482.4 199.6 482.4C138 482.4 96.4004 446.4 93.2004 391.2H0.400391C5.20039 500.8 82.8004 570.4 199.6 570.4Z"
              fill="#61FEFF"
            ></path>
          </svg>
        </NumberDisplay>
      </MotionBox>
    )
  }

  const textsDisplay = () => {
    return (
      <motion.div
        css={{
          opacity: 0.7,
          width: '100%',

          height: '300vh',
          left: 0,
          top: 0,
          position: 'fixed',
        }}
        style={{ y: translateYTexts }}
      >
        {/* 1 */}
        <TextDisplay>
          The Lotus is a burst of purity in muddy waters.
        </TextDisplay>

        {/* 2 */}
        <TextDisplay>
          In a digital world without borders, we are a brand dedicated to{' '}
          <strong>Learning</strong>, the <strong>Frisson</strong> you experience
          as you discover what is possible and the eventual{' '}
          <strong>Growth</strong> this leads to in all aspects of your life.
        </TextDisplay>

        {/* 2 */}
        <TextDisplay>
          We are a community of <strong>optimalists</strong> with a rational
          belief in a better future for ourselves and our community through our
          own efforts.
        </TextDisplay>
      </motion.div>
    )
  }

  const sectionOneDisplay = () => {
    return (
      <>
        {/* numbers */}
        {numbersDisplay()}

        {/* texts */}
        {textsDisplay()}
      </>
    )
  }

  /* ---------------------------------- main ---------------------------------- */
  return (
    <Box
      pos="relative"
      w="100vw"
      overflow="scroll"
      backgroundColor="white"
      color="black"
    >
      <Box zIndex={99} position="relative">
        {/* 22 empty divs to set height of container */}
        {Array(22)
          .fill(0)
          .map((_, i) => {
            return (
              <Box
                position="relative"
                display="flex"
                alignItems="center"
                justifyContent="center"
                h="100vh"
                css={{ perspective: '500px' }}
                key={i}
              >
                {/* <Box maxW="80rem" w="100%" mx="auto"> */}
                {/* <Box position="relative"></Box> */}
                {/* </Box> */}
              </Box>
            )
          })}

        {sectionOneDisplay()}
      </Box>
    </Box>
  )
}
