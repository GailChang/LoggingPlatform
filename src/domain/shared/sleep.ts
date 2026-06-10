export const sleep = (ms : number) => {
  const promise = new Promise((resolve) => setTimeout(resolve, ms))
  return promise;
}

export const sleepOneSec = async () => {
  await sleep(1000)
  return
}

export const sleepAndGetData = async <T>(ms: number, data: T[]) => {
  console.log("sleep start")
  await sleep(ms)
  console.log("sleep end")
  return data;
}