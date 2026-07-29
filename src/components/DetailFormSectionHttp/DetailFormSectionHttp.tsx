import { useActiveLogStore } from '@/domain/logs/activeStore'
import { ELogType, HttpLogEntry } from '@/domain/logs/schema'
import { isHttpLogEntry } from '@/domain/shared/logEntryUtility'
import {
  FormControl,
  FormLabel,
  Grid,
  Skeleton,
  TextField,
} from '@mui/material'

const initialHttpLog: HttpLogEntry = {
  id: '',
  type: ELogType.Http,
  createTime: '----.--.--',
  sourceSystem: '-',
  computerName: '-',
  level: undefined,
  messages: '-',
  status: -1,
  method: '-',
  path: '-',
  requestUrl: '-',
  response: '-',
}

export default function DetailFormSectionHttp() {
  const isLoading = useActiveLogStore((state) => state.isLoading)
  const log = useActiveLogStore((state) => state.log)

  // TODO: 檢查是否會造成每次都顯示 initialLog
  const displayLog = isHttpLogEntry(log) ? log : initialHttpLog

  return (
    <Grid container spacing={2}>
      <Grid size={{ sm: 6, md: 4, lg: 3 }}>
        <FormControl fullWidth>
          <FormLabel>http 狀態碼</FormLabel>
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          ) : (
            <TextField
              variant='standard'
              name='status'
              defaultValue={displayLog.status != -1 ? displayLog.status : '-'}
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
          <FormLabel>請求方法</FormLabel>
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          ) : (
            <TextField
              variant='standard'
              name='method'
              defaultValue={
                displayLog.method.trim() != '' ? displayLog.method : '-'
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
          <FormLabel>請求地址</FormLabel>
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          ) : (
            <TextField
              variant='standard'
              name='path'
              defaultValue={
                displayLog.path.trim() != '' ? displayLog.path : '-'
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
          <FormLabel>請求地址字串</FormLabel>
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          ) : (
            <TextField
              variant='standard'
              name='requestUrl'
              defaultValue={
                displayLog.requestUrl.trim() != '' ? displayLog.requestUrl : '-'
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
          <FormLabel>回應內容</FormLabel>
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          ) : (
            <TextField
              variant='standard'
              name='response'
              defaultValue={
                displayLog.response.trim() != '' ? displayLog.response : '-'
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
          <FormLabel>log 訊息</FormLabel>
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          ) : (
            <TextField
              variant='standard'
              name='messages'
              defaultValue={
                displayLog.messages.trim() != '' ? displayLog.messages : '-'
              }
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
