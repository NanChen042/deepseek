import { defineStore } from 'pinia'
import { ref } from 'vue'
import { aiService, ModelType } from '@/services/aiService'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export const useChatStore = defineStore('chat', () => {
  // 初始化消息列表，包含欢迎消息
  const messages = ref<Message[]>([{
    role: 'assistant',
    content: '你好！我是Deepseek，很高兴为您服务。'
  }])

  const loading = ref(false)

  // 发送消息
  const sendMessage = async (message: string) => {
    messages.value.push({
      role: 'user',
      content: message
    })

    loading.value = true

    try {
      const aiResponse = aiService.config.model === ModelType.Reasoner
        ? await aiService.reason(message)
        : await aiService.chat(messages.value)

      messages.value.push({
        role: 'assistant',
        content: aiResponse
      })
    } catch (error) {
      console.error('Error:', error)
      messages.value.pop() // 发生错误时移除用户消息
      throw error // 让组件处理错误
    } finally {
      loading.value = false
    }
  }

  // 清空对话
  const clearChat = () => {
    messages.value = [{
      role: 'assistant',
      content: '你好！我是Deepseek，很高兴为您服务。'
    }]
  }

  // 切换模型
  const switchModel = (model: ModelType) => {
    aiService.updateConfig({
      model,
      system_message: model === ModelType.Reasoner
        ? '你是一个专注于逻辑推理和问题分析的Deepseek。'
        : '你是一个友好的中文助手。'
    })
  }

  return {
    messages,
    loading,
    sendMessage,
    clearChat,
    switchModel
  }
})
