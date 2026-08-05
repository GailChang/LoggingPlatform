import {
  hasValueNumber,
  hasValueString,
} from '@/domain/shared/checkValueUtility'
import { Box, Typography, TypographyProps } from '@mui/material'
import { grey } from '@mui/material/colors'

type TDetailTextProps = {
  input: number | string | undefined | null
  emptyDefinition?: (
    input: number | string | undefined | null
  ) => boolean | undefined
  isEmptyShowDash?: boolean
  emptyShowString?: string
} & TypographyProps

export default function DetailText({
  input,
  emptyDefinition = undefined,
  isEmptyShowDash = true,
  emptyShowString = '',
  sx,
}: TDetailTextProps) {
  let displayText = input
  const fallbackString =
    isEmptyShowDash === false && hasValueString(emptyShowString)
      ? emptyShowString
      : '-'

  // 如果 text 沒有值
  if (
    hasValueString(displayText) === false &&
    hasValueNumber(displayText) === false
  ) {
    displayText = fallbackString
  }

  // 如果使用外部給的空值定義，需用該定義判斷
  if (emptyDefinition !== undefined) {
    displayText = emptyDefinition(displayText) ? fallbackString : displayText
  }

  return (
    <Box
      style={{
        display: 'flex',
        margin: '.5rem',
        padding: '4px 0 5px',
        borderBottom: `1px solid ${grey[500]}`,
      }}
    >
      <Typography sx={{ lineBreak: 'anywhere', ...(sx ?? {}) }}>
        {displayText}
      </Typography>
    </Box>
  )
}
