<template>
  <div class="min-h-screen bg-white">
    <!-- Main Content Wrapper -->
    <div class="max-w-[1440px] mx-auto flex">
      
      <!-- Left Sidebar: Global Navigation -->
      <aside class="hidden xl:block w-64 sticky top-[80px] h-[calc(100vh-80px)] overflow-y-auto px-6 py-10 border-r border-slate-100">
        <div class="flex flex-col gap-8">
          <div v-for="group in navGroups" :key="group.title">
            <h5 class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{{ group.title }}</h5>
            <nav class="flex flex-col gap-1">
              <a v-for="link in group.links" :key="link.id" :href="'#' + link.id" 
                 class="px-3 py-2 text-[13.5px] font-semibold rounded-lg transition-all"
                 :class="activeSection === link.id ? 'bg-blue-50 text-blue-600' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-50'">
                {{ link.title }}
              </a>
            </nav>
          </div>
        </div>
      </aside>

      <!-- Center: Main Documentation -->
      <main class="flex-1 min-w-0 px-6 md:px-12 lg:px-20 py-10 lg:py-16">
        
        <!-- Document Header -->
        <header class="mb-16 border-b border-slate-100 pb-12">
          <div class="flex items-center gap-2 text-blue-600 font-bold text-xs uppercase tracking-widest mb-4">
            <el-icon><Reading /></el-icon> Documentation
          </div>
          <h1 class="text-4xl lg:text-5xl font-black text-slate-900 tracking-tight mb-6">
            DeepSeek AI 指南
          </h1>
          <p class="text-[17px] text-slate-500 leading-relaxed max-w-3xl">
            探索如何使用 DeepSeek 最先进的 AI 模型，提升您的生产力。本指南涵盖了快速开始、模型特性及高级配置等全部核心内容。
          </p>
        </header>

        <!-- Content Sections -->
        <div class="prose prose-slate max-w-none">
          
          <!-- Introduction -->
          <section id="intro" class="scroll-mt-32 mb-20">
            <h2 class="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-50">项目概览</h2>
            <p class="text-slate-600 leading-[1.8] mb-8">
              DeepSeek AI 是一款集成对话、逻辑推理与图像生成能力的综合型 AI 助手平台。我们采用了基于云端的微服务架构，确保无论是在复杂的逻辑推导还是创意灵感激发中，都能为您提供毫秒级的响应反馈。
            </p>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 my-10">
              <div class="p-6 rounded-xl border border-slate-200 bg-white hover:border-blue-400 transition-all group">
                <div class="w-10 h-10 rounded-lg bg-blue-50 flex items-center justify-center text-blue-600 mb-4 transition-colors group-hover:bg-blue-600 group-hover:text-white">
                  <el-icon class="text-xl"><ChatDotSquare /></el-icon>
                </div>
                <h3 class="text-[16px] font-bold text-slate-900 mb-2">多会话交互</h3>
                <p class="text-[13px] text-slate-500 leading-relaxed">基于 WebSocket 的实时会话同步，支持长文本、代码块及排版优化。</p>
              </div>
              <div class="p-6 rounded-xl border border-slate-200 bg-white hover:border-blue-400 transition-all group">
                <div class="w-10 h-10 rounded-lg bg-slate-50 flex items-center justify-center text-slate-400 mb-4 transition-colors group-hover:bg-slate-900 group-hover:text-white">
                  <el-icon class="text-xl"><Cpu /></el-icon>
                </div>
                <h3 class="text-[16px] font-bold text-slate-900 mb-2">深度推理引擎</h3>
                <p class="text-[13px] text-slate-500 leading-relaxed">针对 R1 模型优化的“思维链视图”，清晰展示 AI 的每一个逻辑步骤。</p>
              </div>
            </div>
          </section>

          <!-- Core Models -->
          <section id="models" class="scroll-mt-32 mb-20">
            <h2 class="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-50">模型引擎</h2>
            <p class="text-slate-600 leading-[1.8] mb-8">
              我们提供了多种不同特性的模型以满足多样化的需求。
            </p>

            <div class="flex flex-col gap-4">
              <!-- V3 Card -->
              <div class="p-6 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-6 items-start">
                <div class="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-blue-600 shrink-0 shadow-sm font-black text-xl italic">V3</div>
                <div class="flex-1">
                  <h4 class="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                    DeepSeek-V3 <el-tag size="small" type="success" effect="light">主力模型</el-tag>
                  </h4>
                  <p class="text-[14px] text-slate-500 leading-relaxed mb-4">
                    通用型智能模型，在创意写作、代码补全、日常百科咨询方面表现稳健，响应速度极快，是绝大多数用户的首选。
                  </p>
                  <div class="flex gap-4">
                    <span class="text-[12px] font-bold text-slate-400 flex items-center gap-1.5"><el-icon><Clock /></el-icon> 毫秒级延迟</span>
                    <span class="text-[12px] font-bold text-slate-400 flex items-center gap-1.5"><el-icon><Check /></el-icon> 通用性 100%</span>
                  </div>
                </div>
              </div>

              <!-- R1 Card -->
              <div class="p-6 rounded-xl border border-slate-100 bg-slate-50/50 flex flex-col md:flex-row gap-6 items-start">
                <div class="w-12 h-12 rounded-xl bg-white border border-slate-200 flex items-center justify-center text-indigo-600 shrink-0 shadow-sm font-black text-xl italic">R1</div>
                <div class="flex-1">
                  <h4 class="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                    DeepSeek-R1 <el-tag size="small" type="primary" effect="light">深度推理</el-tag>
                  </h4>
                  <p class="text-[14px] text-slate-500 leading-relaxed mb-4">
                    专为复杂逻辑任务设计的推理模型。能够模拟专家思维路径（CoT），在处理高难度数学、科学证明及复杂系统架构设计时效果拔群。
                  </p>
                  <div class="flex gap-4">
                    <span class="text-[12px] font-bold text-slate-400 flex items-center gap-1.5"><el-icon><MagicStick /></el-icon> 思维链技术</span>
                    <span class="text-[12px] font-bold text-slate-400 flex items-center gap-1.5"><el-icon><Select /></el-icon> 准确率 98%</span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <!-- Configuration -->
          <section id="config" class="scroll-mt-32 mb-20">
            <h2 class="text-2xl font-bold text-slate-900 mb-6 pb-2 border-b border-slate-50">配置与安全</h2>
            <div class="bg-white border-l-4 border-blue-600 p-6 shadow-sm rounded-r-xl">
               <h4 class="text-lg font-bold text-slate-900 mb-4">API 密钥管理</h4>
               <p class="text-[14px] text-slate-500 leading-relaxed space-y-4">
                 为了保障您的隐私安全，所有输入的 API 密钥均**仅存储在您的浏览器本地**（localStorage）。本平台不会记录或向除提供商（DeepSeek / SiliconFlow）以外的任何服务器发送您的密钥。
               </p>
               <div class="mt-6 flex flex-col gap-3">
                 <div class="flex items-center gap-3 text-[13px] text-slate-600"><div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div> 打开右上方设置面板</div>
                 <div class="flex items-center gap-3 text-[13px] text-slate-600"><div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div> 填入从平台获取的 sk-... 密钥</div>
                 <div class="flex items-center gap-3 text-[13px] text-slate-600"><div class="w-1.5 h-1.5 rounded-full bg-blue-600"></div> 点击保存，配置立即开启</div>
               </div>
            </div>
          </section>

        </div>
      </main>

      <!-- Right Sidebar: On this Page -->
      <aside class="hidden 2xl:block w-64 sticky top-[80px] h-[calc(100vh-80px)] px-6 py-10 border-l border-slate-50">
        <h5 class="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">本页内容</h5>
        <nav class="flex flex-col gap-3">
          <a v-for="link in allLinks" :key="link.id" :href="'#' + link.id" 
             class="text-[13px] font-medium transition-all"
             :class="activeSection === link.id ? 'text-blue-600' : 'text-slate-400 hover:text-slate-700'">
            {{ link.title }}
          </a>
        </nav>
      </aside>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, computed } from "vue";
