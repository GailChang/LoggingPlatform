import useSWR from 'swr'
import type { FilterGroup } from '../filter/schema'
import { useFilterStore } from '../filter/store'
import { sleep } from '../shared/sleep'
import { useActiveLogStore } from './activeStore'
import { logApi } from './api'
import MOCK_LOGS from './mock'
import { ELogType, type LogEntry } from './schema'
import { setCurrentPage, setPageSize, setPaginationState } from './store'

type LogsKey = readonly ['logs', FilterGroup, boolean]
type LogKey = readonly ['log', string, boolean]

const useMock = process.env.NEXT_PUBLIC_USE_MOCK === 'true'

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

  const pageSize = filters.pageSize || 10
  const pageNow = Math.max(0, filters.page || 0)
  const totalCount = filteredLogs.length
  console.log('pageSize:', pageSize)
  console.log('pageNow:', pageNow)
  console.log('totalCount:', totalCount)

  const startIndex = pageNow * pageSize
  const endIndex = startIndex + pageSize
  const paginatedLogs = filteredLogs.slice(startIndex, endIndex)

  setPaginationState(totalCount)
  setCurrentPage(pageNow)
  setPageSize(pageSize)
  // console.log('mockGetLogs activate')
  return sleep<LogEntry[]>(2000, paginatedLogs)
}

const mockGetLog = async (id: string): Promise<LogEntry | undefined> => {
  const log = MOCK_LOGS.find((log) => log.id === id)
  return sleep<LogEntry | undefined>(2000, log || undefined)
}

export function useLogs(
  onSuccess?: (data: LogEntry[]) => void,
  onError?: (error: unknown) => void
) {
  const filterState = useFilterStore((state) => state.filterGroup)
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

export function useLog(
  onSuccess?: (data: LogEntry | undefined) => void,
  onError?: (error: unknown) => void
) {
  const storeId = useActiveLogStore((state) => state.searchId)
  const isLoading = useActiveLogStore((state) => state.isLoading)

  let searchId = storeId
  if (!searchId) searchId = ''

  const key: LogKey = ['log', searchId, useMock]

  console.log('isLoading', isLoading)
  return useSWR<LogEntry | undefined, Error, LogKey>(
    key,
    ([, id]) => (useMock ? mockGetLog(id) : logApi.getLogById(id)),
    {
      revalidateOnFocus: false,
      onSuccess: onSuccess,
      onError: onError,
    }
  )
}
