import { useActiveLogStore } from '@/domain/logs/activeStore'
import { ELogType, SystemLogEntry } from '@/domain/logs/schema'
import { isSystemLogEntry } from '@/domain/shared/logEntryUtility'
import { FormControl, FormLabel, Grid, Skeleton } from '@mui/material'
import DetailText from '../DetailText'

const initialSystemLog: SystemLogEntry = {
  id: '',
  type: ELogType.System,
  createTime: '----.--.--',
  sourceSystem: '-',
  computerName: '-',
  level: undefined,
  messages: '-',
  errorCode: '-',
  lineInformation: '-',
}

export default function DetailFormSectionSystem() {
  const log = useActiveLogStore((state) => state.log)
  const isLoading = useActiveLogStore((state) => state.isLoading)

  // TODO: 檢查是否會造成每次都顯示 initialLog
  const displayLog = isSystemLogEntry(log) ? log : initialSystemLog

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <FormControl fullWidth>
          <FormLabel>錯誤代碼</FormLabel>
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          ) : (
            <DetailText input={displayLog.errorCode} />
          )}
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
        <FormControl fullWidth>
          <FormLabel>程式碼錯誤處</FormLabel>
          {isLoading ? (
            <Skeleton variant='text' sx={{ fontSize: '2rem' }} />
          ) : (
            <DetailText input={displayLog.lineInformation} />
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
