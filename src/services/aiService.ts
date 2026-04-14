import { ElMessage } from 'element-plus'

export enum ModelType {
  V3 = 'deepseek-ai/DeepSeek-V3',
  R1_Distill_7B = 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',
  R1_Distill_8B = 'deepseek-ai/DeepSeek-R1-0528-Qwen3-8B',
  OCR = 'deepseek-ai/DeepSeek-OCR',
  QwenVL = 'Qwen/Qwen2.5-VL-72B-Instruct',
  QwenOmni = 'Qwen/Qwen3-Omni-30B-A3B-Instruct',
  Qwen35_4B = 'Qwen/Qwen3.5-4B',
  ART = 'art-studio',
  GLM4V = 'THUDM/glm-4v-9b',
  Reasoner = 'deepseek-ai/DeepSeek-R1'
}

// 定义消息内容块类型
export interface MultimodalContent {
  type: 'text' | 'image_url' | 'audio_url' | 'video_url'
  text?: string
  image_url?: { url: string; detail?: 'auto' | 'low' | 'high' }
  audio_url?: { url: string }
  video_url?: { url: string; detail?: 'auto' | 'low' | 'high'; max_frames?: number; fps?: number }
}

export interface ChatCompletionRequestMessage {
  role: 'system' | 'user' | 'assistant'
  content: string | MultimodalContent[]
  prefix?: boolean
}

// API 配置 (统一使用 SiliconFlow 可选路径)
const API_CONFIG = {
  baseURL: 'https://api.siliconflow.cn/v1',
  apiKey: import.meta.env.VITE_SILICONFLOW_API_KEY || ''
}

/**
 * 更新 SiliconFlow API Key (对话引擎)
 */
export const setSiliconFlowKey = (key: string) => {
  if (key) {
    API_CONFIG.apiKey = key.trim()
  }
}

// 请求配置接口
interface ChatRequestConfig {
  model: ModelType | string
  temperature?: number
  max_tokens?: number
  stream?: boolean
  system_message?: string
}

// 默认配置
const DEFAULT_CONFIG: ChatRequestConfig = {
  model: ModelType.V3,
  temperature: 0.7,
  max_tokens: 4000,
  stream: true,
  system_message: '你是一个全能的多模态助手，支持文档识别、音视频分析和深度对话。'
}

export interface StreamChunk {
  content?: string
  reasoning_content?: string
  usage?: {
    prompt_tokens: number
    completion_tokens: number
    total_tokens: number
  }
}

/**
 * AI聊天服务类
 */
class AIChatService {
  public config: ChatRequestConfig

  constructor(config: Partial<ChatRequestConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config }
  }

  /**
   * 更新配置
   */
  updateConfig(newConfig: Partial<ChatRequestConfig>) {
    this.config = { ...this.config, ...newConfig }
  }

  // 流式聊天核心方法
  async streamChat(messages: ChatCompletionRequestMessage[], onChunk: (chunk: StreamChunk) => void, options: { signal?: AbortSignal } = {}) {
    try {
      const requestMessages = [
        { role: 'system', content: this.config.system_message },
        ...messages
      ]

      const response = await fetch(`${API_CONFIG.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.apiKey}`
        },
        body: JSON.stringify({
          messages: requestMessages,
          model: this.config.model,
          temperature: this.config.temperature,
          max_tokens: this.config.max_tokens,
          stream: true,
          stream_options: { include_usage: true } // 重要：包含 token 统计
        }),
        signal: options.signal
      })

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.error?.message || errorData.message || '聊天服务出错了')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      if (!reader) throw new Error('读取流失败')

      while (true) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value, { stream: true })
        const lines = chunk.split('\n').filter(line => line.trim() !== '')

        for (const line of lines) {
          if (line.includes('[DONE]')) continue
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              const streamChunk: StreamChunk = {}

              // 处理内容增量
              if (data.choices?.[0]?.delta?.content !== undefined) {
                streamChunk.content = data.choices[0].delta.content
              }

              // 处理思维链增量
              if (data.choices?.[0]?.delta?.reasoning_content !== undefined) {
                streamChunk.reasoning_content = data.choices[0].delta.reasoning_content
              }

              // 处理使用统计
              if (data.usage) {
                streamChunk.usage = data.usage
              }

              if (streamChunk.content !== undefined || streamChunk.reasoning_content !== undefined || streamChunk.usage) {
                onChunk(streamChunk)
              }
            } catch (e) {
              // 某些中间环节可能产生不完整 JSON
            }
          }
        }
      }
    } catch (error: any) {
      if (error.name === 'AbortError') {
        return // 正常中断，不报错
      }
      console.error('Stream Chat API error:', error)
      throw new Error(error.message || '聊天服务出错了')
    }
  }
}

// 导出服务实例
export const aiService = new AIChatService()

/**
 * 判断模型是否支持多模态 (视觉/语音/视频)
 */
export const isVLMModel = (model: string): boolean => {
  const vlmKeywords = ['vl', 'ocr', 'omni', '3.5-4b']
  const lowerModel = model.toLowerCase()
  return vlmKeywords.some(kw => lowerModel.includes(kw))
}
