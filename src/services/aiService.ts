import axios from 'axios'
import { ElMessage } from 'element-plus'

// 定义消息类型
interface ChatCompletionRequestMessage {
  role: 'system' | 'user' | 'assistant'
  content: string
  name?: string
}

// API 配置
const API_CONFIG = {
  baseURL: 'https://api.siliconflow.cn/v1',  // 修改为完整的v1路径
  apiKey: import.meta.env.VITE_DEEPSEEK_API_KEY
}

// 添加调试信息
console.log('API Key configured:', !!API_CONFIG.apiKey)
console.log('Base URL:', API_CONFIG.baseURL)

// 可以添加一个检查
if (!API_CONFIG.apiKey) {
  console.error('API密钥未配置，请在.env文件中设置VITE_DEEPSEEK_API_KEY')
}

// 模型类型
export enum ModelType {
  Chat = 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B',      // DeepSeek-V3
  Reasoner = 'deepseek-ai/DeepSeek-R1-Distill-Qwen-7B' // DeepSeek-R1
}

// 请求配置接口
interface ChatRequestConfig {
  model: ModelType
  temperature?: number
  max_tokens?: number
  stream?: boolean
  system_message?: string
  presence_penalty?: number
  frequency_penalty?: number
  top_p?: number
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
      role: string
    }
    finish_reason: string
  }>
}

interface ResponseProgress {
  status: 'processing' | 'completed'
  partial_content?: string
  content?: string
}

/**
 * AI聊天服务类
 */
class AIChatService {
  public config: ChatRequestConfig
  private currentRequestId: string | null = null
  private currentResponse: string = ''
  private currentIndex: number = 0
  private isGenerating: boolean = false

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
      const requestBody = {
        messages: [
          { role: 'system', content: this.config.system_message },
          ...messages
        ],
        model: this.config.model,
        temperature: this.config.temperature,
        max_tokens: this.config.max_tokens,
        stream: this.config.stream
      }

      console.log('Sending request:', requestBody)

      const response = await axios.post<ChatResponse>(
        `${API_CONFIG.baseURL}/chat/completions`,
        requestBody,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${API_CONFIG.apiKey}`
          }
        }
      )

      if (!response.data?.choices?.[0]?.message?.content) {
        throw new Error('API 返回数据格式错误')
      }

      return response.data.choices[0].message.content
    } catch (error: any) {
      console.error('Chat error:', error.response?.data || error)
      throw new Error(error.response?.data?.error?.message || '聊天服务出错了')
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
  async streamChat(messages: ChatCompletionRequestMessage[], onChunk: (chunk: StreamChunk) => void) {
    try {
      const response = await fetch(`${API_CONFIG.baseURL}/chat/completions`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${API_CONFIG.apiKey}`
        },
        body: JSON.stringify({
          messages: [
            { role: 'system', content: this.config.system_message },
            ...messages
          ],
          model: this.config.model,
          temperature: 0.7,
          stream: true
        })
      })

      if (!response.ok) {
        const errorData = await response.json()
        console.error('API Error:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        })
        throw new Error(errorData.message || '聊天服务出错了')
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
              const streamChunk: StreamChunk = {}

              // 处理普通内容
              if (data.choices?.[0]?.delta?.content) {
                streamChunk.content = data.choices[0].delta.content
              }

              // 处理思维链内容
              if (data.choices?.[0]?.delta?.reasoning_content) {
                streamChunk.reasoning_content = data.choices[0].delta.reasoning_content
              }

              // 只有当有内容才回调
              if (streamChunk.content || streamChunk.reasoning_content) {
                onChunk(streamChunk)
              }
            } catch (e) {
              console.error('Parse chunk error:', e)
            }
          }
        }
      }
    } catch (error: any) {
      console.error('Stream Chat API error details:', error)
      throw new Error(error.message || '聊天服务出错了')
    }
  }

  // 流式推理
  async streamReason(prompt: string, onChunk: (chunk: StreamChunk) => void) {
    const previousConfig = this.config.model
    try {
      this.config.model = ModelType.Reasoner
      await this.streamChat([{ role: 'user', content: prompt }], onChunk)
    } finally {
      this.config.model = previousConfig
    }
  }

  // 开始一个聊天请求
  async startChat(messages: ChatCompletionRequestMessage[]) {
    try {
      // 使用普通的chat请求获取完整响应
      const response = await this.chat(messages)
      this.currentResponse = response
      this.currentIndex = 0
      this.isGenerating = true
      return true
    } catch (error) {
      throw error
    }
  }

  // 模拟获取响应进度
  async getResponseProgress(): Promise<ResponseProgress> {
    if (!this.isGenerating) {
      return {
        status: 'completed',
        content: this.currentResponse
      }
    }

    // 每次返回一部分内容，模拟打字效果
    const chunkSize = 4 // 每次返回4个字符
    const partial = this.currentResponse.slice(0, this.currentIndex + chunkSize)
    this.currentIndex += chunkSize

    if (this.currentIndex >= this.currentResponse.length) {
      this.isGenerating = false
      return {
        status: 'completed',
        content: this.currentResponse
      }
    }

    return {
      status: 'processing',
      partial_content: partial
    }
  }
}

// 导出服务实例
export const aiService = new AIChatService()

// 为了保持向后兼容
export const chatWithDeepSeek = (messages: ChatCompletionRequestMessage[]) => {
  return aiService.chat(messages)
}

// 在 handleModelChange 中添加日志
const handleModelChange = (model: ModelType) => {
  console.log('Changing model to:', model)
  aiService.updateConfig({
    model,
    stream: true,
    system_message: model === ModelType.Reasoner
      ? '你是一个专注于逻辑推理和问题分析的Deepseek。'
      : '你是一个友好的中文助手。'
  })
  console.log('Current config:', aiService.config)
  ElMessage.success(`已切换至 ${model === ModelType.Reasoner ? '推理增强模型' : '通用对话模型'}`)
}

export const sendChatMessage = async (content: string, model: ModelType): Promise<string> => {
  try {
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: content,
        model: model
      }),
    });

    if (!response.ok) {
      throw new Error('Network response was not ok');
    }

    const data: ChatResponse = await response.json();
    // @ts-ignore
    return data.content;
  } catch (error) {
    console.error('Error sending chat message:', error);
    throw error;
  }
}
