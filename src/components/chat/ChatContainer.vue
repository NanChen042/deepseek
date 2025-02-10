<template>
  <!-- 聊天容器主组件 -->
  <div class="chat-container">
    <!-- 聊天头部：标题和清空按钮 -->
    <div class="chat-header">
      <div class="header-left">
        <h3>{{ title }}</h3>
        <el-select
          v-model="currentModel"
          size="small"
          class="model-select"
          :disabled="loading"
        >
          <el-option
            v-for="(label, model) in modelOptions"
            :key="model"
            :label="label"
            :value="model"
          />
        </el-select>
      </div>
      <el-button
        type="danger"
        plain
        class="clear-button"
        @click="showClearConfirm"
      >
        <template #icon>
          <el-icon><Delete /></el-icon>
        </template>
        清空全部对话
      </el-button>
    </div>

    <!-- 消息列表区域：包含所有对话内容 -->
    <div class="chat-messages" ref="messagesContainer">
      <!-- 循环渲染消息气泡 -->
      <MessageBubble
        v-for="(message, index) in messages"
        :key="index"
        :content="message.content"
        :is-user="message.role === 'user'"
        :use-typewriter="!initialLoad && !streamMode && message.role === 'assistant'"
        @complete="handleMessageComplete(index)"
      />
      <!-- AI思考中状态显示 -->
      <div v-if="loading && (!messages.length || messages[messages.length - 1].role === 'user')"
           class="message message-ai thinking-message">
        <div class="message-content">
          <div class="avatar-wrapper">
            <el-avatar :size="40" class="ai-avatar">
              <el-icon><Service /></el-icon>
            </el-avatar>
          </div>
          <div class="bubble-wrapper">
            <div class="bubble thinking-bubble">
              <div class="dots-container">
                <span class="dot"></span>
                <span class="dot"></span>
                <span class="dot"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 输入区域组件 -->
    <ChatInput
      :disabled="loading || isTyping"
      @send="$emit('send', $event)"
    />

    <!-- 确认弹窗 -->
    <el-dialog
      v-model="showConfirmDialog"
      title="确认清空"
      width="400px"
      :show-close="false"
      class="clear-dialog"
    >
      <div class="dialog-content">
        <el-icon class="warning-icon" color="#E6A23C"><Warning /></el-icon>
        <p>确定要清空所有对话记录吗？</p>
        <p class="warning-text">此操作不可恢复</p>
      </div>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="showConfirmDialog = false">取消</el-button>
          <el-button type="danger" @click="handleClear">
            确认清空
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from 'vue'
import { Service, Loading, Delete, Warning } from '@element-plus/icons-vue'
import { ModelType } from '@/services/aiService'

// 消息类型定义
interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
}

// 组件属性定义
const props = defineProps<{
  title?: string          // 聊天标题
  messages: Message[]     // 消息列表
  loading?: boolean       // 加载状态
  streamMode?: boolean     // 新增流式模式属性
}>()

// 定义组件事件
const emit = defineEmits<{
  send: [message: string]
  clear: []
  modelChange: [model: ModelType]
}>()

// 组件状态
const messagesContainer = ref<HTMLElement | null>(null)
const isTyping = ref(false)
const initialLoad = ref(true) // 添加初始加载标记

// 确认弹窗状态
const showConfirmDialog = ref(false)

// 模型选项
const modelOptions = {
  [ModelType.Chat]: 'DeepSeek-V3 (通用对话)',
  [ModelType.Reasoner]: 'DeepSeek-R1 (推理增强)'
}

// 当前选择的模型
const currentModel = ref<ModelType>(ModelType.Chat)

// 处理消息打字完成事件
const handleMessageComplete = (index: number) => {
  if (index === props.messages.length - 1) {
    isTyping.value = false
  }
}

// 监听新消息，控制打字机效果
watch(() => props.messages, (newMessages, oldMessages) => {
  // 跳过初始加载的消息
  if (initialLoad.value) {
    initialLoad.value = false
    return
  }

  if (newMessages.length > oldMessages?.length) {
    const lastMessage = newMessages[newMessages.length - 1]
    // 只在非流式模式下启用打字机效果
    if (lastMessage.role === 'assistant' && !props.streamMode) {
      isTyping.value = true
    }
  }
}, { deep: true })

// 监听模型变化
watch(currentModel, (newModel) => {
  emit('modelChange', newModel)
})

// 滚动到底部方法
const scrollToBottom = async () => {
  await nextTick()
  if (messagesContainer.value) {
    messagesContainer.value.scrollTop = messagesContainer.value.scrollHeight
  }
}

// 监听消息变化，自动滚动
watch(() => props.messages, scrollToBottom, { deep: true })

// 组件挂载时滚动到底部
onMounted(() => {
  scrollToBottom()
  // 初始加载完成后重置标记
  nextTick(() => {
    initialLoad.value = false
  })
})

// 显示确认弹窗
const showClearConfirm = () => {
  showConfirmDialog.value = true
}

// 处理清空操作
const handleClear = () => {
  showConfirmDialog.value = false
  emit('clear')
}
</script>

<style scoped>
/* 容器基础样式 */
.chat-container {
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  background: #fff;
  border-radius: 16px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  overflow: hidden;
}

/* 头部样式优化 */
.chat-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  padding: 16px 24px;  /* 减小内边距 */
  background: #fff;
  border-bottom: 1px solid #eee;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.02);  /* 减小阴影 */
  z-index: 1;
}

.chat-header h3 {
  font-size: 18px;  /* 减小标题字号 */
  font-weight: 600;
  color: #303133;
  margin: 0;
}

/* 在线状态指示器调整 */
.chat-header h3::before {
  width: 6px;  /* 减小指示点大小 */
  height: 6px;
  margin-right: 8px;
}

