<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useChatStore } from "@/stores/chat";
import { Position, Cpu, Search } from "@element-plus/icons-vue";
import deepseekLogo from "@/assets/deepseeklogo.svg";

const router = useRouter();
const chatStore = useChatStore();
const userInput = ref("");
const isReasoner = ref(false); // 是否开启深度思考

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
    query: {
      q: userInput.value.trim(),
      model: isReasoner.value ? "reasoner" : "chat"
    }
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
    <div class="relative z-10 w-full max-w-3xl flex flex-col items-center">

      <!-- Logo Area: Clean & Professional -->
      <div class="flex flex-col items-center mb-0 animate-entry-logo">
        <div class="w-16 h-16 mb-8 p-4 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:scale-105 transition-all duration-500">
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
        <div class="relative flex flex-col w-full bg-white rounded-2xl border border-slate-200 shadow-[0_12px_45px_-12px_rgba(0,0,0,0.08)] focus-within:border-blue-400 focus-within:shadow-[0_20px_60px_-12px_rgba(59,130,246,0.15)] focus-within:ring-4 focus-within:ring-blue-500/5 transition-all duration-500 ease-out overflow-hidden">

          <textarea v-model="userInput" @keydown.enter.exact.prevent="handleStartChat" placeholder="给 DeepSeek 发送消息..." class="w-full bg-transparent border-none focus:outline-none focus:ring-0 resize-none pt-5 pb-3 px-6 text-xl text-slate-800 placeholder:text-slate-400 min-h-[90px] max-h-[300px] leading-relaxed" rows="1" v-auto-focus></textarea>

          <!-- 底部工具栏 -->
          <div class="flex items-center justify-between px-4 pb-4 mt-2">
            <div class="flex items-center gap-2">
              <button @click="isReasoner = !isReasoner" class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] font-bold transition-all duration-300" :class="isReasoner ? 'bg-blue-50 text-blue-600 border border-blue-100' : 'bg-slate-50 text-slate-500 border border-slate-100 hover:bg-slate-100'">
                <el-icon class="text-sm">
                  <Cpu />
                </el-icon>
                深度思考 (R1)
              </button>
              <button class="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[13px] font-bold bg-slate-50 text-slate-400 border border-slate-100 hover:bg-slate-100 transition-all duration-300" title="搜索功能即将上线">
                <el-icon class="text-sm">
                  <Search />
                </el-icon>
                联网搜索
              </button>
            </div>

            <button @click="handleStartChat" :disabled="!userInput.trim()" class="w-10 h-10 rounded-xl flex items-center justify-center transition-all duration-500" :class="userInput.trim() ? 'bg-blue-600 text-white shadow-lg shadow-blue-200 hover:scale-105 active:scale-95' : 'bg-slate-50 text-slate-200 cursor-not-allowed'">
              <el-icon class="text-lg rotate-45">
                <Position />
              </el-icon>
            </button>
          </div>
        </div>

        <!-- 底部快捷提示 -->
        <div class="mt-8 flex flex-wrap justify-center gap-6 text-[13px] text-slate-400 font-medium animate-entry-footer opacity-80">
          <span class="hover:text-slate-600 cursor-default transition-colors">通用对话 V3</span>
          <span class="w-1 h-1 bg-slate-300 rounded-full mt-2"></span>
          <span class="hover:text-slate-600 cursor-default transition-colors">推理模型 R1</span>
          <span class="w-1 h-1 bg-slate-300 rounded-full mt-2"></span>
          <span class="hover:text-slate-600 cursor-default transition-colors">百万上下文</span>
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

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}

.animate-blink {
  animation: blink 1s step-end infinite;
}

/* 背景脉动 */
@keyframes pulse-slow {

  0%,
  100% {
    transform: translate(-50%, 0) scale(1);
    opacity: 0.6;
  }

  50% {
    transform: translate(-50%, -5%) scale(1.05);
    opacity: 0.4;
  }
}

.animate-pulse-slow {
  animation: pulse-slow 8s ease-in-out infinite;
}

/* 元素入场动画序列 */
@keyframes entry-logo {
  from {
    opacity: 0;
    transform: translateY(20px) scale(0.9);
  }

  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes entry-input {
  from {
    opacity: 0;
    transform: translateY(30px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes entry-footer {
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
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