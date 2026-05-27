import MenuRoundedIcon from '@mui/icons-material/MenuRounded'
import AppBar from '@mui/material/AppBar'
import IconButton from '@mui/material/IconButton'
import Toolbar from '@mui/material/Toolbar'
import Stack from '@mui/material/Stack'
import { Typography } from '@mui/material'

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
          <Typography variant='h6' sx={{ cursor: 'default' }}>
            Logging Platform
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}
