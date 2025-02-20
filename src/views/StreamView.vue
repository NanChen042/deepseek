<template>
  <div class="chat-view">
    <ChatContainer
      title="流式输出模式"
      :messages="messages"
      :loading="loading"
      :stream-mode="true"
      @send="handleSend"
      @clear="clearChat"
      @modelChange="handleModelChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { ElMessage } from 'element-plus'

import { aiService, ModelType } from '@/services/aiService'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

const messages = ref<Message[]>([
  {
    role: 'assistant',
    content: '你好！我是 Deepseek 流式输出模式，文字会实时显示。'
  }
])

const loading = ref(false)

const handleModelChange = (model: ModelType) => {
  aiService.updateConfig({
    model,
    stream: true,
    system_message: model === ModelType.Reasoner
      ? '你是一个专注于逻辑推理和问题分析的Deepseek。'
      : '你是一个友好的中文助手。'
  })
  ElMessage.success(`已切换至 ${model === ModelType.Reasoner ? '推理增强模型' : '通用对话模型'}`)
}

const handleSend = async (message: string) => {
  messages.value.push({
    role: 'user',
    content: message
  })

  loading.value = true

  try {
    // 添加一个空的助手消息用于更新
    const assistantMessage = {
      role: 'assistant' as const,
      content: ''
    }
    messages.value.push(assistantMessage)

    // 发起请求
    await aiService.startChat(messages.value.slice(0, -1))

    // 开始轮询
    const pollResponse = async () => {
      try {
        const response = await aiService.getResponseProgress()

        if (response.status === 'processing') {
          // 更新部分内容
          if (response.partial_content) {
            assistantMessage.content = response.partial_content
          }
          // 继续轮询
          setTimeout(pollResponse, 500)
        } else if (response.status === 'completed') {
          // 更新最终内容
          assistantMessage.content = response.content || ''
          loading.value = false
        }
      } catch (error) {
        console.error('Polling error:', error)
        ElMessage.error('获取回复失败，请重试')
        loading.value = false
      }
    }

    // 开始轮询
    pollResponse()

  } catch (error) {
    console.error('Error:', error)
    ElMessage.error('发送消息失败，请重试')
    messages.value.pop() // 发生错误时移除最后的助手消息
    loading.value = false
  }
}

const clearChat = () => {
  messages.value = [{
    role: 'assistant',
    content: '你好！我是 Deepseek 流式输出模式，文字会实时显示。'
  }]
}
</script>

<style scoped>
.chat-view {
  padding: 20px;
  background: #f5f7fa;
  height: calc(100vh - 60px);
  overflow: hidden;
  box-sizing: border-box;
}
</style>
