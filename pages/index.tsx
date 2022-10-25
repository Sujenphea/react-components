import { css } from '@emotion/react'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import LotusHomePage from '../components/lotusHomePage'
import LotusVision from '../components/lotusVision'

const AnimatedGlowButton = dynamic(
  () => import('../components/animatedGlowButton'),
  {
    ssr: true,
  }
)

const FlipClock = dynamic(() => import('../components/flipClock'), {
  ssr: true,
})

const AnimatedGradientGlowButton = dynamic(
  () => import('../components/animatedGradientGlowButton'),
  {
    ssr: true,
  }
)

/* -------------------------------------------------------------------------- */
/*                                    home                                    */
/* -------------------------------------------------------------------------- */
export default function Home() {
  /* --------------------------------- states --------------------------------- */
  const [isModalOpen, setIsModalOpen] = useState(false)

  // components
  const [animatedGlowButtonOpen, setAnimatedGlowButtonOpen] = useState(false)
  const [flipClockOpen, setFlipClockOpen] = useState(false)
  const [animatedGradientGlowButtonOpen, setAnimatedGradientGlowButtonOpen] =
    useState(false)

  /* -------------------------------- handlers -------------------------------- */
  const resetDisplays = () => {
    setAnimatedGlowButtonOpen(false)
    setFlipClockOpen(false)
    setAnimatedGradientGlowButtonOpen(false)
  }

  /* --------------------------------- display -------------------------------- */
  // navigation bar
  const navBarDisplay = () => {
    return (
      <div
        css={css({
          position: 'absolute',

          display: 'grid',
          gridTemplateColumns: 'repeat(5, 1fr)',

          color: 'white',
          backgroundColor: 'rgba(0.2, 0.2, 0.2, 0)',

          '& > *': {
            padding: '20px',
            borderRight: '0.5px solid grey',
            borderBottom: '0.5px solid grey',
            textAlign: 'center',
          },
        })}
      >
        <button
          onClick={() => {
            resetDisplays()
            setAnimatedGlowButtonOpen(true)
          }}
        >
          animated gradient button
        </button>

        <button
          onClick={() => {
            resetDisplays()
            setFlipClockOpen(true)
          }}
        >
          flip clock
        </button>

        <button
          onClick={() => {
            resetDisplays()
            setAnimatedGradientGlowButtonOpen(true)
          }}
        >
          animated gradient glow button
        </button>
      </div>
    )
  }

  // components
  const componentsDisplay = () => {
    return (
      <div
        css={css({
          width: '100vw',
          // height: '100vh',

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',

          backgroundColor: 'black',
          color: 'white',
        })}
      >
        {animatedGlowButtonOpen && (
          <AnimatedGlowButton>
            <div css={css({ padding: '8px 24px' })}>
              <div>hiasfasdfaasdfkljh kajshdf lkahsdflkj asdf jklahs sd</div>
            </div>
          </AnimatedGlowButton>
        )}

        {flipClockOpen && (
          <FlipClock
            isCountdown
            showLabels
            time={'2023-01-01T10:30:00+00:00'}
          />
        )}

        {animatedGradientGlowButtonOpen && (
          <AnimatedGradientGlowButton>
            <div
              css={css({
                padding: '2px 12px',
              })}
            >
              hello jsdfiojsiofjas
            </div>
          </AnimatedGradientGlowButton>
        )}

        {/* <LotusHomePage /> */}
        <LotusVision />
      </div>
    )
  }

  // modal
  const openModalButtonDisplay = () => {
    return (
      <button
        css={css({
          position: 'absolute',
          top: '15vh',
          left: '10px',

          color: 'white',
        })}
        onClick={() => {
          setIsModalOpen(true)
        }}
      >
        open modal
      </button>
    )
  }

  const modalDisplay = () => {
    return (
      <div
        css={css({
          position: 'fixed',
          top: '25%',
          left: '25%',
          width: '50%',
          height: '50%',
          padding: '20px',

          display: `${isModalOpen ? 'flex' : 'none'}`,
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',

          backgroundColor: 'rgba(100, 0, 0, 0.8)',
          color: 'white',
        })}
      >
        <h1>Modal</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus et
          justo nec ipsum vehicula tincidunt posuere nec turpis. Maecenas at
          auctor tortor.
        </p>

        <button
          onClick={() => {
            setIsModalOpen(false)
          }}
        >
          close
        </button>
      </div>
    )
  }

  /* ---------------------------------- main ---------------------------------- */
  return (
    <>
      {/* nav bar */}
      {/* {navBarDisplay()} */}

      {/* components */}
      {componentsDisplay()}

      {/* open modal button */}
      {openModalButtonDisplay()}

      {/* modal */}
      {modalDisplay()}
    </>
  )
}
