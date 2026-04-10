<template>
  <div class="relative min-h-[calc(100vh-64px)] w-full bg-slate-50/30 overflow-hidden text-slate-800 font-sans">

    <main class="w-full pt-16 pb-56 overflow-y-auto h-[calc(100vh-64px)] custom-scrollbar">

      <div v-if="generatedImages.length === 0 && !loading" class="flex flex-col items-center justify-center min-h-[40vh] z-0 px-4 max-w-4xl mx-auto mt-4">

        <div class="text-center mb-10">
          <h2 class="text-4xl md:text-5xl font-black text-slate-900 tracking-tight mb-4">
            AI 图像生成
          </h2>
          <p class="text-slate-500 text-base md:text-lg font-medium max-w-xl mx-auto leading-relaxed">
            输入您的创意描述，或从下方的精选模板中寻找灵感。
          </p>
        </div>

        <div class="w-full max-w-3xl grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5 px-4">
          <button v-for="(tpl, idx) in promptTemplates.slice(0, 4)" :key="idx" @click="applyTemplate(tpl)" class="group text-left p-5 md:p-6 rounded-[20px] bg-white/60 border border-slate-200/50 hover:bg-white hover:border-indigo-100 shadow-sm hover:shadow-[0_8px_24px_-8px_rgba(79,70,229,0.15)] transition-all duration-300 hover:-translate-y-1">
            <div class="text-[13px] font-semibold text-indigo-500/70 mb-2 flex items-center gap-1.5 transition-colors group-hover:text-indigo-500">
              <el-icon>
                <CopyDocument />
              </el-icon> 试试这个
            </div>
            <div class="text-[15px] text-slate-600 font-medium leading-relaxed line-clamp-2 transition-colors group-hover:text-slate-900">
              "{{ tpl.prompt }}"
            </div>
          </button>
        </div>
      </div>
      <div class="w-full px-4 md:px-8 z-10 relative max-w-7xl mx-auto mt-4">
        <ImageResultGallery :loading="loading" :progress="progress" :estimated-time="estimatedTime" :generated-images="generatedImages" :generation-time="generationTime" :last-seed="lastSeed" :image-size="formData.image_size" @apply-random-template="applyRandomTemplate" @scroll-to-prompt="scrollToPrompt" @preview="showPreview" @download="downloadImage" @use-seed="useImageSeed($event)" @regenerate="regenerateWithSeed" />
      </div>
    </main>

    <footer class="absolute bottom-6 left-0 right-0 z-30 px-4 md:px-0 pointer-events-none">
      <div class="max-w-4xl mx-auto w-full flex flex-col gap-3 items-center pointer-events-auto generation-form">

        <div :class="[
            'relative flex flex-col w-full rounded-[32px] border transition-all duration-300 ease-out p-5 md:p-6',
            'bg-white/95 backdrop-blur-xl border-slate-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1),0_10px_20px_-5px_rgba(0,0,0,0.04)]',
            'focus-within:border-indigo-300 focus-within:shadow-[0_25px_65px_-15px_rgba(79,70,229,0.15)] focus-within:ring-4 focus-within:ring-indigo-500/10'
          ]">

          <el-input v-model="formData.prompt" type="textarea" :autosize="{ minRows: 2, maxRows: 6 }" resize="none" placeholder="描述你想生成的图像，例如：'一只身穿赛博朋克装甲的波斯猫在霓虹街道上...'" class="pro-textarea mb-4" @keydown.enter.exact.prevent="generateImage" />

          <div class="flex flex-wrap gap-4 items-center justify-between pt-4 border-t border-slate-100/80">
            <div class="flex flex-wrap items-center gap-2 md:gap-3">

              <el-radio-group v-model="formData.image_size" size="small" class="capsule-radio-group">
                <el-radio-button :value="ImageSize.Square">1:1</el-radio-button>
                <el-radio-button :value="ImageSize.Portrait">3:4</el-radio-button>
                <el-radio-button :value="ImageSize.Widescreen">16:9</el-radio-button>
              </el-radio-group>

              <el-upload action="#" :auto-upload="false" :show-file-list="false" :on-change="handleCustomUpload" :before-upload="beforeImageUpload">
                <el-tooltip content="上传参考图" placement="top">
                  <el-button circle size="default" :class="['!bg-slate-50 !border-slate-200 hover:!border-indigo-400 hover:!text-indigo-500 hover:!bg-white', formData.image ? '!border-indigo-500 !text-indigo-600 !bg-indigo-50' : '']">
                    <el-icon>
                      <Picture />
                    </el-icon>
                  </el-button>
                </el-tooltip>
              </el-upload>

              <el-popover placement="top-start" :width="320" trigger="click" popper-class="param-popper rounded-2xl">
                <template #reference>
                  <el-tooltip content="高级参数" placement="top">
                    <el-button circle size="default" class="!bg-slate-50 !border-slate-200 hover:!border-indigo-400 hover:!text-indigo-500 hover:!bg-white">
                      <el-icon>
                        <Operation />
                      </el-icon>
                    </el-button>
                  </el-tooltip>
                </template>
                <div class="p-3 flex flex-col gap-5">
                  <h4 class="m-0 text-sm font-bold text-slate-800">高级生成参数</h4>
                  <div class="flex flex-col gap-1.5">
                    <label class="text-xs font-semibold text-slate-500">负面提示词 (可选)</label>
                    <el-input v-model="formData.negative_prompt" type="textarea" :rows="2" resize="none" placeholder="不想出现的元素..." size="small" />
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <label class="text-xs font-semibold text-slate-500 flex justify-between">
                      <span>生成步数</span>
                      <span class="text-indigo-600">{{ formData.num_inference_steps }}</span>
                    </label>
                    <el-slider v-model="formData.num_inference_steps" :min="10" :max="50" :step="1" size="small" />
                  </div>
                  <div class="flex flex-col gap-1.5">
                    <label class="text-xs font-semibold text-slate-500">随机种子</label>
                    <div class="flex gap-2">
                      <el-input v-model="formData.seed" placeholder="自动" size="small" class="flex-1" type="number" />
                      <el-button size="small" circle @click="randomizeSeed"><el-icon>
                          <Refresh />
                        </el-icon></el-button>
                    </div>
                  </div>
                </div>
              </el-popover>
            </div>

            <button @click="generateImage" :disabled="!formData.prompt.trim() || loading" :class="[
                'flex items-center justify-center gap-2 px-8 h-11 rounded-[22px] text-base font-bold transition-all duration-300 w-full md:w-auto',
                formData.prompt.trim() && !loading
                  ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-[0_8px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_12px_28px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 cursor-pointer' 
                  : 'bg-slate-100 text-slate-400 cursor-not-allowed'
              ]">
              <el-icon v-if="loading" class="animate-spin text-lg">
                <Loading />
              </el-icon>
              <el-icon v-else class="text-lg">
                <MagicStick />
              </el-icon>
              {{ loading ? '绘制中...' : '生成创意' }}
            </button>
          </div>
        </div>

        <div class="flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity">
          <span class="text-[11px] text-slate-400 font-medium tracking-wide">图片内容由 AI 生成，请注意甄别</span>
        </div>
      </div>
    </footer>

    <ImagePreviewModal v-model:visible="previewVisible" :image-url="previewImage" :seed="lastSeed" @use-seed="useImageSeed($event)" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import {
  PictureFilled,
  MagicStick,
  Operation,
  Picture,
  Refresh,
  Sunny,
  Loading,
  ArrowRight,
  CopyDocument,
  Select,
} from "@element-plus/icons-vue";
import { promptTemplates, parameterPresets } from "../config/imageConfig";
import { imageService, ImageSize } from "../services/imageService";
import { useImageGeneration } from "../composables/useImageGeneration";
import ImagePromptForm from "../components/ImagePromptForm.vue";
import ImageResultGallery from "../components/ImageResultGallery.vue";
import ImagePreviewModal from "../components/ImagePreviewModal.vue";

