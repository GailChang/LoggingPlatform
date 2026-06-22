import useSWR from 'swr'
import { logApi } from './api'
import type { LogEntry } from './schema'

export function useLogs(
  onSuccess?: (data: LogEntry[]) => void,
  onError?: (error: unknown) => void
) {
  return useSWR<LogEntry[]>('logs', logApi.getLogs, {
    refreshInterval: 30000, // 30 秒自動更新
    revalidateOnFocus: false,
    onSuccess: onSuccess,
    onError: onError,
  })
}

export function useLog(id: string) {
  return useSWR<LogEntry>(id ? `logs/${id}` : null, () => logApi.getLogById(id))
}
