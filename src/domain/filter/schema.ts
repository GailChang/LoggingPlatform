import { ELevel, ELogType } from '../logs/schema'
import { TPagination } from '../pagination/schema'

export enum ETimeFilterBy {
  Relative,
  Absolute,
}

export type FilterGroup = {
  keyword: string | undefined
  type: ELogType | undefined
  status: string | undefined
  stringTime: string | undefined
  timeFilterBy: ETimeFilterBy | undefined
  startTime: string | undefined
  endTime: string | undefined
  sourceSystem: string | undefined
  level: ELevel | undefined
} & TPagination
