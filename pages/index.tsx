import { css } from '@emotion/react'
import { useState } from 'react'

import AnimatedGradientButton from '../components/animatedGradientButton'

export default function Home() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  /* --------------------------------- display -------------------------------- */
  // modal
  const openModalButtonDisplay = () => {
    return (
      <button
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
      <div
        css={css({
          width: '100vw',
          height: '100vh',

          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',

          backgroundColor: 'black',
          color: 'white',
        })}
      >
        <AnimatedGradientButton>
          <div css={css({ padding: '8px 24px' })}>
            <div>hiasfasdfaasdfkljh kajshdf lkahsdflkj asdf jklahs sd</div>
          </div>
        </AnimatedGradientButton>

        {/* open modal button */}
        {openModalButtonDisplay()}
      </div>

      {/* modal */}
      {modalDisplay()}
    </>
  )
}
