'use client'

import { useActiveLogStore } from '@/domain/logs/activeStore'
import {
  isApplicationLogEntry,
  isHttpLogEntry,
  isSystemLogEntry,
} from '@/domain/shared/logEntryUtility'
import {
  Box,
  FormControl,
  FormLabel,
  Grid,
  Skeleton,
  Typography,
} from '@mui/material'
import { grey } from '@mui/material/colors'
import dayjs from 'dayjs'
import { GeneralLogEntry } from '../../domain/logs/schema'
import BorderTitleBox from '../BorderTitleBox'
import DetailFormSectionApp from '../DetailFormSectionApp'
import DetailFormSectionHttp from '../DetailFormSectionHttp'
import DetailFormSectionSystem from '../DetailFormSectionSystem'
import DetailText from '../DetailText'

const initialLog: GeneralLogEntry = {
  id: '',
  type: undefined,
  createTime: '----.--.--',
  sourceSystem: '-',
  computerName: '-',
  level: undefined,
  messages: '-',
}

export default function DetailForm() {
  const log = useActiveLogStore((state) => state.log)
  const isLoading = useActiveLogStore((state) => state.isLoading)
  // const [fieldsDefault, setFieldsDefault] = useState<LogEntry | null>(null)

  let content
  let displayLog
  if (isApplicationLogEntry(log)) {
    content = <DetailFormSectionApp />
    displayLog = log
  }
  if (isHttpLogEntry(log)) {
    content = <DetailFormSectionHttp />
    displayLog = log
  }
  if (isSystemLogEntry(log)) {
    content = <DetailFormSectionSystem />
    displayLog = log
  }
  if (displayLog == null) {
    displayLog = initialLog
  }

  return (
    <Box
      sx={{
        height: 'stretch',
        overflow: 'auto',
        padding: '0 2rem',
        '& .MuiTextField-root': { m: 1 },
      }}
    >
      <Typography
        variant='h5'
        sx={{
          marginBottom: '1.5rem',
          fontWeight: 'bold',
        }}
      >
        Log 詳細資料
      </Typography>
      <Typography
        gutterBottom
        sx={{ fontSize: '1.2rem', fontWeight: 'normal', color: grey[800] }}
      >
        發生時間：
        {isLoading ? (
          <Skeleton
            variant='text'
            sx={{ display: 'inline-block', fontSize: '1em', width: 250 }}
          />
        ) : (
          dayjs(displayLog.createTime).format('YYYY-MM-DD HH:mm:ss')
        )}
      </Typography>
      <BorderTitleBox title='主要資訊'>
        <Grid container spacing={2}>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <FormControl fullWidth>
              <FormLabel>分級</FormLabel>
              {isLoading ? (
                <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
              ) : (
                <DetailText input={displayLog.level} />
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <FormControl fullWidth>
              <FormLabel>所屬服務</FormLabel>
              {isLoading ? (
                <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
              ) : (
                <DetailText input={displayLog.sourceSystem} />
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <FormControl fullWidth>
              <FormLabel>主機</FormLabel>
              {isLoading ? (
                <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
              ) : (
                <DetailText input={displayLog.computerName} />
              )}
            </FormControl>
          </Grid>
          <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <FormControl fullWidth>
              <FormLabel>Log 類型</FormLabel>
              {isLoading ? (
                <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
              ) : (
                <DetailText input={displayLog.type} />
              )}
            </FormControl>
          </Grid>
        </Grid>
      </BorderTitleBox>
      <BorderTitleBox title='狀態資訊'>
        {isLoading ? (
          <Skeleton variant='rectangular' height={250} />
        ) : displayLog === initialLog ? (
          <div>無資料</div>
        ) : (
          content
        )}
      </BorderTitleBox>
    </Box>
  )
}
