import { ChakraProvider } from '@chakra-ui/react'
import { AuthProvider } from 'contexts/AuthContext'
import type { AppProps } from 'next/app'

import { customTheme } from '../theme'

import '../styles/globals.css'


export default function App({ Component, pageProps }: AppProps) {
	return (
		<ChakraProvider theme={customTheme}>
			<AuthProvider>
				<Component {...pageProps} />
			</AuthProvider>
		</ChakraProvider>
	)
}

