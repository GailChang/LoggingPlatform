'use client'

import { useId } from "react";
import { 
  Accordion, 
  AccordionSummary, 
  AccordionDetails, 
  AccordionProps,
  Typography
} from "@mui/material";
import { ExpandMoreRounded } from "@mui/icons-material";

export default function SearchSection({ children, defaultExpanded, ...props }: AccordionProps) {
  const id = useId();
  return (
    <Accordion defaultExpanded = {(defaultExpanded || defaultExpanded == undefined) ? true : false}
      {...props}
      sx = {{
        border: '1px solid #8f8f8f',
        borderBottomLeftRadius: '15px',
        borderBottomRightRadius: '15px',
        borderTopLeftRadius: '15px',
        borderTopRightRadius: '15px',
      }}
    > 
      <AccordionSummary
        expandIcon={<ExpandMoreRounded />}
        aria-controls={`${id}-panel1-content`}
        id={`${id}-panel1-header`}
        sx = {{
          flexDirection: 'row-reverse'
        }}
      >
        <Typography sx={{ paddingLeft:'.3rem' }}>搜尋條件</Typography>
      </AccordionSummary>
      <AccordionDetails>
        { children }
      </AccordionDetails>
    </Accordion>
  );
}
