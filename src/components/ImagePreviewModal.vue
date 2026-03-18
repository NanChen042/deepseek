<template>
  <el-dialog v-model="dialogVisible" :show-close="false" :append-to-body="true" align-center class="ultra-preview-dialog" width="90%" style="max-width: 1200px;">
    <div class="relative flex flex-col items-center justify-center w-full min-h-[50vh]">

      <button @click="dialogVisible = false" class="absolute -top-10 right-0 md:-right-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white/80 hover:text-white backdrop-blur-md transition-all duration-300 z-50">
        <el-icon class="text-xl">
          <Close />
        </el-icon>
      </button>

      <div class="relative group">
        <img :src="imageUrl" class="max-w-full max-h-[75vh] object-contain rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-transform duration-500" alt="AI生成的绝美图像" />

        <div class="absolute inset-0 rounded-2xl ring-1 ring-white/20 pointer-events-none"></div>
      </div>

      <div class="mt-8 flex flex-wrap justify-center gap-3 md:gap-4 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl z-50">

        <button @click="downloadCurrentPreview" class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/90 hover:text-white hover:bg-white/15 transition-all duration-300">
          <el-icon class="text-lg">
            <Download />
          </el-icon>
          <span class="hidden sm:inline">下载原图</span>
        </button>

        <div class="w-px h-6 bg-white/20 self-center hidden sm:block"></div>

        <button v-if="seed !== null" @click="copySeedToClipboard" class="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/90 hover:text-white hover:bg-white/15 transition-all duration-300">
          <el-icon class="text-lg">
            <CopyDocument />
          </el-icon>
          <span class="hidden sm:inline">复制种子 ({{ seed }})</span>
        </button>

        <button v-if="seed !== null" @click="useCurrentSeedAndClose" class="flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-[0_4px_12px_rgba(59,130,246,0.4)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.6)] hover:-translate-y-0.5 transition-all duration-300">
          <el-icon class="text-lg">
            <RefreshRight />
          </el-icon>
          <span>以此重新生成</span>
        </button>
      </div>

    </div>
  </el-dialog>
</template>

<script setup lang="ts">
import { computed } from "vue";
import { ElMessage } from "element-plus";
import {
  Download,
  CopyDocument,
  RefreshRight,
  Close,
} from "@element-plus/icons-vue";

const props = defineProps<{
  visible: boolean;
  imageUrl: string;
  seed: number | null;
}>();

const emit = defineEmits<{
  (e: "update:visible", value: boolean): void;
  (e: "use-seed", seed: number): void;
}>();

const dialogVisible = computed({
  get: () => props.visible,
  set: (val) => emit("update:visible", val),
});

// 下载当前预览的图片
const downloadCurrentPreview = () => {
  if (!props.imageUrl) return;
  const a = document.createElement("a");
  a.href = props.imageUrl;
  a.download = `deepseek-art-${props.seed || Date.now()}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  ElMessage.success({ message: "图片下载已开始", grouping: true });
};

// 复制种子到剪贴板
const copySeedToClipboard = async () => {
  if (props.seed === null) return;
  try {
    await navigator.clipboard.writeText(props.seed.toString());
    ElMessage.success({
      message: `已复制种子 (${props.seed})`,
      grouping: true,
    });
  } catch (err) {
    const textArea = document.createElement("textarea");
    textArea.value = props.seed.toString();
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    ElMessage.success({
      message: `已复制种子 (${props.seed})`,
      grouping: true,
    });
  }
};

// 使用当前种子并关闭预览
const useCurrentSeedAndClose = () => {
  if (props.seed !== null) {
    emit("use-seed", props.seed);
    dialogVisible.value = false;
  }
};
</script>

<style scoped>
/* ==========================================
   终极解法：打破 el-dialog 的物理形态
   ========================================== */

/* 让弹窗背景完全透明，阴影去掉，把样式控制权全部交给里面的 Tailwind 元素 */
:global(.ultra-preview-dialog) {
  background: transparent !important;
  box-shadow: none !important;
}

/* 隐藏默认的 header 和 body 边距 */
:global(.ultra-preview-dialog .el-dialog__header),
:global(.ultra-preview-dialog .el-dialog__body) {
  padding: 0 !important;
  margin: 0 !important;
  background: transparent !important;
}

/* 剧场模式遮罩层：极深的蓝黑色 + 高斯模糊 */
:global(.el-overlay:has(.ultra-preview-dialog)) {
  background-color: rgba(
    15,
    23,
    42,
    0.85
  ) !important; /* slate-900 配合高透明度 */
  backdrop-filter: blur(12px) !important;
  -webkit-backdrop-filter: blur(12px) !important;
}
</style>