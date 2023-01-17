import { useContext, useEffect } from 'react'

import { Box, Text, useMediaQuery } from '@chakra-ui/react'
import { AuthContext } from 'contexts/AuthContext'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import { parseCookies } from 'nookies'

import Button from 'components/Button'

export default function Home() {
	const { user, getEmployeeInformation, signOut } = useContext(AuthContext)

	useEffect(() => {
		getEmployeeInformation()
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [])

	const query = useMediaQuery('(min-width: 688px)')

	return (
		<>
			<Head>
				<title>Solarpipe</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Box bgColor="grey.200" width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
				<Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" padding="0 40px">
					<Text color="grey.900" mb="44px" fontSize={!query[0] ? "1xl" : "5xl"} fontWeight="bold">
						Bem vindo, {user?.name}!
					</Text>
					<Button variant="primary" onClick={signOut}>
						Sair
					</Button>
				</Box>
			</Box>
		</>
	)
}

export const getServerSideProps: GetServerSideProps = async (context) => {
	const { ['solar.token']: token } = parseCookies(context)

	if (!token) {
		return {
			props: {},
			redirect: {
				destination: '/sign-in',
			}
		}
	}

	return {
		props: {}
	}

}
