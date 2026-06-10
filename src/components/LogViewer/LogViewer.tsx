'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Typography,
} from '@mui/material'
// import { useLogs } from '@/domain/logs/hooks'
import { useLogsStore } from '@/domain/logs/store'
import { useMemo } from 'react'

export default function LogViewer() {
  const logs = useLogsStore(state => state.logs)
  const isLoading = useLogsStore(state => state.isLoading)

  const displayLogs = useMemo(() => {
    return logs.map(log => ({
      ...log,
      createTime: new Date(log.createTime),
    }))
  }, [logs])

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
        {isLoading ? (
          <TableRow>
            <TableCell colSpan={5} align='center' sx={{ p: 2, height: '60vh' }}>
              <CircularProgress />
            </TableCell>
          </TableRow>
        ) : displayLogs.length == 0 ? (
          <TableRow>
            <TableCell colSpan={5} align='center' sx={{ p: 2, height: '60vh' }}>
              <Typography variant='h3'>No Data</Typography>
            </TableCell>
          </TableRow>
        ) : (
          displayLogs.map((log, index) => (
            <TableRow key={index}>
              <TableCell>{log.createTime.toLocaleString()}</TableCell>
              <TableCell>
                <Chip
                  label={log.level}
                  color={
                    log.level === 'ERROR'
                      ? 'error'
                      : log.level === 'WARN'
                        ? 'warning'
                        : 'default'
                  }
                />
              </TableCell>
              <TableCell>
                <Chip label={log.type} variant='outlined' />
              </TableCell>
              <TableCell>{log.messages}</TableCell>
              <TableCell>{log.sourceSystem}</TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}
