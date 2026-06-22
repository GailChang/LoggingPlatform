import { ELevel, ELogType } from '../logs/schema'

export type FilterGroup = {
  keyword: string | undefined
  type: ELogType | undefined
  createTime: string | undefined
  sourceSystem: string | undefined
  level: ELevel | undefined
}
