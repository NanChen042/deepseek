<template>
  <div class="flex flex-col w-full bg-white/90 backdrop-blur-xl rounded-[32px] border border-slate-100/80 shadow-[0_8px_40px_-12px_rgba(0,0,0,0.08)] overflow-hidden">
    
    <div class="p-6 pb-4">
      <div class="flex justify-between items-center mb-3">
        <label class="text-sm font-bold text-slate-800 flex items-center gap-1.5">
          <el-icon class="text-blue-500"><EditPen /></el-icon> 画面描述
        </label>
        <el-popover placement="bottom-end" :width="320" trigger="hover" popper-class="!rounded-2xl !p-2">
          <template #reference>
            <button class="text-xs font-medium text-blue-500 hover:text-blue-600 bg-blue-50 px-2.5 py-1 rounded-md transition-colors">
              <el-icon class="align-middle"><MagicStick /></el-icon> 灵感模板
            </button>
          </template>
          <div class="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto custom-scrollbar">
            <button 
              v-for="template in promptTemplates" 
              :key="template.label" 
              @click="applyTemplate(template)"
              class="text-left px-3 py-2 text-xs text-slate-600 bg-slate-50 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors border border-slate-100"
            >
              {{ template.label }}
            </button>
          </div>
        </el-popover>
      </div>

      <div class="bg-slate-50/50 rounded-2xl border border-slate-200/60 focus-within:border-blue-400 focus-within:bg-white focus-within:ring-4 focus-within:ring-blue-500/10 transition-all duration-300">
        <el-input 
          v-model="formData.prompt" 
          type="textarea" 
          :rows="5" 
          resize="none" 
          placeholder="描述你想生成的画面细节。例如：一只赛博朋克风格的机器猫，走在霓虹闪烁的东京街头，电影级光影..." 
          class="pro-textarea" 
        />
      </div>
    </div>

    <el-divider class="!my-0 opacity-50" />

    <div class="p-6 py-5 flex flex-col gap-6">
      <div class="flex flex-col gap-3">
        <label class="text-sm font-bold text-slate-800">画幅比例</label>
        <el-radio-group v-model="formData.image_size" class="capsule-radio-group w-full flex">
          <el-radio-button label="Square" class="flex-1">1:1 方图</el-radio-button>
          <el-radio-button label="Portrait" class="flex-1">3:4 竖屏</el-radio-button>
          <el-radio-button label="Landscape" class="flex-1">16:9 横屏</el-radio-button>
        </el-radio-group>
      </div>

      <div class="flex flex-col gap-3">
        <div class="flex justify-between items-center">
          <label class="text-sm font-bold text-slate-800">风格参考图</label>
          <span class="text-[11px] text-slate-400 font-medium">可选</span>
        </div>
        
        <el-upload
          class="image-upload-zone group"
          :show-file-list="false"
          :before-upload="beforeImageUpload"
          :auto-upload="true"
          :http-request="handleCustomUpload"
          action="#"
        >
          <div v-if="imageUrl" class="relative w-full h-32 rounded-2xl overflow-hidden border-2 border-blue-100">
            <img :src="imageUrl" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center backdrop-blur-sm">
              <span class="text-white text-xs font-medium">点击更换图片</span>
            </div>
            <button @click.stop="removeImage" class="absolute top-2 right-2 w-7 h-7 bg-black/60 hover:bg-red-500 text-white rounded-full flex items-center justify-center backdrop-blur-md transition-colors">
              <el-icon><Close /></el-icon>
            </button>
          </div>
          <div v-else class="w-full h-24 rounded-2xl border-2 border-dashed border-slate-200 hover:border-blue-400 hover:bg-blue-50/50 transition-all flex flex-col justify-center items-center gap-2 cursor-pointer bg-slate-50/50">
            <div class="w-8 h-8 rounded-full bg-white shadow-sm flex items-center justify-center text-slate-400 group-hover:text-blue-500 transition-colors">
              <el-icon class="text-lg"><Plus /></el-icon>
            </div>
            <span class="text-xs font-medium text-slate-500 group-hover:text-blue-500 transition-colors">点击上传参考图</span>
          </div>
        </el-upload>
      </div>
    </div>

    <details class="group/adv border-t border-slate-100/80 bg-slate-50/30 open:bg-slate-50/80 transition-colors duration-300">
      <summary class="flex justify-between items-center p-5 cursor-pointer list-none select-none hover:bg-slate-50 transition-colors">
        <span class="text-sm font-bold text-slate-800 flex items-center gap-1.5">
          <el-icon class="text-slate-400"><Setting /></el-icon> 高级控制
        </span>
        <el-icon class="text-slate-400 transition-transform duration-300 group-open/adv:rotate-180"><ArrowDown /></el-icon>
      </summary>
      
      <div class="px-5 pb-6 flex flex-col gap-5">
        <div class="flex flex-col gap-2">
          <label class="text-xs font-semibold text-slate-600">负面提示词 (排除元素)</label>
          <el-input v-model="formData.negative_prompt" type="textarea" :rows="2" resize="none" placeholder="例如：模糊、变形、多余的手指..." class="pro-textarea text-xs bg-white rounded-xl border border-slate-200 focus-within:border-blue-400" />
        </div>

        <div class="flex flex-col gap-1">
          <label class="text-xs font-semibold text-slate-600 flex justify-between">
            单次生成数量 <span>{{ formData.batch_size }} 张</span>
          </label>
          <el-slider v-model="formData.batch_size" :min="1" :max="4" :step="1" :show-tooltip="false" class="custom-slider" />
        </div>

        <div class="flex flex-col gap-1">
          <div class="text-xs font-semibold text-slate-600 flex justify-between items-center">
            <span>创造性 (CFG Scale)</span>
            <span class="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-500">{{ formData.guidance_scale }}</span>
          </div>
          <el-slider v-model="formData.guidance_scale" :min="1" :max="20" :step="0.5" :show-tooltip="false" class="custom-slider" />
          <div class="flex justify-between text-[10px] text-slate-400 mt-1">
            <span>更有创意</span>
            <span>严格遵循提示词</span>
          </div>
        </div>

        <div class="flex flex-col gap-1">
          <div class="text-xs font-semibold text-slate-600 flex justify-between items-center">
            <span>细节程度 (Steps)</span>
            <span class="px-2 py-0.5 bg-white border border-slate-200 rounded text-slate-500">{{ formData.num_inference_steps }}</span>
          </div>
          <el-slider v-model="formData.num_inference_steps" :min="10" :max="50" :step="1" :show-tooltip="false" class="custom-slider" />
        </div>

        <div class="flex flex-col gap-2">
          <label class="text-xs font-semibold text-slate-600">随机种子 (Seed)</label>
          <div class="flex gap-2">
            <el-input v-model.number="formData.seed" type="number" placeholder="自动生成" class="seed-input flex-1" />
            <button @click="randomizeSeed" class="w-8 h-8 flex items-center justify-center bg-white border border-slate-200 rounded-lg hover:border-blue-400 hover:text-blue-500 transition-colors shadow-sm">
              <el-icon><Refresh /></el-icon>
            </button>
          </div>
        </div>
      </div>
    </details>

    <div class="p-5 bg-white border-t border-slate-100 z-10">
      <button 
        @click="$emit('generate')" 
        :disabled="!formData.prompt.trim() || loading"
        :class="[
          'w-full h-12 flex items-center justify-center gap-2 rounded-2xl text-base font-bold transition-all duration-300',
          formData.prompt.trim() && !loading
            ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-[0_8px_20px_rgba(79,70,229,0.25)] hover:shadow-[0_12px_28px_rgba(79,70,229,0.35)] hover:-translate-y-0.5' 
            : 'bg-slate-100 text-slate-400 cursor-not-allowed'
        ]"
      >
        <el-icon v-if="loading" class="animate-spin text-lg"><Loading /></el-icon>
        <el-icon v-else class="text-lg"><MagicStick /></el-icon>
        {{ loading ? 'AI 绘制中...' : '立即生成' }}
      </button>
    </div>
    
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus, Close, EditPen, MagicStick, Setting, ArrowDown, Refresh, Loading } from '@element-plus/icons-vue';
import { imageService } from '../services/imageService';
import { promptTemplates, parameterPresets } from '../config/imageConfig';
// 如果你的 ImageSizeSelector 组件里面是很复杂的逻辑，可以保留引入。
// 但我在模板里直接用 el-radio-group 重写了比例选择，视觉效果更好，你可以酌情替换。

