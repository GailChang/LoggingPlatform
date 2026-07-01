import { ELevel, ELogType } from '../logs/schema'

export type FilterGroup = {
  keyword: string | undefined
  type: ELogType | undefined
  status: string | undefined
  startTime: string | undefined
  endTime: string | undefined
  sourceSystem: string | undefined
  level: ELevel | undefined
}
