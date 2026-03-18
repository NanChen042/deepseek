<template>
  <div class="w-full shrink-0 px-2 md:px-0">
    <div class="max-w-3xl mx-auto relative flex flex-col items-center">

      <div :class="[
          'group relative flex items-end w-full bg-white rounded-[28px] transition-all duration-300 ease-out',
          'border border-slate-200/80 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.05)]',
          'focus-within:border-blue-400/50 focus-within:shadow-[0_12px_40px_-10px_rgba(59,130,246,0.12)] focus-within:ring-4 focus-within:ring-blue-500/10'
        ]">
        <el-input v-model="message" type="textarea" :autosize="{ minRows: 1, maxRows: 8 }" resize="none" placeholder="发送消息给 DeepSeek... (Shift + Enter 换行)" @keydown.enter.exact.prevent="handleSend" @keydown.enter.shift="handleNewline" :disabled="disabled" class="pro-textarea flex-1" />

        <div class="flex items-center justify-center pr-1.5 pb-[6px] shrink-0">
          <button @click="handleSend" :disabled="!message.trim() || disabled" :class="[
              'relative flex items-center justify-center w-10 h-10 rounded-[22px] transition-all duration-300 overflow-hidden',
              message.trim() && !disabled
                ? 'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-[0_2px_10px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_16px_rgba(59,130,246,0.4)] hover:-translate-y-[1px] active:translate-y-0 cursor-pointer' 
                : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            ]">
            <el-icon v-if="!disabled" class="text-[18px] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5">
              <Position />
            </el-icon>

            <el-icon v-else class="text-[18px] animate-spin text-slate-500">
              <Loading />
            </el-icon>
          </button>
        </div>
      </div>

      <div class="mt-3.5 mb-1 opacity-70 hover:opacity-100 transition-opacity">
        <span class="text-[12px] text-slate-400 font-medium tracking-wide">
          内容由 AI 生成，请注意甄别其准确性
        </span>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Position, Loading } from "@element-plus/icons-vue";

const props = defineProps<{
  disabled?: boolean;
}>();

const emit = defineEmits<{
  send: [message: string];
}>();

const message = ref("");

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