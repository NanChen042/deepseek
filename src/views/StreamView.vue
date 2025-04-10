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

    <!-- 思维链内容显示区域 -->
    <div
      v-if="showThinking && thinkingContent"
      :class="['thinking-panel', {'minimized': isMinimized}]"
      :style="panelStyle"
      ref="thinkingPanel"
    >
      <div
        class="thinking-header"
        @mousedown="startDrag"
        @touchstart="startDrag"
      >
        <div class="panel-title">
          <i class="el-icon-message"></i>
          <h3>思维链内容</h3>
        </div>
        <div class="panel-controls">
          <el-button
            circle
            size="small"
            @click="toggleMinimize"
            :icon="isMinimized ? 'Plus' : 'Minus'"
          ></el-button>
          <el-button
            circle
            size="small"
            @click="showThinking = false"
            icon="Close"
          ></el-button>
        </div>
      </div>
      <div class="thinking-content" v-show="!isMinimized">
        <div class="markdown-thinking">{{ thinkingContent }}</div>
      </div>
      <div
        v-if="!isMinimized"
        class="resize-handle"
        @mousedown="startResize"
        @touchstart="startResize"
      ></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, nextTick, onMounted, onUnmounted } from 'vue'
import { ElMessage } from 'element-plus'
import { aiService, ModelType } from '../services/aiService'

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
const thinkingContent = ref('') // 存储思维链内容
const showThinking = ref(false) // 控制思维链面板显示
const thinkingPanel = ref<HTMLElement | null>(null)

// 面板状态管理
const isMinimized = ref(false)
const panelPosition = ref({ x: 100, y: 100 }) // 相对于左上角的位置
const panelSize = ref({ width: 400, height: 400 })

// 计算面板样式
const panelStyle = computed(() => {
  return {
    left: `${panelPosition.value.x}px`,
    top: `${panelPosition.value.y}px`,
    width: `${panelSize.value.width}px`,
    height: isMinimized.value ? 'auto' : `${panelSize.value.height}px`
  }
})

// 拖拽相关变量
let isDragging = false
let initialX = 0
let initialY = 0
let initialLeft = 0
let initialTop = 0

// 调整大小相关变量
let isResizing = false
let initialWidth = 0
let initialHeight = 0
let initialMouseX = 0
let initialMouseY = 0

// 计算可见区域边界
const getBoundaries = () => {
  const chatView = document.querySelector('.chat-view')
  if (!chatView) return { minX: 0, maxX: window.innerWidth, minY: 0, maxY: window.innerHeight }

  const rect = chatView.getBoundingClientRect()
  return {
    minX: 0,
    maxX: rect.width - (thinkingPanel.value?.offsetWidth || 300),
    minY: 0,
    maxY: rect.height - (thinkingPanel.value?.offsetHeight || 200)
  }
}

// 开始拖拽
const startDrag = (e: MouseEvent | TouchEvent) => {
  if (thinkingPanel.value) {
    isDragging = true

    // 计算初始位置
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

    initialX = clientX
    initialY = clientY
    initialLeft = panelPosition.value.x
    initialTop = panelPosition.value.y

    // 添加拖动时的样式
    if (thinkingPanel.value) {
      thinkingPanel.value.classList.add('dragging')
    }

    // 阻止默认行为和冒泡
    e.preventDefault()
    e.stopPropagation()

    // 添加移动和停止拖拽的事件监听器
    document.addEventListener('mousemove', doDrag)
    document.addEventListener('touchmove', doDrag)
    document.addEventListener('mouseup', stopDrag)
    document.addEventListener('touchend', stopDrag)
  }
}

// 执行拖拽
const doDrag = (e: MouseEvent | TouchEvent) => {
  if (!isDragging) return

  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

  // 计算新位置
  const deltaX = clientX - initialX
  const deltaY = clientY - initialY

  // 获取边界
  const { minX, maxX, minY, maxY } = getBoundaries()

  // 计算新位置（带边界限制）
  const newX = Math.max(minX, Math.min(maxX, initialLeft + deltaX))
  const newY = Math.max(minY, Math.min(maxY, initialTop + deltaY))

  panelPosition.value = {
    x: newX,
    y: newY
  }
}

