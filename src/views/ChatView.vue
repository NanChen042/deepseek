<template>
  <div class="h-[calc(100vh-72px)] overflow-hidden">
    <ChatContainer
      :messages="chatStore.messages"
      :loading="chatStore.loading"
      @send="handleSend"
      @continue="handleContinue"
      @clear="chatStore.clearChat"
      @modelChange="handleModelChange"
    />
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useChatStore } from '../stores/chat'
import { ModelType } from '@/services/aiService'
import ChatContainer from '@/components/chat/ChatContainer.vue'

const chatStore = useChatStore()
const route = useRoute()
const router = useRouter()

// 处理模型切换
const handleModelChange = (model: ModelType) => {
  chatStore.switchModel(model)
  ElMessage.success({
    message: `模型已切换: ${model === ModelType.Reasoner ? 'R1 推理增强' : 'V3 通用对话'}`,
    duration: 2000
  })
}

const handleSend = async (message: string) => {
  try {
    await chatStore.sendMessage(message)
  } catch (error: any) {
    ElMessage.error({
      message: error.message || '发送失败，请检查网络连接',
      duration: 5000,
      showClose: true
    })
  }
}

const handleContinue = async (prefix: string) => {
  // 注意：multi-session 下的 continueGenerating 需要调整或暂时禁用
  // 这里暂时保持简单调用
  // await chatStore.continueGenerating(prefix)
}

// 处理来自首页的搜索请求
const checkInitialPrompt = async () => {
  const queryPrompt = route.query.q as string
  const queryModel = route.query.model as string

  // 处理模型选择
  if (queryModel === "reasoner") {
    chatStore.switchModel(ModelType.Reasoner)
  } else if (queryModel === "chat") {
    chatStore.switchModel(ModelType.Chat)
  }

  if (queryPrompt && queryPrompt.trim()) {
    // 1. 创建新会话
    chatStore.createSession()
    // 2. 发送初始消息
    await handleSend(queryPrompt)
    // 3. 清理 URL 参数，防止刷新重发
    router.replace({ path: '/chat', query: {} })
  } else {
    // 如果没有初始消息
    if (chatStore.sessions.length === 0) {
      // 没有任何历史记录，创建一个新会话
      chatStore.createSession()
    } else if (!chatStore.activeSessionId) {
      // 有历史记录但没选中，默认选中第一个（最近的）
      chatStore.activeSessionId = chatStore.sessions[0].id
    }
  }
}

onMounted(() => {
  checkInitialPrompt()
})

// 监听 URL 变化（如果用户在 chat 页面又从首页点了新搜索）
watch(() => route.query.q, () => {
  checkInitialPrompt()
})
</script>