const props = defineProps<{
  formData: any;
  loading: boolean;
}>();

const emit = defineEmits<{
  (e: 'generate'): void;
}>();

const imageUrl = ref("");

// 随机化种子
const randomizeSeed = () => {
  props.formData.seed = Math.floor(Math.random() * 1000000000);
};

// 自定义上传处理
const handleCustomUpload = async (options: any) => {
  const { file } = options;
  try {
    const base64 = await imageService.fileToBase64(file);
    props.formData.image = base64;
    imageUrl.value = base64;
    ElMessage.success('参考图片已就绪');
  } catch (error) {
    ElMessage.error("图片处理失败");
  }
};

const beforeImageUpload = (file: File) => {
  const isImage = file.type.startsWith("image/");
  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isImage) { ElMessage.error("只能上传图片文件!"); return false; }
  if (!isLt5M) { ElMessage.error("图片大小不能超过 5MB!"); return false; }
  return true;
};

const removeImage = () => {
  imageUrl.value = "";
  props.formData.image = undefined;
};

const applyTemplate = (template: (typeof promptTemplates)[0]) => {
  props.formData.prompt = template.prompt;
  props.formData.negative_prompt = template.negative_prompt;
  if (template.parameters) {
    props.formData.guidance_scale = template.parameters.guidance_scale;
    props.formData.num_inference_steps = template.parameters.num_inference_steps;
  }
};
</script>

