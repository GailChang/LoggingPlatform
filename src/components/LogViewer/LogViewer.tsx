'use client'
import { useLogsStore } from '@/domain/logs/store'
import {
  Chip,
  CircularProgress,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material'
import { Dispatch, SetStateAction, useMemo, useState } from 'react'

type TLogViewerProps = {
  toggleOpen: Dispatch<SetStateAction<boolean>>
}

export default function LogViewer({ toggleOpen }: TLogViewerProps) {
  const logs = useLogsStore((state) => state.logs)
  const isLoading = useLogsStore((state) => state.isLoading)
  const [selectedIndex, setSelectedIndex] = useState(-1)

  const displayLogs = useMemo(() => {
    return logs.map((log) => ({
      ...log,
      createTime: new Date(log.createTime),
    }))
  }, [logs])

  const handleRowClick = (index: number) => {
    setSelectedIndex(index)
    console.log(`打開${index} Log`)
    toggleOpen(true)
  }

  return (
    <>
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
              <TableCell
                align='center'
                colSpan={5}
                sx={{ p: 2, height: '60vh' }}
              >
                <CircularProgress />
              </TableCell>
            </TableRow>
          ) : displayLogs.length == 0 ? (
            <TableRow>
              <TableCell
                align='center'
                colSpan={5}
                sx={{ p: 2, height: '60vh' }}
              >
                <Typography variant='h3'>No Data</Typography>
              </TableCell>
            </TableRow>
          ) : (
            displayLogs.map((log, index) => (
              <TableRow
                component='tr'
                key={index}
                hover
                onClick={() => handleRowClick(index)}
                sx={{
                  cursor: 'pointer',
                  backgroundColor:
                    index == selectedIndex ? 'action.selected' : 'transparent',
                }}
              >
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
                  <Chip variant='outlined' label={log.type} />
                </TableCell>
                <TableCell>{log.messages}</TableCell>
                <TableCell>{log.sourceSystem}</TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </>
  )
}
