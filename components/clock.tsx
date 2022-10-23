import { css } from '@emotion/react'
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useMemo, useRef, useState } from 'react'

let timingFunction = { ease: [0.66, 0.15, 0.1, 0.95], duration: 0.3 }

export default function Clock(props: { time: string }) {
  /* -------------------------------- variables ------------------------------- */
  const [countdown, setCountdown] = useState(0)

  /* ---------------------------------- hooks --------------------------------- */
  useEffect(() => {
    let getTime = () => {
      let currentTime = new Date()
      let timezoneOffset = 6e4 * currentTime.getTimezoneOffset()
      let countdown =
        new Date(props.time).getTime() - currentTime.getTime() + timezoneOffset

      setCountdown(countdown)
    }

    let timer = setInterval(() => {
      getTime()
    }, 1e3)

    return () => clearInterval(timer)
  }, [])

  const countdownObject = useMemo(() => {
    return {
      days: Math.floor(countdown / 864e5),
      hours: Math.floor((countdown / 36e5) % 24),
      minutes: Math.floor((countdown / 1e3 / 60) % 60),
      seconds: Math.floor((countdown / 1e3) % 60),
    }
  }, [countdown])

  /* --------------------------------- display -------------------------------- */
  const digitDisplay = (props: { digit: string }) => {
    const storedValue = useRef(0)
    const controls = useAnimationControls()
    const controls2 = useAnimationControls()

    useEffect(() => {
      controls
        .start({
          y: -24,
          scaleY: 0,
          opacity: 0.3,
          transition: { duration: 0, ease: 'linear' },
        })
        .then(() => {
          controls.start({ y: 0, scaleY: 1, opacity: 1 })
        })

      controls2
        .start({
          y: 0,
          opacity: 1,
          scaleY: 1,
          transition: { duration: 0, ease: 'linear' },
        })
        .then(() => {
          controls2.start({ y: 24, opacity: 0.3, scaleY: 0 })
        })

      storedValue.current = props.digit
    }, [props.digit])

    return (
      <div
        css={css({
          flex: '1 1',
          height: '56px',
          width: '24px',
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',

          '& > *': {
            position: 'absolute',
            bottom: 0,
          },
        })}
      >
        <motion.div
          animate={controls2}
          transition={timingFunction}
          children={storedValue.current}
        />
        <motion.div
          animate={controls}
          transition={timingFunction}
          children={props.digit}
        />
      </div>
    )
  }

  const unitTimeDisplay = (props: { time: number; unit: string }) => {
    const time = props.time.toString().padStart(2, '0')

    return (
      <div
        css={css({
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',

          width: '48px',
          fontFamily:
            'Space Mono, Menlo, Monaco, Lucida Console, Liberation Mono, DejaVu Sans Mono, Bitstream Vera Sans Mono, Courier New, monospace',
        })}
      >
        {/* time */}
        <div
          css={css({
            display: 'flex',
            fontSize: '40px',
          })}
        >
          {time.split('').map((v) => {
            return digitDisplay({ digit: v })
          })}
        </div>

        {/* label */}
        <div
          css={css({
            fontSize: '12px',
            color: '#888',
          })}
        >
          {props.unit}
        </div>
      </div>
    )
  }

  /* ---------------------------------- main ---------------------------------- */
  return (
    <div
      css={css({
        paddingBottom: '24px',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        gripGap: '8px',
        gap: '8px',
      })}
    >
      <div
        css={css({
          fontSize: '40px',
          paddingBottom: '24px',
          color: '#888',
        })}
      >
        :
      </div>

      {unitTimeDisplay({ time: countdownObject.seconds, unit: 'seconds' })}
      {/* {digitDisplay({ value: 2 })} */}
    </div>
  )
}
