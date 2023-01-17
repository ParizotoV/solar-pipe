import { ChangeEvent, useContext, useState } from 'react'
import { Box, Text, Image, useToast } from '@chakra-ui/react'
import Button from 'components/Button'
import Input from 'components/Input/Input'
import Head from 'next/head'
import { default as ImageNext } from 'next/image'
import { AuthContext } from 'contexts/AuthContext'
import Router from 'next/router'

export default function SignIn() {
	const toast = useToast()
	const [form, setForm] = useState<{ email: string, password: string }>({
		email: '',
		password: ''
	})
	const { signIn } = useContext(AuthContext)

	const handleLogin = async () => {
		const { email, password } = form

		const response = await signIn({ email, password })
		if (response.status === 201) {
			toast({
				title: 'Logado com sucesso.',
				position: 'top-right',
				status: 'success',
				duration: 2000,
				isClosable: false,
			})

			Router.push('/')
		} else {
			toast({
				title: response?.message,
				position: 'top-right',
				status: 'error',
				duration: 2000,
				isClosable: false,
			})
		}
	}

	const handleStateForm = (event: ChangeEvent<HTMLInputElement>) => {
		const { target: { value, name } } = event
		setForm((prevState) => ({
			...prevState,
			[name]: value
		}))
	}

	return (
		<>
			<Head>
				<title>Login | Solarpipe</title>
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<link rel='icon' href='/favicon.ico' />
			</Head>

			<Box bgColor="grey.200" width="100vw" height="100vh" display="flex" justifyContent="center" alignItems="center">
				<Box width="40%" height="100%" borderTopRightRadius="128px" bgColor="grey.900">
					<Box padding="0 80px">
						<Box marginTop="115px">
							<ImageNext src="/images/solarpipe-logo-color.svg" width="240" height="400" alt="logo" />
						</Box>
						<Box marginTop="125px">
							<Text fontSize="2xl" color="grey.300" fontWeight="bold">
								Bem-vindo! 👋
							</Text>
						</Box>
						<Box mt="32px">
							<Input
								placeholder="Digite seu email"
								label="Email"
								name="email"
								value={form.email}
								onChange={(event) => handleStateForm(event)}
							/>
						</Box>
						<Box mt="24px">
							<Input
								type="password"
								placeholder="*********"
								label="Senha"
								name="password"
								value={form.password}
								onChange={(event) =>
									handleStateForm(event)}
							/>
						</Box>
						<Box display="flex" justifyContent="end" width="100%" mt="16px">
							<Text color="grey.3000" fontSize="md">Esqueceu sua senha?</Text>
						</Box>

						<Box display="flex" flexDirection="column" alignItems="center" mt="80px">
							<Button variant="primary" onClick={handleLogin}>
								Entrar
							</Button>
							<Text my="32px">
								ou
							</Text>
							<Button variant="outlined">
								Cadastre-se
							</Button>
						</Box>
					</Box>
				</Box>
				<Box width="60%" height="100%">
					<Box display="flex" position="relative" height="100%" alignItems="center">
						<Image src="images/sun-edit.png" alt="solar" width="100" height="700" position="absolute" top="0" right="0" />
						<Image src="images/man.png" alt="solar" width="100" height="800" position="absolute" top="100" right="300" />
						<Image src="images/logo-white.svg" alt="solar" width="30" height="30" position="absolute" bottom="36px" right="54px" />
						<Box ml="64px">
							<Text width="400px" fontSize="56px" fontWeight="bold" color="grey.900" lineHeight="60px">
								Inovando a <Text as="span" backgroundImage="linear-gradient(90deg, #F27F3E, #B75377 , #6735A2)" sx={{ '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent', }}>gestão</Text> para um futuro <Text as="span" backgroundImage="linear-gradient(90deg, #B75377 , #6735A2)" sx={{ '-webkit-background-clip': 'text', '-webkit-text-fill-color': 'transparent', }}>sustentável.</Text>
							</Text>
						</Box>
					</Box>
				</Box>
			</Box>
		</>
	)
}
