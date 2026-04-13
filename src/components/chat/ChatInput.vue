<template>
  <div class="chat-input-container">
    <!-- Asset Preview Gallery -->
    <div v-if="assets.length > 0" class="asset-previews-bar animate-in fade-in slide-in-from-bottom-2">
      <div v-for="(asset, idx) in assets" :key="idx" class="asset-preview-card group">
        <div class="asset-type-badge">{{ asset.type.toUpperCase() }}</div>
        
        <!-- Image/PDF Preview -->
        <img v-if="asset.type === 'image' || asset.type === 'pdf'" :src="asset.url" class="asset-thumb" />
        
        <!-- Audio/Video Icon -->
        <div v-else class="asset-icon-wrapper">
          <el-icon v-if="asset.type === 'audio'"><Mic /></el-icon>
          <el-icon v-else><VideoPlay /></el-icon>
        </div>
        
        <button @click="removeAsset(idx)" class="remove-asset-btn">
          <el-icon><Close /></el-icon>
        </button>
        <div class="asset-name-tooltip">{{ asset.name }}</div>
      </div>
    </div>

    <!-- New Dynamic Toolbar Pill -->
    <div class="input-dynamic-toolbar">
      <div class="flex items-center gap-2">
        <!-- Minimalist Model Trigger -->
        <el-dropdown trigger="click" @command="handleModelChange" class="model-pill-dropdown">
          <div class="model-pill transition-all active:scale-95">
            <el-icon class="text-blue-500 mr-1.5"><Cpu /></el-icon>
            <span class="model-name">{{ modelLabel }}</span>
            <el-icon class="ml-1.5 text-[10px] text-slate-400 group-hover:text-blue-500"><ArrowDown /></el-icon>
            
            <!-- Contextual Status Dot -->
            <div v-if="currentMode === 'image'" class="status-dot bg-purple-500 animate-pulse ml-2" title="艺术模式已激活"></div>
            <div v-else-if="selectedModel === ModelType.OCR" class="status-dot bg-blue-500 ml-2" title="OCR 模式已激活"></div>
          </div>

          <template #dropdown>
            <el-dropdown-menu class="premium-model-menu">
              <el-dropdown-item v-for="opt in modelList" :key="opt.value" :command="opt.value" :class="{ 'is-active': selectedModel === opt.value }">
                <div class="flex items-center gap-3 w-full py-0.5">
                  <span class="font-bold text-[12.5px] text-slate-700 whitespace-nowrap">{{ opt.label }}</span>
                  <span class="text-[10px] text-slate-400 truncate opacity-80 mt-0.5 max-w-[150px]">{{ opt.desc }}</span>
                </div>
              </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>

        <!-- Elegant Warning/Switch Button -->
        <Transition name="slide-fade">
          <div v-if="assets.length > 0 && !isVLM" class="vlm-warning-pill">
            <el-icon class="mr-1.5"><Warning /></el-icon>
            <span>不支持图文识别</span>
            <button @click="switchToOCR" class="switch-link">
              <span>一键切换</span>
              <el-icon class="ml-0.5"><Right /></el-icon>
            </button>
          </div>
        </Transition>
      </div>

      <div class="flex items-center gap-1.5">
         <button @click="showPromptHelp = true" class="icon-tool-btn" title="指令指南">
          <el-icon class="text-lg"><MagicStick /></el-icon>
        </button>
      </div>
    </div>

    <!-- Main Input Box -->
    <div :class="[
      'input-wrapper transition-all duration-500', 
      isFocused ? 'is-focused' : '', 
      assets.length > 0 ? 'has-assets' : '',
      currentMode === 'image' ? 'border-blue-300 ring-4 ring-blue-500/5' : ''
    ]">
      <!-- Universal Upload Button -->
      <div class="flex items-center pr-2">
        <button 
          @click="triggerUpload" 
          class="upload-trigger-btn" 
          :disabled="disabled || assets.length >= 5"
          title="上传图片/音视频/PDF"
        >
          <el-icon class="text-xl"><Plus /></el-icon>
        </button>
      </div>

      <el-input
        v-model="message"
        type="textarea"
        :autosize="{ minRows: 1, maxRows: 10 }"
        :placeholder="placeholderText"
        class="pro-textarea"
        @keydown.enter.exact.prevent="handleSend"
        @keydown.enter.shift="handleNewline"
        @focus="isFocused = true"
        @blur="isFocused = false"
        :disabled="disabled"
      />

      <!-- Action Group -->
      <div class="flex items-center gap-2 self-end pb-1 ml-2">
        <el-popover
          v-if="currentMode === 'image'"
          placement="top"
          :width="320"
          trigger="click"
          popper-class="art-settings-popper"
        >
          <template #reference>
            <button class="settings-btn active">
              <el-icon class="text-lg"><Operation /></el-icon>
            </button>
          </template>
          
          <div class="p-4 space-y-4">
             <div class="flex items-center justify-between mb-2">
               <span class="text-sm font-extrabold text-slate-800 tracking-tight">艺术创作高级设置</span>
               <el-tag size="small" type="primary" effect="light" round>PRO</el-tag>
             </div>
             
             <div class="space-y-4">
               <div>
                  <label class="text-[11px] font-bold text-slate-400 uppercase block mb-2">生成张数 (Batch)</label>
                  <el-radio-group v-model="artOptions.batch_size" size="small" class="capsule-radio-group">
                    <el-radio-button :value="1">1</el-radio-button>
                    <el-radio-button :value="2">2</el-radio-button>
                    <el-radio-button :value="4">4</el-radio-button>
                  </el-radio-group>
               </div>

               <div>
                 <label class="text-[11px] font-bold text-slate-400 uppercase block mb-2">反向提示词 (Negative Prompt)</label>
                 <el-input v-model="artOptions.negative_prompt" type="textarea" :rows="2" placeholder="不希望出现的元素..." class="mini-input" />
               </div>

               <div class="flex items-center justify-between border-t border-slate-50 pt-3">
                 <label class="text-[11px] font-bold text-slate-400 uppercase">固定种子 (Seed)</label>
                 <el-input v-model="artOptions.seed" placeholder="随机" size="small" style="width: 110px" class="mini-input" />
               </div>
             </div>
          </div>
        </el-popover>

        <button 
          @click="handleSend" 
          :disabled="!isValidInput || disabled"
          :class="[
            'send-btn transition-all duration-300',
            isValidInput && !disabled ? (currentMode === 'image' ? 'bg-blue-600 shadow-blue-100' : 'bg-blue-600 shadow-blue-100') : 'bg-slate-100 text-slate-300'
          ]"
        >
          <el-icon v-if="disabled" class="animate-spin"><Loading /></el-icon>
          <el-icon v-else class="rotate-45 text-lg"><Position /></el-icon>
        </button>
      </div>
    </div>

    <!-- Hidden Input -->
    <input 
      type="file" 
      ref="fileInput" 
      class="hidden" 
      multiple 
      accept="image/*,audio/*,video/*,application/pdf"
      @change="onFileChange"
    />

    <!-- Help Drawer -->
    <el-drawer
      v-model="showPromptHelp"
      title="全模态助手指南"
      direction="rtl"
      size="380px"
      class="help-drawer"
    >
      <div class="p-6 space-y-8 h-full overflow-y-auto pb-20">
        <section>
          <h4 class="flex items-center gap-2 font-bold text-slate-800 mb-3">
            <el-icon class="text-blue-500"><MagicStick /></el-icon> OCR 文档识别技巧
          </h4>
          <p class="text-xs text-slate-500 mb-4 leading-relaxed">当切换到 DeepSeek-OCR 时，建议搭配以下提示词获得最佳效果：</p>
          <div class="grid grid-cols-2 gap-2">
             <button @click="appendPrompt('<image>\n<|grounding|>Convert the document to markdown.')" class="prompt-chip">✨ 转 Markdown</button>
             <button @click="appendPrompt('<image>\nOCR this image.')" class="prompt-chip">🔍 通用识别</button>
             <button @click="appendPrompt('<image>\nParse the figure.')" class="prompt-chip">📊 解析图表</button>
             <button @click="appendPrompt('<image>\nFree OCR.')" class="prompt-chip">📝 自由提取</button>
          </div>
        </section>

        <section>
          <h4 class="flex items-center gap-2 font-bold text-slate-800 mb-3">
             <el-icon class="text-indigo-500"><VideoPlay /></el-icon> 影音多模态
          </h4>
          <p class="text-xs text-slate-500 mb-3">使用 Qwen-Omni 系列模型：</p>
          <ul class="space-y-2 text-xs text-slate-600">
            <li class="flex items-center gap-2"><div class="w-1 h-1 bg-indigo-400 rounded-full"></div> 支持 30s 内的视频分析</li>
            <li class="flex items-center gap-2"><div class="w-1 h-1 bg-indigo-400 rounded-full"></div> 支持音频转录与情感分析</li>
            <li class="flex items-center gap-2"><div class="w-1 h-1 bg-indigo-400 rounded-full"></div> 多图对比与视觉推理</li>
          </ul>
        </section>

        <section>
          <h4 class="flex items-center gap-2 font-bold text-slate-800 mb-3">
            <el-icon class="text-slate-900"><Brush /></el-icon> 艺术创作
          </h4>
          <div class="text-[13px] bg-slate-50 p-4 rounded-2xl border border-slate-100 italic text-slate-500">
            "宁静的海滩上，夕阳西下，天空呈现出橙红色，海浪轻轻拍打着沙滩，写实风格，8k。"
          </div>
        </section>
      </div>
    </el-drawer>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue'
