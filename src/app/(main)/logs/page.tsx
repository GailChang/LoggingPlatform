'use client'

import { Container, Typography, Box } from '@mui/material'
import LogViewer from '@/components/LogViewer'
import LogDataLayer from '@/components/LogDataLayer'

export default function LogsPage() {
  return (
    <Container maxWidth='xl'>
      <Box sx={{ py: 3 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Logs
        </Typography>
        <Box sx={{ mt: 3 }}>
          <LogDataLayer>
            <LogViewer />
          </LogDataLayer>
        </Box>
      </Box>
    </Container>
  )
}
