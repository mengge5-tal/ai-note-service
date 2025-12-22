/**
 * Application configuration service
 * Manages mock data toggle and API settings
 * Following FR-022, FR-023
 */

import type { AppConfig } from '../types/api'

const CONFIG_STORAGE_KEY = 'app_config'

const defaultConfig: AppConfig = {
  // 修复逻辑：确保正确读取环境变量
  useMockData: import.meta.env.VITE_USE_MOCK_DATA === 'true',
  apiBaseUrl: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  environment: import.meta.env.MODE === 'production' ? 'production' : 'development',
}

export const getConfig = (): AppConfig => {
  try {
    const stored = localStorage.getItem(CONFIG_STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      return { ...defaultConfig, ...parsed }
    }
  } catch (error) {
    console.warn('Failed to load config from localStorage:', error)
  }
  return defaultConfig
}

export const saveConfig = (config: Partial<AppConfig>): void => {
  try {
    const current = getConfig()
    const updated = { ...current, ...config }
    localStorage.setItem(CONFIG_STORAGE_KEY, JSON.stringify(updated))
  } catch (error) {
    console.error('Failed to save config to localStorage:', error)
  }
}

export const toggleMockData = (): void => {
  const config = getConfig()
  saveConfig({ useMockData: !config.useMockData })
}

export const isMockDataEnabled = (): boolean => {
  return getConfig().useMockData
}