<style scoped>
/* 隐藏 details 默认三角 */
details > summary::-webkit-details-marker {
  display: none;
}

/* 穿透修改 El-Input (Textarea) 样式，去边框去背景 */
.pro-textarea :deep(.el-textarea__inner) {
  background: transparent !important;
  border: none !important;
  box-shadow: none !important;
  padding: 12px 16px;
  font-size: 14px;
  line-height: 1.6;
  color: #1e293b;
  scrollbar-width: thin;
}
.pro-textarea :deep(.el-textarea__inner::placeholder) {
  color: #94a3b8;
}

/* Seed Input 样式修改 */
.seed-input :deep(.el-input__wrapper) {
  border-radius: 8px;
  box-shadow: 0 0 0 1px #e2e8f0 inset;
  background-color: #fff;
}
.seed-input :deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #60a5fa inset !important;
}

/* 胶囊比例单选框 (Capsule Radio) */
.capsule-radio-group :deep(.el-radio-button) {
  flex: 1;
}
.capsule-radio-group :deep(.el-radio-button__inner) {
  width: 100%;
  border-radius: 0;
  border: 1px solid #e2e8f0;
  border-left: 0;
  background: #f8fafc;
  color: #64748b;
  font-size: 12px;
  padding: 8px 0;
  box-shadow: none !important;
  transition: all 0.2s;
}
.capsule-radio-group :deep(.el-radio-button:first-child .el-radio-button__inner) {
  border-left: 1px solid #e2e8f0;
  border-radius: 12px 0 0 12px;
}
.capsule-radio-group :deep(.el-radio-button:last-child .el-radio-button__inner) {
  border-radius: 0 12px 12px 0;
}
.capsule-radio-group :deep(.el-radio-button__original-radio:checked + .el-radio-button__inner) {
  background: #eff6ff;
  color: #3b82f6;
  border-color: #bfdbfe;
  font-weight: 600;
  position: relative;
  z-index: 1;
  box-shadow: inset 0 0 0 1px #bfdbfe !important;
}

/* 定制化 Slider (细线 + 品牌色滑块) */
.custom-slider :deep(.el-slider__runway) {
  height: 4px;
  background-color: #e2e8f0;
}
.custom-slider :deep(.el-slider__bar) {
  height: 4px;
  background-color: #6366f1; /* Indigo 500 */
}
.custom-slider :deep(.el-slider__button) {
  width: 16px;
  height: 16px;
  border: 2px solid #6366f1;
  background-color: #fff;
  transition: transform 0.1s;
}
.custom-slider :deep(.el-slider__button:hover) {
  transform: scale(1.2);
}

/* 自定义滚动条 */
.custom-scrollbar::-webkit-scrollbar {
  width: 4px;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: #cbd5e1;
  border-radius: 4px;
}
</style>