import { TIME_OPTION } from '@/components/LogSearchSection/LogSearchSection'
import dayjs from 'dayjs'
import useSWR from 'swr'
import { ETimeFilterBy, type FilterGroup } from '../filter/schema'
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
    if (filters.timeFilterBy == ETimeFilterBy.Relative && filters.stringTime) {
      let startDt = dayjs()
      const endDt = dayjs().add(1, 'minute')
      switch (filters.stringTime) {
        case TIME_OPTION[0].value:
          startDt = dayjs().subtract(5, 'minute').subtract(1, 'millisecond')
          break
        case TIME_OPTION[1].value:
          startDt = dayjs().subtract(10, 'minute').subtract(1, 'millisecond')
          break
        case TIME_OPTION[2].value:
          startDt = dayjs().subtract(1, 'hour').subtract(1, 'millisecond')
          break
        case TIME_OPTION[3].value:
          startDt = dayjs().subtract(1, 'day').subtract(1, 'millisecond')
          break
        case TIME_OPTION[4].value:
          startDt = dayjs().subtract(3, 'day').subtract(1, 'millisecond')
          break
      }

      hasResult =
        hasResult &&
        dayjs(log.createTime).isAfter(startDt) &&
        dayjs(log.createTime).isBefore(endDt)
    }
    if (
      filters.timeFilterBy == ETimeFilterBy.Absolute &&
      (filters.startTime || filters.endTime)
    ) {
      const startDt = filters.startTime
        ? dayjs(filters.startTime)
        : dayjs().subtract(100, 'year')
      const endDt = filters.endTime
        ? dayjs(filters.endTime)
        : dayjs().add(1, 'minute')

      hasResult =
        hasResult &&
        dayjs(log.createTime).isAfter(startDt) &&
        dayjs(log.createTime).isBefore(endDt)
    }

    return hasResult
  })

  const pageSize = filters.pageSize || 10
  const pageNow = Math.max(0, filters.page || 0)
  const totalCount = filteredLogs.length

  const startIndex = Math.min(pageNow * pageSize, totalCount - 1)
  const endIndex = Math.min(startIndex + pageSize, totalCount - 1)
  const paginatedLogs = filteredLogs.slice(startIndex, endIndex)

  setPaginationState(totalCount)
  setCurrentPage(pageNow)
  setPageSize(pageSize)
  return sleep<LogEntry[]>(1500, paginatedLogs)
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

  let searchId = storeId
  if (!searchId) searchId = ''

  const key: LogKey = ['log', searchId, useMock]

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
