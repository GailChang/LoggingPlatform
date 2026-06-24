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
  SelectChangeEvent,
  Stack,
  TextField,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs, { Dayjs, ManipulateType } from 'dayjs'
import 'dayjs/locale/zh-tw'
import { useRef, useState } from 'react'
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
    value: 'oneHour',
    label: '1小時以內',
  },
  {
    value: 'twentyfourHours',
    label: '24小時以內',
  },
  {
    value: 'threeDays',
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

//#endregion 常數

export default function LogSearchSection({
  defaultExpanded,
  ...props
}: Omit<AccordionProps, 'children'>) {
  const formRef = useRef<HTMLFormElement>(null)

  // 管理時間欄位的狀態
  const [stringTime, setStringTime] = useState<string>('')
  const [startTime, setStartTime] = useState<Dayjs | null>(null)
  const [endTime, setEndTime] = useState<Dayjs | null>(null)

  //#region 時間欄位連動事件
  /**
   * 當「查詢期間」改變時，計算並套用起始與結束時間
   *
   * @param e 變動事件
   * @returns
   */
  const handleStringTimeChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value
    setStringTime(value)

    if (!value) {
      clearAllDateTime()
      return
    }

    const selectedOption = TIME_OPTION.find((opt) => opt.value === value)
    if (selectedOption) {
      const now = dayjs()

      let diffNumber = 0
      let diffUnit: ManipulateType = 'minute'
      if (selectedOption.value === 'fiveMinutes') {
        diffNumber = 5
      } else if (selectedOption.value == 'tenMinutes') {
        diffNumber = 10
      }

      if (selectedOption.value == 'oneHour') {
        diffNumber = 1
        diffUnit = 'hour'
      } else if (selectedOption.value == 'twentyfourHours') {
        diffNumber = 24
        diffUnit = 'hour'
      }

      if (selectedOption.value == 'threeDays') {
        diffNumber = 3
        diffUnit = 'day'
      }

      // 如果未選取有效的值
      if (diffNumber == 0 && diffUnit == 'minute') {
        clearAllDateTime()
        return
      }

      const start = now.subtract(diffNumber, diffUnit)

      setEndTime(now)
      setStartTime(start)
    }
  }

  /** 清空查詢的起始時間、結束時間 */
  const clearAllDateTime = () => {
    setEndTime(null)
    setStartTime(null)
  }

  /**
   * 當「起始時間」或「結束時間」被手動改變時，清空「查詢期間」
   *
   * @param type 起始/結束
   * @returns
   */
  const handleDateTimeChange =
    (type: 'start' | 'end') => (value: Dayjs | null) => {
      if (type === 'start') {
        setStartTime(value)
      } else {
        setEndTime(value)
      }
      // 使用者手動調整後，將查詢期間下拉選項清空
      setStringTime('')
    }

  //#endregion 時間欄位連動事件

  //#region 按鈕事件
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries())
    console.log('submit data: ', data)
  }

  //TODO: 待實作
  const handleReset = () => {}

  //TODO: 待實作
  const handleSaveFilters = () => {}

  //TODO: 待實作
  const handleLoadFilters = () => {}
  //#endregion 按鈕事件

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
          {/* 查詢期間區塊 */}
          <Grid size={9}>
            <FormControl fullWidth sx={{ m: 1 }}>
              <FormLabel>查詢期間</FormLabel>
              <Stack direction='row' spacing={2} sx={{ alignItems: 'center' }}>
                <Select
                  name='stringTime'
                  value={stringTime}
                  defaultValue=''
                  displayEmpty
                  onChange={handleStringTimeChange}
                  sx={{ flex: 1 }}
                >
                  <MenuItem value=''>請選擇查詢期間</MenuItem>
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
                    value={startTime}
                    onChange={handleDateTimeChange('start')}
                    slotProps={{ textField: { sx: { flex: 1 } } }}
                  />
                  <DateTimePicker
                    name='endTime'
                    label='結束時間'
                    value={endTime}
                    onChange={handleDateTimeChange('end')}
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
                placeholder='請輸入想搜尋的文字'
                defaultValue=''
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
                onClick={handleReset}
                startIcon={<RestartAltRoundedIcon />}
              >
                重設
              </Button>
              <Button
                variant='outlined'
                color='cOrange'
                onClick={handleLoadFilters}
                startIcon={<HourglassBottomRoundedIcon />}
              >
                讀取上次條件
              </Button>
              <Button
                variant='outlined'
                onClick={handleSaveFilters}
                startIcon={<SaveRoundedIcon />}
              >
                儲存條件
              </Button>
            </Stack>
          </Grid>
        </Grid>
      </Box>
    </SearchSection>
  )
}
