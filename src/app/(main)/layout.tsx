'use client'

import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { Box, Stack, Toolbar } from '@mui/material'
import { useState } from 'react'

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)

  const handleToggleMenu = () => {
    setIsOpen(prev => !prev)
  }

  return (
    <>
      <Navbar onToggleMenu={handleToggleMenu} />
      <Stack direction='column' sx={{ height: '100dvh' }}>
        <Toolbar />
        <Stack direction='row' sx={{ flex: 1 }}>
          <Sidebar isOpen={isOpen} />
          {/* TODO: Sidebar Drawer */}
          <Box component='main' sx={{ flex: 1 }}>
            {children}
          </Box>
        </Stack>
      </Stack>
    </>
  )
}

export default MainLayout
