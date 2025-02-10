<template>
  <!-- 打字机效果组件 -->
  <div>
    <slot :text="displayText">{{ displayText }}</slot>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue'

// 组件属性定义
const props = defineProps<{
  text: string      // 要显示的文本
  speed?: number    // 打字速度
  delay?: number    // 开始延迟
}>()

// 定义事件
const emit = defineEmits<{
  complete: []                  // 打字完成事件
  textUpdate: [text: string]    // 文本更新事件
}>()

// 组件状态
const displayText = ref('')
let currentIndex = 0
let timer: number | null = null

// 打字效果实现
const startTyping = () => {
  if (currentIndex < props.text.length) {
    displayText.value = props.text.slice(0, currentIndex + 1)
    emit('textUpdate', displayText.value)
    currentIndex++
    timer = window.setTimeout(startTyping, props.speed || 30)
  } else {
    emit('complete')
  }
}

// 监听文本变化
watch(() => props.text, () => {
  if (timer) {
    clearTimeout(timer)
  }
  currentIndex = 0
  displayText.value = ''
  timer = window.setTimeout(startTyping, props.delay || 0)
}, { immediate: true })

// 组件卸载时清理定时器
onUnmounted(() => {
  if (timer) {
    clearTimeout(timer)
  }
})
</script>

<style scoped>
/* 打字机容器样式 */
.typewriter {
  display: inline-block;
}
</style> 