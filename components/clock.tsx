import { css } from '@emotion/react'
import { motion, useAnimationControls } from 'framer-motion'
import { useEffect, useRef } from 'react'

let timingFunction = { ease: [0.66, 0.15, 0.1, 0.95], duration: 0.3 }

export default function Clock() {
  /* --------------------------------- display -------------------------------- */
  const digitDisplay = (props: { value: number }) => {
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

      storedValue.current = props.value
    }, [])

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
          children={props.value}
        />
      </div>
    )
  }

  const unitTimeDisplay = () => {
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
          {digitDisplay({ value: 2 })}

          {digitDisplay({ value: 3 })}
        </div>

        {/* label */}
        <div
          css={css({
            fontSize: '12px',
            color: '#888',
          })}
        >
          Minutes
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

      {unitTimeDisplay()}
      {/* {digitDisplay({ value: 2 })} */}
    </div>
  )
}
