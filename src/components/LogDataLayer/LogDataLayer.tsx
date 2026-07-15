'use client'

import { useLogs } from '@/domain/logs/hooks'
import { setLogs, updateLoadingState } from '@/domain/logs/store'
import { useEffect } from 'react'

const LogDataLayer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { data, isLoading } = useLogs(
    (data) => {
      setLogs(data)
      console.log('success')
    },
    (error) => console.log(error)
  )

  useEffect(() => {
    updateLoadingState(isLoading)
  }, [isLoading])

  return <>{children}</>
}

export default LogDataLayer
