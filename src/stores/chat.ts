import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'
import { aiService, ModelType, ChatCompletionRequestMessage } from '@/services/aiService'

export interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  reasoning_content?: string
  prefix?: boolean
}

export interface ChatSession {
  id: string
  title: string
  messages: Message[]
  updatedAt: number
}

const STORAGE_KEY = 'deepseek_chat_sessions'

export const useChatStore = defineStore('chat', () => {
  // 从 localStorage 恢复所有会话
  const loadSessions = (): ChatSession[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) {
        return JSON.parse(stored)
      }
    } catch (e) {
      console.error('Failed to parse chat sessions', e)
    }
    return []
  }

  const sessions = ref<ChatSession[]>(loadSessions())
  const activeSessionId = ref<string>(sessions.value[0]?.id || '')
  const loading = ref(false)

  // 计算当前活动的会话
  const activeSession = computed(() => 
    sessions.value.find(s => s.id === activeSessionId.value)
  )

  const messages = computed(() => activeSession.value?.messages || [])

  // 监听持久化
  watch(sessions, (newSessions) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSessions))
  }, { deep: true })

  // 创建新会话
  const createSession = (initialTitle = '新对话'): string => {
    const id = Date.now().toString()
    sessions.value.unshift({
      id,
      title: initialTitle,
      messages: [],
      updatedAt: Date.now()
    })
    activeSessionId.value = id
    return id
  }

  // 切换会话
  const switchSession = (id: string) => {
    activeSessionId.value = id
  }

  // 删除会话
  const deleteSession = (id: string) => {
    const index = sessions.value.findIndex(s => s.id === id)
    if (index !== -1) {
      sessions.value.splice(index, 1)
      if (activeSessionId.value === id) {
        activeSessionId.value = sessions.value[0]?.id || ''
      }
    }
  }

  // 生成标题的逻辑
  const updateSessionTitle = (sessionId: string, text: string) => {
    const session = sessions.value.find(s => s.id === sessionId)
    if (session && session.title === '新对话') {
      session.title = text.slice(0, 20) || '新对话'
    }
  }

  // 核心流式发送逻辑
  const streamMessage = async (sessionId: string, payload: ChatCompletionRequestMessage[]) => {
    const session = sessions.value.find(s => s.id === sessionId)
    if (!session) return

    loading.value = true

    // 添加一个空的 assistant 消息用于接收流式数据
    session.messages.push({
      role: 'assistant',
      content: '',
      reasoning_content: ''
    })

    const targetIdx = session.messages.length - 1

    try {
      await aiService.streamChat(payload, (chunk) => {
        if (chunk.reasoning_content) {
          session.messages[targetIdx].reasoning_content = (session.messages[targetIdx].reasoning_content || '') + chunk.reasoning_content
        }
        if (chunk.content) {
          session.messages[targetIdx].content += chunk.content
        }
        session.updatedAt = Date.now()
      })
    } catch (error) {
      console.error('Error during streaming:', error)
      session.messages[targetIdx].content += '\n\n**[网络连接中断致使回答未完成]**'
      throw error
    } finally {
      loading.value = false
    }
  }

  // 发送消息
  const sendMessage = async (message: string) => {
    // 如果当前没有活动会话，先创建一个
    if (!activeSessionId.value) {
      createSession()
    }

    const sessionId = activeSessionId.value
    const session = sessions.value.find(s => s.id === sessionId)
    if (!session) return

    // 第一次发送时更新标题
    if (session.messages.length === 0) {
      updateSessionTitle(sessionId, message)
    }

    session.messages.push({
      role: 'user',
      content: message
    })

    const payload = session.messages.map(m => ({
      role: m.role,
      content: m.content
    }))

    await streamMessage(sessionId, payload)
  }

  // 清空当前对话（ChatGPT 模式下通常是删除并新建，这里保留清空逻辑但改为清除当前会话内容）
  const clearChat = () => {
    if (activeSession.value) {
      activeSession.value.messages = []
      activeSession.value.title = '新对话'
    }
  }

  const switchModel = (model: ModelType) => {
    aiService.updateConfig({
      model,
      system_message: model === ModelType.Reasoner
        ? '你是一个专注于逻辑推理和问题分析的Deepseek。'
        : '你是一个友好的中文助手。'
    })
  }

  // 初始化检查
  if (sessions.value.length === 0) {
    // createSession() // 如果需要默认开启一个
  }

  return {
    sessions,
    activeSessionId,
    activeSession,
    messages,
    loading,
    createSession,
    switchSession,
    deleteSession,
    sendMessage,
    clearChat,
    switchModel
  }
})
