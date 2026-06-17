import {
  AccordionProps,
  Box,
  Grid,
  TextField,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Button,
} from '@mui/material'
import SearchSection from '../SearchSection'
import { ELogType, ELevel } from '@/domain/logs/schema'
import { useRef } from 'react'

const SOURCE_SYSTEM_OPTION = [
  {
    value: '服務A',
    label: '服務A',
  },
  {
    value: '服務B',
    label: '服務B',
  },
  {
    value: '服務C',
    label: '服務C',
  },
] as const

const LEVEL_OPTION = Object.entries(ELevel).map(([key, value]) => ({
  value,
  label: key,
}))

const TYPE_OPTION = Object.entries(ELogType).map(([key, value]) => ({
  value,
  label: key,
}))

export default function LogSearchSection({
  defaultExpanded,
  ...props
}: Omit<AccordionProps, 'children'>) {
  const formRef = useRef<HTMLFormElement>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return
    if (!formRef.current) return
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries())
    console.log('submit data: ', data)
  }

  return (
    <SearchSection defaultExpanded={defaultExpanded} {...props}>
      <Box component='form' ref={formRef} onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid size={3}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id='select-source-system-label'>所屬服務</InputLabel>
              <Select
                labelId='select-source-system-label'
                id='select-source-system'
                defaultValue=''
                label='所屬服務'
                name='sourceSystem'
              >
                {SOURCE_SYSTEM_OPTION.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={3}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id='select-level-label'>分級</InputLabel>
              <Select
                labelId='select-level-label'
                id='select-level'
                defaultValue=''
                label='分級'
                name='level'
              >
                {LEVEL_OPTION.map(option => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={6}>
            <TextField
              fullWidth
              sx={{ m: 1 }}
              id='input-keyword'
              defaultValue=''
              label='文字搜尋'
              name='keyword'
            />
          </Grid>
          <Grid size={1}>
            <Button type='submit'>Submit</Button>
          </Grid>
        </Grid>
      </Box>
    </SearchSection>
  )
}
