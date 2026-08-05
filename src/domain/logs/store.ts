import { create } from 'zustand'
import { TPagination } from '../pagination/schema'
import type { LogEntry } from './schema'

type LogsStore = {
  logs: LogEntry[]
  isLoading: boolean
} & TPagination

const initialState: LogsStore = {
  logs: [],
  isLoading: false,
  total: 0,
  pageSize: 10,
  page: 1,
}

export const useLogsStore = create<LogsStore>(() => ({
  ...initialState,
}))

// #region actions
export const setLogs = (newLogs: LogEntry[]) => {
  useLogsStore.setState({ logs: newLogs })
}

export const addLogs = (newLogs: LogEntry[]) => {
  useLogsStore.setState((prev) => ({
    logs: [...prev.logs, ...newLogs],
  }))
}

export const clearLogs = () => {
  useLogsStore.setState({ logs: [] })
}

export const updateLoadingState = (isLoading: boolean) => {
  useLogsStore.setState({ isLoading })
}

export const setPaginationState = (totalCount: number) => {
  useLogsStore.setState({ total: totalCount })
}

export const setCurrentPage = (page: number) => {
  useLogsStore.setState({ page: page })
}

export const setPageSize = (size: number) => {
  useLogsStore.setState({ pageSize: size })
}
// #endregion actions
