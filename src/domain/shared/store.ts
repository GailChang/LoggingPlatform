import { create } from 'zustand'

type SharedStore = {
  location: string
}

const initialState: SharedStore = {
  location: 'home',
}

export const useSharedStore = create<SharedStore>(() => ({
  ...initialState,
}))

export const setShared = (newShared: string) => {
  useSharedStore.setState({ location: newShared })
}
