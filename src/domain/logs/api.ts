import { httpClient } from '@/domain/shared/httpClient'
import { LogEntry } from './schema'

export const logApi = {
  async getLogs(): Promise<LogEntry[]> {
    const { data } = await httpClient.get('/logs.json')
    return data
  },

  async getLogById(id: string): Promise<LogEntry> {
    const { data } = await httpClient.get(`/logs/${id}`)
    return data
  },
}
