import { create } from 'zustand'
import { useLogsStore } from '../logs/store'

type SharedStore = {
  location: string
}

const initialState: SharedStore = {
  location: 'home'
}

export const useSharedStore = create<SharedStore>(set => ({
  ...initialState,
}))

export const setShared = (newShared: string) => {
  useSharedStore.setState({ location: newShared })
}
