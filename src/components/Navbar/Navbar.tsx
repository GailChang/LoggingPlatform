import NLink from '@/components/NextLink'
import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import { Typography } from '@mui/material'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'

type TNavbarProps = {
  onToggleMenu: () => void
}

export default function Navbar({ onToggleMenu }: TNavbarProps) {
  return (
    <AppBar>
      <Toolbar>
        <Stack
          direction='row'
          spacing={1}
          sx={{
            alignItems: 'center',
            width: '100%',
          }}
        >
          <IconButton color='inherit' onClick={onToggleMenu}>
            <MenuRoundedIcon />
          </IconButton>
          <NLink href='/'>
            <Typography variant='h6'>Logging Platform</Typography>
          </NLink>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
