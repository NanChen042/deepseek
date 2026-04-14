<template>
  <div class="relative flex h-full w-full bg-white overflow-hidden text-slate-800">
    <!-- 侧边栏 -->
    <ChatSidebar v-show="isSidebarOpen" class="z-40" />

    <!-- 主对话区域 -->
    <div class="flex-1 flex flex-col min-w-0 bg-white relative">
      <!-- 顶部状态栏: Glassmorphism -->
      <header class="sticky top-0 z-30 w-full bg-white/70 backdrop-blur-xl border-b border-slate-200/40 py-2.5">
        <div class="max-w-5xl mx-auto px-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <!-- 侧边栏切换按钮 -->
            <button @click="toggleSidebar" class="p-2 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all active:scale-95">
              <el-icon class="text-xl">
                <component :is="isSidebarOpen ? Fold : Expand" />
              </el-icon>
            </button>

            <div class="w-px h-4 bg-slate-200/60 mx-1"></div>

            <!-- 当前标题和模式 -->
            <div class="flex flex-col select-none ml-2">
              <span class="text-[14px] font-extrabold text-slate-800 tracking-tight leading-tight">{{ chatStore.activeSession?.title || '新对话' }}</span>
              <span class="text-[10px] font-bold text-slate-400 leading-tight mt-0.5">{{ modelOptions[currentModel] }}</span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <el-tooltip content="清空当前对话" placement="bottom">
              <button @click="showClearConfirm" :disabled="loading" class="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">
                <el-icon class="text-lg">
                  <Delete />
                </el-icon>
              </button>
            </el-tooltip>
          </div>
        </div>
      </header>

      <!-- 消息列表 -->
      <main class="flex-1 overflow-y-auto w-full pt-8 pb-40 scroll-smooth custom-scrollbar" ref="messagesContainer">
        <div class="max-w-4xl mx-auto px-4 md:px-6 flex flex-col gap-12 text-[15.5px]">

          <!-- 空状态 -->
          <div v-if="messages.length === 0" class="flex flex-col items-center justify-center mt-32 opacity-[0.2] animate-in fade-in zoom-in duration-1000">
            <div class="w-20 h-20 mb-6 grayscale">
              <img :src="deepseekLogo" alt="Logo" class="w-full h-full" />
            </div>
            <h2 class="text-2xl font-bold tracking-tight text-slate-900">有什么我可以帮你的？</h2>
          </div>

          <!-- 消息气泡 -->
          <MessageBubble 
            v-for="(message, index) in messages" 
            :key="index" 
            :type="message.type" 
            :content="message.content" 
            :reasoning-content="message.reasoning_content" 
            :images="message.images" 
            :assets="message.assets" 
            :progress="message.progress" 
            :is-user="message.role === 'user'" 
            :loading="message.loading" 
            :is-last-message="index === messages.length - 1" 
            :is-sharing-mode="isSharingMode"
            :is-selected="selectedShareMessages.has(index)"
            @regenerate="$emit('regenerate', index)"
            @share="initShareMode(index)"
            @toggle-select="toggleShareSelect(index)"
            @continue="$emit('continue', message.content)" 
          />

          <!-- 加载占位 (仅对话模式) -->
          <Transition name="fade">
            <div v-if="loading && (!messages.length || messages[messages.length - 1].role === 'user')" class="flex items-start gap-5">
              <div class="w-9 h-9 rounded-xl border border-slate-100 flex items-center justify-center bg-white shadow-sm shrink-0">
                <img :src="deepseekLogo" class="w-5 h-5 animate-pulse" alt="AI Avatar" />
              </div>
              <div class="flex flex-col gap-1.5 mt-1">
                <span class="text-sm font-bold text-slate-700">正在响应...</span>
                <div class="flex items-center gap-2 h-6">
                  <span class="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
                  <span class="w-2 h-2 bg-blue-500 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
                  <span class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"></span>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </main>

      <!-- 输入区域 或 分享工具栏 -->
      <footer class="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-white via-white/80 to-transparent pt-16 pb-6 px-4 pointer-events-none">
        <div class="max-w-4xl mx-auto w-full pointer-events-auto">
          
          <ChatInput v-if="!isSharingMode" :disabled="loading" :is-reasoner="currentModel === ModelType.Reasoner" @send="(msg, mode, opts) => $emit('send', msg, mode, opts)" @modelChange="handleModelChange($event)" />
          
          <!-- Share Toolbar -->
          <div v-else class="h-16 bg-white border border-slate-200 shadow-xl rounded-2xl flex items-center justify-between px-6 animate-in slide-in-from-bottom-5">
            <div class="flex items-center gap-4">
              <el-checkbox :model-value="isAllSelected" @change="toggleSelectAll" class="!mr-0">
                <span class="font-bold text-slate-700 ml-1">全选</span>
              </el-checkbox>
              <div class="w-px h-4 bg-slate-200"></div>
              <span class="text-sm font-medium text-slate-500">已选择 <span class="text-blue-600 font-bold mx-0.5">{{ selectedShareMessages.size }}</span> 组对话</span>
            </div>
            <div class="flex items-center gap-3">
              <button @click="cancelShareMode" class="px-4 py-2 text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">取消</button>
              <button @click="showShareProcessDialog = true" :disabled="selectedShareMessages.size === 0" class="px-5 py-2 text-sm font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 shadow-sm shadow-blue-200 transition-all active:scale-95 disabled:opacity-50 disabled:scale-100 disabled:shadow-none pointer-events-auto">
                创建分享链接
              </button>
            </div>
          </div>

        </div>
      </footer>
    </div>

    <!-- 弹窗 -->
    <el-dialog v-model="showConfirmDialog" width="360px" :show-close="false" align-center class="premium-dialog">
      <div class="p-8 text-center">
        <div class="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl">
          <el-icon>
            <Delete />
          </el-icon>
        </div>
        <h4 class="text-xl font-bold text-slate-900 mb-3">清空当前对话？</h4>
        <p class="text-sm text-slate-500 mb-8 leading-relaxed px-4">清空后当前会话的历史记录将不可找回，确定要继续吗？</p>
        <div class="flex gap-3">
          <button @click="showConfirmDialog = false" class="flex-1 py-3 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all">取消</button>
          <button @click="handleClear" class="flex-1 py-3 rounded-2xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-200">确认清空</button>
        </div>
      </div>
    </el-dialog>

    <!-- 分享隐私提示弹窗 -->
    <el-dialog v-model="showShareProcessDialog" width="400px" align-center class="premium-dialog" style="border-radius: 24px" :show-close="false">
      <div class="px-4 py-6 text-center">
        <div class="w-14 h-14 bg-blue-50 text-blue-500 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl">
          <el-icon><Share /></el-icon>
        </div>
        <h4 class="text-xl font-bold text-slate-900 mb-3">创建分享链接</h4>
        <p class="text-sm text-slate-500 mb-8 leading-relaxed px-2 text-left">
          任何获得链接的人都可以查看你分享的对话，请检查是否包含敏感或隐私内容。你可以随时在系统设置 - 数据管理中管理被分享的链接。
        </p>
        <div class="flex gap-3">
          <button @click="showShareProcessDialog = false" class="flex-1 py-3 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all">取消</button>
          <button @click="confirmShare" class="flex-1 py-3 rounded-2xl bg-blue-600 text-white font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 flex items-center justify-center gap-2">
            创建并复制
          </button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch, computed } from "vue";
