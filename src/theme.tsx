import { blueGrey, cyan, grey, teal } from '@mui/material/colors'
import { experimental_extendTheme as extendTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  interface CssVarsThemeOptions {
    trelloCustom?: {
      headerHeight?: string
      boardBarHeight?: string
    }
  }
}

declare module '@mui/material/styles' {
  interface Theme {
    trelloCustom: {
      headerHeight: string
      boardBarHeight: string
    }
  }

  interface ThemeOptions {
    trelloCustom?: {
      headerHeight?: string
      boardBarHeight?: string
    }
  }
}

const theme = extendTheme({
  trelloCustom: {
    headerHeight: '58px',
    boardBarHeight: '62px'
  },
  colorSchemes: {
    light: {
      palette: {
        primary: teal,
        secondary: grey
        // Add other palette properties here
      }
    },
    dark: {
      palette: {
        primary: {
          main: cyan[900]
        },
        secondary: blueGrey
        // Add other palette properties here
      }
    }
  }
  // ...other properties
})

export default theme