import { 
  Position, Loading, Operation, Plus, Close, Cpu, Memo, List, Mic, VideoPlay, MagicStick, QuestionFilled, Brush, Warning, ArrowDown, Right
} from '@element-plus/icons-vue'
import { useChatStore, MessageAsset } from '@/stores/chat'
import { ModelType, isVLMModel } from '@/services/aiService'
import { imageService } from "@/services/imageService"
import { ElMessage } from 'element-plus'

const props = defineProps<{
  disabled?: boolean;
}>();

const emit = defineEmits<{
  send: [message: string, mode?: 'chat' | 'image', options?: any];
  modelChange: [model: ModelType];
}>();

const chatStore = useChatStore()
const message = ref('')
const isFocused = ref(false)
const showPromptHelp = ref(false)
const fileInput = ref<HTMLInputElement | null>(null)

// Assets state
const assets = ref<MessageAsset[]>([])

// Art settings
const artOptions = reactive({
  batch_size: 1,
  negative_prompt: '',
  seed: '',
  size: '1024x1024',
  steps: 25,
  guidance_scale: 7.5
})

const selectedModel = ref<ModelType>(chatStore.currentModel || ModelType.V3)

const modelList = [
  { label: 'DeepSeek-V3', value: ModelType.V3, desc: '通用智能，适合日常对话' },
  { label: 'R1-Distill-Qwen-7B', value: ModelType.R1_Distill_7B, desc: '轻量级高效推理模型 (免费)' },
  { label: 'R1-0528-Qwen3-8B', value: ModelType.R1_Distill_8B, desc: '基于Qwen3的深度思考提炼版 (免费)' },
  { label: 'DeepSeek-OCR', value: ModelType.OCR, desc: '超强文档识别与提取' },
  { label: 'Qwen-Omni', value: ModelType.QwenOmni, desc: '音视频图文全模态理解' },
  { label: 'Qwen-VL', value: ModelType.QwenVL, desc: '专业视觉分析与理解' },
  { label: 'Qwen-3.5-4B', value: ModelType.Qwen35_4B, desc: '小而强大的全能推理' },
  { label: 'AI 艺术创作', value: ModelType.ART, desc: 'Kolors 艺术生图引擎' },
]

