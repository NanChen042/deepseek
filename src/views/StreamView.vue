<template>
  <div class="h-[calc(100vh-72px)] w-full bg-white">
    <ChatContainer
      title="DeepSeek 流式输出"
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
import { ref, nextTick } from 'vue'
import { ElMessage } from 'element-plus'
import { aiService, ModelType } from '../services/aiService'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  reasoning_content?: string // 新增：支持思维链字段
}

const messages = ref<Message[]>([
  {
    role: 'assistant',
    content: '你好！我是 DeepSeek 流式输出模式，文字会实时生成。你可以问我任何问题。',
    reasoning_content: ''
  }
])

const loading = ref(false)

// 处理模型切换
const handleModelChange = (model: ModelType) => {
  aiService.updateConfig({
    model,
    stream: true,
    system_message: model === ModelType.Reasoner
      ? '你是一个专注于逻辑推理和问题分析的Deepseek。'
      : '你是一个友好的中文助手。'
  })
  ElMessage.success(`已切换至 ${model === ModelType.Reasoner ? 'DeepSeek-R1 (推理增强)' : 'DeepSeek-V3 (通用对话)'}`)
}

// 核心发送逻辑
const handleSend = async (message: string) => {
  // 1. 添加用户消息
  messages.value.push({ role: 'user', content: message })
  loading.value = true

  // 2. 预先推入一个空的 AI 回复占位（包含 content 和 reasoning_content）
  const assistantMessage: Message = {
    role: 'assistant',
    content: '',
    reasoning_content: ''
  }
  messages.value.push(assistantMessage)

  try {
    // 3. 调用流式接口
    await aiService.streamChat(messages.value.slice(0, -1), async (chunk) => {
      let hasUpdate = false

      // 实时追加正文内容
      if (chunk.content) {
        assistantMessage.content += chunk.content
        hasUpdate = true
      }
      
      // 实时追加思考过程内容
      if (chunk.reasoning_content) {
        assistantMessage.reasoning_content += chunk.reasoning_content
        hasUpdate = true
      }

      if (hasUpdate) {
        // 关键点：创建一个新数组触发 Vue 深度响应，同时也触发 ChatContainer 的滚动监听
        messages.value = [...messages.value]
        await nextTick()
      }
    })
  } catch (error) {
    console.error('流式输出错误:', error)
    ElMessage.error('网络或服务异常，请重试')
    messages.value.pop() // 发送失败时撤回那个空的 AI 气泡
  } finally {
    loading.value = false
  }
}

// 清除聊天记录
const clearChat = () => {
  messages.value = [{
    role: 'assistant',
    content: '对话已清空。我们可以重新开始了。'
  }]
}
</script>

<style scoped>
/* 惊不惊喜？这里不需要任何 CSS！
  拖拽面板的样式被彻底删除。
  页面结构完全依赖 Tailwind CSS，样式美化全部由底层的 ChatContainer 和 MessageBubble 负责。
*/
</style>