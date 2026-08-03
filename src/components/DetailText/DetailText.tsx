import { Box, Typography } from '@mui/material'
import { grey } from '@mui/material/colors'

type TDetailTextProps = {
  input: number | string | undefined | null
  emptyDefinition?: (
    input: number | string | undefined | null
  ) => boolean | undefined
  isEmptyShowDash?: boolean
  emptyShowString?: string
}

const hasValue = (value: number | string | undefined | null) => {
  return value !== undefined && value !== null
}
const hasValueString = (value: number | string | undefined | null) => {
  return hasValue(value) && typeof value === 'string' && value.trim() !== ''
}
const hasValueNumber = (value: number | string | undefined | null) => {
  return hasValue(value) && typeof value === 'number'
}

export default function DetailText({
  input,
  emptyDefinition = undefined,
  isEmptyShowDash = true,
  emptyShowString = '',
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
      <Typography sx={{ lineBreak: 'anywhere' }}>{displayText}</Typography>
    </Box>
  )
}
