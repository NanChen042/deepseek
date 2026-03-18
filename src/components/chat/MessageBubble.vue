<template>
  <div class="w-full flex transition-all" :class="[
    isUser ? 'justify-end' : 'justify-start',
    isLastMessage ? 'pb-20' : '' 
  ]">

    <div v-if="isUser" class="relative max-w-[85%] md:max-w-[75%]">
      <div class="px-5 py-3.5 bg-slate-100 text-slate-800 rounded-3xl rounded-tr-sm text-[15px] leading-relaxed break-words shadow-sm">
        {{ content }}
      </div>
    </div>

    <div v-else class="flex w-full group">

      <div class="w-8 h-8 md:w-10 md:h-10 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-sm shrink-0 mt-1 md:mt-0 relative overflow-hidden">
        <img :src="deepseekLogo" alt="AI Avatar" class="w-5 h-5 md:w-6 md:h-6 object-contain" />
      </div>

      <div class="flex-1 min-w-0 ml-4 max-w-[calc(100%-3rem)]">
        <div class="text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2">
          DeepSeek
          <span v-if="loading && isLastMessage" class="w-1.5 h-3 bg-blue-500 animate-pulse"></span>
        </div>

        <div v-if="reasoningContent" class="mb-5">
          <details class="group/details border border-slate-200 rounded-xl bg-slate-50/50 overflow-hidden transition-all duration-300 open:bg-slate-50" :open="loading && isLastMessage">
            <summary class="flex items-center gap-2 px-4 py-2.5 cursor-pointer list-none select-none text-slate-500 hover:text-slate-700 transition-colors">
              <el-icon class="text-sm transition-transform duration-300 group-open/details:rotate-90">
                <ArrowRight />
              </el-icon>
              <span class="text-sm font-medium">深度思考过程</span>
              <span v-if="loading && isLastMessage" class="text-xs text-slate-400 ml-auto flex items-center gap-1">
                思考中<span class="animate-bounce">...</span>
              </span>
            </summary>

            <div class="px-5 pb-4 pt-2 text-sm text-slate-500 border-t border-slate-200/60 mt-1 custom-markdown opacity-90" v-html="renderedReasoning"></div>
          </details>
        </div>

        <div class="text-[15px] text-slate-800 break-words custom-markdown" v-html="renderedContent"></div>

        <div class="flex items-center gap-2 mt-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200">
          <button @click="handleCopy" class="flex items-center justify-center w-7 h-7 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors bg-white shadow-sm md:shadow-none md:bg-transparent" :title="isCopied ? '已复制' : '复制内容'">
            <el-icon v-if="isCopied" class="text-green-500"><Select /></el-icon>
            <el-icon v-else>
              <CopyDocument />
            </el-icon>
          </button>

          <button v-if="!loading && isLastMessage" @click="$emit('continue', content)" class="text-xs font-medium text-slate-500 px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors bg-white shadow-sm md:shadow-none md:bg-transparent border border-slate-200 md:border-transparent">
            继续生成
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { CopyDocument, Select, ArrowRight } from "@element-plus/icons-vue";
import deepseekLogo from "@/assets/deepseeklogo.svg";

import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark-dimmed.css";

const props = defineProps<{
  content: string;
  reasoningContent?: string;
  isUser: boolean;
  loading?: boolean;
  isLastMessage?: boolean;
  timestamp?: number;
}>();

const emit = defineEmits<{
  continue: [prefix: string];
  complete: [];
}>();

