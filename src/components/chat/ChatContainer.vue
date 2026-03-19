<template>
  <div class="relative flex flex-col h-full w-full bg-white overflow-hidden text-slate-800">

    <header class="sticky top-0 z-30 w-full bg-white/95 backdrop-blur-md border-b border-slate-100/80 pt-4 pb-3">
      <div class="max-w-3xl mx-auto px-4 md:px-0 flex items-center justify-between">

        <div class="flex items-center gap-2">
          <el-select v-model="currentModel" class="web-standard-select" :disabled="loading" placement="bottom-start">
            <template #prefix>
              <span class="flex h-2 w-2 relative ml-1 mr-1">
                <span v-if="loading" class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span class="relative inline-flex rounded-full h-2 w-2" :class="loading ? 'bg-blue-500' : 'bg-slate-300'"></span>
              </span>
            </template>
            <el-option v-for="(label, model) in modelOptions" :key="model" :label="label" :value="model" />
          </el-select>
        </div>

        <div class="flex items-center">
          <el-tooltip content="清空当前对话" placement="bottom" :show-after="300">
            <button @click="showClearConfirm" class="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium text-slate-400 hover:text-red-500 hover:bg-red-50 transition-colors" aria-label="清空对话">
              <el-icon class="text-[15px]">
                <Delete />
              </el-icon>
              <span class="hidden sm:inline">清空</span>
            </button>
          </el-tooltip>
        </div>

      </div>
    </header>

    <main class="flex-1 overflow-y-auto w-full pt-6 pb-40 scroll-smooth custom-scrollbar" ref="messagesContainer">
      <div class="max-w-3xl mx-auto px-4 md:px-0 flex flex-col gap-8">

        <div v-if="messages.length === 0" class="flex flex-col items-center justify-center mt-20 opacity-60">
          <div class="w-16 h-16 mb-6">
            <img :src="deepseekLogo" alt="Deepseek Logo" class="w-full h-full grayscale" />
          </div>
          <h2 class="text-2xl font-bold text-slate-700 mb-2">有什么我可以帮你的？</h2>
        </div>

        <MessageBubble v-for="(message, index) in messages" :key="index" :content="message.content" :reasoning-content="message.reasoning_content" :is-user="message.role === 'user'" :loading="loading" :is-last-message="index === messages.length - 1" :timestamp="Date.now()" @continue="$emit('continue', message.content)" />

        <Transition name="fade">
          <div v-if="loading && (!messages.length || messages[messages.length - 1].role === 'user')" class="flex items-start gap-4">
            <div class="w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center bg-white shadow-sm shrink-0">
              <img :src="deepseekLogo" class="w-5 h-5 animate-pulse" alt="AI Avatar" />
            </div>
            <div class="flex flex-col gap-1 mt-1">
              <span class="text-sm font-semibold text-slate-700">
                {{ currentModel === ModelType.Reasoner ? 'DeepSeek-R1' : 'DeepSeek-V3' }}
              </span>
              <div class="flex items-center gap-1.5 h-6">
                <span class="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                <span class="w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                <span class="w-2 h-2 bg-slate-300 rounded-full animate-bounce"></span>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </main>

    <footer class="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-white via-white to-transparent pt-10 pb-6 px-4">
      <div class="max-w-3xl mx-auto w-full">
        <ChatInput :disabled="loading" @send="$emit('send', $event)" />
      </div>
    </footer>

    <el-dialog v-model="showConfirmDialog" width="340px" :show-close="false" align-center class="minimal-dialog">
      <div class="p-4 text-center">
        <h4 class="text-lg font-bold text-slate-900 mb-2">清空当前对话？</h4>
        <p class="text-sm text-slate-500 mb-6">所有的上下文记忆都将被清除。</p>
        <div class="flex flex-col gap-2.5">
          <button @click="handleClear" class="w-full py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors">确认清空</button>
          <button @click="showConfirmDialog = false" class="w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors">取消</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
// ... 这里保留你原本的 script 逻辑，完全不用变
import { ref, onMounted, nextTick, watch } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { ModelType } from "@/services/aiService";
import deepseekLogo from "@/assets/deepseeklogo.svg";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  reasoning_content?: string;
}

const props = defineProps<{
  title?: string;
  messages: Message[];
  loading?: boolean;
  streamMode?: boolean;
}>();

const emit = defineEmits<{
  send: [message: string];
  clear: [];
  modelChange: [model: ModelType];
  continue: [prefix: string];
}>();

const messagesContainer = ref<HTMLElement | null>(null);
const initialLoad = ref(true);
const showConfirmDialog = ref(false);

const modelOptions = {
  [ModelType.Chat]: "DeepSeek V3",
  [ModelType.Reasoner]: "DeepSeek R1",
};

const currentModel = ref<ModelType>(ModelType.Chat);

watch(currentModel, (newModel) => {
  emit("modelChange", newModel);
});

const scrollToBottom = async () => {
  await nextTick();
  if (messagesContainer.value) {
    const container = messagesContainer.value;
    container.scrollTo({
      top: container.scrollHeight,
      behavior: initialLoad.value ? "auto" : "smooth",
    });
  }
};

watch(
  () => props.messages,
  () => scrollToBottom(),
  { deep: true, immediate: true }
);
watch(
  () => props.loading,
  (newVal) => {
    if (newVal) scrollToBottom();
  },
  { immediate: true }
);

onMounted(() => {
  scrollToBottom();
  nextTick(() => {
    initialLoad.value = false;
  });
});

const showClearConfirm = () => {
  showConfirmDialog.value = true;
};
const handleClear = () => {
  showConfirmDialog.value = false;
  emit("clear");
};
</script>

<style scoped>
/* 滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 4px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
}

/* ==========================================
   标准化 Web 下拉选择器 (类似 ChatGPT 的左上角)
   ========================================== */
.web-standard-select {
  width: auto;
  min-width: 140px;
}
/* 移除所有默认的边框和背景，让它变成纯文字按钮的感觉 */
.web-standard-select :deep(.el-input__wrapper) {
  background-color: transparent !important;
  box-shadow: none !important;
  border: none !important;
  padding: 4px 8px;
  cursor: pointer;
  border-radius: 8px;
  transition: all 0.2s;
}
.web-standard-select :deep(.el-input__wrapper:hover),
.web-standard-select :deep(.el-input__wrapper.is-focus) {
  background-color: #f1f5f9 !important; /* slate-100 极浅灰底色 */
}
/* 放大字体，加粗，符合顶部标题的视觉比重 */
.web-standard-select :deep(.el-input__inner) {
  font-size: 16px;
  font-weight: 600;
  color: #1e293b; /* slate-800 */
  cursor: pointer;
}

/* 弹窗 */
.minimal-dialog :deep(.el-dialog) {
  border-radius: 20px !important;
  padding: 0;
  box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1),
    0 8px 10px -6px rgb(0 0 0 / 0.1);
}
.minimal-dialog :deep(.el-dialog__header),
.minimal-dialog :deep(.el-dialog__footer) {
  display: none !important;
}
.minimal-dialog :deep(.el-dialog__body) {
  padding: 12px;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>