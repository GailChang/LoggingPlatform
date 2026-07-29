import { useActiveLogStore } from '@/domain/logs/activeStore'
import { ApplicationLogEntry, ELogType } from '@/domain/logs/schema'
import { isApplicationLogEntry } from '@/domain/shared/logEntryUtility'
import {
  FormControl,
  FormLabel,
  Grid,
  Skeleton,
  TextField,
} from '@mui/material'

const initialAppLog: ApplicationLogEntry = {
  id: '',
  type: ELogType.Application,
  createTime: '----.--.--',
  sourceSystem: '-',
  computerName: '-',
  level: undefined,
  messages: '-',
  errorCode: '-',
  lineInformation: '-',
  applicationName: '-',
  threadId: '-',
}

export default function DetailFormSectionApp() {
  const log = useActiveLogStore((state) => state.log)
  const isLoading = useActiveLogStore((state) => state.isLoading)

  // TODO: 檢查是否會造成每次都顯示 initialLog
  const displayLog = isApplicationLogEntry(log) ? log : initialAppLog

  return (
    <Grid container spacing={2}>
      <Grid size={{ sm: 6, md: 4, lg: 3 }}>
        <FormControl fullWidth>
          <FormLabel>應用程式</FormLabel>
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          ) : (
            <TextField
              variant='standard'
              name='applicationName'
              defaultValue={displayLog.applicationName}
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
          <FormLabel>執行緒Id</FormLabel>
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          ) : (
            <TextField
              variant='standard'
              name='threadId'
              defaultValue={displayLog.threadId}
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
          <FormLabel>錯誤代碼</FormLabel>
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          ) : (
            <TextField
              variant='standard'
              name='errorCode'
              defaultValue={displayLog.errorCode}
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
          <FormLabel>程式碼錯誤處</FormLabel>
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          ) : (
            <TextField
              variant='standard'
              name='lineInformation'
              defaultValue={displayLog.lineInformation}
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
          <FormLabel>log 訊息</FormLabel>
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          ) : (
            <TextField
              variant='standard'
              name='messages'
              defaultValue={displayLog.messages}
              multiline
              rows={4}
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
  )
}