const md: any = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs p-4 rounded-xl overflow-x-auto text-sm leading-normal"><code>${
          hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
        }</code></pre>`;
      } catch (__) {}
    }
    return `<pre class="hljs p-4 rounded-xl overflow-x-auto text-sm leading-normal"><code>${md.utils.escapeHtml(
      str
    )}</code></pre>`;
  },
});

const renderedContent = computed(() => md.render(props.content || ""));
const renderedReasoning = computed(() =>
  md.render(props.reasoningContent || "")
);

const isCopied = ref(false);

const handleCopy = async () => {
  if (!props.content) return;
  try {
    await navigator.clipboard.writeText(props.content);
    isCopied.value = true;
    setTimeout(() => {
      isCopied.value = false;
    }, 2000);
  } catch (err) {
    console.error("复制失败:", err);
  }
};
</script>

<style scoped>
/* 隐藏原生 details 的黑色倒三角 */
details > summary::-webkit-details-marker {
  display: none;
}

/* ==========================================
   AI 聊天专属 Markdown 排版优化 
   ========================================== */
.custom-markdown {
  /* 【关键修复】取消了锁死的 font-size 和 color，改为继承父级。
     这样思考过程(text-sm)和正文(text-[15px])都能完美复用这个排版引擎了 */
  font-size: inherit;
  color: inherit;
}

/* 段落与行高：利用 em 单位实现根据字体大小自动缩放 */
.custom-markdown :deep(p) {
  line-height: 1.7;
  margin-bottom: 1em;
}
.custom-markdown :deep(p:last-child) {
  margin-bottom: 0;
}

/* 列表样式 */
.custom-markdown :deep(ul),
.custom-markdown :deep(ol) {
  margin-top: 0.5em;
  margin-bottom: 1em;
  padding-left: 1.5em;
}
.custom-markdown :deep(ul) {
  list-style-type: disc;
}
.custom-markdown :deep(ol) {
  list-style-type: decimal;
}
.custom-markdown :deep(li) {
  margin-bottom: 0.3em;
  line-height: 1.7;
}

/* 加粗字体 */
.custom-markdown :deep(strong) {
  font-weight: 600;
  color: #0f172a;
}

/* 标题样式 */
.custom-markdown :deep(h1),
.custom-markdown :deep(h2),
.custom-markdown :deep(h3),
.custom-markdown :deep(h4) {
  color: #0f172a;
  font-weight: 600;
  margin-top: 1.5em;
  margin-bottom: 0.8em;
  line-height: 1.3;
}
.custom-markdown :deep(h1) {
  font-size: 1.5em;
}
.custom-markdown :deep(h2) {
  font-size: 1.3em;
}
.custom-markdown :deep(h3) {
  font-size: 1.1em;
}

/* 引用块样式 */
.custom-markdown :deep(blockquote) {
  border-left: 3px solid #cbd5e1;
  padding-left: 1em;
  margin-top: 1em;
  margin-bottom: 1em;
  color: #64748b;
  background-color: #f8fafc;
  padding-top: 0.5em;
  padding-bottom: 0.5em;
  border-radius: 0 0.5rem 0.5rem 0;
}

/* 代码块外层防溢出 */
.custom-markdown :deep(pre) {
  background-color: #1e293b !important;
  color: #f8fafc;
  padding: 1rem;
  border-radius: 0.75rem;
  overflow-x: auto;
  margin-top: 1em;
  margin-bottom: 1em;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
  font-size: 0.875rem;
  line-height: 1.5;
}
/* 行内代码 */
.custom-markdown :deep(code) {
  background-color: #f1f5f9;
  padding: 0.2rem 0.4rem;
  border-radius: 0.375rem;
  font-size: 0.875em;
  color: #ef4444;
  font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
}
.custom-markdown :deep(pre code) {
  background-color: transparent;
  padding: 0;
  color: inherit;
}

/* 表格样式 */
.custom-markdown :deep(table) {
  width: 100%;
  margin-bottom: 1em;
  border-collapse: collapse;
  font-size: 0.95em;
}
.custom-markdown :deep(th),
.custom-markdown :deep(td) {
  border: 1px solid #e2e8f0;
  padding: 0.5rem 0.75rem;
  text-align: left;
}
.custom-markdown :deep(th) {
  background-color: #f8fafc;
  font-weight: 600;
}
</style>