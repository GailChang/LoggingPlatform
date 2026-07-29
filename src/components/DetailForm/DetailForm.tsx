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
  TextField,
} from '@mui/material'
import { GeneralLogEntry } from '../../domain/logs/schema'
import BorderTitleBox from '../BorderTitleBox'
import DetailFormSectionApp from '../DetailFormSectionApp'
import DetailFormSectionHttp from '../DetailFormSectionHttp'
import DetailFormSectionSystem from '../DetailFormSectionSystem'

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
      component='form'
      autoComplete='off'
      noValidate
      sx={{
        height: 'stretch',
        overflow: 'auto',
        padding: '0 2rem',
        '& .MuiTextField-root': { m: 1 },
      }}
    >
      <h2
        style={{
          marginBottom: '2rem',
        }}
      >
        Log 詳細資料
      </h2>
      <h3>發生時間：</h3>
      <BorderTitleBox title='主要資訊'>
        <Grid container spacing={2}>
          <Grid size={{ sm: 6, md: 4, lg: 3 }}>
            <FormControl fullWidth>
              <FormLabel>分級</FormLabel>
              {isLoading ? (
                <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
              ) : (
                <TextField
                  variant='standard'
                  name='level'
                  defaultValue={
                    displayLog.level != undefined ? displayLog.level : '-'
                  }
                  slotProps={{
                    htmlInput: {
                      readOnly: true,
                      disabled: true,
                    },
                  }}
                />
              )}
            </FormControl>
          </Grid>
          <Grid size={{ sm: 6, md: 4, lg: 3 }}>
            <FormControl fullWidth>
              <FormLabel>所屬服務</FormLabel>
              {isLoading ? (
                <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
              ) : (
                <TextField
                  variant='standard'
                  name='sourceSystem'
                  defaultValue={
                    displayLog.sourceSystem.trim() !== ''
                      ? displayLog.sourceSystem
                      : '-'
                  }
                  slotProps={{
                    htmlInput: {
                      readOnly: true,
                      disabled: true,
                    },
                  }}
                />
              )}
            </FormControl>
          </Grid>
          <Grid size={{ sm: 6, md: 4, lg: 3 }}>
            <FormControl fullWidth>
              <FormLabel>主機</FormLabel>
              {isLoading ? (
                <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
              ) : (
                <TextField
                  variant='standard'
                  name='computerName'
                  defaultValue={
                    displayLog.computerName.trim() !== ''
                      ? displayLog.computerName
                      : '-'
                  }
                  slotProps={{
                    htmlInput: {
                      readOnly: true,
                      disabled: true,
                    },
                  }}
                />
              )}
            </FormControl>
          </Grid>
          <Grid size={{ sm: 6, md: 4, lg: 3 }}>
            <FormControl fullWidth>
              <FormLabel>Log 類型</FormLabel>
              {isLoading ? (
                <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
              ) : (
                <TextField
                  variant='standard'
                  name='type'
                  defaultValue={
                    displayLog.type !== undefined ? displayLog.type : '-'
                  }
                  slotProps={{
                    htmlInput: {
                      readOnly: true,
                      disabled: true,
                    },
                  }}
                />
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
