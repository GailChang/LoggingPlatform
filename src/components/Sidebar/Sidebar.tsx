'use client'

import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded'
import {
  Drawer,
  ListItemIcon,
  ListItemText,
  MenuItem,
  MenuList,
} from '@mui/material'
import Link from '@/components/NextLink'
import { usePathname } from 'next/navigation'

type TSidebarProps = {
  isOpen: boolean
}

const DRAWER_WIDTH = 240

const Sidebar: React.FC<TSidebarProps> = ({ isOpen }) => {
  const pathname = usePathname()

  return (
    <Drawer
      variant='persistent'
      sx={{
        width: isOpen ? DRAWER_WIDTH : 0,
        flexShrink: 0,
        height: 'stretch',
        zIndex: theme => theme.zIndex.appBar - 1,
        transition: theme =>
          theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        '& .MuiDrawer-paper': {
          position: 'absolute',
          top: 'unset',
          height: 'stretch',
          width: DRAWER_WIDTH,
          boxSizing: 'border-box',
        },
      }}
      anchor='left'
      open={isOpen}
    >
      <MenuList>
        <MenuItem component={Link} href='/' selected={pathname === '/'}>
          <ListItemIcon>
            <ArrowForwardIosRoundedIcon />
          </ListItemIcon>
          <ListItemText>Dashboard</ListItemText>
        </MenuItem>
        <MenuItem component={Link} href='/logs' selected={pathname === '/logs'}>
          <ListItemIcon>
            <ArrowForwardIosRoundedIcon />
          </ListItemIcon>
          <ListItemText>Logs</ListItemText>
        </MenuItem>
      </MenuList>
    </Drawer>
  )
}

export default Sidebar
