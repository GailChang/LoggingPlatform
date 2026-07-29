import {
  ApplicationLogEntry,
  ELogType,
  HttpLogEntry,
  LogEntry,
  SystemLogEntry,
} from '../logs/schema'

export function isApplicationLogEntry(
  log: LogEntry | null
): log is ApplicationLogEntry {
  return log != null && log.type === ELogType.Application
}

export function isHttpLogEntry(log: LogEntry | null): log is HttpLogEntry {
  return log != null && log.type === ELogType.Http
}

export function isSystemLogEntry(log: LogEntry | null): log is SystemLogEntry {
  return log != null && log.type === ELogType.System
}
