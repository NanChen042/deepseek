<script setup lang="ts">
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import { RouterView, useRoute, useRouter } from "vue-router";
import { Menu, Close } from "@element-plus/icons-vue";

const route = useRoute();
const router = useRouter();

const isMobileMenuOpen = ref(false);
const isScrolled = ref(false);

// 提取导航配置，符合 DRY (Don't Repeat Yourself) 原则，方便后期维护
const navItems = [
  { path: "/", label: "首页" },
  { path: "/chat", label: "Deepseek 对话" },
  { path: "/stream", label: "流式输出" },
  { path: "/image", label: "图像生成" },
];

// 监听路由变化，自动收起移动端菜单
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

// 处理滚动效果：增加毛玻璃底色和阴影
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20;
};

onMounted(() => {
  window.addEventListener("scroll", handleScroll, { passive: true });
});

onBeforeUnmount(() => {
  window.removeEventListener("scroll", handleScroll);
});
</script>

<template>
  <div class="min-h-screen flex flex-col relative font-sans text-slate-800 bg-[#fafcff]">

    <header :class="[
        'sticky top-0 z-[100] transition-all duration-300',
        isScrolled 
          ? 'bg-white/80 backdrop-blur-md shadow-[0_2px_15px_-3px_rgba(0,0,0,0.07),0_10px_20px_-2px_rgba(0,0,0,0.04)] py-3' 
          : 'bg-white/50 backdrop-blur-sm py-5'
      ]">
      <div class="max-w-7xl mx-auto px-6 flex items-center justify-between">

        <div class="flex items-center cursor-pointer" @click="router.push('/')">
          <div class="w-8 h-8 mr-2 rounded-lg bg-gradient-to-br from-blue-500 to-cyan-400 flex items-center justify-center text-white shadow-sm">
            <span class="font-bold text-lg leading-none">D</span>
          </div>
          <span class="text-xl font-bold tracking-tight text-slate-800">Deepseek <span class="text-blue-500">AI</span></span>
        </div>

        <nav class="hidden md:flex items-center gap-1 lg:gap-2">
          <router-link v-for="item in navItems" :key="item.path" :to="item.path" custom v-slot="{ navigate, isActive }">
            <a @click="navigate" :class="[
                'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 cursor-pointer',
                isActive 
                  ? 'bg-blue-50 text-blue-600 shadow-sm' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
              ]">
              {{ item.label }}
            </a>
          </router-link>
        </nav>

        <button class="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-slate-100/50 text-slate-700 hover:bg-slate-200 transition-colors" @click="toggleMenu">
          <el-icon class="text-xl">
            <component :is="isMobileMenuOpen ? Close : Menu" />
          </el-icon>
        </button>
      </div>
    </header>

    <Transition name="mobile-menu">
      <div v-if="isMobileMenuOpen" class="fixed top-[72px] left-0 right-0 z-[95] bg-white/95 backdrop-blur-xl border-b border-slate-100 shadow-xl md:hidden overflow-hidden">
        <nav class="flex flex-col p-4 gap-2">
          <router-link v-for="item in navItems" :key="item.path" :to="item.path" custom v-slot="{ navigate, isActive }">
            <a @click="navigate" :class="[
                'px-5 py-3.5 rounded-xl text-base font-medium transition-colors cursor-pointer',
                isActive 
                  ? 'bg-blue-50 text-blue-600' 
                  : 'text-slate-600 hover:bg-slate-50'
              ]">
              {{ item.label }}
            </a>
          </router-link>
        </nav>
      </div>
    </Transition>

    <Transition name="fade">
      <div v-if="isMobileMenuOpen" class="fixed inset-0 top-[72px] bg-slate-900/20 z-[90] backdrop-blur-sm md:hidden" @click="closeMenu"></div>
    </Transition>

    <main class="flex-1 w-full relative flex flex-col">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="route.meta.keepAlive" :key="route.path" />
        </keep-alive>
        <component :is="Component" v-if="!route.meta.keepAlive" :key="route.path" />
      </router-view>
    </main>

  </div>
</template>

<style scoped>
/* 只需要保留轻量级的过渡动画，样式完全由 Tailwind 接管 */
.mobile-menu-enter-active,
.mobile-menu-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
.mobile-menu-enter-from,
.mobile-menu-leave-to {
  opacity: 0;
  transform: translateY(-10px);
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