import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { setDeepSeekKey } from '@/services/aiService'
import { setSiliconFlowKey } from '@/services/imageService'

const STORAGE_KEY = 'deepseek_app_config'

export interface AppConfig {
  deepseekApiKey: string
  siliconFlowApiKey: string
  defaultModel: string
}

export const useConfigStore = defineStore('config', () => {
  const loadConfig = (): AppConfig => {
    const defaultConfig: AppConfig = {
      deepseekApiKey: import.meta.env.VITE_DEEPSEEK_API_KEY || '',
      siliconFlowApiKey: import.meta.env.VITE_SILICONFLOW_API_KEY || '',
      defaultModel: 'deepseek-chat'
    }

    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return { ...defaultConfig, ...JSON.parse(stored) }
      }
    } catch (e) {
      console.error('Failed to parse app config', e)
    }
    return defaultConfig
  }

  const config = ref<AppConfig>(loadConfig())

  // 初始化时同步到服务
  setDeepSeekKey(config.value.deepseekApiKey)
  setSiliconFlowKey(config.value.siliconFlowApiKey)

  watch(() => config.value.deepseekApiKey, (newKey) => {
    setDeepSeekKey(newKey)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config.value))
  })

  watch(() => config.value.siliconFlowApiKey, (newKey) => {
    setSiliconFlowKey(newKey)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config.value))
  })

  const setDeepSeekKeyInStore = (key: string) => {
    config.value.deepseekApiKey = key
  }

  const setSiliconFlowKeyInStore = (key: string) => {
    config.value.siliconFlowApiKey = key
  }

  return {
    config,
    setDeepSeekKey: setDeepSeekKeyInStore,
    setSiliconFlowKey: setSiliconFlowKeyInStore
  }
})
