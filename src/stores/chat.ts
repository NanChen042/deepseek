import { defineStore } from 'pinia'
import { ref, watch } from 'vue'
import { ElMessage } from 'element-plus'
import { aiService, ModelType } from '@/services/aiService'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

export const useChatStore = defineStore('chat', () => {
  // 从 localStorage 获取历史消息
  const getStoredMessages = (): Message[] => {
    const stored = localStorage.getItem('chatHistory')
    if (stored) {
      return JSON.parse(stored)
    }
    return [{
      role: 'assistant',
      content: '你好！我是Deepseek，很高兴为您服务。'
    }]
  }

  const messages = ref<Message[]>(getStoredMessages())
  const loading = ref(false)

  // 监听消息变化，保存到 localStorage
  watch(messages, (newMessages) => {
    localStorage.setItem('chatHistory', JSON.stringify(newMessages))
  }, { deep: true })

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
      messages.value.pop()
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
    localStorage.removeItem('chatHistory')
  }

  // 切换模型
  const switchModel = (model: ModelType) => {
    aiService.updateConfig({
      model,
      system_message: model === ModelType.Reasoner
        ? '你是一个专注于逻辑推理和问题分析的Deepseek。'
        : '你是一个友好的中文助手,你的名字是SouthernWind。'
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
