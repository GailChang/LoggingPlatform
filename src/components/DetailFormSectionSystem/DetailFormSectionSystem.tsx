import { useActiveLogStore } from '@/domain/logs/activeStore'
import { ELogType, SystemLogEntry } from '@/domain/logs/schema'
import { isSystemLogEntry } from '@/domain/shared/logEntryUtility'
import { FormControl, FormLabel, Grid } from '@mui/material'
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

  const displayLog = isSystemLogEntry(log) ? log : initialSystemLog

  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormControl fullWidth>
          <FormLabel>錯誤代碼</FormLabel>
          <DetailText input={displayLog.errorCode} />
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormControl fullWidth>
          <FormLabel>程式碼錯誤處</FormLabel>
          <DetailText input={displayLog.lineInformation} />
        </FormControl>
      </Grid>
      <Grid size={12}>
        <FormControl fullWidth>
          <FormLabel>log 訊息</FormLabel>
          <DetailText
            input={displayLog.messages}
            sx={{ whiteSpace: 'pre-wrap' }}
          />
        </FormControl>
      </Grid>
    </Grid>
  )
}
