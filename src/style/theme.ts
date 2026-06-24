'use client'
import { grey } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

declare module '@mui/material/styles' {
  // 擴充 Palette 介面
  interface Palette {
    cOrange: Palette['primary']
  }

  // 擴充 PaletteOptions 介面（讓 createTheme 時可以傳入這些顏色）
  interface PaletteOptions {
    cOrange?: PaletteOptions['primary']
  }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    cOrange: true
  }
}

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
  palette: {
    secondary: {
      light: grey[700],
      main: grey[700],
      dark: grey[100],
      contrastText: grey[50],
    },
    cOrange: {
      main: '#d7902c',
    },
  },
})

export default theme
