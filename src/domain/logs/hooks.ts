import useSWR from 'swr'
import type { FilterGroup } from '../filter/schema'
import { useFilterStore } from '../filter/store'
import { sleep } from '../shared/sleep'
import { logApi } from './api'
import MOCK_LOGS from './mock'
import { ELogType, type LogEntry } from './schema'

type LogsKey = readonly ['logs', FilterGroup, boolean]

const mockGetLogs = async (filters: FilterGroup): Promise<LogEntry[]> => {
  let filteredLogs = [...(MOCK_LOGS as LogEntry[])]

  filteredLogs = filteredLogs.filter((log) => {
    let hasResult = true

    if (filters.keyword && filters.keyword != '') {
      const keywordLower = filters.keyword.toLowerCase()
      const matchMessage = log.messages.toLowerCase().includes(keywordLower)

      hasResult = hasResult && matchMessage
    }
    if (filters.type) {
      hasResult = hasResult && log.type == filters.type
    }
    if (filters.type == ELogType.Http && filters.status) {
      hasResult =
        hasResult && 'status' in log && String(log.status) == filters.status
    }
    if (filters.sourceSystem) {
      hasResult = hasResult && log.sourceSystem == filters.sourceSystem
    }
    if (filters.level) {
      hasResult = hasResult && log.level == filters.level
    }
    // TODO: stirngTime, timeFilterBy, startTime, endTime
    return hasResult
  })

  // console.log('mockGetLogs activate')
  return sleep<LogEntry[]>(2000, filteredLogs)
}

export function useLogs(
  onSuccess?: (data: LogEntry[]) => void,
  onError?: (error: unknown) => void
) {
  const filterState = useFilterStore((state) => state.filterGroup)
  const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true'

  const key: LogsKey = ['logs', filterState, useMock]

  return useSWR<LogEntry[], Error, LogsKey>(
    key,
    ([, filters]) => (useMock ? mockGetLogs(filters) : logApi.getLogs(filters)),
    {
      revalidateOnFocus: false,
      onSuccess: onSuccess,
      onError: onError,
    }
  )
}

export function useLog(id: string) {
  return useSWR<LogEntry>(id ? `logs/${id}` : null, () => logApi.getLogById(id))
}
