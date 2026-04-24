import { create } from 'zustand'
import { LogEntry } from './schema'

type LogsStore = {
  logs: LogEntry[]
}

const initialState: LogsStore = {
  logs: [],
}

export const useLogsStore = create<LogsStore>(set => ({
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
