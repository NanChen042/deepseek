<template>
  <!-- 消息气泡组件 -->
  <div :class="['message', isUser ? 'message-user' : 'message-ai']">
    <div class="message-content">
      <!-- 头像区域 -->
      <div class="avatar-wrapper">
        <el-avatar
          :size="40"
          :class="[isUser ? 'user-avatar' : 'ai-avatar', {'ai-avatar-loading': loading && isLastMessage}]"
          :src="isUser ? userAvatar : undefined"
        >
          <el-icon v-if="isUser && !userAvatar"><User /></el-icon>
          <template v-if="!isUser">
            <img
              :src="deepseekLogo"
              :class="{'rotate': loading && isLastMessage}"
              alt="AI Avatar"
            >
          </template>
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
          <div v-else class="markdown-content" v-html="renderedContent"></div>
        </div>
        <!-- 消息时间 -->
        <div class="time">{{ formatTime() }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { User } from '@element-plus/icons-vue'
// @ts-ignore - 忽略资源导入错误
import userAvatar from '../../assets/user.jpg'
// @ts-ignore - 忽略资源导入错误
import deepseekLogo from '../../assets/deepseeklogo.svg'
import { ref, computed } from 'vue'
// @ts-ignore
import MarkdownIt from 'markdown-it'

// 实例化markdown-it
const md = new MarkdownIt({
  html: true,        // 启用HTML标签
  breaks: true,      // 转换 '\n' 为 <br>
  linkify: true,     // 自动转换URL为链接
  typographer: true, // 启用一些语言中性的替换和引号
  highlight: function (str: string, lang: string) {
    // 确保代码不会被转义
    const escapedStr = str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');

    // 添加代码语言标识和复制按钮
    let languageClass = lang ? `language-${lang}` : '';
    let languageText = lang ? `<div class="code-language">${lang}</div>` : '';
    let copyButton = `<button class="copy-button" onclick="copyCode(this)">复制</button>`;

    return `<div class="code-block-wrapper">
              <div class="code-block-header">
                ${languageText}
                ${copyButton}
              </div>
              <pre class="${languageClass}"><code>${escapedStr}</code></pre>
            </div>`;
  }
})

// 组件属性定义
const props = defineProps<{
  content: string      // 消息内容
  isUser: boolean      // 是否为用户消息
  useTypewriter?: boolean  // 是否使用打字机效果
  loading?: boolean    // 加载状态
  isLastMessage?: boolean  // 是否为最后一条消息
  timestamp?: number   // 添加时间戳属性
}>()

// 定义事件
defineEmits<{
  complete: []      // 打字完成事件
}>()

// 渲染Markdown内容
const renderedContent = computed(() => md.render(props.content))

// 格式化时间方法
const formatTime = () => {
  const now = new Date()
  const hours = now.getHours()
  const minutes = now.getMinutes()
  const ampm = hours >= 12 ? '下午' : '上午'
  const formattedHours = hours % 12 || 12
  return `${ampm} ${formattedHours}:${minutes.toString().padStart(2, '0')}`
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
  background: white !important;
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.2);
  border: 1px solid rgba(64, 158, 255, 0.1);
  overflow: hidden;  /* 确保圆角生效 */
  border-radius: 50%;  /* 添加圆角 */
}

.user-avatar :deep(img) {
  width: 24px !important;
  height: 24px !important;
  object-fit: contain !important;
  padding: 8px;
  border-radius: 50%;  /* 添加圆角 */
}

/* AI头像样式 */
.ai-avatar {
  background: white !important;
  box-shadow: 0 2px 8px rgba(77, 107, 254, 0.2);
  border: 1px solid rgba(77, 107, 254, 0.1);
  overflow: hidden;  /* 确保圆角生效 */
  border-radius: 50%;  /* 添加圆角 */
}

