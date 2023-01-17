import { extendTheme } from '@chakra-ui/react'
import { colors } from './colors'

const variantOutlined = () => ({
	field: {
		_focusVisible: {
			borderColor: "secondary.600",
			boxShadow: "0 0 0 1px secondary.600"
		},
		_focus: {
			borderColor: "secondary.600",
			boxShadow: "0 0 0 2px secondary.600"
		}
	}
});

const variantFilled = () => ({
	field: {
		_focusVisible: {
			borderColor: "secondary.600",
			boxShadow: "0 0 0 1px secondary.600"
		},
		_focus: {
			borderColor: "secondary.600",
			boxShadow: "0 0 0 1px secondary.600"
		}
	}
});

const variantFlushed = () => ({
	_focusVisible: {
		borderColor: "secondary.600",
		boxShadow: "0 0 0 1px secondary.600"
	},
	field: {
		_focus: {
			borderColor: "secondary.600",
			boxShadow: "0 1px 0 0 secondary.600"
		}
	}
});

export const customTheme = extendTheme({
	colors,
	fonts: {
		heading: `Poppins`,
		body: `Poppins`
	},
	components: {
		Input: {
			variants: {
				outline: variantOutlined,
				filled: variantFilled,
				flushed: variantFlushed
			}
		},
		Select: {
			variants: {
				outline: variantOutlined,
				filled: variantFilled,
				flushed: variantFlushed
			}
		},
		Textarea: {
			variants: {
				outline: () => variantOutlined().field,
				filled: () => variantFilled().field,
				flushed: () => variantFlushed().field
			}
		}
	}
})