const formData = reactive({
  prompt: "",
  negative_prompt: "",
  image_size: ImageSize.Square as string,
  batch_size: 1,
  num_inference_steps: 20,
  guidance_scale: 7.5,
  seed: undefined as number | undefined,
  image: undefined as string | undefined,
});

const {
  loading,
  progress,
  estimatedTime,
  generatedImages,
  lastSeed,
  generationTime,
  generateImage: performGenerate,
} = useImageGeneration();

const generateImage = async () => {
  if (!formData.prompt.trim()) {
    ElMessage.warning("请输入提示词描述");
    return;
  }
  await performGenerate(formData);
};

const randomizeSeed = () => {
  formData.seed = Math.floor(Math.random() * 1000000000);
  ElMessage.success(`已应用随机种子: ${formData.seed}`);
};

const handleCustomUpload = async (options: any) => {
  const file = options.raw;
  if (!file || !beforeImageUpload(file)) return;
  try {
    const base64 = await imageService.fileToBase64(file);
    formData.image = base64;
    ElMessage.success("参考图片上传成功");
  } catch (error) {
    ElMessage.error("图片处理失败");
    console.error("图片处理错误:", error);
  }
};

const beforeImageUpload = (file: File) => {
  const isImage = file.type.startsWith("image/");
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isImage) {
    ElMessage.error("只能上传图片文件!");
    return false;
  }
  if (!isLt5M) {
    ElMessage.error("图片大小不能超过 5MB!");
    return false;
  }
  return true;
};

