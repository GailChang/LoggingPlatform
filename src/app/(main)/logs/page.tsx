'use client'

import BottomDrawer from '@/components/BottomDrawer'
import LogDataLayer from '@/components/LogDataLayer'
import LogSearchSection from '@/components/LogSearchSection'
import LogViewer from '@/components/LogViewer'
import { Box, Container, Typography } from '@mui/material'
import { useCallback, useRef, useState } from 'react'

export default function LogsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const getContainer = useCallback(() => containerRef.current, [])

  return (
    <>
      <Container
        id='conrel'
        ref={containerRef}
        maxWidth='xl'
        sx={{ position: 'relative', overflow: 'hidden' }}
      >
        <Box id='logPage' sx={{ py: 3 }}>
          <Typography component='h1' variant='h4' gutterBottom>
            Logs
          </Typography>
          <Box sx={{ mt: 3 }}>
            <LogSearchSection />
            <LogDataLayer>
              <LogViewer toggleOpen={setIsDrawerOpen} />
            </LogDataLayer>
          </Box>
        </Box>
      </Container>
      <BottomDrawer
        container={getContainer}
        open={isDrawerOpen}
        toggleOpen={setIsDrawerOpen}
      />
    </>
  )
}