import { Delete, Menu, Expand, Fold, ArrowDown, Share } from "@element-plus/icons-vue";
import { ModelType } from "@/services/aiService";
import { useChatStore } from "@/stores/chat";
import deepseekLogo from "@/assets/deepseeklogo.svg";
import ChatSidebar from "./ChatSidebar.vue";
import ChatInput from "./ChatInput.vue";
import MessageBubble from "./MessageBubble.vue";
import { ElMessage } from "element-plus";

interface Message {
  role: "user" | "assistant" | "system";
  type: "text" | "image";
  content: string;
  reasoning_content?: string;
  images?: (string | { url: string })[];
  assets?: any[];
  progress?: number;
  loading?: boolean;
}

const props = defineProps<{
  messages: Message[];
  loading?: boolean;
}>();

const emit = defineEmits<{
  send: [message: string, mode?: 'chat' | 'image', options?: any];
  clear: [];
  modelChange: [model: ModelType];
  continue: [prefix: string];
  regenerate: [index: number];
}>();

const chatStore = useChatStore();
const messagesContainer = ref<HTMLElement | null>(null);
const initialLoad = ref(true);
const showConfirmDialog = ref(false);
const isSidebarOpen = ref(true);

const modelOptions: Record<string, string> = {
  [ModelType.V3]: "DeepSeek V3",
  [ModelType.R1_Distill_7B]: "R1-Distill-Qwen-7B (免费)",
  [ModelType.R1_Distill_8B]: "R1-0528-Qwen3-8B (免费)",
  [ModelType.OCR]: "DeepSeek OCR",
  [ModelType.QwenOmni]: "Qwen-Omni",
  [ModelType.QwenVL]: "Qwen-VL",
  [ModelType.Qwen35_4B]: "Qwen-3.5-4B",
  [ModelType.ART]: "AI 艺术绘画",
  [ModelType.GLM4V]: "GLM-4V-9B",
  [ModelType.Reasoner]: "DeepSeek R1 Reasoner"
};

