'use client'

import Breadcrumb from '@/components/Breadcrumb'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import { setShared } from '@/domain/shared/store'
import { Box, Stack, Toolbar } from '@mui/material'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'

const MainLayout: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(true)
  const pathname = usePathname()

  useEffect(() => {
    const segment =
      pathname === '/'
        ? 'home'
        : (pathname.split('/').filter(Boolean).at(-1) ?? 'home')
    setShared(segment)
  }, [pathname])

  const handleToggleMenu = () => {
    setIsOpen((prev) => !prev)
  }

  return (
    <>
      <Navbar onToggleMenu={handleToggleMenu} />
      <Stack direction='column' sx={{ height: '100dvh' }}>
        <Toolbar />
        <Stack direction='row' sx={{ flex: 1, overflow: 'hidden' }}>
          <Sidebar isOpen={isOpen} />
          <Stack
            component='main'
            direction='column'
            sx={{ flex: 1, overflow: 'hidden' }}
          >
            <Breadcrumb sx={{ flexGrow: 0, flexShrink: 0 }} />
            <Box sx={{ flexGrow: 1, flexShrink: 1, overflow: 'auto' }}>
              {children}
            </Box>
          </Stack>
        </Stack>
      </Stack>
    </>
  )
}

export default MainLayout
