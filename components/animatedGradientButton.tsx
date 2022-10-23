import { css, keyframes } from '@emotion/react'
import { useState } from 'react'

/* -------------------------------------------------------------------------- */
/*                                  constants                                 */
/* -------------------------------------------------------------------------- */
const spinGradient = keyframes`
  0% {
    transform: scaleX(8) scaleY(1.5) rotate(0deg);
  }
  to {
    transform: scaleX(8) scaleY(1.5) rotate(1turn);
  }
`

const translateGlow = keyframes`
  0% {
    background-position: -20% -20%;
  }
  25% {
    background-position: 30% 80%;
  }
  50% {
    background-position: 110% 110%;
  }
  75% {
    background-position: 80% 30%;
  }
  100% {
    background-position: -20% -20%;
  }
`

/* -------------------------------------------------------------------------- */
/*                                   button                                   */
/* -------------------------------------------------------------------------- */
/**
 * Animated glowy button with animating border
 */
export default function AnimatedGradientButton(props: {
  textColor?: string
  iconColor?: string
  backgroundColor?: string

  borderColor?: string
  borderHoverColor?: string
  borderThickness?: string

  animateOuterGlow?: boolean
  outerGlowColor?: string

  fontFamily?: string
  fontWeight?: number | string
  fontStyle?: string
  children?: React.ReactChild
}) {
  /* --------------------------------- states --------------------------------- */
  const [hovering, setHovering] = useState(false)

  /* --------------------------------- display -------------------------------- */
  // border display
  const outerGlowDisplay = () => {
    return (
      <span
        css={css({
          position: 'absolute',
          top: 0,
          height: '100%',
          width: '100%',
          opacity: 1.0,

          background: `radial-gradient(transparent, transparent, ${
            props.outerGlowColor || '#fff'
          }, transparent, transparent)`,
          filter: 'blur(32px)',
          transform: 'translateZ(0)', // removes ugly border
          backgroundSize: '300% 300%',

          animation: `${translateGlow} 20s linear infinite`,
          animationPlayState:
            props.animateOuterGlow === undefined ||
            props.animateOuterGlow === true
              ? 'running'
              : 'paused',
        })}
      />
    )
  }

  const hoverBorderDisplay = () => {
    return (
      <span
        css={css({
          // only exists when hovered (handled in 'container')

          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',

          opacity: hovering ? 0.6 : 0,
          backgroundColor: `${props.borderHoverColor || '#fff'}`,

          transition: 'opacity 0.9s ease',
        })}
      />
    )
  }

  const borderAnimationDisplay = () => {
    return (
      <span
        css={css({
          position: 'absolute',
          top: '0',
          left: '0',
          right: '0',
          bottom: '0',

          color: '#fff',
          background: `conic-gradient(transparent 135deg, ${
            props.borderColor || '#fff'
          } 180deg, transparent 255deg), conic-gradient(transparent -45deg, ${
            props.borderColor || '#fff'
          } 0deg, transparent 75deg)`,
          filter: 'blur(6px)',

          animation: `${spinGradient} 5s linear infinite`,
          animationPlayState: hovering ? 'paused' : 'running',
        })}
      />
    )
  }

  /* ---------------------------------- main ---------------------------------- */
  return (
    <div
      css={css({
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: '9999px',
      })}
      onMouseEnter={() => {
        setHovering(true)
      }}
      onMouseLeave={() => {
        setHovering(false)
      }}
    >
      {/* outer glow animation */}
      {outerGlowDisplay()}

      {/* content */}
      <div
        css={css({
          position: 'relative',
          padding: `${props.borderThickness || '1px'}`,
          borderRadius: '9999px',
          overflow: 'hidden',
          isolation: 'isolate', ////https:// bugs.webkit.org/show_bug.cgi?id=67950
        })}
      >
        {/* hover border */}
        {hoverBorderDisplay()}

        {/* border animation */}
        {borderAnimationDisplay()}

        {/* text + icon */}
        <div
          css={css({
            position: 'relative',
            backgroundColor: `${props.backgroundColor || '#000'}`,
            borderRadius: '9999999px',
          })}
        >
          {props.children}
        </div>
      </div>
    </div>
  )
}
