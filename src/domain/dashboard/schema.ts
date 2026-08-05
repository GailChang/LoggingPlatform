import { FilterGroup } from '../filter/schema'

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
  logCount: number
}

/** 熱點圖資料集 */
export type THeatMapDataset = {
  days3ago: THeatMap[] | undefined
  days2ago: THeatMap[] | undefined
  days1ago: THeatMap[] | undefined
  today: THeatMap[] | undefined
}

/** 重複錯誤圖-單位 schema */
export type TDuplicateError = {
  date: string | undefined
  errorCode: string | undefined
  path: string | undefined
  filterGroup: Partial<FilterGroup>
  logCount: number | undefined
}

/** 重複錯誤圖資料集 */
export type TDuplicateErrorDataset = {
  days: TDuplicateError[] | undefined
  week: TDuplicateError[] | undefined
}
