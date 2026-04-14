<template>
  <div class="relative w-full transition-all duration-300 group/bubble mb-8" 
       :class="{ 'bg-blue-50/40 rounded-3xl p-4': isSharingMode && isSelected, 'hover:bg-slate-50/40 rounded-3xl p-4 cursor-pointer': isSharingMode && !isSelected }"
       @click="isSharingMode && $emit('toggle-select')">
       
    <!-- Share Checkbox Overlay -->
    <div v-if="isSharingMode" class="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 z-10 pointer-events-none">
      <div class="w-5 h-5 md:w-6 md:h-6 rounded-md border-[2px] flex items-center justify-center transition-all shadow-sm" :class="isSelected ? 'bg-blue-500 border-blue-500' : 'bg-white border-slate-300'">
        <el-icon v-if="isSelected" class="text-white text-[10px] md:text-sm"><Check /></el-icon>
      </div>
    </div>

    <!-- Inner Wrapper -->
    <div class="w-full flex transition-transform duration-300" :class="[
      isUser ? 'justify-end' : 'justify-start',
      isLastMessage && !isSharingMode ? 'pb-12' : '',
      isSharingMode ? 'pl-8 md:pl-12' : ''
    ]">

      <!-- User Message: Cleaner style, more subtle -->
    <div v-if="isUser" class="relative max-w-[85%] md:max-w-[70%]">
      <div class="px-5 py-3 bg-blue-600 text-white rounded-2xl rounded-tr-sm text-[15.5px] leading-relaxed break-words shadow-lg shadow-blue-100">
        <!-- Conversation-Style Assets Grid -->
        <div v-if="assets && assets.length > 0" class="mb-4">
          <div :class="[
            'grid gap-2',
            assets.length === 1 ? 'max-w-[320px]' : 
            assets.length === 2 ? 'grid-cols-2 max-w-[400px]' : 
            'grid-cols-2 md:grid-cols-3 max-w-[500px]'
          ]">
            <div v-for="(asset, idx) in assets" :key="idx" 
                 class="asset-conversation-card group/asset"
                 :class="{ 'aspect-video': assets.length === 1, 'aspect-square': assets.length > 1 }">
              
              <!-- Image/PDF Preview -->
              <template v-if="asset.type === 'image' || asset.type === 'pdf'">
                <el-image 
                  :src="asset.url" 
                  class="w-full h-full object-cover rounded-xl shadow-md transition-all group-hover/asset:scale-[1.02]"
                  :preview-src-list="assets.filter(a => a.type === 'image' || a.type === 'pdf').map(a => a.url)"
                  :initial-index="idx"
                  preview-teleported
                  fit="cover"
                  lazy
                />
              </template>

              <!-- Audio/Video/Other -->
              <div v-else class="w-full h-full flex flex-col items-center justify-center bg-white/20 backdrop-blur-md rounded-xl border border-white/30 text-white shadow-md">
                <el-icon v-if="asset.type === 'audio'" class="text-2xl mb-1"><Mic /></el-icon>
                <el-icon v-else class="text-2xl mb-1"><VideoPlay /></el-icon>
                <span class="text-[9px] font-bold uppercase tracking-wider opacity-80">{{ asset.type }}</span>
              </div>

              <!-- Frosted Label -->
              <div class="absolute top-2 right-2 px-2 py-0.5 rounded-md bg-black/20 backdrop-blur-md border border-white/10 text-[8px] font-bold text-white uppercase tracking-tighter opacity-0 group-hover/asset:opacity-100 transition-opacity">
                {{ asset.type === 'image' ? '图片' : (asset.type === 'pdf' ? '文档' : (asset.type === 'audio' ? '音频' : '视频')) }}
              </div>
            </div>
          </div>
        </div>
        {{ content }}
      </div>
    </div>

    <!-- Assistant Message: Premium layout -->
    <div v-else class="flex w-full group">
      <div class="flex-1 min-w-0 relative">
        <!-- Status Badge: Now purely for active state, disappears when done to keep it clean -->
        <div v-if="!isUser && loading" class="flex items-center gap-2 mb-3 animate-in fade-in slide-in-from-top-1 duration-500">
          <div class="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse"></div>
          <span class="text-[10px] font-black uppercase tracking-widest text-blue-500/80">
            {{ (reasoningContent && !content) ? 'Thinking' : 'Responding' }}
          </span>
        </div>

        <!-- Premium Reasoning Segment: Inspired by DeepSeek's latest R1 UI -->
        <div v-if="reasoningContent" class="mb-6 animate-in fade-in slide-in-from-top-3 duration-700">
          <details class="group/details border border-blue-100 bg-blue-50/30 rounded-2xl overflow-hidden transition-all duration-500 hover:border-blue-300 hover:bg-white hover:shadow-[0_8px_30px_rgba(37,99,235,0.04)]" :open="loading && isLastMessage">
            <summary class="flex items-center gap-3 px-5 py-3 cursor-pointer list-none select-none text-slate-500 transition-all duration-300">
              <div class="relative flex items-center justify-center">
                <div v-if="loading && isLastMessage && !content" class="absolute inset-0 bg-blue-400/20 rounded-full animate-ping scale-150"></div>
                <div class="w-6 h-6 flex items-center justify-center rounded-lg bg-white border border-slate-100 shadow-sm text-blue-500 z-10">
                  <el-icon v-if="loading && isLastMessage && !content" class="text-sm animate-spin-slow">
                    <Loading />
                  </el-icon>
                  <el-icon v-else class="text-sm">
                    <View />
                  </el-icon>
                </div>
              </div>

              <div class="flex flex-col">
                <span class="text-[13px] font-bold tracking-tight text-slate-600 group-hover/details:text-blue-600 transition-colors">
                  {{ (loading && isLastMessage && !content) ? '深度思考中...' : '深度思考过程已完成' }}
                </span>
                <span class="text-[10px] text-slate-400 font-medium leading-none mt-0.5 uppercase tracking-widest">
                  DeepSeek-R1 Reasoner
                </span>
              </div>

              <el-icon class="ml-auto text-xs text-slate-300 transition-transform duration-500 group-open/details:rotate-180">
                <ArrowDown />
              </el-icon>
            </summary>

            <div class="px-6 pb-5 pt-2 text-[12px] text-slate-500/90 leading-[1.7] custom-markdown border-t border-slate-100/80 mt-1 font-normal selection:bg-blue-50" v-html="renderedReasoning"></div>
          </details>
        </div>

        <!-- Main Content: Refined for Multimodal (Text/Image) -->
        <div class="flex flex-col gap-4">
          <!-- Text Mode -->
          <div v-if="type === 'text'" class="text-[16px] text-slate-800 leading-[1.8] break-words custom-markdown selection:bg-blue-100" v-html="renderedContent"></div>

          <!-- Image Mode -->
          <div v-else-if="type === 'image'" class="w-full">
            <!-- Status Text: Show during loading or error, hide/simplify after completion -->
            <div v-if="loading || (images && images.length === 0)" class="text-[15px] font-medium text-slate-600 mb-3 animate-pulse">
              {{ content }}
            </div>

            <!-- Generation Progress -->
            <div v-if="loading && progress !== undefined && progress < 100" class="mb-4">
              <div class="w-full max-w-sm h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div class="h-full bg-indigo-500 rounded-full transition-all duration-800" :style="{ width: `${progress}%` }"></div>
              </div>
              <div class="mt-1.5 text-[11px] font-bold text-indigo-400 uppercase tracking-widest flex justify-between max-w-sm">
                <span>正在构图系统</span>
                <span>{{ progress }}%</span>
              </div>
            </div>

            <!-- Image Results Grid / Skeletons -->
            <div class="image-gallery-grid" :class="`grid-cols-${Math.min(batchSize || 1, 2)}`">
              <!-- Skeleton Loaders -->
              <template v-if="loading">
                <div v-for="n in (batchSize || 1)" :key="'skel-' + n" class="image-item-wrapper skeleton-shimmer">
                  <div class="absolute inset-0 flex flex-col items-center justify-center gap-3 text-slate-300">
                    <el-icon class="text-3xl animate-bounce">
                      <Brush />
                    </el-icon>
                    <span class="text-[10px] font-bold uppercase tracking-widest">渲染创作中</span>
                  </div>
                </div>
              </template>

              <!-- Actual Images -->
              <template v-else-if="images && images.length > 0">
                <div v-for="(img, idx) in images" :key="idx" class="image-item-wrapper group/img shadow-sm hover:shadow-xl hover:shadow-blue-100 transition-all duration-500">
                  <el-image :src="typeof img === 'string' ? img : (img as any)?.url" 
                          class="w-full h-full object-cover" 
                          :preview-src-list="images.map(i => typeof i === 'string' ? i : (i as any)?.url)" 
                          :initial-index="idx" 
                          preview-teleported
                          lazy 
                          fit="cover" />
                  <div class="image-overlay">
                    <button @click="handleDownload(typeof img === 'string' ? img : (img as any)?.url)" class="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-700 hover:scale-110 transition-all shadow-lg active:scale-95">
                      <el-icon class="text-lg">
                        <Download />
                      </el-icon>
                    </button>
                  </div>
                </div>
              </template>
            </div>

            <!-- Success Indicator -->
            <div v-if="!loading && images && images.length > 0" class="mt-3 flex items-center gap-2 text-slate-400 text-[11px] font-medium">
              <el-icon class="text-green-500">
                <CircleCheck />
              </el-icon>
              创作已完成 · {{ images.length }} 张作品
            </div>
          </div>
        </div>

        <!-- Action Buttons & Metrics -->
        <div class="flex items-center justify-between mt-6">
          <div v-if="!isSharingMode" class="flex items-center gap-2 opacity-0 group-hover/bubble:opacity-100 transition-all duration-300 -translate-x-2 group-hover/bubble:translate-x-0">
            <el-tooltip :content="isCopied ? '已复制' : '复制'" placement="top" effect="dark" :show-after="300">
              <button @click="handleCopy" class="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all bg-white border border-slate-100 shadow-sm">
                <el-icon v-if="isCopied" class="text-green-500"><Select /></el-icon>
                <el-icon v-else class="text-sm"><CopyDocument /></el-icon>
              </button>
            </el-tooltip>
            
            <el-tooltip content="重新生成" placement="top" effect="dark" :show-after="300">
              <button @click="$emit('regenerate')" class="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all bg-white border border-slate-100 shadow-sm">
                <el-icon class="text-sm"><RefreshRight /></el-icon>
              </button>
            </el-tooltip>

            <el-tooltip content="喜欢" placement="top" effect="dark" :show-after="300">
              <button @click="isLiked = !isLiked; isDisliked = false" class="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all bg-white border border-slate-100 shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 transition-colors" :class="isLiked ? 'stroke-blue-600 fill-blue-100' : ''">
                  <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3"></path>
                </svg>
              </button>
            </el-tooltip>

            <el-tooltip content="不喜欢" placement="top" effect="dark" :show-after="300">
              <button @click="isDisliked = !isDisliked; isLiked = false" class="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all bg-white border border-slate-100 shadow-sm">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="w-3.5 h-3.5 transition-colors" :class="isDisliked ? 'stroke-blue-600 fill-blue-100' : ''">
                  <path d="M10 15v4a3 3 0 0 0 3 3l4-9V2H5.72a2 2 0 0 0-2 1.7l-1.38 9a2 2 0 0 0 2 2.3zm7-13h3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2h-3"></path>
                </svg>
              </button>
            </el-tooltip>

            <el-tooltip content="分享对话" placement="top" effect="dark" :show-after="300">
              <button @click="$emit('share')" class="flex items-center justify-center w-8 h-8 rounded-lg text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all bg-white border border-slate-100 shadow-sm">
                <el-icon class="text-sm"><Share /></el-icon>
              </button>
            </el-tooltip>
          </div>

          <!-- Performance Metrics -->
          <div v-if="!loading && usage" class="flex items-center gap-3 px-3 py-1 bg-slate-50/80 rounded-full border border-slate-100/50 text-[10px] font-bold text-slate-400 select-none animate-in fade-in slide-in-from-right-1">
            <div class="flex items-center gap-1">
              <el-icon class="text-[11px]">
                <Cpu />
              </el-icon>
              <span>{{ usage.total_tokens }} TOKENS</span>
            </div>
            <div class="w-px h-2 bg-slate-200"></div>
            <div class="flex items-center gap-1">
              <el-icon class="text-[11px]">
                <Odometer />
              </el-icon>
              <span>{{ usage.speed }} T/S</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import {
  CopyDocument, Select, ArrowDown, View, Loading, Download,
  Brush, CircleCheck, Cpu, Odometer, VideoPlay, Mic, Document,
  RefreshRight, Top, Bottom, Share, Check
} from "@element-plus/icons-vue";
import deepseekLogo from "@/assets/deepseeklogo.svg";

