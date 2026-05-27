import axios from 'axios'

export const httpClient = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
    timeout: 10000,
})

// Request interceptor
httpClient.interceptors.request.use(config => {
    // TODO: 認證 token 邏輯
    return config
})