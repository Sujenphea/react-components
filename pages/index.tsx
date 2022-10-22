import { css } from '@emotion/react'

import AnimatedGradientButton from '../components/animatedGradientButton'

export default function Home() {
  // styles
  const styles = {
    container: css`
      width: 100vw;
      height: 100vh;

      display: flex;
      justify-content: center;
      align-items: center;

      background-color: black;
    `,
  }

  return (
    <div css={styles.container}>
      <div>hello world</div>
      <AnimatedGradientButton />
    </div>
  )
}
