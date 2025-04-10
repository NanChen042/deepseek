<template>
  <!-- 打字机效果组件 -->
  <div class="markdown-content" v-html="processedText"></div>
</template>

<script setup lang="ts">
import { ref, watch, computed, onUnmounted } from 'vue'
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

// 处理后的Markdown文本
const processedText = computed(() => md.render(displayText.value))

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
  font-size: 0;
}

.markdown-content :deep(.code-block-header > *) {
  font-size: 12px;
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

/* 内联代码样式 */
.markdown-content :deep(code):not(pre code) {
  font-family: 'SFMono-Regular', Consolas, 'Liberation Mono', Menlo, monospace;
  background-color: rgba(175, 184, 193, 0.2);
  padding: 0.2em 0.4em;
  border-radius: 3px;
  font-size: 85%;
  margin: 0 0.2em;
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
</style>
