<template>
  <div class="w-full h-full flex flex-col items-center">

    <div v-if="loading" class="flex flex-col justify-center items-center w-full max-w-md mx-auto mt-20 p-8 rounded-3xl bg-white/50 backdrop-blur-sm">
      <div class="relative flex items-center justify-center w-20 h-20 mb-6">
        <div class="absolute inset-0 rounded-full border-t-2 border-b-2 border-blue-500 animate-[spin_2s_linear_infinite] opacity-50"></div>
        <div class="absolute inset-2 rounded-full border-r-2 border-l-2 border-indigo-400 animate-[spin_3s_linear_infinite_reverse] opacity-50"></div>
        <el-icon class="text-3xl text-blue-500 animate-pulse">
          <PictureFilled />
        </el-icon>
      </div>

      <h3 class="text-lg font-semibold text-slate-800 mb-2">AI 正在施展魔法...</h3>
      <p class="text-sm text-slate-500 mb-6">预计还需 {{ estimatedTime }} 秒完成绘制</p>

      <div class="w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner">
        <div class="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500 ease-out relative" :style="{ width: `${progress}%` }">
          <div class="absolute top-0 bottom-0 left-0 right-0 bg-white/20 animate-[translateX_2s_ease-in-out_infinite]"></div>
        </div>
      </div>
      <div class="mt-2 text-right w-full text-xs font-medium text-slate-400">{{ progress }}%</div>
    </div>

    <div v-if="generatedImages.length > 0 && !loading" class="w-full max-w-6xl mx-auto pb-32">

      <div class="flex flex-wrap items-center justify-between gap-4 mb-8">
        <h2 class="text-2xl font-bold text-slate-800 tracking-tight m-0">创作成果</h2>

        <div class="flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full shadow-sm text-xs font-medium text-slate-500">
          <span v-if="generationTime" class="flex items-center gap-1">
            <el-icon>
              <Timer />
            </el-icon> 耗时: {{ generationTime }}s
          </span>
          <div class="w-px h-3 bg-slate-200"></div>
          <span v-if="lastSeed !== null" class="flex items-center gap-1">
            <el-icon>
              <Key />
            </el-icon> 种子: {{ lastSeed }}
          </span>
        </div>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
        <div v-for="(image, index) in generatedImages" :key="image.url" class="group relative rounded-3xl overflow-hidden bg-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_-10px_rgba(59,130,246,0.3)]" :style="getAspectRatioStyle()">
          <div class="absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse -z-10"></div>

          <img :src="image.url" alt="AI 生成的图像" loading="lazy" class="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-zoom-in" @click="$emit('preview', image.url)" />

          <div class="absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4">

            <div class="flex gap-2 justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out">
              <el-tooltip content="预览大图" placement="top" :show-after="200">
                <button @click.stop="$emit('preview', image.url)" class="action-btn">
                  <el-icon>
                    <ZoomIn />
                  </el-icon>
                </button>
              </el-tooltip>

              <el-tooltip content="下载原图" placement="top" :show-after="200">
                <button @click.stop="$emit('download', image.url, index)" class="action-btn">
                  <el-icon>
                    <Download />
                  </el-icon>
                </button>
              </el-tooltip>

              <el-tooltip content="复制种子值" placement="top" :show-after="200">
                <button @click.stop="$emit('use-seed', lastSeed)" class="action-btn">
                  <el-icon>
                    <CopyDocument />
                  </el-icon>
                </button>
              </el-tooltip>

              <el-tooltip content="以此为基础重新生成" placement="top" :show-after="200">
                <button @click.stop="$emit('regenerate', lastSeed)" class="action-btn">
                  <el-icon>
                    <RefreshRight />
                  </el-icon>
                </button>
              </el-tooltip>
            </div>

          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import {
  PictureFilled,
  Timer,
  Key,
  ZoomIn,
  Download,
  CopyDocument,
  RefreshRight,
} from "@element-plus/icons-vue";

const props = defineProps<{
  loading: boolean;
  progress: number;
  estimatedTime: number;
  generatedImages: { url: string }[];
  generationTime: number | null;
  lastSeed: number | null;
  imageSize: string;
}>();

defineEmits<{
  (e: "applyRandomTemplate"): void;
  (e: "scrollToPrompt"): void;
  (e: "preview", url: string): void;
  (e: "download", url: string, index: number): void;
  (e: "use-seed", seed: number | null): void;
  (e: "regenerate", seed: number | null): void;
}>();

// 修复比例计算逻辑：适配新版的文本标识
const getAspectRatioStyle = () => {
  const size = props.imageSize;

  // 16:9 横图
  if (size === "Landscape") {
    return { paddingBottom: "56.25%", height: "0" };
  }
  // 3:4 竖图
  if (size === "Portrait") {
    return { paddingBottom: "133.33%", height: "0" };
  }
  // 默认 1:1 方图
  return { paddingBottom: "100%", height: "0" };
};
</script>

<style scoped>
/* 自定义原生毛玻璃按钮样式，彻底摆脱 el-button 的老旧观感 */
.action-btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  border: 1px solid rgba(255, 255, 255, 0.4);
  color: white;
  backdrop-filter: blur(8px);
  -webkit-backdrop-filter: blur(8px);
  transition: all 0.2s ease;
  cursor: pointer;
}

.action-btn:hover {
  background: rgba(255, 255, 255, 0.95);
  color: #4e54c8;
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.action-btn:active {
  transform: translateY(0);
}
</style>