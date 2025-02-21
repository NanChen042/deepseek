<script setup lang="ts">
import { RouterLink, RouterView, useRoute ,} from "vue-router"
import { ref, watch } from 'vue'
import { Menu, Close } from '@element-plus/icons-vue'  // 添加 Close 图标

const route = useRoute()
const activeIndex = ref(route.path)
const isCollapse = ref(false)

// 监听路由变化，更新激活的菜单项
watch(() => route.path, (newPath) => {
  activeIndex.value = newPath
})

// 切换菜单展开/收起状态
const toggleMenu = () => {
  isCollapse.value = !isCollapse.value
}


</script>

<template>

  <el-container class="app-container">
    <el-header class="app-header">
      <!-- 桌面端菜单 -->
      <el-menu
        class="desktop-menu"
        mode="horizontal"
        router
        :ellipsis="false"
        :default-active="activeIndex"
      >
      <el-menu-item >
      <img
        style="width: 100px"
        src="./assets/deepseek.png"
        alt="Element logo"
      />
    </el-menu-item>
        <el-menu-item index="/">首页</el-menu-item>
        <el-menu-item index="/chat">Deepseek打字机模式</el-menu-item>
        <el-menu-item index="/stream">Deepseek流式输出模式</el-menu-item>
      </el-menu>

      <!-- 移动端菜单 -->
      <div class="mobile-menu">
        <!-- 添加logo容器 -->
        <div class="mobile-logo">
          <img
            style="width: 100px"
            src="./assets/deepseek.png"
            alt="Element logo"
          />
        </div>
        <el-button class="hamburger-btn" @click="toggleMenu">
          <el-icon>
            <component :is="isCollapse ? Close : Menu" />
          </el-icon>
        </el-button>
        <Transition name="slide-fade">
          <el-menu
            v-show="isCollapse"
            class="mobile-menu-items"
            mode="vertical"
            router
            :default-active="activeIndex"
          >
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/chat">Deepseek打字机模式</el-menu-item>
            <el-menu-item index="/stream">Deepseek流式输出模式</el-menu-item>
          </el-menu>
        </Transition>
      </div>
    </el-header>

    <el-main class="app-main">

      <router-view v-slot="{ Component }">
        <keep-alive>
        <component :is="Component" v-if="route.meta.keepAlive" :key="route.path" />
      </keep-alive>
      </router-view>
    </el-main>
  </el-container>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.app-header {
  padding: 0;
  height: 60px !important;
  flex-shrink: 0;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  background: #fff;
  position: relative;
  z-index: 2;
}

.app-main {
  flex: 1;
  padding: 0;
  height: calc(100vh - 60px);
  position: relative;
  overflow-x: hidden;
}

/* 修改桌面端菜单样式 */
.desktop-menu {
  height: 100%;
  width: 100%; /* 添加宽度 100% */
}

:deep(.el-menu--horizontal) {
  border-bottom: none;
  width: 100%; /* 添加宽度 100% */
}
.el-menu--horizontal > .el-menu-item:nth-child(1) {
  margin-right: auto;
}
:deep(.el-menu--horizontal > .el-menu-item) {
  height: 60px;
  line-height: 60px;
}

/* 移除之前重复的样式 */
:deep(.el-menu) {
  border-bottom: none;
}

/* 修改移动端菜单样式 */
.mobile-menu {
  display: none;  /* 默认隐藏移动端菜单 */
  width: 100%;
  position: relative;
  justify-content: space-between;
  align-items: center;
}

.mobile-logo {
  padding-left: 16px;
  display: none;  /* 默认隐藏移动端logo */
}

.hamburger-btn {
  position: absolute;
  right: 16px;
  top: 50%;
  transform: translateY(-50%);
  padding: 8px;
  height: 40px;
  border: none;
  background: transparent;
  transition: transform 0.3s ease;  /* 添加过渡效果 */
}

.hamburger-btn :deep(.el-icon) {
  font-size: 24px;
  transition: all 0.3s ease;
}

.mobile-menu-items {
  position: fixed;
  top: 60px;
  left: 0;
  right: 0;
  background: white;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  z-index: 1000;
  border-top: 1px solid #eee;
  transform-origin: top;
}

/* 修改媒体查询样式 */
@media screen and (max-width: 768px) {
  .desktop-menu {
    display: none;
  }

  .mobile-menu {
    display: flex;
    height: 100%;
  }

  .mobile-logo {
    display: block;  /* 在移动端显示logo */
  }

  .app-header {
    display: flex;
    align-items: center;
    padding: 0;  /* 修改padding */
  }

  /* 移动端菜单项样式优化 */
  .mobile-menu-items {
    padding: 8px 0;
  }

  .mobile-menu-items :deep(.el-menu) {
    border: none;
    background: transparent;
  }

  .mobile-menu-items :deep(.el-menu-item) {
    height: 48px;
    line-height: 48px;
    margin: 4px 0;
    padding: 0 24px;
  }

  .mobile-menu-items :deep(.el-menu-item:hover) {
    background-color: #f5f7fa;
  }

  .mobile-menu-items :deep(.el-menu-item.is-active) {
    background-color: #ecf5ff;
  }
}

/* 修改移动端菜单动画样式 */
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}

.slide-fade-enter-from {
  transform: translateY(-100%);
  opacity: 0;
}

.slide-fade-leave-to {
  transform: translateY(-100%);
  opacity: 0;
}

/* 优化桌面端菜单样式 */
.desktop-menu {
  height: 100%;
}

:deep(.el-menu--horizontal) {
  border-bottom: none;
}

:deep(.el-menu-item) {
  font-size: 15px;
  transition: all 0.3s ease;
}
</style>
