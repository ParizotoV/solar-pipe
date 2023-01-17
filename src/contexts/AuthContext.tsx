import { createContext, useEffect, useState } from "react";

import { useToast } from "@chakra-ui/react";
import { DataService } from "api/DataService";
import { EmployeesParams } from "models/Employees";
import Router from "next/router";
import { parseCookies, setCookie, destroyCookie } from 'nookies'

import { AuthContextType } from "./AuthContext.interface";

export const AuthContext = createContext({} as AuthContextType)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<EmployeesParams | null>(null)
  const toast = useToast()

  const isAuthenticated = !!user

  useEffect(() => {
    const {
      ['solar.token']: token,
      ['solar.employeeUuid']: uuid,
    } = parseCookies()

    if (token) {
      setUser({
        uuid,
        token
      })
    }
  }, [])

  function destroySession() {
    destroyCookie(null, 'solar.token')
    destroyCookie(null, 'solar.employeeUuid')
  }

  async function getEmployeeInformation() {
    const {
      ['solar.employeeUuid']: uuid,
      ['solar.token']: token
    } = parseCookies()

    const response = await DataService({ url: `/employees/${uuid}`, method: "GET" })

    setUser({
      uuid: uuid,
      token: token,
      email: response?.data?.email,
      name: response?.data?.name
    })
  }

  async function signIn({
    email,
    password
  }: { email: string, password: string }) {
    setUser(null)

    const data = {
      email: email.trim(),
      password: password.trim()
    }

    const response = await DataService({ url: '/authentication/login', method: 'POST', data })

    setCookie(undefined, 'solar.token', response?.data?.access_token, {
      maxAge: 60 * 60 * 24
    })

    setCookie(undefined, 'solar.employeeUuid', response?.data?.employeeUuid, {
      maxAge: 60 * 60 * 24
    })

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

    return response
  }

  const signOut = () => {
    Router.push('/sign-in')
    destroySession()
    setUser(null)
  }

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        setUser,
        signIn,
        signOut,
        user,
        getEmployeeInformation
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}