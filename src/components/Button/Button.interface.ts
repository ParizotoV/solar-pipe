import { ButtonProps as ButtonPropsChakra } from '@chakra-ui/react'

export interface ButtonCustomProps {
  variant: 'primary' | 'outlined'
}

export type ButtonProps = ButtonCustomProps & Omit<ButtonPropsChakra, 'variant'>

