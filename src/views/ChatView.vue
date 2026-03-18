<template>
  <div class="p-5 bg-[#f5f7fa] h-[calc(100vh-60px)] overflow-hidden box-border [&_.message-content]:leading-[1.6]">
    <ChatContainer
      title="Deepseek Chat"
      :messages="chatStore.messages"
      :loading="chatStore.loading"
      :prevent-enter-newline="true"
      @send="handleSend"
      @continue="handleContinue"
      @clear="chatStore.clearChat"
      @modelChange="handleModelChange"
    />
  </div>
</template>

<script setup lang="ts">
import { ElMessage, ElMessageBox } from 'element-plus'
import { useChatStore } from '../stores/chat'
import { ModelType } from '@/services/aiService'

const chatStore = useChatStore()

// 处理模型切换
const handleModelChange = (model: ModelType) => {
  chatStore.switchModel(model)
  ElMessage.success(`已切换至 ${model === ModelType.Reasoner ? '推理增强模型' : '通用对话模型'}`)
}

const handleSend = async (message: string) => {
  try {
    await chatStore.sendMessage(message)
  } catch (error) {
    ElMessage.error({
      message: '服务器无响应，请刷新重试',
      duration: 5000,
      showClose: true
    })

    ElMessageBox.confirm(
      '服务器连接失败，是否刷新页面重试？',
      '连接错误',
      {
        confirmButtonText: '刷新页面',
        cancelButtonText: '取消',
        type: 'warning'
      }
    )
      .then(() => {
        window.location.reload()
      })
      .catch(() => {
        // 用户取消刷新
      })
  }
}

const handleContinue = async (prefix: string) => {
  try {
    await chatStore.continueGenerating(prefix)
  } catch (error) {
    ElMessage.error({
      message: '续写请求失败，请稍后重试',
      duration: 3000,
      showClose: true
    })
  }
}
</script>
