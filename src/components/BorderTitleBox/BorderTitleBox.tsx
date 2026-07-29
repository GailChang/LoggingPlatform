import { Box } from '@mui/material'
import { grey } from '@mui/material/colors'
import { ReactNode } from 'react'

type TBorderTitleBoxProps = {
  title: string
  children?: ReactNode
}

export default function BorderTitleBox({
  title,
  children,
}: TBorderTitleBoxProps) {
  return (
    <Box
      id='borderBox'
      sx={{
        position: 'relative',
        margin: '1rem 0 1rem',
        padding: '1.5rem 1.5rem 1rem 1.5rem',
        border: `1px solid ${grey[700]}`,
        borderRadius: '1rem',
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: '-.75rem',
          left: '1rem',
          padding: '0 .5rem 0 .5rem',
          backgroundColor: 'white',
        }}
      >
        {title}
      </Box>
      {children}
    </Box>
  )
}