const currentModel = computed(() => chatStore.currentModel || ModelType.V3);

// --- Share Feature State ---
const isSharingMode = ref(false);
const selectedShareMessages = ref<Set<number>>(new Set());
const showShareProcessDialog = ref(false);

const isAllSelected = computed(() => {
  return props.messages.length > 0 && selectedShareMessages.value.size === props.messages.length;
});

const initShareMode = (initialIndex: number) => {
  isSharingMode.value = true;
  selectedShareMessages.value.clear();
  selectedShareMessages.value.add(initialIndex);
};

const toggleShareSelect = (index: number) => {
  if (selectedShareMessages.value.has(index)) {
    selectedShareMessages.value.delete(index);
  } else {
    selectedShareMessages.value.add(index);
  }
};

const toggleSelectAll = () => {
  if (isAllSelected.value) {
    selectedShareMessages.value.clear();
  } else {
    props.messages.forEach((_, i) => selectedShareMessages.value.add(i));
  }
};

const cancelShareMode = () => {
  isSharingMode.value = false;
  selectedShareMessages.value.clear();
};

const confirmShare = () => {
  showShareProcessDialog.value = false;
  cancelShareMode();
  ElMessage({
    message: '分享链接已复制到剪贴板',
    type: 'success',
    plain: true
  });
};
// ---------------------------

const handleModelChange = (model: ModelType) => {
  chatStore.switchModel(model);
};

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

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

watch(() => props.messages, () => scrollToBottom(), { deep: true, immediate: true });

onMounted(() => {
  scrollToBottom();
  nextTick(() => { initialLoad.value = false; });
});

const showClearConfirm = () => { showConfirmDialog.value = true; };
const handleClear = () => {
  showConfirmDialog.value = false;
  emit("clear");
};
</script>

<style scoped>
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

/* Premium Dropdown Menu */
.premium-dropdown-menu {
  border-radius: 20px !important;
  padding: 8px !important;
  border: 1px solid rgba(226, 232, 240, 0.8) !important;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.05) !important;
}

.premium-dropdown-menu :deep(.el-dropdown-menu__item) {
  border-radius: 12px;
  margin-bottom: 2px;
  padding: 8px 16px;
}

.premium-dropdown-menu :deep(.el-dropdown-menu__item:hover) {
  background-color: #eff6ff;
  color: #2563eb;
}

.premium-dropdown-menu :deep(.el-dropdown-menu__item.is-active) {
  background-color: #dbeafe;
  color: #1e40af;
}

/* Premium Dialog */
.premium-dialog :deep(.el-dialog) {
  border-radius: 32px !important;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1) !important;
}

.premium-dialog :deep(.el-dialog__header),
.premium-dialog :deep(.el-dialog__footer) {
  display: none !important;
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