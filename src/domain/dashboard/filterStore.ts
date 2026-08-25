import { create } from 'zustand'
import type { THomeFilter } from './schema'

const initialState: THomeFilter = {
  sourceSystem: undefined,
  dateTime: undefined,
  startDate: undefined,
  endDate: undefined,
  forDays: 0,
}

export const useHomeFilter = create<THomeFilter>(() => ({
  ...initialState,
}))

export const setHomeFilter = (newHomeFilter: THomeFilter) => {
  useHomeFilter.setState(newHomeFilter)
}

export const updateHomeFilter = (updatedFields: Partial<THomeFilter>) => {
  useHomeFilter.setState((prev) => ({
    ...prev,
    ...updatedFields,
  }))
}

export const resetHomeFilter = () => {
  useHomeFilter.setState({ ...initialState })
}
