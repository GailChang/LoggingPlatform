export type GeneralLogEntry = {
  id: string
  type: 'application' | 'system' | 'http'
  createTime: string
  sourceSystem: string
  computerName: string
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'
  messages: string
}

export type ApplicationLogEntry = GeneralLogEntry & {
  applicationName: string
  threadId: string
}

export type SystemLogEntry = GeneralLogEntry & {
  errorCode: string
  lineInformation: string
}

export type HttpLogEntry = GeneralLogEntry & {
  status: number
  method: string
  path: string
  requestUrl: string
  response: string
}

export type LogEntry = ApplicationLogEntry | SystemLogEntry | HttpLogEntry
