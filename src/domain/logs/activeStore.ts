import { create } from 'zustand'
import type { LogEntry } from './schema'

type LogStore = {
  log: LogEntry | null
  searchId: string | undefined
  isLoading: boolean
}

const initialState: LogStore = {
  log: null,
  searchId: undefined,
  isLoading: false,
}

export const useActiveLogStore = create<LogStore>(() => ({
  ...initialState,
}))

// #region actions
export const setActiveLog = (newLog: LogEntry) => {
  useActiveLogStore.setState({ log: newLog })
}

export const clearActiveLog = () => {
  useActiveLogStore.setState({ log: null })
}

export const updateSearchId = (newId: string) => {
  if (newId.trim() == '') {
    return
  }
  useActiveLogStore.setState({ searchId: newId, isLoading: true })
}

export const updateActiveLoadingState = (isLoading: boolean) => {
  useActiveLogStore.setState({ isLoading })
}
// #endregion actions
