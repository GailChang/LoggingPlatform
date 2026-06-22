'use client'
import { grey } from '@mui/material/colors'
import { createTheme } from '@mui/material/styles'

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
  },
})

export default theme
