import { httpClient } from '@/domain/shared/httpClient'
import { FilterGroup } from '../filter/schema'
import { LogEntry } from './schema'

export const logApi = {
  async getLogs(filters: FilterGroup): Promise<LogEntry[]> {
    const { data } = await httpClient.post('/logs/', filters)
    return data
  },

  async getLogById(id: string): Promise<LogEntry> {
    const { data } = await httpClient.get(`/logs/${id}`)
    return data
  },
}