/* 消息列表区域样式 */
.chat-messages {
  flex: 1;
  overflow-y: auto;
  padding: 30px;
  display: flex;
  flex-direction: column;
  gap: 24px;
  background: #f9fafb;
  background-image:
    radial-gradient(circle at 25px 25px, rgba(0, 0, 0, 0.02) 2%, transparent 0%),
    radial-gradient(circle at 75px 75px, rgba(0, 0, 0, 0.02) 2%, transparent 0%);
  background-size: 100px 100px;
  scroll-behavior: smooth;
  scrollbar-width: thin;
  scrollbar-color: transparent transparent;
}

/* 加载动画 */
.loading {
  animation: rotating 2s linear infinite;
  margin-right: 8px;
}

@keyframes rotating {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

/* 自定义滚动条样式 */
.chat-messages::-webkit-scrollbar {
  width: 4px;
}

.chat-messages::-webkit-scrollbar-track {
  background: transparent;
}

.chat-messages::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  transition: all 0.3s ease;
}

/* 只在悬停时显示滚动条 */
.chat-messages:hover::-webkit-scrollbar-thumb {
  background-color: rgba(0, 0, 0, 0.2);
}

/* 响应式布局 */
@media (max-width: 1400px) {
  .chat-container {
    max-width: 1000px;
  }
}

@media (max-width: 1200px) {
  .chat-container {
    height: 100%;
    margin: 0;
    border-radius: 0;
  }

  .chat-view {
    padding: 0;
  }
}

/* 思考中状态样式 */
.thinking-message {
  opacity: 0.8;
  animation: fadeInUp 0.3s ease-out;
}

/* 思考中的气泡样式 */
.thinking-bubble {
  min-width: 60px;
  padding: 12px 16px !important;
  background: rgba(255, 255, 255, 0.9) !important;
  backdrop-filter: blur(8px);
}

/* 跳动点动画 */
.dots-container {
  display: flex;
  align-items: center;
  gap: 6px;
  height: 20px;
  padding: 0 4px;
}

.dot {
  width: 8px;
  height: 8px;
  background: #67c23a;
  border-radius: 50%;
  display: inline-block;
  opacity: 0.8;
  animation: bounce 1.4s infinite ease-in-out both;
}

.dot:nth-child(1) {
  animation-delay: -0.32s;
}

.dot:nth-child(2) {
  animation-delay: -0.16s;
}

@keyframes bounce {
  0%, 80%, 100% {
    transform: scale(0);
  }
  40% {
    transform: scale(1);
  }
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 0.8;
    transform: translateY(0);
  }
}

/* 消息位置调整 */
.message-ai.thinking-message {
  margin: 0;
  padding-top: 12px;
}

.message-ai.thinking-message .message-content {
  align-items: center;
  display: flex;
}

.ai-avatar {
  background: #67c23a;
  box-shadow: 0 2px 8px rgba(103, 194, 58, 0.2);
}

.avatar-wrapper {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.bubble-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.message {
  transition: transform 0.3s ease-out;
}

.thinking-message {
  position: sticky;
  bottom: 30px;
  margin-top: 20px;
  z-index: 1;
}

/* 清空按钮样式调整 */
.clear-button {
  padding: 8px 16px;  /* 减小按钮内边距 */
  font-size: 13px;    /* 减小字号 */
  height: 32px;       /* 固定高度 */
}

.clear-button :deep(.el-icon) {
  font-size: 14px;    /* 减小图标大小 */
  margin-right: 4px;
  vertical-align: -1px;
}

/* 头部布局间距调整 */
.header-left {
  gap: 12px;  /* 减小间距 */
}

/* 优化动画效果 */
@keyframes pulse {
  0% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(103, 194, 58, 0.3);
  }
  70% {
    transform: scale(1);
    box-shadow: 0 0 0 4px rgba(103, 194, 58, 0);
  }
  100% {
    transform: scale(0.95);
    box-shadow: 0 0 0 0 rgba(103, 194, 58, 0);
  }
}

/* 弹窗样式 */
.clear-dialog :deep(.el-dialog__header) {
  padding: 20px 24px;
  margin: 0;
  border-bottom: 1px solid #eee;
}

.clear-dialog :deep(.el-dialog__title) {
  font-size: 18px;
  font-weight: 600;
}

.clear-dialog :deep(.el-dialog__body) {
  padding: 30px 24px;
}

.clear-dialog :deep(.el-dialog__footer) {
  padding: 16px 24px;
  border-top: 1px solid #eee;
}

.dialog-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

.warning-icon {
  font-size: 48px;
  margin-bottom: 16px;
}

.dialog-content p {
  margin: 0;
  font-size: 16px;
  color: #303133;
}

.warning-text {
  margin-top: 8px !important;
  font-size: 14px !important;
  color: #909399 !important;
}

.dialog-footer {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* 弹窗动画 */
.clear-dialog :deep(.el-overlay) {
  backdrop-filter: blur(4px);
}

.clear-dialog :deep(.el-dialog) {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

/* 按钮样式优化 */
.dialog-footer :deep(.el-button) {
  padding: 10px 20px;
  border-radius: 6px;
  font-weight: 500;
}

.dialog-footer :deep(.el-button--danger) {
  box-shadow: 0 2px 8px rgba(245, 108, 108, 0.2);
}

.dialog-footer :deep(.el-button--danger:hover) {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(245, 108, 108, 0.3);
}

/* 模型选择器样式优化 */
.model-select {
  width: 200px;
}

:deep(.el-select .el-input__wrapper) {
  padding: 0 12px;  /* 减小内边距 */
  height: 32px;     /* 减小高度 */
}

:deep(.el-select .el-input__inner) {
  font-size: 13px;  /* 减小字号 */
}
</style>
