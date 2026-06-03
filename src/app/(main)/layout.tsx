'use client'

import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import Breadcrumb from '@/components/Breadcrumb'
import { Box, Stack, Toolbar } from '@mui/material'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import { setShared } from '@/domain/shared/store'

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const segment = pathname === '/' ? 'home' : pathname.split('/').filter(Boolean).at(-1) ?? 'home'
    setShared(segment)
  }, [pathname])

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
            <Breadcrumb />
            {children}
          </Box>
        </Stack>
      </Stack>
    </>
  )
}

export default MainLayout
