// import { blueGrey, cyan, grey, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface CssVarsThemeOptions {
    trelloCustom?: {
      headerHeight?: string
      boardBarHeight?: string
      boardContentHeight?: string
      semiBold?: number
      bgColor_Header_Light?: string
      bgColor_Header_Dark?: string
      columnHeaderHeight?: string
      columnFooterHeight?: string
      contentLayoutHeight?: string
    }
  }

  interface Palette {
    customText: {
      primary: string
    }
    constrastMode: {
      main: string
    }
  }

  interface PaletteOptions {
    customText?: {
      primary?: string
    }
    constrastMode?: {
      main?: string
    }
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    trelloCustom: {
      headerHeight: string
      boardBarHeight: string
      boardContentHeight: string
      semiBold: number
      bgColor_Header_Light: string
      bgColor_Header_Dark: string
      columnHeaderHeight: string
      columnFooterHeight: string
      contentLayoutHeight: string
    }
  }

  interface ThemeOptions {
    trelloCustom?: {
      headerHeight?: string
      boardBarHeight?: string
      boardContentHeight?: string
      semiBold?: number
      bgColor_Header_Light?: string
      bgColor_Header_Dark?: string
      columnHeaderHeight?: string
      columnFooterHeight?: string
      contentLayoutHeight?: string
    }
  }
}

const HEADER_HEIGHT = '56px'
const BOARD_BAR_HEIGHT = '58px'
const BOARD_CONTENT_HEIGHT = `calc(100vh - ${HEADER_HEIGHT} - ${BOARD_BAR_HEIGHT})`
const COLUMN_HEADER_HEIGHT = '50px'
const COLUMN_FOOTER_HEIGHT = '56px'
const CONTENT_LAYOUT = `calc(100vh - ${HEADER_HEIGHT})`

const theme = extendTheme({
  trelloCustom: {
    headerHeight: HEADER_HEIGHT,
    boardBarHeight: BOARD_BAR_HEIGHT,
    boardContentHeight: BOARD_CONTENT_HEIGHT,
    semiBold: 500,
    bgColor_Header_Light: '#1B1464',
    bgColor_Header_Dark: 'hsl(204deg 14.29% 6.86%)',
    columnHeaderHeight: COLUMN_HEADER_HEIGHT,
    columnFooterHeight: COLUMN_FOOTER_HEIGHT,
    contentLayoutHeight: CONTENT_LAYOUT
  },
  colorSchemes: {
    light: {
      palette: {
        secondary: {
          main: '#ecf0f1'
        },
        background: {
          default: '#053bb0'
        },
        customText: {
          primary: '#ecf0f1'
        },
        constrastMode: {
          main: '#000000'
        }
      }
    },
    dark: {
      palette: {
        secondary: {
          main: '#a156c2'
        },
        background: {
          default: '#1e272e'
        },
        customText: {
          primary: '#a156c2'
        },
        constrastMode: {
          main: '#ffffff'
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
          color: theme.palette.customText.primary,
          borderColor: theme.palette.customText.primary,
          '&:hover': {
            borderColor: theme.palette.customText.primary,
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
          color: theme.palette.customText.primary,
          fontSize: '0.875rem'
        })
      }
    },
    MuiOutlinedInput: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => ({
          color: theme.palette.customText.primary,
          fontSize: '0.875rem',
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.customText.primary
          },
          '&:hover': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.customText.primary,
              borderWidth: '2px'
            }
          },
          '&.Mui-focused': {
            '.MuiOutlinedInput-notchedOutline': {
              borderColor: theme.palette.customText.primary
            }
          }
        })
      }
    },
    MuiFormLabel: {
      styleOverrides: {
        // Name of the slot
        root: ({ theme }) => ({
          color: theme.palette.customText.primary,
          fontSize: '0.875rem',
          '&.Mui-focused': {
            color: theme.palette.customText.primary
          }
        })
      }
    },
    MuiTypography: {
      styleOverrides: {
        root: {
          '&.MuiTypography-body1': {
            fontSize: '0.875rem'
          }
        }
      }
    }
  }
})

export default theme
