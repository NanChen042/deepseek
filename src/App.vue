<script setup lang="ts">
import { RouterLink, RouterView, useRoute ,} from "vue-router"
import { ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { Menu, Close } from '@element-plus/icons-vue'

const route = useRoute()
const activeIndex = ref(route.path)
const isCollapse = ref(false)
const isScrolled = ref(false)

// 监听路由变化，更新激活的菜单项
watch(() => route.path, (newPath) => {
  activeIndex.value = newPath
  // 路由变化时收起移动端菜单
  isCollapse.value = false
})

// 切换菜单展开/收起状态
const toggleMenu = () => {
  isCollapse.value = !isCollapse.value
}

// 处理滚动效果
const handleScroll = () => {
  isScrolled.value = window.scrollY > 20
}

// 监听滚动事件
onMounted(() => {
  window.addEventListener('scroll', handleScroll)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', handleScroll)
})

// 关闭菜单
const closeMenu = () => {
  if (isCollapse.value) {
    isCollapse.value = false
  }
}
</script>

<template>
  <div :class="['app-wrapper', { 'menu-open': isCollapse }]">
    <header :class="['app-header', { 'scrolled': isScrolled }]">
      <div class="header-container">
        <!-- Logo -->
        <div class="brand-logo">
          <img src="./assets/deepseek.png" alt="Deepseek logo" />
        </div>

        <!-- 桌面端菜单 -->
        <el-menu
          class="desktop-menu"
          mode="horizontal"
          router
          :ellipsis="false"
          :default-active="activeIndex"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/chat">Deepseek打字机模式</el-menu-item>
          <el-menu-item index="/stream">Deepseek流式输出模式</el-menu-item>
          <el-menu-item index="/image">AI图像生成</el-menu-item>
        </el-menu>

        <!-- 移动端菜单按钮 -->
        <div class="mobile-controls">
          <button class="menu-toggle" @click="toggleMenu" aria-label="Toggle menu">
            <el-icon>
              <component :is="isCollapse ? Close : Menu" />
            </el-icon>
          </button>
        </div>
      </div>
    </header>

    <!-- 移动端菜单 -->
    <Transition name="slide-fade">
      <div v-show="isCollapse" class="mobile-menu">
        <el-menu
          class="mobile-menu-items"
          mode="vertical"
          router
          :default-active="activeIndex"
          @select="closeMenu"
        >
          <el-menu-item index="/">首页</el-menu-item>
          <el-menu-item index="/chat">Deepseek打字机模式</el-menu-item>
          <el-menu-item index="/stream">Deepseek流式输出模式</el-menu-item>
          <el-menu-item index="/image">AI图像生成</el-menu-item>
        </el-menu>
      </div>
    </Transition>

    <!-- 背景遮罩 -->
    <Transition name="fade">
      <div v-if="isCollapse" class="menu-backdrop" @click="closeMenu"></div>
    </Transition>

    <el-main class="app-main">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <component :is="Component" v-if="route.meta.keepAlive" :key="route.path" />
        </keep-alive>
      </router-view>
    </el-main>
  </div>
</template>

<style scoped>
/* 全局容器 */
.app-wrapper {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  position: relative;
}

/* 背景遮罩 */
.menu-backdrop {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.4);
  z-index: 90;
  backdrop-filter: blur(2px);
}

/* 头部样式 */
.app-header {
  position: sticky;
  top: 0;
  left: 0;
  right: 0;
  height: 64px;
  z-index: 100;
  transition: all 0.3s ease;
  background-color: #ffffff;
  box-shadow: 0 1px 6px rgba(0, 0, 0, 0.08);
}

/* 滚动后的头部样式 */
.app-header.scrolled {
  height: 56px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.12);
}

/* 头部容器 */
.header-container {
  max-width: 1400px;
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

/* Logo样式 */
.brand-logo {
  height: 100%;
  display: flex;
  align-items: center;
}

.brand-logo img {
  height: 36px;
  object-fit: contain;
  transition: all 0.3s ease;
}

.scrolled .brand-logo img {
  height: 32px;
}

/* 桌面菜单样式 */
.desktop-menu {
  background: transparent;
  border: none;
  flex: 1;
  justify-content: flex-end;
}

.desktop-menu :deep(.el-menu--horizontal) {
  border-bottom: none;
}

.desktop-menu :deep(.el-menu-item) {
  height: 64px;
  line-height: 64px;
  font-size: 15px;
  color: #333;
  font-weight: 400;
  transition: all 0.3s ease;
  margin: 0 4px;
}

.desktop-menu :deep(.el-menu-item:hover) {
  color: #1890ff;
  background-color: rgba(24, 144, 255, 0.05);
}

.desktop-menu :deep(.el-menu-item.is-active) {
  color: #1890ff;
  font-weight: 500;
  border-bottom: 2px solid #1890ff;
}

.scrolled .desktop-menu :deep(.el-menu-item) {
  height: 56px;
  line-height: 56px;
}

/* 移动端控制按钮 */
.mobile-controls {
  display: none;
}

.menu-toggle {
  background: transparent;
  border: none;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  cursor: pointer;
  color: #333;
  font-size: 22px;
  transition: all 0.2s ease;
}

.menu-toggle:hover {
  background-color: rgba(0, 0, 0, 0.05);
  color: #1890ff;
}

/* 移动端菜单 */
.mobile-menu {
  position: fixed;
  top: 64px;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: 95;
  background-color: #fff;
  max-height: calc(100vh - 64px);
  overflow-y: auto;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.08);
}

.mobile-menu .mobile-menu-items {
  padding: 16px 0;
  border: none;
}

.mobile-menu .mobile-menu-items :deep(.el-menu-item) {
  height: 52px;
  line-height: 52px;
  padding: 0 32px;
  margin: 4px 16px;
  border-radius: 8px;
  font-size: 16px;
  color: #333;
}

.mobile-menu .mobile-menu-items :deep(.el-menu-item:hover) {
  background-color: rgba(24, 144, 255, 0.05);
  color: #1890ff;
}

.mobile-menu .mobile-menu-items :deep(.el-menu-item.is-active) {
  background-color: rgba(24, 144, 255, 0.1);
  color: #1890ff;
  font-weight: 500;
}

/* 主内容区域 */
.app-main {
  flex: 1;
  padding: 0;
  overflow-x: hidden;
}

/* 过渡动画 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.25s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateY(-8px);
  opacity: 0;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

/* 响应式适配 */
@media screen and (max-width: 768px) {
  .desktop-menu {
    display: none;
  }

  .mobile-controls {
    display: flex;
  }

  .app-header, .app-header.scrolled {
    height: 56px;
  }

  .header-container {
    padding: 0 16px;
  }

  .mobile-menu {
    top: 56px;
    max-height: calc(100vh - 56px);
  }

  .app-wrapper.menu-open {
    overflow: hidden;
    height: 100vh;
  }
}
</style>
