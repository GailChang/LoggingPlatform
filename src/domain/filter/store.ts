import { create } from 'zustand'
import { updateLoadingState } from '../logs/store'
import type { FilterGroup } from './schema'

type FilterStore = {
  filterGroup: FilterGroup
}

const initialState: FilterStore = {
  filterGroup: {
    keyword: undefined,
    type: undefined,
    status: undefined,
    stringTime: undefined,
    timeFilterBy: undefined,
    startTime: undefined,
    endTime: undefined,
    sourceSystem: undefined,
    level: undefined,
    total: 0,
    pageSize: 10,
    page: 0,
  },
}

export const useFilterStore = create<FilterStore>(() => ({
  ...initialState,
}))

export const setFilterGroup = (newFilterGroup: FilterGroup) => {
  useFilterStore.setState({ filterGroup: newFilterGroup })
}

export const updateFilterGroup = (updatedFields: Partial<FilterGroup>) => {
  useFilterStore.setState((prev) => ({
    filterGroup: { ...prev.filterGroup, ...updatedFields },
  }))
  updateLoadingState(true)
}

export const resetFilterGroup = () => {
  useFilterStore.setState({ filterGroup: initialState.filterGroup })
}
