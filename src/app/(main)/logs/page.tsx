'use client'

import { Container, Typography, Box } from '@mui/material'
import { LogViewer } from '@/components/feature/LogViewer'

export default function LogsPage() {
  return (
    <Container maxWidth='xl'>
      <Box sx={{ py: 3 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Logs
        </Typography>
        <Box sx={{ mt: 3 }}>
          <LogViewer />
        </Box>
      </Box>
    </Container>
  )
}
