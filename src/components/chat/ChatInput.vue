<template>
  <div class="w-full shrink-0 px-2 md:px-0 mb-4 animate-in fade-in slide-in-from-bottom-4 duration-700">
    <div class="max-w-4xl mx-auto relative flex flex-col items-center">

      <div :class="[
          'group relative flex flex-col w-full bg-white rounded-2xl transition-all duration-500 ease-out',
          'border border-slate-200/80 shadow-[0_8px_30px_-6px_rgba(0,0,0,0.05)]',
          'focus-within:border-blue-400 focus-within:shadow-[0_20px_60px_-10px_rgba(59,130,246,0.12)] focus-within:ring-4 focus-within:ring-blue-500/5',
          disabled ? 'opacity-70 pointer-events-none' : ''
        ]">
        
        <el-input 
          v-model="message" 
          type="textarea" 
          :autosize="{ minRows: 1, maxRows: 12 }" 
          resize="none" 
          placeholder="发送消息给 DeepSeek... (Shift + Enter 换行)" 
          @keydown.enter.exact.prevent="handleSend" 
          @keydown.enter.shift="handleNewline" 
          :disabled="disabled" 
          class="pro-textarea flex-1 p-1" 
        />

        <!-- Input Actions Bar -->
        <div class="flex items-center justify-between px-4 pb-3 mt-1">
          <div class="flex items-center gap-2">
             <button 
                @click="toggleReasoner"
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-bold transition-all duration-300"
                :class="isReasoner ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100'"
              >
                <el-icon class="text-sm"><Cpu /></el-icon>
                深度思考
              </button>
              <button 
                class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[12px] font-bold bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100 transition-all duration-300"
                title="搜索功能即将上线"
              >
                <el-icon class="text-sm"><Search /></el-icon>
                联网搜索
              </button>
          </div>

          <button @click="handleSend" :disabled="!message.trim() || disabled" :class="[
              'flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-500',
              message.trim() && !disabled
                ? 'bg-blue-600 text-white shadow-lg shadow-blue-100 hover:scale-105 active:scale-95 cursor-pointer' 
                : 'bg-slate-50 text-slate-200 cursor-not-allowed'
            ]">
            <el-icon v-if="!disabled" class="text-lg rotate-45">
              <Position />
            </el-icon>
            <el-icon v-else class="text-lg animate-spin text-slate-400">
              <Loading />
            </el-icon>
          </button>
        </div>
      </div>

      <div class="mt-3 opacity-40 hover:opacity-60 transition-opacity">
        <span class="text-[11px] text-slate-400 font-medium tracking-wide">
          内容由 AI 生成，请注意甄别其准确性
        </span>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Position, Loading, Cpu, Search } from "@element-plus/icons-vue";

const props = defineProps<{
  disabled?: boolean;
  isReasoner?: boolean;
}>();

const emit = defineEmits<{
  send: [message: string];
  modelChange: [isReasoner: boolean];
}>();

const message = ref("");

const toggleReasoner = () => {
  if (props.disabled) return;
  emit("modelChange", !props.isReasoner);
};

const handleSend = () => {
  const trimmedMessage = message.value.trim();
  if (!trimmedMessage || props.disabled) return;

  emit("send", trimmedMessage);

  setTimeout(() => {
    message.value = "";
  }, 50);
};

const handleNewline = (e: KeyboardEvent) => {
  if (props.disabled) {
    e.preventDefault();
  }
};
</script>

<style scoped>
/* 终极解法：彻底击穿 Element Plus 的默认样式外壳 */
.pro-textarea :deep(.el-textarea__inner) {
  box-shadow: none !important;
  border: none !important;
  background: transparent !important;
  /* 【像素级修复】上下内边距固定为 14px，确保单行高度为 52px */
  padding: 14px 8px 14px 24px;
  font-size: 15px;
  /* 行高固定为 24px (15 * 1.6) */
  line-height: 1.6;
  color: #1e293b;
  border-radius: 28px;
  scrollbar-width: none;
}

/* Chrome/Safari/Edge 隐藏滚动条 */
.pro-textarea :deep(.el-textarea__inner::-webkit-scrollbar) {
  display: none;
}

/* 占位符颜色调优 */
.pro-textarea :deep(.el-textarea__inner::placeholder) {
  color: #94a3b8;
  font-weight: 400;
}

/* 禁用状态下的文本框 */
.pro-textarea :deep(.el-textarea__inner:disabled) {
  color: #64748b;
  cursor: not-allowed;
  -webkit-text-fill-color: #64748b;
}
</style>