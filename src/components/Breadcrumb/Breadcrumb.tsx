import Typography from '@mui/material/Typography';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import NextLink from '../NextLink';
import { useSharedStore } from '../../domain/shared/store';

export default function Breadcrumb (){
  const location = useSharedStore(state => state.location)

  return (
    <Breadcrumbs aria-label="breadcrumb" sx={{ ml:'.5rem', p:'.5rem' }}>
      <NextLink color="inherit" href="/">
        Home
      </NextLink>
      {location !== 'home' && (
        <Typography
          sx={{ color: 'text.primary' }}
        >
          {location}
        </Typography>
      )}
    </Breadcrumbs>
  )
}

