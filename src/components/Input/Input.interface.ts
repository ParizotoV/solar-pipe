import { InputProps as InputPropsChakra } from '@chakra-ui/react'

interface InputPropsCustom {
  label: string
}

export type InputProps = InputPropsChakra & InputPropsCustom