import { ETimeFilterBy, FilterGroup } from '@/domain/filter/schema'
import { updateFilterGroup } from '@/domain/filter/store'
import { ELevel, ELogType } from '@/domain/logs/schema'
import HourglassBottomRoundedIcon from '@mui/icons-material/HourglassBottomRounded'
import RestartAltRoundedIcon from '@mui/icons-material/RestartAltRounded'
import SaveRoundedIcon from '@mui/icons-material/SaveRounded'
import SearchRoundedIcon from '@mui/icons-material/SearchRounded'
import {
  AccordionProps,
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Grid,
  InputLabel,
  MenuItem,
  Radio,
  RadioGroup,
  Select,
  Stack,
  TextField,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker'
import dayjs from 'dayjs'
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

const LOG_FILTER_KEY = 'log_filters'
//#endregion 常數

export default function LogSearchSection({
  defaultExpanded,
  ...props
}: Omit<AccordionProps, 'children'>) {
  const formRef = useRef<HTMLFormElement>(null)
  const [resetKey, setResetKey] = useState(0)

  const [fieldsDefault, setFieldsDefault] = useState<Partial<FilterGroup>>()

  //#region 按鈕事件
  /**
   * 表單提交事件
   *
   * @param e Submit event
   * @returns
   */
  const handleSubmit = (e: React.SubmitEvent) => {
    e.preventDefault()
    if (!formRef.current) return

    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries())
    updateFilterGroup(data as Partial<FilterGroup>)
    // console.log('submit data: ', data)
  }

  /** 表單清空欄位事件 */
  const handleReset = () => {
    setFieldsDefault({})
    setResetKey((prev) => prev + 1)
  }

  /** 儲存搜尋條件 */
  const handleSaveFilters = () => {
    if (!formRef.current) return
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries())

    // console.log('data', data)
    localStorage.setItem(LOG_FILTER_KEY, JSON.stringify(data))
  }

  /** 讀取上次搜尋條件 */
  const handleLoadFilters = () => {
    const saved = localStorage.getItem(LOG_FILTER_KEY)
    if (!saved || !formRef.current) return

    const filters = JSON.parse(saved) as FilterGroup
    // console.log('filters', filters)

    if (!filters) return

    setFieldsDefault(filters)
    setResetKey((prev) => prev + 1)

    // 觸發搜尋
    const formData = new FormData(formRef.current)
    const data = Object.fromEntries(formData.entries())
    updateFilterGroup(data as Partial<FilterGroup>)
  }
  //#endregion 按鈕事件

  return (
    <SearchSection defaultExpanded={defaultExpanded} {...props}>
      <Box
        component='form'
        ref={formRef}
        key={resetKey}
        onSubmit={handleSubmit}
      >
        <Grid container spacing={2}>
          <Grid size={3}>
            <FormControl fullWidth>
              <InputLabel id='select-source-system-label'>所屬服務</InputLabel>
              <Select
                id='select-source-system'
                name='sourceSystem'
                label='所屬服務'
                labelId='select-source-system-label'
                defaultValue={fieldsDefault?.sourceSystem ?? ''}
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
            <FormControl fullWidth>
              <InputLabel id='select-level-label'>分級</InputLabel>
              <Select
                id='select-level'
                name='level'
                label='分級'
                labelId='select-level-label'
                defaultValue={fieldsDefault?.level ?? ''}
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
            <FormControl fullWidth>
              <InputLabel id='select-log-type-label'>Log 類型</InputLabel>
              <Select
                id='select-log-type'
                name='type'
                label='Log 類型'
                labelId='select-log-type-label'
                defaultValue={fieldsDefault?.type ?? ''}
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
            <FormControl fullWidth>
              {/* TODO:  HTTP 狀態碼是在 log type 為 http 時才有 */}
              <InputLabel id='select-status-label'>http 狀態碼</InputLabel>
              <Select
                id='select-status'
                name='status'
                label='http 狀態碼'
                labelId='select-status-label'
                defaultValue={fieldsDefault?.status ?? ''}
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
          <Grid size={12}>
            <FormControl fullWidth>
              <FormLabel>查詢期間</FormLabel>
              <RadioGroup
                name='timeFilterBy'
                defaultValue={fieldsDefault?.timeFilterBy}
              >
                <Stack
                  direction='row'
                  spacing={2}
                  sx={{ alignItems: 'center' }}
                >
                  <Radio value={ETimeFilterBy.Relative} />
                  <Select
                    name='stringTime'
                    defaultValue={fieldsDefault?.stringTime ?? ''}
                    displayEmpty
                    sx={{ flex: 1 }}
                  >
                    <MenuItem value=''>請選擇查詢期間</MenuItem>
                    {TIME_OPTION.map((option) => (
                      <MenuItem key={option.label} value={option.value}>
                        {option.label}
                      </MenuItem>
                    ))}
                  </Select>
                  <Divider flexItem orientation='vertical' />
                  <Radio value={ETimeFilterBy.Absolute} />
                  <LocalizationProvider
                    adapterLocale='zh-tw'
                    dateAdapter={AdapterDayjs}
                  >
                    <DateTimePicker
                      name='startTime'
                      label='起始時間'
                      defaultValue={
                        fieldsDefault?.startTime
                          ? dayjs(fieldsDefault.startTime)
                          : undefined
                      }
                      slotProps={{ textField: { sx: { flex: 1 } } }}
                    />
                    <DateTimePicker
                      name='endTime'
                      label='結束時間'
                      defaultValue={
                        fieldsDefault?.endTime
                          ? dayjs(fieldsDefault.endTime)
                          : undefined
                      }
                      slotProps={{ textField: { sx: { flex: 1 } } }}
                    />
                  </LocalizationProvider>
                </Stack>
              </RadioGroup>
            </FormControl>
          </Grid>
          <Grid size={12}>
            <FormControl fullWidth>
              <FormLabel>文字搜尋</FormLabel>
              <TextField
                id='input-keyword'
                name='keyword'
                placeholder='請輸入想搜尋的文字'
                defaultValue={fieldsDefault?.keyword}
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
