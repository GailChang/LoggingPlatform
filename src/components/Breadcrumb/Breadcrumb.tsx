import Typography from '@mui/material/Typography'
import Breadcrumbs, {
  type BreadcrumbsOwnerState,
} from '@mui/material/Breadcrumbs'
import NextLink from '../NextLink'
import { useSharedStore } from '../../domain/shared/store'

const Breadcrumb: React.FC<Partial<BreadcrumbsOwnerState>> = props => {
  const location = useSharedStore(state => state.location)

  return (
    <Breadcrumbs
      aria-label='breadcrumb'
      {...props}
      sx={{ ml: '.5rem', p: '.5rem', ...props.sx }}
    >
      <NextLink color='inherit' href='/'>
        Home
      </NextLink>
      {location !== 'home' && (
        <Typography sx={{ color: 'text.primary' }}>{location}</Typography>
      )}
    </Breadcrumbs>
  )
}

export default Breadcrumb