const modelLabel = computed(() => {
  const model = modelList.find(m => m.value === selectedModel.value)
  return model ? model.label : '解析中...'
})

const isVLM = computed(() => isVLMModel(selectedModel.value))

const currentMode = computed(() => {
  return selectedModel.value === ModelType.ART ? 'image' : 'chat';
})

const placeholderText = computed(() => {
  if (currentMode.value === 'image') return '描述您想生成的画面，或上传参考图进行变体创作...'
  if (selectedModel.value === ModelType.OCR) return '上传文档图片或 PDF，开始专业识别...'
  if (selectedModel.value === ModelType.QwenOmni) return '支持发送音频、视频或图片进行综合分析...'
  return '输入消息给 DeepSeek... (Shift + Enter 换行)'
})

const isValidInput = computed(() => message.value.trim().length > 0 || assets.value.length > 0)

const triggerUpload = () => {
  fileInput.value?.click()
}

const onFileChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files) return

  for (const file of Array.from(files)) {
    if (assets.value.length >= 5) {
      ElMessage.warning('单次最多上传 5 个附件')
      break
    }

    const type = file.type.startsWith('image/') ? 'image' : 
                 file.type.startsWith('audio/') ? 'audio' :
                 file.type.startsWith('video/') ? 'video' :
                 file.type === 'application/pdf' ? 'pdf' : null

    if (!type) {
      ElMessage.error(`不支持的文件类型: ${file.name}`)
      continue
    }

    // Client-side warning for video/audio length (simplified check)
    if ((type === 'audio' || type === 'video') && file.size > 20 * 1024 * 1024) {
      ElMessage.warning(`文件较大，处理可能需要较长时间：${file.name}`)
    }

    try {
      const base64 = await imageService.fileToBase64(file)
      assets.value.push({
        type: type as any,
        url: base64,
        name: file.name
      })
    } catch (err) {
      console.error("Upload error:", err)
      ElMessage.error(`上传失败: ${file.name}`)
    }
  }
  if (fileInput.value) fileInput.value.value = ''
}

