import { FilterGroup } from '../filter/schema'
import { ELogType } from '../logs/schema'

/** 首頁圖表篩選條件 */
export type THomeFilter = {
  sourceSystem: string | undefined
  dateTime: Date | undefined
  startDate: string | undefined
  endDate: string | undefined
  /** 最近幾天內 */
  forDays: number | undefined
}

/** 時間軸圖 */
export type TTimeline = {
  createTime: string
  logCount: number
}

export type TTimelineDataset = {
  timelineArray: TTimeline[] | undefined
  startTime: Date
  endTime: Date
}

/** 熱點圖-單位 schema */
export type THeatMap = {
  hour: number
  type: ELogType
  logCount: number
}

/** 重複錯誤圖-單位 schema */
export type TDuplicateError = {
  date: string | undefined
  errorCode: string | undefined
  path: string | undefined
  filterGroup: Partial<FilterGroup>
  logCount: number | undefined
}

/** 資料集 */
export type THomeDataset = {
  timeline: TTimeline[] | undefined
  heatMap: THeatMap[] | undefined
  duplicateError: TDuplicateError[] | undefined
}