// 停止拖拽
const stopDrag = () => {
  isDragging = false

  // 移除拖动时的样式
  if (thinkingPanel.value) {
    thinkingPanel.value.classList.remove('dragging')
  }

  // 移除事件监听器
  document.removeEventListener('mousemove', doDrag)
  document.removeEventListener('touchmove', doDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchend', stopDrag)
}

// 开始调整大小
const startResize = (e: MouseEvent | TouchEvent) => {
  isResizing = true

  // 计算初始值
  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

  initialMouseX = clientX
  initialMouseY = clientY
  initialWidth = panelSize.value.width
  initialHeight = panelSize.value.height

  // 添加调整时的样式
  if (thinkingPanel.value) {
    thinkingPanel.value.classList.add('resizing')
  }

  // 阻止默认行为和冒泡
  e.preventDefault()
  e.stopPropagation()

  // 添加移动和停止调整大小的事件监听器
  document.addEventListener('mousemove', doResize)
  document.addEventListener('touchmove', doResize)
  document.addEventListener('mouseup', stopResize)
  document.addEventListener('touchend', stopResize)
}

// 执行调整大小
const doResize = (e: MouseEvent | TouchEvent) => {
  if (!isResizing) return

  const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX
  const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY

  // 计算新尺寸
  const deltaX = clientX - initialMouseX
  const deltaY = clientY - initialMouseY

  // 限制最小尺寸
  panelSize.value = {
    width: Math.max(300, initialWidth + deltaX),
    height: Math.max(200, initialHeight + deltaY)
  }
}

// 停止调整大小
const stopResize = () => {
  isResizing = false

  // 移除调整时的样式
  if (thinkingPanel.value) {
    thinkingPanel.value.classList.remove('resizing')
  }

  // 移除事件监听器
  document.removeEventListener('mousemove', doResize)
  document.removeEventListener('touchmove', doResize)
  document.removeEventListener('mouseup', stopResize)
  document.removeEventListener('touchend', stopResize)
}

// 切换最小化状态
const toggleMinimize = () => {
  isMinimized.value = !isMinimized.value
}

// 初始化面板位置
const initPanelPosition = () => {
  // 获取可视区域大小
  const chatView = document.querySelector('.chat-view')
  if (!chatView) return

  const rect = chatView.getBoundingClientRect()

  // 初始化面板位置为居中
  panelPosition.value = {
    x: (rect.width - panelSize.value.width) / 2,
    y: (rect.height - panelSize.value.height) / 2
  }
}

// 处理模型变更
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

// 发送消息
const handleSend = async (message: string) => {
  messages.value.push({
    role: 'user',
    content: message
  })

  loading.value = true
  console.log('开始发送消息:', message)
  // 清空上一次的思维链内容
  thinkingContent.value = ''

  try {
    // 添加一个空的助手消息用于更新
    const assistantMessage = {
      role: 'assistant' as const,
      content: ''
    }
    messages.value.push(assistantMessage)
    console.log('初始助手消息已添加')

    // 使用streamChat处理流式响应，实时更新内容
    await aiService.streamChat(messages.value.slice(0, -1), async (chunk) => {
      console.log('收到chunk:', chunk)

      // 直接更新内容，实现真正的流式效果
      if (chunk.content) {
        // 不再修改对象引用，而是通过深拷贝创建一个新的消息数组
        const newContent = assistantMessage.content + chunk.content
        console.log('更新内容:', newContent)

        // 更新本地引用
        assistantMessage.content = newContent

        // 创建一个全新的消息数组以确保Vue能检测到变化
        const newMessages = [...messages.value.slice(0, -1), {
          role: 'assistant' as const,
          content: newContent
        }]

        // 替换整个消息数组
        messages.value = newMessages

        // 强制DOM更新
        await nextTick()
      }

      // 直接更新思维链内容
      if (chunk.reasoning_content) {
        console.log('收到思维链内容:', chunk.reasoning_content)
        thinkingContent.value += chunk.reasoning_content
        showThinking.value = true // 有思维链内容时显示面板
        isMinimized.value = false // 确保面板是展开的

        // 强制DOM更新
        await nextTick()
      }
    })

    console.log('流式输出完成')
    loading.value = false
  } catch (error) {
    console.error('Error:', error)
    ElMessage.error('发送消息失败，请重试')
    messages.value.pop() // 发生错误时移除最后的助手消息
    loading.value = false
  }
}

// 清除聊天
const clearChat = () => {
  messages.value = [{
    role: 'assistant',
    content: '你好！我是 Deepseek 流式输出模式，文字会实时显示。'
  }]
  thinkingContent.value = '' // 清空思维链内容
  showThinking.value = false // 隐藏思维链面板
}

// 组件挂载时初始化
onMounted(() => {
  // 初始化面板位置
  initPanelPosition()

  // 监听窗口大小调整
  window.addEventListener('resize', () => {
    // 检查并调整面板位置，确保不超出可视区域
    const { minX, maxX, minY, maxY } = getBoundaries()
    panelPosition.value = {
      x: Math.max(minX, Math.min(maxX, panelPosition.value.x)),
      y: Math.max(minY, Math.min(maxY, panelPosition.value.y))
    }
  })
})

// 组件卸载时清理
onUnmounted(() => {
  // 移除可能残留的事件监听器
  document.removeEventListener('mousemove', doDrag)
  document.removeEventListener('touchmove', doDrag)
  document.removeEventListener('mouseup', stopDrag)
  document.removeEventListener('touchend', stopDrag)
  document.removeEventListener('mousemove', doResize)
  document.removeEventListener('touchmove', doResize)
  document.removeEventListener('mouseup', stopResize)
  document.removeEventListener('touchend', stopResize)

  window.removeEventListener('resize', () => {})
})
</script>

<style scoped>
.chat-view {
  padding: 20px;
  background: #f5f7fa;
  height: calc(100vh - 60px);
  overflow: hidden;
  box-sizing: border-box;
  position: relative;
}

/* 思维链面板样式 */
.thinking-panel {
  position: absolute;
  z-index: 100;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12), 0 2px 8px rgba(0, 0, 0, 0.04);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
  user-select: none; /* 防止拖动时选中文本 */
  min-width: 300px;
  min-height: 45px;
  max-width: 90vw;
  max-height: 80vh;
  border: 1px solid rgba(235, 238, 245, 0.8);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.thinking-panel.dragging {
  opacity: 0.8;
  box-shadow: 0 14px 28px rgba(0, 0, 0, 0.15), 0 10px 10px rgba(0, 0, 0, 0.08);
  transition: none;
  cursor: grabbing;
}

.thinking-panel.resizing {
  opacity: 0.85;
  transition: none;
}

.thinking-panel:hover {
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15), 0 5px 10px rgba(0, 0, 0, 0.08);
}

