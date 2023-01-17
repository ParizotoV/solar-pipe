import React from 'react'
import { Input as InputChakra, Text } from '@chakra-ui/react'
import { InputProps } from '.'

export const Input: React.FC<InputProps> = ({ children, label, ...rest }) => {
  return (
    <React.Fragment>
      <Text fontSize="md" fontWeight="bold" color="grey.200" mb="8px" ml="8px">
        {label}
      </Text>
      <InputChakra height="56px" borderRadius="24px" padding="16px 24px" {...rest}>
        {children}
      </InputChakra>
    </React.Fragment>
  )
}

export default Input