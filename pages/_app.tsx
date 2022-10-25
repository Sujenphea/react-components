/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/destructuring-assignment */
import '../styles/sanitize.css'
import '../styles/globals.css'
// import '../styles/demo.css'
import { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'

function MyApp(props: AppProps) {
  return (
    <ChakraProvider>
      <props.Component {...props.pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