const removeAsset = (idx: number) => {
  assets.value.splice(idx, 1)
}

const handleModelChange = (val: ModelType) => {
  if (val) emit('modelChange', val)
}

const handleSend = () => {
  if (!isValidInput.value || props.disabled) return
  
  const options = {
    ...artOptions,
    assets: assets.value.length > 0 ? [...assets.value] : undefined
  }

  emit('send', message.value, currentMode.value, options)
  
  message.value = ''
  assets.value = []
}

const handleNewline = (e: KeyboardEvent) => {
  if (props.disabled) e.preventDefault()
}

const appendPrompt = (text: string) => {
  message.value = text
  showPromptHelp.value = false
}

const switchToOCR = () => {
  handleModelChange(ModelType.OCR)
}

// Sync model from store
watch(() => chatStore.currentModel, (newVal) => {
  if (newVal) selectedModel.value = newVal
})
</script>

<style scoped>
.chat-input-container {
  max-width: 900px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 10px;
  padding: 0 16px;
  width: 100%;
}

.asset-previews-bar {
  display: flex;
  gap: 10px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.7);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(226, 232, 240, 0.6);
  border-radius: 20px;
  margin-bottom: 2px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.03);
  overflow-x: auto;
}

.asset-preview-card {
  position: relative;
  width: 60px;
  height: 60px;
  border-radius: 14px;
  overflow: hidden;
  background: #f8fafc;
  border: 1px solid #e2e8f0;
  flex-shrink: 0;
}

.asset-thumb {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.asset-icon-wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 20px;
  color: #6366f1;
}

.asset-type-badge {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  background: rgba(0,0,0,0.5);
  color: white;
  font-size: 8px;
  padding: 2px 0;
  text-align: center;
  font-weight: 900;
  letter-spacing: 0.5px;
}

.remove-asset-btn {
  position: absolute;
  top: 2px;
  right: 2px;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #ef4444;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  opacity: 0;
  transition: all 0.2s;
  box-shadow: 0 2px 5px rgba(239, 68, 68, 0.3);
}

.asset-preview-card:hover .remove-asset-btn {
  opacity: 1;
  transform: scale(1.1);
}

.input-dynamic-toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
}

.model-pill {
  display: flex;
  align-items: center;
  padding: 6px 14px;
  background: white;
  border: 1.5px solid #eff6ff;
  border-radius: 14px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.04);
}

.model-pill:hover {
  border-color: #3b82f6;
  background: #f8fbff;
}

