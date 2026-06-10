import { create } from 'zustand'
import type { LogEntry } from './schema'

type LogsStore = {
  logs: LogEntry[]
  isLoading: boolean
}

const initialState: LogsStore = {
  logs: [],
  isLoading: false,
}

export const useLogsStore = create<LogsStore>(() => ({
  ...initialState,
}))

export const setLogs = (newLogs: LogEntry[]) => {
  useLogsStore.setState({ logs: newLogs })
}

export const addLogs = (newLogs: LogEntry[]) => {
  useLogsStore.setState(prev => ({
    logs: [...prev.logs, ...newLogs],
  }))
}

export const clearLogs = () => {
  useLogsStore.setState({ logs: [] })
}

export const updateLoadingState = (isLoading: boolean) => {
  useLogsStore.setState({ isLoading })
}
