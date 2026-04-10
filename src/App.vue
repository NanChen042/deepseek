<template>
  <div class="min-h-screen flex flex-col relative font-sans text-slate-800 bg-[#fafcff]">

    <header :class="[
        'fixed w-full top-0 z-[100] transition-all duration-500',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-2xl border-b border-slate-200/50 shadow-[0_4px_30px_rgba(0,0,0,0.03)] py-2.5' 
          : 'bg-transparent py-5'
      ]">
      <div class="max-w-7xl mx-auto px-5 md:px-6 flex items-center justify-between">

        <!-- Logo Area: Premium branding -->
        <div class="flex items-center gap-3 cursor-pointer group" @click="router.push('/')">
          <div class="flex items-center justify-center w-10 h-10 rounded-xl bg-white shadow-[0_2px_12px_-3px_rgba(0,0,0,0.1),inset_0_1px_0_rgba(255,255,255,1)] border border-slate-100 group-hover:border-blue-200 group-hover:shadow-[0_8px_25px_-5px_rgba(59,130,246,0.15)] transition-all duration-500">
            <img :src="deepseekLogo" alt="Deepseek Logo" class="w-6 h-6 object-contain transition-transform duration-500 group-hover:scale-110" />
          </div>
          <div class="flex flex-col">
            <span class="text-[17px] font-black tracking-tight text-slate-900 leading-none">
              DEEPSEEK <span class="text-blue-600">AI</span>
            </span>
            <span class="text-[9px] font-bold text-slate-400 tracking-[0.2em] uppercase mt-1 opacity-70 group-hover:opacity-100 transition-opacity">
              Professional Assistant
            </span>
          </div>
        </div>

        <!-- Navigation: Floating Segmented Control -->
        <nav class="hidden lg:flex items-center gap-1 bg-slate-900/5 backdrop-blur-md p-1 rounded-[14px] border border-slate-200/40">
          <router-link v-for="item in navItems" :key="item.path" :to="item.path" custom v-slot="{ navigate, isActive }">
            <a @click="navigate" :class="[
                'px-5 py-1.5 rounded-[10px] text-[13.5px] font-bold transition-all duration-300 cursor-pointer select-none',
                isActive 
                  ? 'bg-white text-blue-600 shadow-[0_2px_10px_rgba(0,0,0,0.08)] scale-[1.02]' 
                  : 'text-slate-500 hover:text-slate-900 hover:bg-white/40'
              ]">
              {{ item.label }}
            </a>
          </router-link>
          
          <!-- Placeholder for more space -->
          <div class="w-2 md:w-4"></div>
        </nav>

        <!-- Rights Actions: Integrated System -->
        <div class="flex items-center gap-2 md:gap-4">
          <div class="hidden md:flex items-center gap-2 pr-2 border-r border-slate-200/60">
             <el-tooltip content="升级至 Pro" placement="bottom">
                <button class="px-4 py-1.5 rounded-full text-[12px] font-bold bg-slate-900 text-white hover:bg-blue-600 transition-all active:scale-95 shadow-lg shadow-slate-200">
                  Upgrade
                </button>
             </el-tooltip>
          </div>

          <div class="hidden md:flex items-center gap-1">
            <el-tooltip content="系统设置" placement="bottom">
              <button @click="openSettings" class="w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:bg-slate-100/80 hover:text-slate-900 transition-all duration-300">
                <el-icon class="text-xl"><Setting /></el-icon>
              </button>
            </el-tooltip>
            
            <!-- User Avatar Placeholder -->
            <el-dropdown trigger="click">
              <div class="flex items-center gap-2.5 ml-1 pl-1 cursor-pointer group">
                <div class="w-9 h-9 rounded-xl border border-slate-200 bg-white flex items-center justify-center overflow-hidden shadow-sm group-hover:border-blue-300 group-hover:shadow-md transition-all">
                  <img :src="userAvatar" class="w-full h-full object-cover" alt="User Profile" />
                </div>
              </div>
              <template #dropdown>
                <el-dropdown-menu class="premium-nav-dropdown">
                  <el-dropdown-item>
                    <div class="flex flex-col py-1">
                      <span class="font-bold text-slate-900">Guest User</span>
                      <span class="text-[11px] text-slate-400">guest@deepseek.ai</span>
                    </div>
                  </el-dropdown-item>
                  <el-dropdown-item divided>个人资料</el-dropdown-item>
                  <el-dropdown-item>使用记录</el-dropdown-item>
                  <el-dropdown-item divided class="!text-red-500">退出登录</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </div>

          <!-- Mobile Toggle -->
          <button class="lg:hidden flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 text-slate-600 hover:bg-slate-100 transition-all border border-slate-200/50" @click="toggleMenu">
            <el-icon class="text-xl">
              <component :is="isMobileMenuOpen ? Close : Menu" />
            </el-icon>
          </button>
        </div>
      </div>
    </header>

    <Transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="fixed top-[72px] left-4 right-4 z-[95] bg-white/95 backdrop-blur-3xl border border-slate-200/60 rounded-[32px] shadow-2xl lg:hidden overflow-hidden p-3 animate-in fade-in slide-in-from-top-4 duration-500">
        <nav class="flex flex-col gap-1.5">
          <router-link v-for="item in navItems" :key="item.path" :to="item.path" custom v-slot="{ navigate, isActive }">
            <a @click="navigate" :class="[
                'px-5 py-4 rounded-2xl text-[17px] font-bold transition-all cursor-pointer flex items-center justify-between',
                isActive 
                  ? 'bg-blue-600 text-white shadow-xl shadow-blue-100' 
                  : 'text-slate-600 hover:bg-slate-50'
              ]">
              {{ item.label }}
              <el-icon v-if="isActive" class="text-lg"><ArrowRight /></el-icon>
            </a>
          </router-link>

          <div class="h-px w-full bg-slate-100 my-2"></div>

          <div class="flex flex-col p-2 gap-2">
             <button class="w-full py-4 rounded-2xl bg-slate-900 text-white font-bold flex items-center justify-center gap-2">
                <el-icon><Star /></el-icon> 升级至 Pro
             </button>
             <div class="flex gap-2">
                <button @click="openSettings" class="flex-1 py-4 rounded-2xl bg-slate-100 text-slate-600 font-bold flex items-center justify-center gap-2">
                   <el-icon><Setting /></el-icon> 设置
                </button>
                <button class="flex-1 py-4 rounded-2xl bg-slate-100 text-slate-600 font-bold flex items-center justify-center gap-2">
                   <el-icon><User /></el-icon> 我的
                </button>
             </div>
          </div>
        </nav>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 top-[72px] bg-slate-900/40 z-[90] backdrop-blur-sm lg:hidden" @click="closeMenu"></div>
    </Transition>

    <main class="flex-1 w-full relative flex flex-col pt-[80px]">
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
import { Menu, Close, Setting, User, Star, ArrowRight } from "@element-plus/icons-vue";
import SettingsDialog from "@/components/SettingsDialog.vue";
import deepseekLogo from "@/assets/deepseeklogo.svg";
import userAvatar from "@/assets/user.jpg";

const route = useRoute();
const router = useRouter();

const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);
const settingsDialogRef = ref();

const openSettings = () => {
  settingsDialogRef.value.show();
  closeMenu();
};

const navItems = [
  { path: "/", label: "首页" },
  { path: "/chat", label: "对话" },
  { path: "/image", label: "创作" },
  { path: "/docs", label: "文档" },
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
/* Premium Dropdown Styles */
:deep(.premium-nav-dropdown) {
  border-radius: 20px !important;
  padding: 8px !important;
  border: 1px solid rgba(226, 232, 240, 0.8) !important;
  box-shadow: 0 10px 40px -10px rgba(0, 0, 0, 0.1) !important;
  min-width: 200px !important;
}

:deep(.el-dropdown-menu__item) {
  border-radius: 12px !important;
  margin: 2px 0 !important;
  padding: 10px 16px !important;
  transition: all 0.2s ease !important;
}

:deep(.el-dropdown-menu__item:hover) {
  background-color: #f8fafc !important;
  color: #2563eb !important;
}

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