.model-name {
  font-size: 13px;
  font-weight: 700;
  color: #1e293b;
  letter-spacing: -0.2px;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.vlm-warning-pill {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 6px 14px;
  background: #fffafa;
  border: 1.5px solid #fee2e2;
  border-radius: 14px;
  font-size: 12px;
  font-weight: 700;
  color: #ef4444;
  box-shadow: 0 4px 12px rgba(239, 68, 68, 0.05);
}

.switch-link {
  display: flex;
  align-items: center;
  background: #ef4444;
  color: white;
  padding: 2px 10px;
  border-radius: 8px;
  font-size: 11px;
  font-weight: 600;
  transition: all 0.2s;
}

.switch-link:hover {
  background: #dc2626;
  transform: translateX(2px);
}

.icon-tool-btn {
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  color: #94a3b8;
  transition: all 0.2s;
}

.icon-tool-btn:hover {
  background: #f1f5f9;
  color: #3b82f6;
}

.premium-model-menu {
  border-radius: 20px !important;
  padding: 8px !important;
  border: 1px solid #eff6ff !important;
  box-shadow: 0 20px 50px rgba(0,0,0,0.1) !important;
}

.premium-model-menu :deep(.el-dropdown-menu__item) {
  border-radius: 12px;
  margin-bottom: 2px;
  padding: 8px 16px;
}

.premium-model-menu :deep(.el-dropdown-menu__item:hover) {
  background: #f8fbff;
  color: #3b82f6;
}

.premium-model-menu :deep(.el-dropdown-menu__item.is-active) {
  background: #eff6ff;
  color: #2563eb;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}
.slide-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(10px);
  opacity: 0;
}

.input-wrapper {
  display: flex;
  align-items: flex-start;
  gap: 0;
  padding: 10px 18px;
  background: #ffffff;
  border: 1px solid #edeef0;
  border-radius: 26px;
  box-shadow: 0 10px 30px -10px rgba(0,0,0,0.06);
}

.input-wrapper.is-focused {
  border-color: #3b82f6;
  box-shadow: 0 15px 40px -12px rgba(37, 99, 235, 0.1);
}

.upload-trigger-btn {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  color: #94a3b8;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s;
  border: 1px dashed #e2e8f0;
}

.upload-trigger-btn:hover {
  color: #4f46e5;
  border-color: #4f46e5;
  background: #f5f3ff;
  transform: rotate(90deg);
}

.pro-textarea {
  flex: 1;
}

.pro-textarea :deep(.el-textarea__inner) {
  padding: 10px 0;
  border: none;
  box-shadow: none !important;
  font-size: 16px;
  line-height: 1.6;
  color: #1e293b;
  background: transparent;
  resize: none;
}

.settings-btn, .tool-btn {
  width: 38px;
  height: 38px;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #94a3b8;
  transition: all 0.2s;
}

.settings-btn.active {
  color: #2563eb;
  background: #eff6ff;
}

.tool-btn:hover {
  background: #f8fafc;
  color: #1e293b;
}

.send-btn {
  width: 44px;
  height: 44px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  flex-shrink: 0;
  box-shadow: 0 4px 12px rgba(0,0,0,0.1);
}

.send-btn:not(:disabled):hover {
  transform: translateY(-2px);
  filter: brightness(1.1);
}

.prompt-chip {
  padding: 10px;
  background: #f8fafc;
  border: 1px solid #f1f5f9;
  border-radius: 14px;
  font-size: 11px;
  font-weight: 700;
  text-align: left;
  color: #64748b;
  transition: all 0.2s;
}

.prompt-chip:hover {
  background: #eff6ff;
  border-color: #dbeafe;
  color: #2563eb;
  transform: scale(1.02);
}

:global(.art-settings-popper.el-popover.el-popper) {
  border: 1px solid #f1f5f9 !important;
  border-radius: 28px !important;
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15) !important;
  padding: 8px !important;
}

:global(.help-drawer) {
  border-radius: 32px 0 0 32px !important;
}

:global(.premium-model-menu) {
  border-radius: 16px !important;
  padding: 4px !important;
}

:global(.premium-model-menu .el-dropdown-menu__item) {
  padding: 5px 12px !important;
  border-radius: 10px !important;
  margin-bottom: 2px;
}
:global(.premium-model-menu .el-dropdown-menu__item:last-child) {
  margin-bottom: 0;
}
:global(.premium-model-menu .el-dropdown-menu__item.is-active) {
  background-color: #eff6ff !important;
  color: #2563eb !important;
}
</style>