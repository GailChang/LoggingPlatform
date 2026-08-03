import { useActiveLogStore } from '@/domain/logs/activeStore'
import { ELogType, HttpLogEntry } from '@/domain/logs/schema'
import { isHttpLogEntry } from '@/domain/shared/logEntryUtility'
import { FormControl, FormLabel, Grid, Skeleton } from '@mui/material'
import DetailText from '../DetailText'

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
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <FormControl fullWidth>
          <FormLabel>http 狀態碼</FormLabel>
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          ) : (
            <DetailText
              emptyDefinition={(input: number | string | undefined | null) =>
                input === -1
              }
              input={displayLog.status}
            />
          )}
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <FormControl fullWidth>
          <FormLabel>請求方法</FormLabel>
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          ) : (
            <DetailText input={displayLog.method} />
          )}
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <FormControl fullWidth>
          <FormLabel>請求地址</FormLabel>
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          ) : (
            <DetailText input={displayLog.path} />
          )}
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <FormControl fullWidth>
          <FormLabel>請求地址字串</FormLabel>
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          ) : (
            <DetailText input={displayLog.requestUrl} />
          )}
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <FormControl fullWidth>
          <FormLabel>回應內容</FormLabel>
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          ) : (
            <DetailText input={displayLog.response} />
          )}
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <FormControl fullWidth>
          <FormLabel>log 訊息</FormLabel>
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          ) : (
            <DetailText input={displayLog.messages} />
          )}
        </FormControl>
      </Grid>
    </Grid>
  )
}