.thinking-panel.minimized {
  height: auto !important;
  resize: none;
}

.thinking-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 16px;
  background: linear-gradient(135deg, #4e54c8, #8f94fb);
  color: white;
  cursor: grab; /* 显示抓取光标 */
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

.thinking-header:active {
  cursor: grabbing; /* 抓取时变为紧握状态 */
}

.thinking-header:hover {
  background: linear-gradient(135deg, #5a54c8, #9f94fb);
}

.panel-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.panel-title i {
  font-size: 18px;
}

.thinking-header h3 {
  margin: 0;
  font-size: 16px;
  font-weight: 500;
  color: white;
  text-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
}

.panel-controls {
  display: flex;
  gap: 8px;
}

.panel-controls .el-button {
  background-color: rgba(255, 255, 255, 0.18);
  border-color: transparent;
  color: white;
  height: 28px;
  width: 28px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
}

.panel-controls .el-button:hover {
  background-color: rgba(255, 255, 255, 0.28);
  transform: translateY(-1px);
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
}

.panel-controls .el-button:active {
  transform: translateY(0);
}

.thinking-content {
  padding: 0;
  overflow-y: auto;
  flex: 1;
  background: rgba(250, 250, 250, 0.8);
  position: relative;
  border-top: 1px solid rgba(235, 238, 245, 0.8);
  transition: background-color 0.3s ease;
}

/* 自定义滚动条样式 */
.thinking-content::-webkit-scrollbar {
  width: 6px;
}

.thinking-content::-webkit-scrollbar-track {
  background: rgba(0, 0, 0, 0.05);
  border-radius: 3px;
}

.thinking-content::-webkit-scrollbar-thumb {
  background: rgba(0, 0, 0, 0.15);
  border-radius: 3px;
}

.thinking-content::-webkit-scrollbar-thumb:hover {
  background: rgba(0, 0, 0, 0.25);
}

.markdown-thinking {
  padding: 20px;
  white-space: pre-wrap;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace;
  font-size: 14px;
  line-height: 1.6;
  color: #333;
  overflow-wrap: break-word;
}

.markdown-thinking code {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-size: 0.9em;
}

.markdown-thinking pre {
  background-color: rgba(0, 0, 0, 0.05);
  padding: 1em;
  border-radius: 6px;
  margin: 0.5em 0;
  overflow-x: auto;
}

.resize-handle {
  position: absolute;
  right: 0;
  bottom: 0;
  width: 20px;
  height: 20px;
  cursor: nwse-resize;
  background: transparent;
  z-index: 10;
}

.resize-handle::after {
  content: '';
  position: absolute;
  right: 4px;
  bottom: 4px;
  width: 10px;
  height: 10px;
  border-right: 2px solid rgba(0, 0, 0, 0.3);
  border-bottom: 2px solid rgba(0, 0, 0, 0.3);
  border-radius: 1px;
  transition: all 0.2s ease;
}

.thinking-panel:hover .resize-handle::after {
  border-color: rgba(0, 0, 0, 0.5);
}

/* 动画效果 */
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

.thinking-panel {
  animation: fadeIn 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
}
</style>
