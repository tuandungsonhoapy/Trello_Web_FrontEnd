// import { blueGrey, cyan, grey, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface CssVarsThemeOptions {
    trelloCustom?: {
      headerHeight?: string
      boardBarHeight?: string
      semiBold?: number
      bgColor_BoardBar_Light?: string
      bgColor_BoardBar_Dark?: string
    }
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    trelloCustom: {
      headerHeight: string
      boardBarHeight: string
      semiBold: number
      bgColor_BoardBar_Light: string
      bgColor_BoardBar_Dark: string
    }
  }

  interface ThemeOptions {
    trelloCustom?: {
      headerHeight?: string
      boardBarHeight?: string
      semiBold?: number
      bgColor_BoardBar_Light?: string
      bgColor_BoardBar_Dark?: string
    }
  }
}

const theme = extendTheme({
  trelloCustom: {
    headerHeight: '58px',
    boardBarHeight: '62px',
    semiBold: 500,
    bgColor_BoardBar_Light: '#3498db',
    bgColor_BoardBar_Dark: '#1e272e'
  },
  colorSchemes: {
    light: {
      palette: {
        secondary: {
          main: '#ecf0f1'
        },
        background: {
          default: '#1565c0'
        }
      }
    },
    dark: {
      palette: {
        secondary: {
          main: '#8e44ad'
        },
        background: {
          default: 'hsl(204deg 14.29% 6.86%)'
        }
      }
    }
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          '*::-webkit-scrollbar': {
            width: '0.4em',
            height: '0.4em'
          },
          '*::-webkit-scrollbar-thumb': {
            backgroundColor: '#bdc3c7',
            borderRadius: '8px'
          },
          '*::-webkit-scrollbar-thumb:hover': {
            backgroundColor: '#2c3e50'
          }
        }
      }
    },
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => ({
          color: theme.palette.secondary.main,
          borderColor: theme.palette.secondary.main,
          '&:hover': {
            borderColor: theme.palette.secondary.main,
            borderWidth: '2px'
          },
          textTransform: 'none'
        })
      }
    },
    MuiInputLabel: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => ({
          color: theme.palette.secondary.main,
          fontSize: '0.875rem'
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => ({
          color: theme.palette.secondary.main,
          fontSize: '0.875rem',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.secondary.main
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.secondary.main,
              borderWidth: '2px'
            }
          },
          '&.Mui-focused': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.secondary.main
            }
          }
        })
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => ({
          color: theme.palette.secondary.main,
          fontSize: '0.875rem',
          '&.Mui-focused': {
            color: theme.palette.secondary.main
          }
        })
      }
    }
  }
})

export default theme
