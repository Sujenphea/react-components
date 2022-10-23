/**
 * animated glowy button with animating border
 */

import { css, keyframes } from '@emotion/react'

type Props = {
  textColor: string
  iconColor: string
  backgroundColor: string

  borderColor: string
  borderHoverColor: string
  borderThickness: string

  fontFamily: string
  fontWeight: number | string
  fontStyle: string
}

const AnimatedGradientButton = (props: Props) => {
  const spinGradient = keyframes`
    0% {
      transform: scaleX(8) scaleY(1.5) rotate(0deg);
    }
    to {
      transform: scaleX(8) scaleY(1.5) rotate(1turn);
    }
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

  return (
    <div
      css={css({
        position: 'relative',

        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',

        borderRadius: '9999px',
        cursor: 'pointer',

        // show border on hover
        '&:hover .borderHover': {
          opacity: 0.6,
        },

        '&:hover .border': {
          animationPlayState: 'paused',
        },
      })}
    >
      {/* outer glow animation */}
      <span
        css={css({
          position: 'absolute',
          top: 0,
          height: '100%',
          width: '100%',
          opacity: 0.4,

          background:
            'radial-gradient(transparent,transparent,#fff,transparent,transparent)',
          filter: 'blur(32px)',
          transform: 'translateZ(0)', // removes ugly border
          backgroundSize: '300% 300%',

          animation: `${translateGlow} 20s linear infinite`,
        })}
      />

      {/* link */}
      <a
        href="https://www.google.com"
        target={'_blank'}
        css={css({
          position: 'relative',
          padding: `${props.borderThickness}`,

          display: 'block',

          borderRadius: '9999px',
          overflow: 'hidden',
          isolation: 'isolate', ////https:// bugs.webkit.org/show_bug.cgi?id=67950

          cursor: 'pointer',
        })}
      >
        {/* only exists as borders, get hover event from div container */}
        {/* hover shows border */}
        <span
          css={css({
            // only exists when hovered (handled in 'container')

            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',

            opacity: 0,
            backgroundColor: `${props.borderHoverColor}`,

            transition: 'opacity 0.9s ease',
          })}
          className="borderHover"
        />
        {/* border animation */}
        <span
          css={css({
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',

            color: '#fff',
            background: `conic-gradient(transparent 135deg, ${props.borderColor} 180deg, transparent 255deg), conic-gradient(transparent -45deg, ${props.borderColor} 0deg, transparent 75deg)`,
            filter: 'blur(6px)',

            animation: `${spinGradient} 5s linear infinite`,
          })}
          className="border"
        />

        {/* text + icon */}
        <span
          css={css({
            position: 'relative',
            minWidth: '188px',
            height: '48px',
            padding: '0 20px',

            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',

            color: `${props.textColor}`,
            backgroundColor: `${props.backgroundColor}`,
            borderRadius: '24px',
          })}
        >
          <p
            css={css({
              paddingBottom: '2px',

              fontFamily: `${props.fontFamily}`,
              fontWeight: `${props.fontWeight}`,
              fontStyle: `${props.fontStyle}`,
            })}
          >
            Register now
          </p>
          <svg
            fill="none"
            height="16"
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.33337 8H12.6667"
              stroke={`${props.iconColor}`}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            ></path>
            <path
              d="M8 3.33333L12.6667 8L8 12.6667"
              stroke={`${props.iconColor}`}
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            ></path>
          </svg>
        </span>
      </a>
    </div>
  )
}

export default AnimatedGradientButton

AnimatedGradientButton.defaultProps = {
  textColor: '#fff',
  iconColor: '#fff',
  backgroundColor: '#000',

  borderColor: '#fff',
  borderHoverColor: '#fff',
  borderThickness: '1px',

  fontFamily: 'inherit',
  fontWeight: 'normal',
  fontStyle: 'normal',
}
