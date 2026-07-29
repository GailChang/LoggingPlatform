export enum ELogType {
  Application = 'application',
  System = 'system',
  Http = 'http',
}

export enum ELevel {
  Info = 'INFO',
  Warn = 'WARN',
  Error = 'ERROR',
  Debug = 'DEBUG',
}

export type TFormSectionProps = {
  isLoading: boolean
  logEntry: ApplicationLogEntry | SystemLogEntry | HttpLogEntry
}

export type GeneralLogEntry = {
  id: string
  type: ELogType | undefined
  createTime: string
  sourceSystem: string
  computerName: string
  level: ELevel | undefined
  messages: string
}

export type ApplicationLogEntry = SystemLogEntry & {
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
