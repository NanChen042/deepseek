import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import Particles from "@tsparticles/vue3";
//import { loadFull } from "tsparticles"; // if you are going to use `loadFull`, install the "tsparticles" package too.

import { loadSlim } from "@tsparticles/slim"; // if you are going to use `loadSlim`, install the "@tsparticles/slim" package too.


import App from './App.vue'
import router from './router'
import './assets/main.css'

// 添加复制代码函数到window对象
declare global {
  interface Window {
    copyCode: (button: HTMLButtonElement) => void;
  }
}

// 复制代码功能
window.copyCode = (button: HTMLButtonElement) => {
  // 获取代码块包装器
  const codeBlockWrapper = button.closest('.code-block-wrapper');
  const pre = codeBlockWrapper?.querySelector('pre');

  if (pre) {
    const code = pre.textContent || '';
    const originalText = button.textContent || '复制';

    navigator.clipboard.writeText(code).then(() => {
      // 修改按钮文字显示已复制

      // 添加成功动画效果
      button.innerHTML = '<span style="display:inline-flex;align-items:center;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px"><polyline points="20 6 9 17 4 12"></polyline></svg>已复制</span>';
      button.style.backgroundColor = 'rgba(52, 211, 153, 0.2)';
      button.style.borderColor = 'rgba(52, 211, 153, 0.4)';
      button.style.color = '#10b981';

      // 2秒后恢复按钮文字
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
        button.style.borderColor = '';
        button.style.color = '';
      }, 2000);
    }).catch(err => {
      // 复制失败时的反馈
      console.error('复制失败:', err);

      // 添加失败动画效果
      button.innerHTML = '<span style="display:inline-flex;align-items:center;"><svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right:4px"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>复制失败</span>';
      button.style.backgroundColor = 'rgba(248, 113, 113, 0.2)';
      button.style.borderColor = 'rgba(248, 113, 113, 0.4)';
      button.style.color = '#ef4444';

      // 2秒后恢复按钮文字
      setTimeout(() => {
        button.textContent = originalText;
        button.style.backgroundColor = '';
        button.style.borderColor = '';
        button.style.color = '';
      }, 2000);
    });
  }
};

const app = createApp(App)

// 注册所有图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.use(Particles, {
  init: async engine => {
    // await loadFull(engine); // you can load the full tsParticles library from "tsparticles" if you need it
    await loadSlim(engine); // or you can load the slim version from "@tsparticles/slim" if don't need Shapes or Animations
  },
});
// 创建 Pinia 实例并使用
app.use(createPinia())
app.use(ElementPlus)
app.use(router)

app.mount('#app')
