'use client'

import {
  setActiveLog,
  updateActiveLoadingState,
} from '@/domain/logs/activeStore'
import { useLog } from '@/domain/logs/hooks'
import { useEffect } from 'react'

const DetailDataLayer: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { data, isLoading } = useLog(
    (data) => {
      if (data) setActiveLog(data)
    },
    (error) => console.log(error)
  )

  useEffect(() => updateActiveLoadingState(isLoading), [isLoading])

  return <>{children}</>
}

export default DetailDataLayer
