<template>
  <div class="w-full flex transition-all mb-8" :class="[
    isUser ? 'justify-end' : 'justify-start',
    isLastMessage ? 'pb-24' : '' 
  ]">

    <!-- User Message: Cleaner style, more subtle -->
    <div v-if="isUser" class="relative max-w-[85%] md:max-w-[70%]">
      <div class="px-5 py-3 bg-slate-100/80 text-slate-800 rounded-2xl rounded-tr-sm text-[15.5px] leading-relaxed break-words border border-slate-200/50 shadow-sm">
        {{ content }}
      </div>
    </div>

    <!-- Assistant Message: Premium layout -->
    <div v-else class="flex w-full group">
      <!-- Avatar: Positioned naturally -->
      <div class="w-8 h-8 md:w-9 md:h-9 rounded-xl border border-slate-200/60 flex items-center justify-center bg-white shadow-sm shrink-0 mt-1 relative overflow-hidden transition-transform group-hover:scale-105">
        <img :src="deepseekLogo" alt="AI Avatar" class="w-5 h-5 md:w-5.5 md:h-5.5 object-contain" />
      </div>

      <div class="flex-1 min-w-0 ml-4 max-w-[calc(100%-3rem)]">
        <div class="text-[13px] font-bold text-slate-400 mb-2 flex items-center gap-2 tracking-wide uppercase">
          DeepSeek
          <span v-if="loading && isLastMessage" class="flex gap-1 items-center">
             <span class="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
             <span class="w-1 h-1 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
             <span class="w-1 h-1 bg-blue-500 rounded-full animate-bounce"></span>
          </span>
        </div>

        <!-- Premium Reasoning Segment: Inspired by DeepSeek's latest R1 UI -->
        <div v-if="reasoningContent" class="mb-6 animate-in fade-in slide-in-from-top-3 duration-700">
          <details 
            class="group/details border border-slate-200/50 bg-slate-50/50 rounded-2xl overflow-hidden transition-all duration-500 hover:border-blue-200/60 hover:bg-white hover:shadow-[0_8px_30px_rgb(0,0,0,0.02)]" 
            :open="loading && isLastMessage"
          >
            <summary class="flex items-center gap-3 px-5 py-3 cursor-pointer list-none select-none text-slate-500 transition-all duration-300">
              <div class="relative flex items-center justify-center">
                <div v-if="loading && isLastMessage" class="absolute inset-0 bg-blue-400/20 rounded-full animate-ping scale-150"></div>
                <div class="w-6 h-6 flex items-center justify-center rounded-lg bg-white border border-slate-100 shadow-sm text-blue-500 z-10">
                   <el-icon v-if="loading && isLastMessage" class="text-sm animate-spin-slow"><Loading /></el-icon>
                   <el-icon v-else class="text-sm"><View /></el-icon>
                </div>
              </div>
              
              <div class="flex flex-col">
                <span class="text-[13px] font-bold tracking-tight text-slate-600 group-hover/details:text-blue-600 transition-colors">
                  {{ loading && isLastMessage ? '深度思考中...' : '深度思考过程已完成' }}
                </span>
                <span class="text-[10px] text-slate-400 font-medium leading-none mt-0.5 uppercase tracking-widest">
                  DeepSeek-R1 Reasoner
                </span>
              </div>

              <el-icon class="ml-auto text-xs text-slate-300 transition-transform duration-500 group-open/details:rotate-180">
                <ArrowDown />
              </el-icon>
            </summary>

            <div class="px-6 pb-5 pt-2 text-[13.5px] text-slate-500/90 leading-[1.7] custom-markdown border-t border-slate-100/80 mt-1 font-normal selection:bg-blue-50" v-html="renderedReasoning"></div>
          </details>
        </div>

        <!-- Main Content -->
        <div class="text-[16px] text-slate-800 leading-[1.8] break-words custom-markdown selection:bg-blue-100" v-html="renderedContent"></div>

        <!-- Action Buttons -->
        <div class="flex items-center gap-3 mt-6 opacity-0 group-hover:opacity-100 transition-all duration-300 -translate-x-2 group-hover:translate-x-0">
          <button @click="handleCopy" class="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all bg-white border border-slate-100 shadow-sm" :title="isCopied ? '已复制' : '复制回答'">
            <el-icon v-if="isCopied" class="text-green-500"><Select /></el-icon>
            <el-icon v-else class="text-base"><CopyDocument /></el-icon>
          </button>

          <button v-if="!loading && isLastMessage" @click="$emit('continue', content)" class="text-[12px] font-bold text-slate-500 px-4 py-1.5 rounded-lg hover:bg-slate-100 hover:text-slate-800 transition-all bg-white border border-slate-100 shadow-sm">
            继续生成
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { CopyDocument, Select, ArrowRight, ArrowDown, View, Loading } from "@element-plus/icons-vue";
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

/* Premium Animations */
@keyframes spin-slow {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
.animate-spin-slow {
  animation: spin-slow 2s linear infinite;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slide-in-from-top-3 {
  from { transform: translateY(-12px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
</style>