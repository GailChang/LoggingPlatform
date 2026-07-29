'use client'

import { ExpandMoreRounded } from '@mui/icons-material'
import {
  Accordion,
  AccordionDetails,
  AccordionProps,
  AccordionSummary,
  Typography,
} from '@mui/material'

export default function SearchSection({
  children,
  defaultExpanded,
  ...props
}: AccordionProps) {
  return (
    <Accordion
      defaultExpanded={
        defaultExpanded || defaultExpanded == undefined ? true : false
      }
      {...props}
      sx={{
        border: '1px solid #8f8f8f',
        '&:first-of-type': {
          borderTopLeftRadius: 15,
          borderTopRightRadius: 15,
          borderBottomLeftRadius: 15,
          borderBottomRightRadius: 15,
        },
      }}
    >
      <AccordionSummary
        id='panel1-header'
        aria-controls='panel1-content'
        expandIcon={<ExpandMoreRounded />}
        sx={{
          flexDirection: 'row-reverse',
        }}
      >
        <Typography sx={{ paddingLeft: '.3rem' }}>搜尋條件</Typography>
      </AccordionSummary>
      <AccordionDetails>{children}</AccordionDetails>
    </Accordion>
  )
}
