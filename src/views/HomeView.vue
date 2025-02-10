<script setup lang="ts">
// 添加渐变动画效果
import { onMounted } from 'vue'

onMounted(() => {
  document.querySelector('.welcome-content')?.classList.add('show')
})
</script>

<template>
  <div class="home">
    <div class="background-gradient"></div>
    <el-row justify="center" align="middle" class="welcome-section">
      <el-col :xs="22" :sm="20" :md="16" :lg="14" :xl="12">
        <div class="welcome-content">
          <h1 class="title">欢迎使用 Deepseek 语言模型</h1>
          <p class="subtitle">探索 AI 对话的无限可能</p>
          <div class="features">
            <div class="feature-item">
              <el-icon><ChatLineRound /></el-icon>
              <span>智能对话</span>
            </div>
            <div class="feature-item">
              <el-icon><Lightning /></el-icon>
              <span>快速响应</span>
            </div>
            <div class="feature-item">
              <el-icon><Connection /></el-icon>
              <span>深度理解</span>
            </div>
          </div>
          <el-button
            type="primary"
            size="large"
            class="start-button"
            @click="$router.push('/chat')"
          >
            开始对话
            <el-icon class="el-icon--right"><ArrowRight /></el-icon>
          </el-button>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped>
.home {
  min-height: calc(100vh - 60px);
  position: relative;
  overflow: hidden;
}

.background-gradient {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(135deg, #f5f7fa 0%, #e4e7ed 100%);
  z-index: 0;
}

.welcome-section {
  position: relative;
  z-index: 1;
  min-height: calc(100vh - 60px);
  display: flex;
  align-items: center;
}

.welcome-content {
  padding: 40px;
  text-align: center;
  opacity: 0;
  transform: translateY(20px);
  transition: all 0.8s ease-out;
}

.welcome-content.show {
  opacity: 1;
  transform: translateY(0);
}

.title {
  font-size: 3em;
  font-weight: 700;
  background: linear-gradient(45deg, #409EFF, #36cfc9);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  margin-bottom: 20px;
}

.subtitle {
  font-size: 1.5em;
  color: #606266;
  margin-bottom: 40px;
}

.features {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.feature-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 20px;
  background: rgba(255, 255, 255, 0.6);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  transition: transform 0.3s ease;
}

.feature-item:hover {
  transform: translateY(-5px);
}

.feature-item .el-icon {
  font-size: 24px;
  color: #409EFF;
}

.start-button {
  padding: 12px 30px;
  font-size: 1.1em;
  border-radius: 8px;
  transition: transform 0.3s ease;
}

.start-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(64, 158, 255, 0.2);
}

/* 响应式适配 */
@media (max-width: 768px) {
  .title {
    font-size: 2em;
  }

  .subtitle {
    font-size: 1.2em;
  }

  .features {
    gap: 20px;
  }

  .feature-item {
    padding: 15px;
  }
}

@media (max-width: 480px) {
  .welcome-content {
    padding: 20px;
  }

  .features {
    flex-direction: column;
    gap: 15px;
  }

  .feature-item {
    width: 100%;
  }
}
</style>
