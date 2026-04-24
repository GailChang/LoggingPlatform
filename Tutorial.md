# Log Intelligence 專案架構指南

## 專案結構說明

這個專案使用 Next.js 16.2.4 的 App Router 架構，搭配 React 19 和 MUI 設計系統。以下是主要資料夾的用途：

### 📁 `/src/app` - App Router 路由設定

```
/src/app
├── page.tsx          # 首頁 (/)
├── layout.tsx        # 全域佈局與 MUI 設定
└── [feature]/        # 功能頁面 (待建立)
    ├── page.tsx      # 頁面元件
    └── layout.tsx    # 功能佈局
```

**使用範例：**

- 建立新頁面：在 `/src/app` 下建立資料夾即可
- 動態路由：使用 `[id]` 或 `[...slug]` 命名
- 支援 Server Components 和 Client Components

### 📁 `/src/components` - 可重複使用的 UI 元件

```
/src/components
├── NextLink/         # 已存在的元件
│   ├── NextLink.tsx  # Next.js Link 包裝元件
│   └── index.ts      # 匯出檔案
└── [待建立]/          # 建議的元件結構
    ├── ui/           # 基礎 UI 元件 (基於 MUI)
    ├── layout/       # 佈局相關元件
    └── feature/      # 功能特定元件
```

**開發建議：**

- 使用 MUI 的 `styled()` API 或 `sx` prop 進行客製化
- 善用 MUI 的主題系統統一樣式
- 元件保持單一職責原則

### 📁 `/domain` - 業務邏輯與資料層（按資源類型組織）

```
/domain
├── logs/             # 日誌相關的所有邏輯
│   ├── schema.ts     # 資料結構定義與驗證 ✓ 已存在
│   ├── store.ts      # Zustand 狀態管理 ✓ 已存在
│   ├── api.ts        # API 呼叫函數 (待建立)
│   ├── hooks.ts      # SWR hooks (待建立)
│   └── utils.ts      # 日誌相關工具函數 (待建立)
├── users/            # 用戶相關的所有邏輯 (待建立)
│   ├── schema.ts
│   ├── store.ts
│   ├── api.ts
│   ├── hooks.ts
│   └── utils.ts
├── analytics/        # 分析功能相關邏輯 (待建立)
│   ├── schema.ts
│   ├── store.ts
│   ├── api.ts
│   ├── hooks.ts
│   └── utils.ts
└── shared/           # 共用的工具和設定 (待建立)
    ├── httpClient.ts # axios 客戶端設定
    ├── constants.ts  # 全域常數
    └── utils.ts      # 通用工具函數
```

**組織原則：**

- 每個資源領域包含該領域的完整邏輯
- `schema.ts` 包含 TypeScript 類型定義和資料驗證
- `store.ts` 管理該領域的客戶端狀態
- `api.ts` 處理該領域的伺服器端資料
- `hooks.ts` 提供該領域的自訂 React Hooks
- `utils.ts` 包含該領域特定的工具函數

### 📁 `/style` - 樣式相關設定

```
/style
├── theme.ts          # MUI 主題設定 ✓ 已存在
├── globals.css       # 全域 CSS (待建立)
└── components.css    # 元件專用樣式 (待建立)
```

## 開發流程建議

### 1. 設定 MUI 主題

```typescript
// /style/theme.ts
'use client'
import { createTheme } from '@mui/material/styles'

const theme = createTheme({
  cssVariables: true,
  typography: {
    fontFamily: 'var(--font-roboto)',
  },
})

export default theme
```

### 2. 建立 HTTP 客戶端

```typescript
// /domain/shared/httpClient.ts
import axios from 'axios'

export const httpClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  timeout: 10000,
})

// Request interceptor
httpClient.interceptors.request.use(config => {
  // 加入認證 token 等邏輯
  return config
})
```

### 3. 定義資料類型

```typescript
// /domain/logs/schema.ts (已存在)
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
```

### 4. 建立 API 函數

```typescript
// /domain/logs/api.ts (待建立)
import { httpClient } from '@/domain/shared/httpClient'
import { LogEntry } from './schema'

export const logApi = {
  async getLogs(): Promise<LogEntry[]> {
    const { data } = await httpClient.get('/logs')
    return data
  },

  async getLogById(id: string): Promise<LogEntry> {
    const { data } = await httpClient.get(`/logs/${id}`)
    return data
  },
}
```

### 5. 建立 SWR Hook

```typescript
// /domain/logs/hooks.ts (待建立)
import useSWR from 'swr'
import { logApi } from './api'

export function useLogs() {
  return useSWR('logs', logApi.getLogs, {
    refreshInterval: 30000, // 30 秒自動更新
    revalidateOnFocus: false,
  })
}

export function useLog(id: string) {
  return useSWR(id ? `logs/${id}` : null, () => logApi.getLogById(id))
}
```

