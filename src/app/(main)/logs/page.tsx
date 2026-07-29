'use client'

import { drawerBleeding } from '@/components/BottomDrawer/BottomDrawer'
import DetailDataLayer from '@/components/DetailDataLayer/DetailDataLayer'
import DetailForm from '@/components/DetailForm'
import LogDataLayer from '@/components/LogDataLayer'
import LogSearchSection from '@/components/LogSearchSection'
import LogViewer from '@/components/LogViewer'
import { Box, Container, Typography } from '@mui/material'
import { useState } from 'react'

import dynamic from 'next/dynamic'

const DynamicBottomDrawer = dynamic(() => import('@/components/BottomDrawer'), {
  ssr: false,
})

export default function LogsPage() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false)

  return (
    <Box sx={{ height: 'stretch', overflow: 'hidden', position: 'relative' }}>
      <Container
        id='conrel'
        maxWidth='xl'
        sx={{ height: 'stretch', overflow: 'auto', pb: `${drawerBleeding}px` }}
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
      <DynamicBottomDrawer open={isDrawerOpen} toggleOpen={setIsDrawerOpen}>
        <DetailDataLayer>
          <DetailForm />
        </DetailDataLayer>
      </DynamicBottomDrawer>
    </Box>
  )
}
