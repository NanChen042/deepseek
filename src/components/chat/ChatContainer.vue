<template>
  <div class="relative flex h-full w-full bg-white overflow-hidden text-slate-800">
    <!-- 侧边栏 -->
    <ChatSidebar v-show="isSidebarOpen" class="z-40" />

    <!-- 主对话区域 -->
    <div class="flex-1 flex flex-col min-w-0 bg-white relative">
      <!-- 顶部状态栏: Glassmorphism -->
      <header class="sticky top-0 z-30 w-full bg-white/70 backdrop-blur-xl border-b border-slate-200/40 py-3">
        <div class="max-w-4xl mx-auto px-4 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <!-- 侧边栏切换按钮: 重新设计位置与样式 -->
            <el-tooltip :content="isSidebarOpen ? '收起侧边栏' : '展开侧边栏'" placement="bottom">
              <button @click="toggleSidebar" class="p-2 rounded-xl hover:bg-slate-100 text-slate-500 transition-all active:scale-95">
                <el-icon class="text-xl">
                  <component :is="isSidebarOpen ? Fold : Expand" />
                </el-icon>
              </button>
            </el-tooltip>

            <div class="w-px h-4 bg-slate-200 mx-1"></div>

            <!-- 模型选择器: 重新设计为精美下拉菜单 -->
            <el-dropdown trigger="click" @command="handleModelChange" class="model-dropdown">
              <button class="flex items-center gap-2 px-3 py-1.5 rounded-xl hover:bg-slate-100 transition-all">
                <div class="w-2 h-2 rounded-full" :class="currentModel === ModelType.Reasoner ? 'bg-indigo-500 shadow-[0_0_8px_rgba(99,102,241,0.5)]' : 'bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]'"></div>
                <span class="text-sm font-bold text-slate-800">{{ modelOptions[currentModel] }}</span>
                <el-icon class="text-xs text-slate-400"><ArrowDown /></el-icon>
              </button>
              <template #dropdown>
                <el-dropdown-menu class="premium-dropdown-menu">
                  <el-dropdown-item v-for="(label, model) in modelOptions" :key="model" :command="model" :class="{ 'is-active': currentModel === model }">
                    <div class="flex flex-col py-1">
                      <div class="flex items-center gap-2">
                         <span class="font-bold text-[14px]">{{ label }}</span>
                         <el-tag v-if="model === ModelType.Reasoner" size="small" effect="plain" type="info" class="scale-90 font-bold">深度思考</el-tag>
                      </div>
                      <span class="text-[11px] text-slate-400 mt-0.5">
                        {{ model === ModelType.Reasoner ? '具备强大的逻辑推理能力，适合复杂问题' : '响应速度快，适合日常对话与创意协作' }}
                      </span>
                    </div>
                  </el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>

          <div class="flex items-center gap-2">
             <el-tooltip content="清空当前对话" placement="bottom">
              <button @click="showClearConfirm" :disabled="loading" class="w-9 h-9 flex items-center justify-center rounded-xl text-slate-400 hover:text-red-500 hover:bg-red-50 transition-all">
                <el-icon class="text-lg"><Delete /></el-icon>
              </button>
            </el-tooltip>
          </div>
        </div>
      </header>

      <!-- 消息列表 -->
      <main class="flex-1 overflow-y-auto w-full pt-8 pb-40 scroll-smooth custom-scrollbar" ref="messagesContainer">
        <div class="max-w-3xl mx-auto px-4 md:px-0 flex flex-col gap-10 text-[15px]">
          
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
            :content="message.content" 
            :reasoning-content="message.reasoning_content" 
            :is-user="message.role === 'user'" 
            :loading="loading" 
            :is-last-message="index === messages.length - 1" 
            @continue="$emit('continue', message.content)" 
          />

          <!-- 加载占位 -->
          <Transition name="fade">
            <div v-if="loading && (!messages.length || messages[messages.length - 1].role === 'user')" class="flex items-start gap-5">
              <div class="w-9 h-9 rounded-xl border border-slate-100 flex items-center justify-center bg-white shadow-sm shrink-0">
                <img :src="deepseekLogo" class="w-5 h-5 animate-pulse" alt="AI Avatar" />
              </div>
              <div class="flex flex-col gap-1.5 mt-1">
                <span class="text-sm font-bold text-slate-700">正在思考...</span>
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

      <!-- 输入区域 -->
      <footer class="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-white via-white to-transparent pt-12 pb-8 px-4">
        <div class="max-w-3xl mx-auto w-full">
          <ChatInput :disabled="loading" @send="$emit('send', $event)" />
        </div>
      </footer>
    </div>

    <!-- 弹窗 -->
    <el-dialog v-model="showConfirmDialog" width="360px" :show-close="false" align-center class="premium-dialog">
      <div class="p-8 text-center">
        <div class="w-14 h-14 bg-red-50 text-red-500 rounded-2xl flex items-center justify-center mx-auto mb-5 text-2xl">
           <el-icon><Delete /></el-icon>
        </div>
        <h4 class="text-xl font-bold text-slate-900 mb-3">清空当前对话？</h4>
        <p class="text-sm text-slate-500 mb-8 leading-relaxed px-4">清空后当前会话的历史记录将不可找回，确定要继续吗？</p>
        <div class="flex gap-3">
          <button @click="showConfirmDialog = false" class="flex-1 py-3 rounded-2xl bg-slate-100 text-slate-600 font-bold hover:bg-slate-200 transition-all">取消</button>
          <button @click="handleClear" class="flex-1 py-3 rounded-2xl bg-red-500 text-white font-bold hover:bg-red-600 transition-all shadow-lg shadow-red-200">确认清空</button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick, watch } from "vue";
import { Delete, Menu, Expand, Fold, ArrowDown } from "@element-plus/icons-vue";
import { ModelType } from "@/services/aiService";
import deepseekLogo from "@/assets/deepseeklogo.svg";
import ChatSidebar from "./ChatSidebar.vue";
import ChatInput from "./ChatInput.vue";
import MessageBubble from "./MessageBubble.vue";

interface Message {
  role: "user" | "assistant" | "system";
  content: string;
  reasoning_content?: string;
}

const props = defineProps<{
  messages: Message[];
  loading?: boolean;
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
const isSidebarOpen = ref(true);

const modelOptions = {
  [ModelType.Chat]: "DeepSeek V3",
  [ModelType.Reasoner]: "DeepSeek R1",
};

const currentModel = ref<ModelType>(ModelType.Chat);

const handleModelChange = (model: ModelType) => {
  currentModel.value = model;
  emit("modelChange", model);
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
.custom-scrollbar::-webkit-scrollbar { width: 4px; }
.custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
.custom-scrollbar::-webkit-scrollbar-thumb { background-color: transparent; border-radius: 4px; }
.custom-scrollbar:hover::-webkit-scrollbar-thumb { background-color: #cbd5e1; }

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
  background-color: #f8fafc;
  color: inherit;
}
.premium-dropdown-menu :deep(.el-dropdown-menu__item.is-active) {
  background-color: #f1f5f9;
}

/* Premium Dialog */
.premium-dialog :deep(.el-dialog) {
  border-radius: 32px !important;
  padding: 0;
  overflow: hidden;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.1) !important;
}
.premium-dialog :deep(.el-dialog__header),
.premium-dialog :deep(.el-dialog__footer) { display: none !important; }

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>