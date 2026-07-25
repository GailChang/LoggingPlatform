import { Breakpoint, Divider, useMediaQuery, useTheme } from '@mui/material'

interface FlexDividerProps {
  breakpoint: Breakpoint
}

export default function FlexDivider({ breakpoint }: FlexDividerProps) {
  const theme = useTheme()
  const isBreakpoint = useMediaQuery(theme.breakpoints.up(breakpoint))

  return isBreakpoint ? <Divider flexItem orientation='vertical' /> : <></>
}
