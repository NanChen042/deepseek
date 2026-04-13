<template>
  <div class="h-screen overflow-hidden">
    <ChatContainer
      :messages="chatStore.messages"
      :loading="chatStore.loading"
      @send="handleSend"
      @clear="chatStore.clearChat"
      @modelChange="chatStore.switchModel"
      @regenerate="chatStore.regenerateMessage"
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

// 模型切换已由 store.switchModel 集中处理 (内含通知)

const handleSend = async (message: string, mode: 'chat' | 'image' = 'chat', options: any = {}) => {
  try {
    await chatStore.sendMessage(message, mode, options)
  } catch (error: any) {
    ElMessage.error({
      message: error.message || '发送失败，请检查网络连接',
      duration: 5000,
      showClose: true
    })
  }
}


// 处理来自首页的搜索请求
const checkInitialPrompt = async () => {
  const queryPrompt = route.query.q as string
  const mode = (route.query.mode as 'chat' | 'image') || 'chat'
  const queryModel = route.query.model as ModelType

  if (queryPrompt && queryPrompt.trim()) {
    // 1. 创建新会话
    chatStore.createSession()
    // 2. 切换模型 (如果首页指定了)
    if (queryModel) chatStore.switchModel(queryModel)
    
    // 3. 提取预选资产 (从 HomeView 传入的)
    const options: any = {}
    if ((chatStore as any)._pendingAssets) {
      options.assets = (chatStore as any)._pendingAssets
      ;(chatStore as any)._pendingAssets = null // 使用完后清空
    }

    // 4. 发送初始消息 (支持对话或绘画)
    await chatStore.sendMessage(queryPrompt, mode, options)
    // 5. 清理 URL 参数，防止刷新重发
    router.replace({ path: '/chat', query: {} })
  } else {
    // 如果没有初始消息
    if (chatStore.sessions.length === 0) {
      chatStore.createSession()
    } else if (!chatStore.activeSessionId) {
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
