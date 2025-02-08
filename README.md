# Vue3 自动引入实现

## 一、安装插件
```js
npm install unplugin-vue-components -D
```

## 二、配置 vite.config.ts
```js
import Components from 'unplugin-vue-components/vite';

export default defineConfig({
  plugins: [
    Components({ /* 配置选项 */ }),
  ],
})
```