import { 
  Reading, 
  ChatDotSquare, 
  Cpu, 
  Check, 
  Clock, 
  MagicStick, 
  Select 
} from "@element-plus/icons-vue";

const activeSection = ref("intro");

const navGroups = [
  {
    title: "快速入门",
    links: [
      { id: "intro", title: "项目概览" },
    ]
  },
  {
    title: "进阶指南",
    links: [
      { id: "models", title: "模型引擎" },
      { id: "config", title: "配置与安全" },
    ]
  }
];

const allLinks = computed(() => {
  return navGroups.flatMap(g => g.links);
});

// Implementation of a simple Scroll Spy
const handleScroll = () => {
  const sections = allLinks.value.map(l => document.getElementById(l.id));
  const scrollPos = window.scrollY + 100;
  
  for (let i = sections.length - 1; i >= 0; i--) {
    const el = sections[i];
    if (el && el.offsetTop <= scrollPos) {
      activeSection.value = el.id;
      break;
    }
  }
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll);
});

onUnmounted(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
.prose h2 {
  margin-top: 1.5em;
  margin-bottom: 1em;
}
.prose p {
  margin-bottom: 1.25em;
}

/* Custom Scrollbar for sidebar */
aside::-webkit-scrollbar {
  width: 4px;
}
aside::-webkit-scrollbar-thumb {
  background: #f1f5f9;
  border-radius: 10px;
}
</style>
