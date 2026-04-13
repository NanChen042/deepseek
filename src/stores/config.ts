import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { setSiliconFlowKey as setChatKey } from '@/services/aiService'
import { setSiliconFlowKey as setImageKey } from '@/services/imageService'

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

  // 初始化时同步到服务 (关键修复：均使用 siliconFlowApiKey)
  setChatKey(config.value.siliconFlowApiKey)
  setImageKey(config.value.siliconFlowApiKey)

  // 监听 SiliconFlow Key 变化并同步到两个服务
  watch(() => config.value.siliconFlowApiKey, (newKey) => {
    setChatKey(newKey)
    setImageKey(newKey)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(config.value))
  })

  // DeepSeek Key 仅保留存储，不用于主要服务
  watch(() => config.value.deepseekApiKey, () => {
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
