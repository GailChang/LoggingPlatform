import useSWR from 'swr'
import { logApi } from './api'

export function useLogs() {
  return useSWR('logs', logApi.getLogs, {
    refreshInterval: 30000, // 30 秒自動更新
    revalidateOnFocus: false,
  })
}

export function useLog(id: string) {
  return useSWR(id ? `logs/${id}` : null, () => logApi.getLogById(id))
}