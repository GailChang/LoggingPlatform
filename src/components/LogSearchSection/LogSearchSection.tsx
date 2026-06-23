import { ELevel, ELogType } from '@/domain/logs/schema'
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded'
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded'
import SaveRoundedIcon from '@mui/icons-material/SaveRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  AccordionProps,
  Box,
  Button,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import 'dayjs/locale/zh-tw'
import { useRef } from 'react'
import SearchSection from '../SearchSection'

//#region 常數
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

const TIME_OPTION = [
  {
    value: 'fiveMinutes',
    label: '5分鐘以內',
  },
  {
    value: 'tenMinutes',
    label: '10分鐘以內',
  },
  {
    value: 'tenMinutes',
    label: '1小時以內',
  },
  {
    value: 'tenMinutes',
    label: '24小時以內',
  },
  {
    value: 'tenMinutes',
    label: '3天內',
  },
] as const

const TYPE_OPTION = Object.entries(ELogType).map(([key, value]) => ({
  value,
  label: key,
}))

const STATUS_OPTION = [
  {
    value: '200',
    label: '200',
  },
  {
    value: '302',
    label: '302',
  },
  {
    value: '303',
    label: '303',
  },
  {
    value: '400',
    label: '400',
  },
  {
    value: '401',
    label: '401',
  },
  {
    value: '500',
    label: '500',
  },
] as const

//#endregion

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
                id='select-source-system'
                name='sourceSystem'
                label='所屬服務'
                labelId='select-source-system-label'
                defaultValue=''
              >
                {SOURCE_SYSTEM_OPTION.map((option) => (
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
                id='select-level'
                name='level'
                label='分級'
                labelId='select-level-label'
                defaultValue=''
              >
                {LEVEL_OPTION.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={3}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id='select-log-type-label'>Log 類型</InputLabel>
              <Select
                id='select-log-type'
                name='type'
                label='Log 類型'
                labelId='select-log-type-label'
                defaultValue=''
              >
                {TYPE_OPTION.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={3}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <InputLabel id='select-status-label'>http 狀態碼</InputLabel>
              <Select
                id='select-status'
                name='status'
                label='http 狀態碼'
                labelId='select-status-label'
                defaultValue=''
              >
                {STATUS_OPTION.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid size={9}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <FormLabel>查詢期間</FormLabel>
              <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
                <Select name='stringTime' defaultValue='' sx={{ flex: 1 }}>
                  {TIME_OPTION.map((option) => (
                    <MenuItem key={option.label} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </Select>
                <LocalizationProvider
                  adapterLocale='zh-tw'
                  dateAdapter={AdapterDayjs}
                >
                  <DateTimePicker
                    name='startTime'
                    label='起始時間'
                    slotProps={{ textField: { sx: { flex: 1 } } }}
                  />
                  <DateTimePicker
                    name='endTime'
                    label='結束時間'
                    slotProps={{ textField: { sx: { flex: 1 } } }}
                  />
                </LocalizationProvider>
              </Stack>
            </FormControl>
          </Grid>
          <Grid size={3}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <FormLabel>文字搜尋</FormLabel>
              <TextField
                id='input-keyword'
                name='keyword'
                defaultValue=''
                placeholder='請輸入想搜尋的文字'
              />
            </FormControl>
          </Grid>
          <Grid size={12}>
            <Stack
              direction='row-reverse'
              spacing={2}
              sx={{ alignItems: 'center' }}
            >
              <Button
                variant='contained'
                type='submit'
                startIcon={<SearchRoundedIcon />}
              >
                查詢
              </Button>
              <Button
                variant='outlined'
                color='secondary'
                startIcon={<RestartAltRoundedIcon />}
              >
                重設
              </Button>
              <Button
                variant='outlined'
                startIcon={<HourglassBottomRoundedIcon />}
              >
                讀取上次條件
              </Button>
              <Button variant='outlined' startIcon={<SaveRoundedIcon />}>
                儲存條件
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </SearchSection>
  )
}
