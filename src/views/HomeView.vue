<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import {
  ChatLineRound,
  Lightning,
  Connection,
  ArrowRight,
  DataAnalysis,
  Position,
} from "@element-plus/icons-vue";

const router = useRouter();

// 控制各部分的入场动画，营造错落有致的高级感
const isHeroVisible = ref(false);
const isFeaturesVisible = ref(false);

onMounted(() => {
  setTimeout(() => {
    isHeroVisible.value = true;
  }, 100);

  setTimeout(() => {
    isFeaturesVisible.value = true;
  }, 300);
});

const features = [
  {
    icon: ChatLineRound,
    title: "自然流畅对话",
    description:
      "具备强大的上下文记忆与逻辑推理能力，像人类一样自然交流，理解你的每一个意图。",
    color: "text-blue-500",
    bg: "bg-blue-50",
  },
  {
    icon: Lightning,
    title: "毫秒级极速响应",
    description:
      "采用最新一代流式输出技术，拒绝漫长等待，思考与回答同步进行，丝滑体验。",
    color: "text-cyan-500",
    bg: "bg-cyan-50",
  },
  {
    icon: Connection,
    title: "多模态深度理解",
    description:
      "不仅仅是文字，更能处理代码、逻辑分析与复杂任务拆解，做你的全能副驾驶。",
    color: "text-indigo-500",
    bg: "bg-indigo-50",
  },
];
</script>

<template>
  <div class="relative min-h-screen bg-[#fafcff] overflow-hidden font-sans text-slate-800">

    <div class="absolute inset-0 z-0 pointer-events-none">
      <div class="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div class="absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] opacity-70"></div>
      <div class="absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-cyan-300/20 rounded-full blur-[100px] opacity-50"></div>
    </div>

    <main class="relative z-10 w-full max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 lg:pt-32">

      <div :class="[
          'max-w-4xl mx-auto text-center transition-all duration-1000 ease-out',
          isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        ]">
        <div class="inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium">
          <span class="relative flex h-2 w-2">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Deepseek V3.0 模型现已上线
        </div>

        <h1 class="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] mb-6">
          探索 AI 对话的 <br class="hidden sm:block" />
          <span class="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent">
            无限可能
          </span>
        </h1>

        <p class="text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed">
          基于最新一代大型语言模型，为您提供更聪明、更快速、更深入的智能对话体验。无论日常工作、灵感创作还是复杂代码，都能得心应手。
        </p>

        <div class="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button @click="router.push('/chat')" class="group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_12px_25px_rgba(37,99,235,0.35)] hover:-translate-y-0.5">
            免费开始对话
            <el-icon class="text-lg transition-transform duration-300 group-hover:translate-x-1">
              <ArrowRight />
            </el-icon>
          </button>

          <button class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-slate-600 rounded-full bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-sm hover:-translate-y-0.5">
            <el-icon class="text-lg">
              <Position />
            </el-icon>
            查看开发文档
          </button>
        </div>
      </div>

      <div :class="[
          'mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ease-out delay-200',
          isFeaturesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
        ]">
        <div v-for="(item, index) in features" :key="index" class="group relative p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1">
          <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl"></div>

          <div :class="['w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3', item.bg, item.color]">
            <el-icon class="text-2xl">
              <component :is="item.icon" />
            </el-icon>
          </div>

          <h3 class="text-xl font-bold text-slate-800 mb-3">{{ item.title }}</h3>
          <p class="text-slate-500 leading-relaxed">{{ item.description }}</p>
        </div>
      </div>

    </main>
  </div>
</template>

<style scoped>
/* 这里不再需要手写复杂的CSS，全靠 Tailwind 的 utility classes 完成 */
</style>