.ai-avatar img {
  width: 24px;
  height: 24px;
  transition: all 0.3s ease;
  padding: 8px;
  border-radius: 50%;  /* 添加圆角 */
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

/* Markdown内容样式 */
.markdown-content {
  width: 100%;
  font-size: 14px;
  line-height: 1.6;
}

/* 标题样式 */
.markdown-content :deep(h1),
.markdown-content :deep(h2),
.markdown-content :deep(h3),
.markdown-content :deep(h4),
.markdown-content :deep(h5),
.markdown-content :deep(h6) {
  margin-top: 24px;
  margin-bottom: 16px;
  font-weight: 600;
  line-height: 1.25;
}

.markdown-content :deep(h1) {
  font-size: 2em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.markdown-content :deep(h2) {
  font-size: 1.5em;
  border-bottom: 1px solid #eaecef;
  padding-bottom: 0.3em;
}

.markdown-content :deep(h3) {
  font-size: 1.25em;
}

.markdown-content :deep(h4) {
  font-size: 1em;
}

/* 代码块包装器样式 */
.markdown-content :deep(.code-block-wrapper) {
  position: relative;
  margin: 16px 0;
  border-radius: 6px;
  overflow: hidden;
  border: 1px solid #e1e4e8;
}

/* 代码块头部样式 */
.markdown-content :deep(.code-block-header) {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #f6f8fa;
  padding: 8px 12px;
  border-bottom: 1px solid #e1e4e8;
  font-size: 0; /* 修复可能的间距问题 */
}

.markdown-content :deep(.code-block-header > *) {
  font-size: 12px; /* 恢复字体大小 */
}

/* 代码语言标签样式 */
.markdown-content :deep(.code-language) {
  font-size: 12px;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  color: #24292e;
  padding: 2px 6px;
  border-radius: 3px;
  background-color: #e1e4e8;
  display: inline-block;
  vertical-align: middle;
}

/* 复制按钮样式 */
.markdown-content :deep(.copy-button) {
  background-color: transparent;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  padding: 4px 8px;
  font-size: 12px;
  cursor: pointer;
  color: #57606a;
  transition: all 0.2s;
  font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  display: inline-block;
  vertical-align: middle;
}

.markdown-content :deep(.copy-button:hover) {
  background-color: #f0f3f9;
  border-color: #b1b5bb;
}

.markdown-content :deep(pre) {
  background-color: #f6f8fa;
  border-radius: 0 0 6px 6px;
  padding: 16px;
  overflow-x: auto;
  position: relative;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: 13px;
  line-height: 1.45;
  margin: 0;
}

.markdown-content :deep(pre code) {
  background-color: transparent;
  padding: 0;
  margin: 0;
  border-radius: 0;
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  font-size: inherit;
  color: #24292e;
  white-space: pre;
  word-break: normal;
  word-wrap: normal;
  line-height: inherit;
  overflow-wrap: normal;
  tab-size: 2;
  hyphens: none;
  display: block;
  overflow-x: auto;
  width: 100%;
}

/* 用户消息中的代码块样式 */
.message-user .markdown-content :deep(.code-block-wrapper) {
  border-color: rgba(255, 255, 255, 0.2);
}

.message-user .markdown-content :deep(.code-block-header) {
  background-color: rgba(0, 0, 0, 0.2);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.message-user .markdown-content :deep(.code-language) {
  background-color: rgba(255, 255, 255, 0.2);
  color: rgba(255, 255, 255, 0.9);
}

.message-user .markdown-content :deep(.copy-button) {
  border-color: rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.8);
}

.message-user .markdown-content :deep(.copy-button:hover) {
  background-color: rgba(255, 255, 255, 0.1);
  border-color: rgba(255, 255, 255, 0.5);
}

.message-user .markdown-content :deep(pre) {
  background-color: rgba(0, 0, 0, 0.2);
  border: none;
}

.message-user .markdown-content :deep(pre code) {
  color: rgba(255, 255, 255, 0.9);
  text-shadow: 0 1px 0 rgba(0, 0, 0, 0.3);
}

.message-user .markdown-content :deep(code):not(pre code) {
  background-color: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
}

/* 适配小屏幕的代码块样式 */
@media (max-width: 640px) {
  .markdown-content :deep(.code-block-header) {
    padding: 6px 10px;
    flex-wrap: wrap;
  }

  .markdown-content :deep(.code-language) {
    font-size: 11px;
    padding: 1px 4px;
  }

  .markdown-content :deep(.copy-button) {
    font-size: 11px;
    padding: 2px 6px;
  }

  .markdown-content :deep(pre) {
    padding: 12px;
    font-size: 12px;
  }
}

/* 链接样式 */
.markdown-content :deep(a) {
  color: #58a6ff;
  text-decoration: none;
  border-bottom: 1px solid transparent;
  transition: border-color 0.3s;
}

.markdown-content :deep(a:hover) {
  text-decoration: underline;
  border-bottom-color: #58a6ff;
}

/* 引用块样式 */
.markdown-content :deep(blockquote) {
  border-left: 3px solid #d1d5db;
  padding: 0.5em 16px;
  margin: 16px 0;
  background-color: #f6f8fa;
  color: #57606a;
  border-radius: 0 3px 3px 0;
}

/* 列表样式 */
.markdown-content :deep(ul),
.markdown-content :deep(ol) {
  padding-left: 2em;
  margin: 16px 0;
}

.markdown-content :deep(li) {
  margin: 0.25em 0;
}

.markdown-content :deep(li > ul),
.markdown-content :deep(li > ol) {
  margin: 0.5em 0;
}

/* 表格样式 */
.markdown-content :deep(table) {
  border-collapse: separate;
  width: 100%;
  margin: 16px 0;
  border-spacing: 0;
  border-radius: 6px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.markdown-content :deep(th) {
  background-color: #f6f8fa;
  font-weight: 600;
  text-align: left;
  border-bottom: 1px solid #d1d5db;
  padding: 12px;
}

.markdown-content :deep(td) {
  padding: 12px;
  border-bottom: 1px solid #e4e7eb;
}

.markdown-content :deep(tr:last-child td) {
  border-bottom: none;
}

/* 水平线样式 */
.markdown-content :deep(hr) {
  height: 1px;
  background-color: #d1d5db;
  border: none;
  margin: 24px 0;
}

/* 图像样式 */
.markdown-content :deep(img) {
  max-width: 100%;
  border-radius: 6px;
  margin: 16px 0;
}

/* 用户消息中的Markdown样式调整 */
.message-user .markdown-content {
  color: white;
}

.message-user .markdown-content :deep(a) {
  color: #ffffff;
  border-bottom: 1px solid rgba(255, 255, 255, 0.3);
}

.message-user .markdown-content :deep(a:hover) {
  border-bottom-color: #ffffff;
}

.message-user .markdown-content :deep(blockquote) {
  border-left-color: rgba(255, 255, 255, 0.5);
  background-color: rgba(255, 255, 255, 0.1);
  color: rgba(255, 255, 255, 0.8);
}

.message-user .markdown-content :deep(pre) {
  background-color: rgba(0, 0, 0, 0.2);
  border-color: rgba(255, 255, 255, 0.1);
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

.ai-avatar img {
  width: 24px;
  height: 24px;
  transition: all 0.3s ease;
}

.ai-avatar img.rotate {
  animation: rotating 2s linear infinite;
}

@keyframes rotating {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.ai-avatar-loading {
  border: 2px solid rgba(77, 107, 254, 0.1);
}

/* 内联代码样式 */
.markdown-content :deep(code):not(pre code) {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  background-color: rgba(175, 184, 193, 0.2);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-size: 85%;
  margin: 0 0.2em;
}

.message-user .markdown-content :deep(code):not(pre code) {
  background-color: rgba(255, 255, 255, 0.15);
  color: rgba(255, 255, 255, 0.9);
}
</style>