const useImageSeed = (seed: number | null) => {
  if (seed !== null) {
    formData.seed = parseInt(seed as unknown as string);
    ElMessage.success(`已设置种子: ${seed}`);
  }
};

const previewVisible = ref<boolean>(false);
const previewImage = ref<string>("");
const showPreview = (image: string): void => {
  previewImage.value = image;
  previewVisible.value = true;
};

const downloadImage = (url: string, index: number) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = `deepseek-art-${lastSeed.value || Date.now()}-${index}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

const applyTemplate = (template: (typeof promptTemplates)[0]) => {
  formData.prompt = template.prompt;
  formData.negative_prompt = template.negative_prompt;
  if (template.parameters) {
    formData.guidance_scale = template.parameters.guidance_scale;
    formData.num_inference_steps = template.parameters.num_inference_steps;
  }
  ElMessage.success("已应用创意模板");
};

const applyRandomTemplate = () => {
  const randomIndex = Math.floor(Math.random() * promptTemplates.length);
  applyTemplate(promptTemplates[randomIndex]);
};

const scrollToPrompt = () => {
  const promptElement = document.querySelector(".pro-textarea textarea");
  if (promptElement) {
    promptElement.scrollIntoView({ behavior: "smooth", block: "center" });
    (promptElement as HTMLElement).focus();
  }
};

const regenerateWithSeed = async (
  seed: number | null | string
): Promise<void> => {
  if (seed === null) return;
  formData.seed = parseInt(seed as string);
  await generateImage();
};
</script>

<style scoped>
.pro-textarea :deep(.el-textarea__inner) {
  box-shadow: none !important;
  border: none !important;
  background: transparent !important;
  padding: 0 4px;
  font-size: 16px;
  line-height: 1.6;
  color: #1e293b;
  scrollbar-width: none;
}
.pro-textarea :deep(.el-textarea__inner::-webkit-scrollbar) {
  display: none;
}
.pro-textarea :deep(.el-textarea__inner::placeholder) {
  color: #94a3b8;
  font-weight: 400;
}

.capsule-radio-group :deep(.el-radio-button__inner) {
  border-radius: 9999px !important;
  border: none !important;
  margin: 0 2px;
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 600;
  color: #64748b;
  background: #f8fafc;
  box-shadow: none !important;
  transition: all 0.2s;
}
.capsule-radio-group :deep(.el-radio-button__inner:hover) {
  color: #4f46e5;
  background: #eef2ff;
}
.capsule-radio-group
  :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background: #4f46e5 !important;
  color: white !important;
  box-shadow: 0 4px 12px rgba(79, 70, 229, 0.25) !important;
}

:global(.param-popper.el-popover.el-popper) {
  border: 1px solid rgba(226, 232, 240, 0.8) !important;
  border-radius: 20px !important;
  box-shadow: 0 20px 40px -10px rgba(0, 0, 0, 0.1) !important;
  padding: 4px !important;
}
:global(.param-popper .el-slider__runway) {
  height: 4px;
  background-color: #f1f5f9;
}
:global(.param-popper .el-slider__bar) {
  background-color: #4f46e5;
}
:global(.param-popper .el-slider__button) {
  border: 2px solid #4f46e5;
  width: 14px;
  height: 14px;
  background-color: white;
}

.custom-scrollbar::-webkit-scrollbar {
  width: 6px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 10px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
}
</style>