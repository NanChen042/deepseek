<template>
  <div class="min-h-screen flex flex-col relative font-sans text-slate-800 bg-[#fafcff]">

    <header :class="[
        'fixed w-full top-0 z-[100] transition-all duration-500',
        isScrolled 
          ? 'bg-white/70 backdrop-blur-xl border-b border-slate-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] py-3' 
          : 'bg-white/30 backdrop-blur-sm py-5'
      ]">
      <div class="max-w-7xl mx-auto px-5 md:px-6 flex items-center justify-between">

        <div class="flex items-center gap-3 cursor-pointer group" @click="router.push('/')">
          <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-[0_2px_10px_rgba(0,0,0,0.06),inset_0_1px_0_rgba(255,255,255,1)] border border-slate-100 group-hover:shadow-[0_6px_20px_rgba(59,130,246,0.15)] group-hover:border-blue-200 transition-all duration-300">
            <img :src="deepseekLogo" alt="Deepseek Logo" class="w-6 h-6 object-contain transition-transform duration-300 group-hover:scale-110" />
          </div>
          <span class="text-xl font-extrabold tracking-tight text-slate-800">
            DeepSeek <span class="bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">AI</span>
          </span>
        </div>

        <nav class="hidden md:flex items-center gap-1.5 bg-slate-50/50 p-1 rounded-full border border-slate-200/50">
          <router-link v-for="item in navItems" :key="item.path" :to="item.path" custom v-slot="{ navigate, isActive }">
            <a @click="navigate" :class="[
                'px-4 py-1.5 rounded-full text-[14px] font-semibold transition-all duration-300 cursor-pointer',
                isActive 
                  ? 'bg-white text-blue-600 shadow-[0_2px_8px_rgba(0,0,0,0.06)]' 
                  : 'text-slate-500 hover:text-slate-800 hover:bg-slate-200/50'
              ]">
              {{ item.label }}
            </a>
          </router-link>
        </nav>

        <div class="hidden md:flex items-center">
          <el-tooltip content="API 与系统设置" placement="bottom" :show-after="200">
            <button @click="openSettings" class="w-10 h-10 rounded-full flex items-center justify-center text-slate-500 hover:bg-blue-50 hover:text-blue-600 transition-all duration-300">
              <el-icon class="text-[20px] transition-transform duration-500 hover:rotate-90">
                <Setting />
              </el-icon>
            </button>
          </el-tooltip>
        </div>

        <button class="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-slate-50 text-slate-600 hover:bg-slate-100 transition-colors border border-slate-200/50" @click="toggleMenu">
          <el-icon class="text-xl">
            <component :is="isMobileMenuOpen ? Close : Menu" />
          </el-icon>
        </button>
      </div>
    </header>

    <Transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="fixed top-[72px] left-4 right-4 z-[95] bg-white/95 backdrop-blur-3xl border border-slate-200/60 rounded-3xl shadow-2xl md:hidden overflow-hidden p-2">
        <nav class="flex flex-col gap-1">
          <router-link v-for="item in navItems" :key="item.path" :to="item.path" custom v-slot="{ navigate, isActive }">
            <a @click="navigate" :class="[
                'px-5 py-4 rounded-2xl text-base font-semibold transition-all cursor-pointer flex items-center',
                isActive 
                  ? 'bg-blue-50/80 text-blue-600' 
                  : 'text-slate-600 hover:bg-slate-50'
              ]">
              {{ item.label }}
            </a>
          </router-link>

          <div class="h-px w-full bg-slate-100 my-1"></div>

          <a @click="openSettings" class="px-5 py-4 rounded-2xl text-base font-semibold text-slate-600 hover:bg-slate-50 cursor-pointer flex items-center gap-3">
            <div class="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center text-slate-500">
              <el-icon>
                <Setting />
              </el-icon>
            </div>
            系统设置
          </a>
        </nav>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 top-[72px] bg-slate-900/30 z-[90] backdrop-blur-sm md:hidden" @click="closeMenu"></div>
    </Transition>

    <main class="flex-1 w-full relative flex flex-col pt-[72px]">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="route.meta.keepAlive" :key="route.path" />
        </keep-alive>
        <component :is="Component" v-if="!route.meta.keepAlive" :key="route.path" />
      </router-view>
    </main>

    <SettingsDialog ref="settingsDialogRef" />

  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import { Menu, Close, Setting } from "@element-plus/icons-vue";
import SettingsDialog from "@/components/SettingsDialog.vue";
// 引入你本地真实的深海鲸鱼Logo (路径根据你的项目结构调整)
import deepseekLogo from "@/assets/deepseeklogo.svg";

const route = useRoute();
const router = useRouter();

const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);
const settingsDialogRef = ref();

const openSettings = () => {
  settingsDialogRef.value.show();
  closeMenu(); // 在移动端点击设置时，自动收起菜单
};

const navItems = [
  { path: "/", label: "首页" },
  { path: "/chat", label: "Deepseek 对话" },
  { path: "/stream", label: "流式输出" },
  { path: "/image", label: "图像生成" },
];

watch(
  () => route.path,
  () => {
    isMobileMenuOpen.value = false;
  }
);

const toggleMenu = () => {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
};

const closeMenu = () => {
  if (isMobileMenuOpen.value) {
    isMobileMenuOpen.value = false;
  }
};

const handleScroll = () => {
  isScrolled.value = window.scrollY > 10;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<style scoped>
/* 悬浮菜单过渡动画：加入一点弹簧感 */
.mobile-menu-enter-active {
  transition: all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.mobile-menu-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-16px) scale(0.98);
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