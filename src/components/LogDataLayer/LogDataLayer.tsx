'use client'

import type { HttpLogEntry, LogEntry } from '@/domain/logs/schema'
// import { useLogs } from '@/domain/logs/hooks'
import { setLogs, updateLoadingState } from '@/domain/logs/store'
import { sleep } from '@/domain/shared/sleep'
import { useEffect, useState } from 'react'

const MOCK_LOGS: HttpLogEntry[] = [
  {
    id: '10ablds1',
    type: 'http',
    createTime: '2026-05-01 16:12:04',
    sourceSystem: '服務A',
    computerName: '主機1-a',
    level: 'WARN',
    messages: '正常',
    status: 200,
    method: 'GET',
    path: '/health',
    requestUrl: 'https://example.com/health',
    response: 'OK',
  },
  {
    id: 'dsflk320s',
    type: 'http',
    createTime: '2026-05-03 12:09:11',
    sourceSystem: '服務A',
    computerName: '主機1-a',
    level: 'ERROR',
    messages: '正常',
    status: 200,
    method: 'GET',
    path: '/health',
    requestUrl: 'https://example.com/health',
    response: 'OK',
  },
  {
    id: 'iosdflk2',
    type: 'http',
    createTime: '2026-05-03 12:10:11',
    sourceSystem: '服務A',
    computerName: '主機1-a',
    level: 'WARN',
    messages: '正常',
    status: 200,
    method: 'GET',
    path: '/health',
    requestUrl: 'https://example.com/health',
    response: 'OK',
  },
  {
    id: 'xcvokwe2',
    type: 'http',
    createTime: '2026-05-03 12:11:11',
    sourceSystem: '服務A',
    computerName: '主機1-a',
    level: 'WARN',
    messages: '正常',
    status: 200,
    method: 'GET',
    path: '/health',
    requestUrl: 'https://example.com/health',
    response: 'OK',
  },
  {
    id: 'rglkwei23',
    type: 'http',
    createTime: '2026-05-03 12:12:11',
    sourceSystem: '服務A',
    computerName: '主機1-a',
    level: 'WARN',
    messages: '正常',
    status: 200,
    method: 'GET',
    path: '/health',
    requestUrl: 'https://example.com/health',
    response: 'OK',
  },
  {
    id: 'vcxm342',
    type: 'http',
    createTime: '2026-05-04 08:00:00',
    sourceSystem: '服務A',
    computerName: '主機1-a',
    level: 'WARN',
    messages: '正常',
    status: 200,
    method: 'GET',
    path: '/health',
    requestUrl: 'https://example.com/health',
    response: 'OK',
  },
  {
    id: 'dsflk311',
    type: 'http',
    createTime: '2026-05-04 09:00:00',
    sourceSystem: '服務A',
    computerName: '主機1-a',
    level: 'WARN',
    messages: '正常',
    status: 200,
    method: 'GET',
    path: '/health',
    requestUrl: 'https://example.com/health',
    response: 'OK',
  },
  {
    id: 'dsflk345',
    type: 'http',
    createTime: '2026-05-04 10:34:56',
    sourceSystem: '服務A',
    computerName: '主機1-a',
    level: 'DEBUG',
    messages: '正常',
    status: 200,
    method: 'GET',
    path: '/health',
    requestUrl: 'https://example.com/health',
    response: 'OK',
  },
  {
    id: 'dsflk673',
    type: 'http',
    createTime: '2026-05-07 17:25:01',
    sourceSystem: '服務A',
    computerName: '主機1-a',
    level: 'INFO',
    messages: '正常',
    status: 200,
    method: 'GET',
    path: '/health',
    requestUrl: 'https://example.com/health',
    response: 'OK',
  },
]

const LogDataLayer: React.FC<React.PropsWithChildren> = ({ children }) => {
  // const { data: logs, isLoading } = useLogs()

  const [logs, setLogsState] = useState<LogEntry[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchLogs = async () => {
      setIsLoading(true)
      const logs = await sleep<HttpLogEntry[]>(2000, MOCK_LOGS)
      setLogsState(logs)
      setIsLoading(false)
    }
    fetchLogs()
  }, [])

  useEffect(() => {
    updateLoadingState(isLoading)
  }, [isLoading])

  useEffect(() => {
    if (logs) setLogs(logs)
  }, [logs])

  return <>{children}</>
}

export default LogDataLayer
