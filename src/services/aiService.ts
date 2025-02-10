import axios from 'axios'

// 定义消息类型
interface ChatCompletionRequestMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
  name?: string
}

// API 配置
const API_CONFIG = {
  baseURL: 'https://api.deepseek.com',
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY
}

// 模型类型
export enum ModelType {
  Chat = 'deepseek-chat',      // DeepSeek-V3
  Reasoner = 'deepseek-reasoner' // DeepSeek-R1
}

// 请求配置接口
interface ChatRequestConfig {
  model: ModelType
  temperature?: number
  max_tokens?: number
  stream?: boolean
  system_message?: string
}

// 默认配置
const DEFAULT_CONFIG: ChatRequestConfig = {
  model: ModelType.Chat,
  temperature: 0.7,
  max_tokens: 2000,
  stream: false,
  system_message: '你是一个友好的中文助手。'
}

interface StreamChunk {
  content?: string
  reasoning_content?: string
}

// 更新响应接口定义
interface ChatResponse {
  choices: Array<{
    message: {
      content: string
      reasoning_content?: string  // 推理模型特有的思维链内容
    }
  }>
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
   * 发送聊天请求
   * @param messages 消息历史
   * @returns
   */
  async chat(messages: ChatCompletionRequestMessage[]) {
    try {
      const response = await axios.post<ChatResponse>(
        `${API_CONFIG.baseURL}/v1/chat/completions`,
        {
          model: this.config.model,
          messages: [
            { role: 'system', content: this.config.system_message },
            ...messages
          ],
          temperature: this.config.temperature,
          max_tokens: this.config.max_tokens,
          stream: this.config.stream
        },
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_CONFIG.apiKey}`
          }
        }
      )

      // 添加响应数据结构检查
      if (!response.data?.choices?.[0]?.message) {
        console.error('Invalid API response:', response.data)
        throw new Error('API 返回数据格式错误')
      }

      const message = response.data.choices[0].message

      // 如果是推理模型，返回包含思维链的完整响应
      if (this.config.model === ModelType.Reasoner) {
        return `思维过程：\n${message.reasoning_content || '无'}\n\n最终答案：\n${message.content}`
      }

      return message.content
    } catch (error: any) {
      console.error('Chat API error:', error)

      // 处理不同的错误状态码
      switch (error.response?.status) {
        case 400:
          throw new Error('请求格式错误，请检查输入参数')
        case 401:
          throw new Error('API密钥无效或已过期，请检查您的API密钥设置')
        case 402:
          throw new Error('账户余额不足，请及时充值')
        case 422:
          throw new Error('请求参数错误：' + (error.response?.data?.message || '请检查输入参数'))
        case 429:
          throw new Error('请求速率超限，请稍后重试')
        case 500:
          throw new Error('服务器内部错误，请稍后重试')
        case 503:
          throw new Error('服务器繁忙，请稍后重试')
        default:
          if (error.message === 'API 返回数据格式错误') {
            throw error
          }
          throw new Error(error.response?.data?.message || '聊天服务出错了')
      }
    }
  }

  /**
   * 使用推理模型
   * @param prompt 提示词
   * @returns
   */
  async reason(prompt: string) {
    const previousConfig = this.config.model
    try {
      this.config.model = ModelType.Reasoner
      const response = await this.chat([{ role: 'user', content: prompt }])
      if (!response) {
        throw new Error('推理服务返回为空')
      }
      return response
    } catch (error: any) {
      console.error('Reasoning error:', error)
      throw new Error(error.message || '推理服务出错了')
    } finally {
      this.config.model = previousConfig
    }
  }

  /**
   * 更新配置
   * @param newConfig 新配置
   */
  updateConfig(newConfig: Partial<ChatRequestConfig>) {
    this.config = { ...this.config, ...newConfig }
    console.log('Model updated:', this.config.model)
  }

  // 流式聊天
  async streamChat(messages: ChatCompletionRequestMessage[], onChunk: (chunk: string) => void) {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/v1/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.apiKey}`
        },
        body: JSON.stringify({
          model: this.config.model,
          messages: [
            { role: 'system', content: this.config.system_message },
            ...messages
          ],
          temperature: this.config.temperature,
          max_tokens: this.config.max_tokens,
          stream: true,
          presence_penalty: 0,
          frequency_penalty: 0,
          n: 1
        })
      })

      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || '聊天服务出错了')
      }

      const reader = response.body?.getReader()
      const decoder = new TextDecoder()

      while (reader) {
        const { done, value } = await reader.read()
        if (done) break

        const chunk = decoder.decode(value)
        const lines = chunk.split('\n').filter(line => line.trim() !== '')

        for (const line of lines) {
          if (line.includes('[DONE]')) continue
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              const content = data.choices[0].delta.content
              if (content) onChunk(content)
            } catch (e) {
              console.error('Parse chunk error:', e)
            }
          }
        }
      }
    } catch (error: any) {
      console.error('Stream Chat API error:', error)
      throw new Error(error.response?.data?.message || '聊天服务出错了')
    }
  }

  // 流式推理
  async streamReason(prompt: string, onChunk: (chunk: string) => void) {
    const previousConfig = this.config.model
    try {
      this.config.model = ModelType.Reasoner
      await this.streamChat([{ role: 'user', content: prompt }], onChunk)
    } finally {
      this.config.model = previousConfig
    }
  }
}

// 导出服务实例
export const aiService = new AIChatService()

// 为了保持向后兼容
export const chatWithDeepSeek = (messages: ChatCompletionRequestMessage[]) => {
  return aiService.chat(messages)
}
