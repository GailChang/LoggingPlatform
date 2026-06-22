import { create } from 'zustand'
import type { FilterGroup } from './schema'

type FilterStore = {
  filterGroup: FilterGroup
}

const initialState: FilterStore = {
  filterGroup: {
    keyword: undefined,
    type: undefined,
    createTime: undefined,
    sourceSystem: undefined,
    level: undefined,
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
}

export const resetFilterGroup = () => {
  useFilterStore.setState({ filterGroup: initialState.filterGroup })
}
