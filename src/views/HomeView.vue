<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useChatStore } from "@/stores/chat";
import { Position } from "@element-plus/icons-vue";
import deepseekLogo from "@/assets/deepseeklogo.svg";

const router = useRouter();
const chatStore = useChatStore();
const userInput = ref("");

// 打字机逻辑
const fullTitle = "有什么我可以帮你的？";
const displayTitle = ref("");
const showCursor = ref(true);

const startTypewriter = () => {
  let i = 0;
  const timer = setInterval(() => {
    if (i < fullTitle.length) {
      displayTitle.value += fullTitle.charAt(i);
      i++;
    } else {
      clearInterval(timer);
      // 打完字后停止闪烁或改变光标状态
    }
  }, 100);
};

onMounted(() => {
  startTypewriter();
});

const handleStartChat = () => {
  if (!userInput.value.trim()) return;
  
  router.push({
    path: "/chat",
    query: { q: userInput.value.trim() }
  });
};
</script>

<template>
  <div class="relative min-h-[calc(100vh-72px)] bg-white flex flex-col items-center justify-center px-6 overflow-hidden">
    <!-- 背景渐变特效 -->
    <div class="absolute inset-0 pointer-events-none overflow-hidden">
      <div class="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[800px] bg-blue-50/50 rounded-full blur-[120px] animate-pulse-slow"></div>
      <div class="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-cyan-50/30 rounded-full blur-[100px]"></div>
    </div>

    <!-- 极简内容 -->
    <div class="relative z-10 w-full max-w-2xl flex flex-col items-center">
      
      <!-- Logo: 渐显 + 缩放动画 -->
      <div class="flex flex-col items-center mb-10 animate-entry-logo">
        <div class="w-16 h-16 mb-6 p-3 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.04)] border border-slate-100 hover:scale-105 transition-transform duration-500">
          <img :src="deepseekLogo" alt="Logo" class="w-full h-full object-contain" />
        </div>
      </div>

      <!-- Title: 打字机动画 -->
      <div class="mb-12 text-center h-[52px]">
        <h1 class="text-4xl md:text-5xl font-bold text-slate-900 tracking-tight inline-block relative">
          {{ displayTitle }}
          <span v-if="showCursor" class="inline-block w-[3px] h-[36px] md:h-[42px] bg-blue-600 ml-1 -mb-1 animate-blink"></span>
        </h1>
      </div>

      <!-- 居中输入框 (ChatGPT 风格) -->
      <div class="w-full relative group animate-entry-input">
        <div class="relative flex items-end w-full bg-white rounded-[32px] border border-slate-200/80 shadow-[0_12px_40px_-12px_rgba(0,0,0,0.06)] focus-within:border-blue-400 focus-within:shadow-[0_20px_50px_-12px_rgba(59,130,246,0.12)] focus-within:ring-4 focus-within:ring-blue-500/5 transition-all duration-500 ease-out p-2.5">
          <textarea
            v-model="userInput"
            @keydown.enter.exact.prevent="handleStartChat"
            placeholder="给 DeepSeek 发送消息..."
            class="w-full bg-transparent border-none focus:outline-none focus:ring-0 resize-none py-3 pl-5 pr-14 text-lg text-slate-800 placeholder:text-slate-400 min-h-[64px] max-h-[200px] leading-relaxed"
            rows="1"
            v-auto-focus
          ></textarea>

          <button
            @click="handleStartChat"
            :disabled="!userInput.trim()"
            class="absolute right-4 bottom-4 w-11 h-11 rounded-2xl flex items-center justify-center transition-all duration-500"
            :class="userInput.trim() ? 'bg-blue-600 text-white shadow-xl shadow-blue-200 hover:scale-110 active:scale-95' : 'bg-slate-50 text-slate-200 cursor-not-allowed'"
          >
            <el-icon class="text-xl rotate-45"><Position /></el-icon>
          </button>
        </div>

        <!-- 底部快捷操作或提示 -->
        <div class="mt-6 flex flex-wrap justify-center gap-4 text-[13px] text-slate-400 font-medium animate-entry-footer">
          <span class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 hover:bg-slate-100 cursor-default transition-colors border border-slate-100/50">
             DeepSeek-V3 
          </span>
          <span class="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-50 hover:bg-slate-100 cursor-default transition-colors border border-slate-100/50">
             R1 推理模型可用
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
const vAutoFocus = {
  mounted: (el: HTMLElement) => el.focus()
}
</script>

<style scoped>
textarea {
  scrollbar-width: none;
}
textarea::-webkit-scrollbar {
  display: none;
}

/* 打字机光标闪烁 */
@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}
.animate-blink {
  animation: blink 1s step-end infinite;
}

/* 背景脉动 */
@keyframes pulse-slow {
  0%, 100% { transform: translate(-50%, 0) scale(1); opacity: 0.6; }
  50% { transform: translate(-50%, -5%) scale(1.05); opacity: 0.4; }
}
.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}

/* 元素入场动画序列 */
@keyframes entry-logo {
  from { opacity: 0; transform: translateY(20px) scale(0.9); }
  to { opacity: 1; transform: translateY(0) scale(1); }
}

@keyframes entry-input {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes entry-footer {
  from { opacity: 0; }
  to { opacity: 1; }
}

.animate-entry-logo {
  animation: entry-logo 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) both;
}

.animate-entry-input {
  animation: entry-input 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.6s both;
}

.animate-entry-footer {
  animation: entry-footer 1s ease-out 1.2s both;
}
</style>