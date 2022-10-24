import { css, keyframes } from '@emotion/react'

/* -------------------------------------------------------------------------- */
/*                                  constants                                 */
/* -------------------------------------------------------------------------- */
const slideGradient = keyframes`
  50% {
    background-position: 140% 50%;
    transform:skew(-2deg)
  }
`

/* -------------------------------------------------------------------------- */
/*                                   button                                   */
/* -------------------------------------------------------------------------- */
/**
 * Animated colourful glow button
 */
export default function animatedGradientGlowButton(props: {
  children?: React.ReactChild
}) {
  /* --------------------------------- display -------------------------------- */
  const backgroundGradientDisplay = () => {
    return (
      <div
        css={css({
          position: 'absolute',
          top: 1,
          right: 1,
          bottom: 1,
          left: 1,
          padding: 0,
          margin: 0,

          background:
            'linear-gradient(-90deg, #007cf0, #00dfd8, #ff0080, #007cf0)',
          backgroundSize: '400% 100%',
          border: 'none',
          borderRadius: '5px',

          animation: `${slideGradient} 8s ease-in-out infinite`,

          '&:after': {
            content: '""',

            position: 'absolute',
            left: 0,
            right: 0,
            height: '100%',
            borderRadius: '5px',

            backgroundSize: 'inherit',
            backgroundImage: 'inherit',
            filter: 'blur(0.5rem)',

            animation: 'inherit',
          },
        })}
      />
    )
  }

  const childrenDisplay = () => {
    return (
      <div
        css={css({
          position: 'relative',
          width: '100%',
          height: '100%',

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',

          borderRadius: '5px',
          overflow: 'hidden',

          backgroundColor: '#000',
          color: 'white',
        })}
      >
        {props.children}
      </div>
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
      })}
    >
      {backgroundGradientDisplay()}

      {childrenDisplay()}
    </div>
  )
}
