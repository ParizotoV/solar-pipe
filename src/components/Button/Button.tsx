import { Button as ButtonChakra, Text } from "@chakra-ui/react";

import { ButtonProps } from ".";

const Button: React.FC<ButtonProps> = ({ children, variant, ...rest }) => {
  const properties = {
    outlined: {
      button: {
        padding: '10px',
        display: 'inline-block',
        position: 'relative',
        zIndex: 0,
        background: 'transparent',
        width: '100%',
        maxWidth: '350px',
        '::before': {
          aspectRatio: 1,
          content: '""',
          position: 'absolute',
          zIndex: -1,
          inset: 0,
          padding: '2px',
          borderRadius: '24px',
          background: 'linear-gradient(90deg, #F27F3E, #B75377 , #6735A2)',
          '-webkit-mask':
            ` linear-gradient(#fff 0 0) content-box, 
              linear-gradient(#fff 0 0)`,
          mask: `linear - gradient(#fff 0 0) content- box,
            linear- gradient(#fff 0 0)`,
          '-webkit-mask-composite': 'xor',
          'mask-composite': 'exclude',
        }
      },
      text: {
        backgroundImage: 'linear-gradient(90deg, #F27F3E, #B75377 , #6735A2)',
        '-webkit-background-clip': 'text',
        '-webkit-text-fill-color': 'transparent',
        '-moz-background-clip': 'text',
        '-moz-text-fill-color': 'transparent'
      }
    },
    primary: {
      button: {
        color: 'grey.900',
        bgImage: 'linear-gradient(90deg, #F27F3E, #B75377 , #6735A2)',
        width: '100%',
        maxWidth: '350px',
      },
      text: {}
    }
  }

  function getVariantButton(variant: 'outlined' | 'primary') {
    return properties[variant]
  }

  return (
    <ButtonChakra borderRadius="24px" padding="16px" height="56px" _hover={{ ...getVariantButton(variant).button }} sx={{ ...getVariantButton(variant).button }}  {...rest}>
      <Text
        sx={{ ...getVariantButton(variant).text }}
      >
        {children}
      </Text>
    </ButtonChakra>
  )
}

export default Button