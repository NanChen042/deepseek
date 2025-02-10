<template>
  <!-- 消息气泡组件 -->
  <div :class="['message', isUser ? 'message-user' : 'message-ai']">
    <div class="message-content">
      <!-- 头像区域 -->
      <div class="avatar-wrapper">
        <el-avatar 
          :size="40" 
          :class="isUser ? 'user-avatar' : 'ai-avatar'"
          :src="isUser ? userAvatar : undefined"
        >
          <el-icon v-if="isUser && !userAvatar"><User /></el-icon>
          <el-icon v-if="!isUser"><Service /></el-icon>
        </el-avatar>
      </div>
      <!-- 消息内容区域 -->
      <div class="bubble-wrapper">
        <div class="bubble">
          <TypeWriter
            v-if="!isUser && useTypewriter"
            :text="content"
            :speed="30"
            @complete="$emit('complete')"
          />
          <span v-else>{{ content }}</span>
        </div>
        <!-- 消息时间 -->
        <div class="time">{{ formatTime() }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User, Service } from '@element-plus/icons-vue'
import userAvatar from '@/assets/user.jpg'

// 组件属性定义
defineProps<{
  content: string      // 消息内容
  isUser: boolean      // 是否为用户消息
  useTypewriter?: boolean  // 是否使用打字机效果
}>()

// 定义事件
defineEmits<{
  complete: []      // 打字完成事件
}>()

// 格式化时间方法
const formatTime = () => {
  const now = new Date()
  return `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
}
</script>

<style scoped>
/* 消息容器基础样式 */
.message {
  display: flex;
  margin-bottom: 20px;
  animation: fadeIn 0.3s ease-in-out;
}

/* 头像样式 */
.message-content {
  display: flex;
  align-items: flex-start;
  gap: 12px;
  max-width: 70%;
}

/* 用户头像样式 */
.avatar-wrapper {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
}

.user-avatar {
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.2);
}

.user-avatar :deep(img) {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.ai-avatar {
  background: #67c23a;
  box-shadow: 0 2px 8px rgba(103, 194, 58, 0.2);
}

/* 气泡容器样式 */
.bubble-wrapper {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.message-user {
  justify-content: flex-end;
}

.message-user .message-content {
  flex-direction: row-reverse;
}

/* 消息气泡样式 */
.bubble {
  padding: 16px 20px;
  border-radius: 12px;
  background: #fff;
  line-height: 1.6;
  font-size: 15px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  position: relative;
  transition: all 0.3s ease;
}

.bubble:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.message-user .bubble {
  background: #409eff;
  color: white;
}

/* 时间显示样式 */
.time {
  font-size: 12px;
  color: #909399;
  margin: 0 8px;
  opacity: 0.8;
}

.message-user .time {
  text-align: right;
}

/* 动画效果 */
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style> 