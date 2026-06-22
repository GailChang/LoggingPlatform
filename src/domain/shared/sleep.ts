const DEFAULT_SLEEP_TIME = 3000

export const sleep = <T>(ms?: number, data?: T) => {
  const promise = new Promise<T>((resolve) =>
    setTimeout(() => resolve(data ?? ({} as T)), ms ?? DEFAULT_SLEEP_TIME)
  )
  return promise
}
