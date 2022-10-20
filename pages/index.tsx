import { css } from '@emotion/react'

export default function Home() {
  // styles
  const styles = {
    container: css`
      width: 100vw;
      height: 100vh;

      display: flex;
      justify-content: center;
      align-items: center;
    `,
  }

  return (
    <div css={styles.container}>
      <div>hello world</div>
    </div>
  )
}
