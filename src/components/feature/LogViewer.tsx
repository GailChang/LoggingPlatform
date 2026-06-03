'use client'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  CircularProgress
} from '@mui/material'
// import { useLogs } from '@/domain/logs/hooks'
import { useLogsStore } from '@/domain/logs/store'

export function LogViewer() {
  const { logs } = useLogsStore()
  console.log("logs: ", logs);
  // const { data: remoteLogs, isLoading, error } = useLogs()
   
  // if (isLoading) return <CircularProgress />
  // if (error) return <Box>載入失敗</Box>

  // 優先顯示 store 中的日誌，沒有的話顯示遠端日誌
  const displayLogs = logs.length > 0 ? logs : []
  console.log("display logs: ", displayLogs)

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>時間</TableCell>
          <TableCell>等級</TableCell>
          <TableCell>類型</TableCell>
          <TableCell>訊息</TableCell>
          <TableCell>來源</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {displayLogs.map((log, index) => (
          <TableRow key={index}>
            <TableCell>{log.createTime.toLocaleString()}</TableCell>
            <TableCell>
              <Chip
                label={log.level}
                color={log.level === 'ERROR' ? 'error' :
                       log.level === 'WARN' ? 'warning' : 'default'}
              />
            </TableCell>
            <TableCell>
              <Chip label={log.type} variant="outlined" />
            </TableCell>
            <TableCell>{log.messages}</TableCell>
            <TableCell>{log.sourceSystem}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}