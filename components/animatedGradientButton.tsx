import { css, keyframes } from '@emotion/react'
import { useEffect, useRef, useState } from 'react'

const AnimatedGradientButton = () => {
  const [isHover, setIsHover] = useState(false)

  const spinGradient = keyframes`
    0% {
      transform: scaleX(8) scaleY(1.5) rotate(0deg);
      opacity: 1;
    }
    to {
      transform: scaleX(8) scaleY(1.5) rotate(1turn);
      opacity: 1;
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

  const styles = {
    // containers
    container: css({
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      position: 'relative',
      borderRadius: '9999px',

      cursor: 'pointer',
    }),
    link: css({
      textDecoration: 'none',
      cursor: 'pointer',

      borderRadius: '9999px',
      padding: '1px',
      margin: '-1px',
      position: 'relative',
      overflow: 'hidden',
      display: 'block',
      isolation: 'isolate',
      transform: 'translateZ(10px)',
    }),

    // border
    borderAnimationDiv: css({
      animation: `${spinGradient} 5s linear infinite`,

      filter: 'blur(6px)',

      transformOrigin: 'center center',
      background: `conic-gradient(transparent 135deg,#fff 180deg,transparent 255deg), conic-gradient(transparent -45deg, #fff 0deg, transparent 75deg)`,

      color: '#fff',

      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      borderRadius: '9999px',
      display: 'block',
    }),
    borderHoverDiv: css({
      opacity: isHover ? '0.6' : '0',
      transition: 'opacity 0.9s ease',
      background: '#fff',

      position: 'absolute',
      top: '0',
      left: '0',
      right: '0',
      bottom: '0',
      borderRadius: '9999px',
      display: 'block',
    }),

    // text + icon
    textContainer: css({
      position: 'relative',
      zIndex: 1000,

      minWidth: '188px',
      height: '48px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '0 20px',
      color: '#fff',
      background: '#000',
      borderRadius: '24px',
      gridGap: '8px',
      gap: '8px',
    }),
    text: css({
      textDecoration: 'none',
      paddingBottom: '2px',
    }),

    // outerglow
    glowAnimationDiv: css({
      isolation: 'isolate',
      background:
        'radial-gradient(transparent,transparent,#fff,transparent,transparent)',

      opacity: 0.4,
      position: 'absolute',
      top: 0,
      height: '100%',
      width: '100%',
      filter: 'blur(32px)',
      transform: 'translateZ(0)',
      backgroundSize: '300% 300%',
      borderRadius: '9999px',

      animation: `${translateGlow} 20s linear infinite`,
    }),
  }

  return (
    <div
      css={styles.container}
      onPointerEnter={() => {
        setIsHover(true)
      }}
      onPointerLeave={() => {
        setIsHover(false)
      }}
    >
      <a href="www.google.com" css={styles.link}>
        <span css={styles.borderAnimationDiv} />
        <span css={styles.borderHoverDiv} />

        <span css={styles.textContainer}>
          <p css={styles.text}>Register now</p>
          <svg
            fill="none"
            height="16"
            viewBox="0 0 16 16"
            width="16"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M3.33337 8H12.6667"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            ></path>
            <path
              d="M8 3.33333L12.6667 8L8 12.6667"
              stroke="#fff"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1.5"
            ></path>
          </svg>
        </span>
      </a>
      <span css={styles.glowAnimationDiv}></span>
    </div>
  )
}

export default AnimatedGradientButton