### 6. 建立 Zustand Store

```typescript
// /domain/logs/store.ts (已存在)
import { create } from 'zustand'
import { LogEntry } from './schema'

type LogsStore = {
  logs: LogEntry[]
}

const initialState: LogsStore = {
  logs: [],
}

export const useLogsStore = create<LogsStore>(set => ({
  ...initialState,
}))

export const setLogs = (newLogs: LogEntry[]) => {
  useLogsStore.setState({ logs: newLogs })
}

export const addLogs = (newLogs: LogEntry[]) => {
  useLogsStore.setState(prev => ({
    logs: [...prev.logs, ...newLogs],
  }))
}

export const clearLogs = () => {
  useLogsStore.setState({ logs: [] })
}
```

### 7. 建立 MUI 元件

```typescript
// /components/feature/LogViewer.tsx (待建立)
'use client'
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Chip,
  CircularProgress
} from '@mui/material'
import { useLogs } from '@/domain/logs/hooks'
import { useLogsStore } from '@/domain/logs/store'

export function LogViewer() {
  const { logs } = useLogsStore()
  const { data: remoteLogs, isLoading, error } = useLogs()

  if (isLoading) return <CircularProgress />
  if (error) return <Box>載入失敗</Box>

  // 優先顯示 store 中的日誌，沒有的話顯示遠端日誌
  const displayLogs = logs.length > 0 ? logs : (remoteLogs || [])

  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell>時間</TableCell>
          <TableCell>等級</TableCell>
          <TableCell>類型</TableCell>
          <TableCell>訊息</TableCell>
          <TableCell>來源</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {displayLogs.map((log, index) => (
          <TableRow key={index}>
            <TableCell>{new Date(log.timestamp).toLocaleString()}</TableCell>
            <TableCell>
              <Chip
                label={log.level}
                color={log.level === 'ERROR' ? 'error' :
                       log.level === 'WARN' ? 'warning' : 'default'}
              />
            </TableCell>
            <TableCell>
              <Chip label={log.type} variant="outlined" />
            </TableCell>
            <TableCell>{log.message}</TableCell>
            <TableCell>{log.source}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  )
}
```

### 8. 在頁面中使用

```typescript
// /app/logs/page.tsx (待建立)
import { Container, Typography, Box } from '@mui/material'
import { LogViewer } from '@/components/feature/LogViewer'

export default function LogsPage() {
  return (
    <Container maxWidth="xl">
      <Box sx={{ py: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          日誌監控系統
        </Typography>
        <Box sx={{ mt: 3 }}>
          <LogViewer />
        </Box>
      </Box>
    </Container>
  )
}
```

## 技術棧說明

- **框架**: Next.js 16.2.4 (App Router)
- **React**: 19.2.4
- **類型**: TypeScript 5+
- **UI 框架**: MUI (Material-UI) + Emotion
- **狀態管理**: Zustand
- **資料擷取**: axios + SWR
- **樣式**: Emotion (CSS-in-JS)
- **程式碼檢查**: ESLint

## 安裝額外依賴

根據需要安裝以下套件：

```bash
# 資料擷取
npm install axios swr

# 日期處理
npm install date-fns

# 圖表視覺化
npm install recharts

# 表單驗證 (可選)
npm install react-hook-form @hookform/resolvers yup
```

## 開始開發

1. 安裝依賴：`npm install`
2. 安裝額外所需套件：
   ```bash
   npm install axios swr
   npm install date-fns  # 日期處理
   npm install recharts  # 圖表視覺化 (可選)
   ```
3. 啟動開發伺服器：`npm run dev`
4. 專案已包含基礎架構：
   - ✅ MUI 主題設定 (`/style/theme.ts`)
   - ✅ 日誌資料結構 (`/domain/logs/schema.ts`)
   - ✅ 基礎 Zustand store (`/domain/logs/store.ts`)
5. 建議的開發順序：
   - 建立 `/domain/logs/api.ts` 和 `/domain/logs/hooks.ts`
   - 在 `/components` 下建立功能元件
   - 在 `/app` 下建立新頁面

## 最佳實踐

### MUI 使用建議

- 使用 `sx` prop 進行快速樣式調整
- 善用 `styled()` API 建立客製化元件
- 統一使用主題中的 spacing、colors 等設計令牌

### 資料管理建議

- 使用 SWR 處理伺服器狀態
- 使用 Zustand 管理客戶端狀態
- API 函數保持純淨，不包含狀態邏輯

### 效能優化

- 適當使用 React.memo() 避免不必要的重新渲染
- 利用 SWR 的快取機制減少 API 呼叫
- 使用 Next.js 的 Image 元件優化圖片載入

Happy Coding! 🚀
