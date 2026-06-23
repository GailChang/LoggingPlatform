import Breadcrumbs, {
  type BreadcrumbsOwnerState,
} from '@mui/material/Breadcrumbs'
import Typography from '@mui/material/Typography'
import { useSharedStore } from '../../domain/shared/store'
import NextLink from '../NextLink'

const Breadcrumb: React.FC<Partial<BreadcrumbsOwnerState>> = (props) => {
  const location = useSharedStore((state) => state.location)

  return (
    <Breadcrumbs
      aria-label='breadcrumb'
      {...props}
      sx={{ ml: '.5rem', p: '.5rem', ...props.sx }}
    >
      <NextLink href='/' color='inherit'>
        Home
      </NextLink>
      {location !== 'home' && (
        <Typography sx={{ color: 'text.primary' }}>{location}</Typography>
      )}
    </Breadcrumbs>
  )
}

export default Breadcrumb