import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark-dimmed.css";

export interface MessageAsset {
  type: 'image' | 'video' | 'audio' | 'pdf'
  url: string
  name?: string
}

const props = defineProps<{
  type?: 'text' | 'image';
  content: string;
  reasoningContent?: string;
  images?: (string | { url: string })[];
  assets?: MessageAsset[];
  progress?: number;
  isUser: boolean;
  loading?: boolean;
  isLastMessage?: boolean;
  batchSize?: number;
  usage?: {
    total_tokens: number
    speed: number
  };
  timestamp?: number;
  isSharingMode?: boolean;
  isSelected?: boolean;
}>();

const emit = defineEmits<{
  complete: [];
  download: [url: string];
  regenerate: [];
  share: [];
  'toggle-select': [];
}>();

const isLiked = ref(false);
const isDisliked = ref(false);

const md: any = new MarkdownIt({
  html: true,
  linkify: true,
  breaks: true,
  highlight: function (str, lang) {
    if (lang && hljs.getLanguage(lang)) {
      try {
        return `<pre class="hljs p-4 rounded-xl overflow-x-auto text-sm leading-normal"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value
          }</code></pre>`;
      } catch (__) { }
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

const handleDownload = (url: string) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = `deepseek-art-${Date.now()}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};
</script>

<style scoped>
/* 隐藏原生 details 的黑色倒三角 */
details>summary::-webkit-details-marker {
  display: none;
}

.asset-conversation-card {
  position: relative;
  overflow: hidden;
  border-radius: 12px;
  cursor: pointer;
}

.asset-conversation-card :deep(.el-image) {
  display: block;
  width: 100%;
  height: 100%;
}

.image-gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 12px;
  margin-top: 12px;
}

.image-item-wrapper {
  position: relative;
  border-radius: 16px;
  overflow: hidden;
  aspect-ratio: 1;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
}

.image-overlay {
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transition: opacity 0.3s;
  pointer-events: none;
}

.image-item-wrapper:hover .image-overlay {
  opacity: 1;
  pointer-events: auto;
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

.pro-textarea :deep(.el-textarea__inner:disabled) {
  color: #64748b;
  cursor: not-allowed;
  -webkit-text-fill-color: #64748b;
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
  from {
    transform: rotate(0deg);
  }

  to {
    transform: rotate(360deg);
  }
}

.animate-spin-slow {
  animation: spin-slow 2s linear infinite;
}

@keyframes shimmer {
  0% {
    background-position: -200% 0;
  }

  100% {
    background-position: 200% 0;
  }
}

.skeleton-shimmer {
  background: linear-gradient(90deg, #f8fafc 25%, #f1f5f9 50%, #f8fafc 75%);
  background-size: 200% 100%;
  animation: shimmer 2s infinite linear;
}

@keyframes pulse-gentle {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0.7;
  }
}

.animate-pulse-gentle {
  animation: pulse-gentle 3s ease-in-out infinite;
}

@keyframes fade-in {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
}

@keyframes slide-in-from-top-3 {
  from {
    transform: translateY(-12px);
    opacity: 0;
  }

  to {
    transform: translateY(0);
    opacity: 1;
  }
}
</style>