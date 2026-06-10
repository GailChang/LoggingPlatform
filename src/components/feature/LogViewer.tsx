'use client'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  CircularProgress,
  Box,
  Typography,
} from '@mui/material'
// import { useLogs } from '@/domain/logs/hooks'
import { useLogsStore } from '@/domain/logs/store'
import { sleepAndGetData } from '@/domain/shared/sleep'
import { useState, useEffect } from 'react'
import { HttpLogEntry, LogEntry } from '@/domain/logs/schema'

const intialLogs: HttpLogEntry[] = [
  {
    id: "10ablds1",
    type: 'http',
    createTime: "2026-05-01 16:12:04",
    sourceSystem: "服務A",
    computerName: "主機1-a",
    level: 'WARN',
    messages: "正常",
    status: 200,
    method: 'GET',
    path: '/health',
    requestUrl: 'https://example.com/health',
    response: 'OK'
  },
  {
    id: "dsflk320s",
    type: 'http',
    createTime: "2026-05-03 12:09:11",
    sourceSystem: "服務A",
    computerName: "主機1-a",
    level: 'ERROR',
    messages: "正常",
    status: 200,
    method: 'GET',
    path: '/health',
    requestUrl: 'https://example.com/health',
    response: 'OK'
  },
  {
    id: "iosdflk2",
    type: 'http',
    createTime: "2026-05-03 12:10:11",
    sourceSystem: "服務A",
    computerName: "主機1-a",
    level: 'WARN',
    messages: "正常",
    status: 200,
    method: 'GET',
    path: '/health',
    requestUrl: 'https://example.com/health',
    response: 'OK'
  },
  {
    id: "xcvokwe2",
    type: 'http',
    createTime: "2026-05-03 12:11:11",
    sourceSystem: "服務A",
    computerName: "主機1-a",
    level: 'WARN',
    messages: "正常",
    status: 200,
    method: 'GET',
    path: '/health',
    requestUrl: 'https://example.com/health',
    response: 'OK'
  },
  {
    id: "rglkwei23",
    type: 'http',
    createTime: "2026-05-03 12:12:11",
    sourceSystem: "服務A",
    computerName: "主機1-a",
    level: 'WARN',
    messages: "正常",
    status: 200,
    method: 'GET',
    path: '/health',
    requestUrl: 'https://example.com/health',
    response: 'OK'
  },
  {
    id: "vcxm342",
    type: 'http',
    createTime: "2026-05-04 08:00:00",
    sourceSystem: "服務A",
    computerName: "主機1-a",
    level: 'WARN',
    messages: "正常",
    status: 200,
    method: 'GET',
    path: '/health',
    requestUrl: 'https://example.com/health',
    response: 'OK'
  },
  {
    id: "dsflk311",
    type: 'http',
    createTime: "2026-05-04 09:00:00",
    sourceSystem: "服務A",
    computerName: "主機1-a",
    level: 'WARN',
    messages: "正常",
    status: 200,
    method: 'GET',
    path: '/health',
    requestUrl: 'https://example.com/health',
    response: 'OK'
  },
  {
    id: "dsflk345",
    type: 'http',
    createTime: "2026-05-04 10:34:56",
    sourceSystem: "服務A",
    computerName: "主機1-a",
    level: 'DEBUG',
    messages: "正常",
    status: 200,
    method: 'GET',
    path: '/health',
    requestUrl: 'https://example.com/health',
    response: 'OK'
  },
  {
    id: "dsflk673",
    type: 'http',
    createTime: "2026-05-07 17:25:01",
    sourceSystem: "服務A",
    computerName: "主機1-a",
    level: 'INFO',
    messages: "正常",
    status: 200,
    method: 'GET',
    path: '/health',
    requestUrl: 'https://example.com/health',
    response: 'OK'
  }
]

const getData = async () => {
  const logs = await sleepAndGetData<HttpLogEntry>(2000, [])
  console.log("return data: ", logs)
  return logs
}

export function LogViewer() {
  const [logs, setLogs] = useState<LogEntry[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getData().then((fetchedLogs) => {
      setLogs(fetchedLogs)
      console.log("fetchedLogs: ", fetchedLogs)
      setIsLoading(false)
    })
  }, [])

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
        {
        isLoading ? 
        <TableRow>
          <TableCell colSpan={5} align="center" sx={{ p: 2, height: "60vh" }}>
            <CircularProgress/>
          </TableCell>
        </TableRow>
        :
          displayLogs.length == 0 ?
          <TableRow>
            <TableCell colSpan={5} align='center' sx={{ p: 2, height: "60vh" }}>
              <Typography variant="h3">No Data</Typography>
            </TableCell>
          </TableRow>
          :
          displayLogs.map((log, index) => (
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
          ))
        }
      </TableBody>
    </Table>
  )
}