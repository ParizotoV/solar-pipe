import { EmployeesParams } from "models/Employees"

export interface AuthContextType {
  isAuthenticated: boolean
  user: EmployeesParams | null
  setUser: React.Dispatch<React.SetStateAction<EmployeesParams | null>>
  signIn: (data: SignInParams) => Promise<any>
  getEmployeeInformation: () => Promise<any>
}

export interface SignInParams {
  email: string
  password: string
}

export interface AuthContextType {
  isAuthenticated: boolean
  user: EmployeesParams | null
  setUser: React.Dispatch<React.SetStateAction<EmployeesParams | null>>
  signIn: (data: SignInParams) => Promise<any>
  signOut: () => void
}