<template>
  <!-- 聊天输入组件 -->
  <div class="chat-input">
    <div class="input-wrapper">
      <el-input
        v-model="message"
        type="textarea"
        :maxlength="2000"
        :autosize="{ minRows: 1, maxRows: 4 }"
        show-word-limit
        resize="none"
        placeholder="输入您的问题...(按住 Shift + Enter 可进行换行)"
        @keydown.enter.exact.prevent="handleSend"
        @keydown.enter.shift="handleNewline"
        :disabled="disabled"
        class="custom-input"
      />
      <el-button
        type="primary"
        :loading="disabled"
        @click="handleSend"
        :disabled="!message.trim()"
        class="send-button"
      >
        <template #icon>
          <el-icon><Position /></el-icon>
        </template>
        发送
      </el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Position } from '@element-plus/icons-vue'

// 组件属性定义
const props = defineProps<{
  disabled?: boolean    // 禁用状态
}>()

// 定义事件
const emit = defineEmits<{
  send: [message: string]  // 发送消息事件
}>()

// 输入内容
const message = ref('')

// 发送消息处理
const handleSend = () => {
  const trimmedMessage = message.value.trim()
  if (!trimmedMessage || props.disabled) return

  emit('send', trimmedMessage)
  message.value = ''
}

// 处理 Shift+Enter 换行
const handleNewline = (e: KeyboardEvent) => {
  // 允许默认的换行行为
  if (props.disabled) {
    e.preventDefault()
  }
}
</script>

<style scoped>
/* 输入区域容器样式 */
.chat-input {
  padding: 16px 24px;
  border-top: 1px solid #eee;
  background: #fff;
  border-radius: 0 0 16px 16px;
  position: relative;
}

/* 输入框包装器 */
.input-wrapper {
  position: relative;
  display: flex;
  gap: 12px;
  align-items: flex-start;
}

/* 输入框样式优化 */
.custom-input {
  flex: 1;
  transition: all 0.3s ease;
}

.custom-input :deep(.el-textarea__inner) {
  padding: 12px 16px;
  padding-right: 120px; /* 为字数限制留出空间 */
  font-size: 14px;
  border-radius: 12px;
  border: 1px solid #e4e7ed;
  background: #f9fafb;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.02);
  transition: all 0.3s ease;
  line-height: 1.6;
  min-height: 48px;
  resize: none;
}

.custom-input :deep(.el-textarea__inner:hover) {
  background: #fff;
  border-color: #c0c4cc;
}

.custom-input :deep(.el-textarea__inner:focus) {
  background: #fff;
  border-color: #409eff;
  box-shadow: 0 0 0 2px rgba(64, 158, 255, 0.1);
}

/* 字数限制样式 */
.custom-input :deep(.el-input__count) {
  position: absolute;
  right: 12px;
  bottom: 8px;
  background: transparent;
  font-size: 12px;
  color: #909399;
  padding: 0;
  height: auto;
  line-height: 1;
  margin: 0;
}

/* 发送按钮样式 */
.send-button {
  padding: 0 24px;
  font-size: 14px;
  border-radius: 10px;
  height: 48px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 500;
  white-space: nowrap;
  flex-shrink: 0;
}

.send-button:not(:disabled) {
  background: linear-gradient(135deg, #409eff, #3a8ee6);
  border: none;
}

.send-button:not(:disabled):hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
}

.send-button:not(:disabled):active {
  transform: translateY(0);
}

.send-button :deep(.el-icon) {
  font-size: 16px;
  margin-right: 4px;
  vertical-align: -2px;
}

/* 禁用状态样式 */
.custom-input :deep(.el-textarea__inner:disabled) {
  background: #f5f7fa;
  border-color: #e4e7ed;
  cursor: not-allowed;
  opacity: 0.7;
}

/* 响应式调整 */
@media (max-width: 768px) {
  .chat-input {
    padding: 12px 16px;
  }

  .input-wrapper {
    gap: 8px;
  }

  .send-button {
    padding: 0 16px;
    height: 48px;
  }

  .custom-input :deep(.el-textarea__inner) {
    padding-right: 90px;
  }
}

/* 超小屏幕隐藏发送按钮文字 */
@media (max-width: 480px) {
  .send-button {
    padding: 0;
    width: 48px;
  }

  .send-button :deep(.el-icon) {
    margin: 0;
  }

  .send-button span:not(.el-icon) {
    display: none;
  }
}
</style>
