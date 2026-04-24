export type GeneralLogEntry = {
  timestamp: string
  level: 'INFO' | 'WARN' | 'ERROR' | 'DEBUG'
  message: string
  source: string
  type: 'application' | 'system' | 'http'
}

export type ApplicationLogEntry = GeneralLogEntry & {
  type: 'application'
  applicationName: string
  threadId: string
}

export type SystemLogEntry = GeneralLogEntry & {
  type: 'system'
  systemComponent: string
}

export type HttpLogEntry = GeneralLogEntry & {
  type: 'http'
  method: string
  url: string
  statusCode: number
}

export type LogEntry = ApplicationLogEntry | SystemLogEntry | HttpLogEntry
