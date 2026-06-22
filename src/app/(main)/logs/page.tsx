'use client'

import LogDataLayer from '@/components/LogDataLayer'
import LogSearchSection from '@/components/LogSearchSection'
import LogViewer from '@/components/LogViewer'
import { Box, Container, Typography } from '@mui/material'

export default function LogsPage() {
  return (
    <Container maxWidth='xl'>
      <Box sx={{ py: 3 }}>
        <Typography variant='h4' component='h1' gutterBottom>
          Logs
        </Typography>
        <Box sx={{ mt: 3 }}>
          <LogSearchSection />
          <LogDataLayer>
            <LogViewer />
          </LogDataLayer>
        </Box>
      </Box>
    </Container>
  )
}
