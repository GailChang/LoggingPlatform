export enum ELogType {
  // Application = 'application',
  System = 'system',
  Http = 'http',
}

export enum ELevel {
  Info = 'INFO',
  Warn = 'WARN',
  Error = 'ERROR',
  Debug = 'DEBUG',
}

export type GeneralLogEntry = {
  id: string
  type: ELogType
  createTime: string
  sourceSystem: string
  computerName: string
  level: ELevel
  messages: string
}

// export type ApplicationLogEntry = GeneralLogEntry & {
//   applicationName: string
//   threadId: string
// }

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

export type LogEntry = SystemLogEntry | HttpLogEntry
