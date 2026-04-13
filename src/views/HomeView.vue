<script setup lang="ts">
import { ref, watch, computed, onMounted, onUnmounted } from "vue";
import { useRouter } from "vue-router";
import { useChatStore, MessageAsset } from "@/stores/chat";
import { ModelType, isVLMModel } from "@/services/aiService";
import { imageService } from "@/services/imageService";
import { 
  Position, Cpu, Brush, ChatDotRound, ArrowDown, 
  Plus, Close, MagicStick, Warning, Right 
} from "@element-plus/icons-vue";
import { ElMessage } from "element-plus";
import deepseekLogo from "@/assets/deepseeklogo.svg";

const bgCanvas = ref<HTMLCanvasElement | null>(null);
const containerRef = ref<HTMLDivElement | null>(null);
let animationFrameId: number;
let mouse = { x: -1000, y: -1000 };

const router = useRouter();
const chatStore = useChatStore();
const userInput = ref("");
const isActivating = ref(false); 

const selectedModel = ref<ModelType>(ModelType.V3);
const assets = ref<MessageAsset[]>([]);
const fileInput = ref<HTMLInputElement | null>(null);

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

const handleModelChange = (model: ModelType) => {
  selectedModel.value = model
}

const triggerUpload = () => {
  fileInput.value?.click()
}

const onFileChange = async (e: Event) => {
  const files = (e.target as HTMLInputElement).files
  if (!files) return

  for (const file of Array.from(files)) {
    const isImage = file.type.startsWith('image/')
    const isPdf = file.type === 'application/pdf'
    
    if (!isImage && !isPdf) {
      ElMessage.warning(`受限格式: ${file.name}`)
      continue
    }

    try {
      const base64 = await imageService.fileToBase64(file)
      assets.value.push({
        type: isImage ? 'image' : 'pdf',
        url: base64,
        name: file.name
      })
    } catch (err) {
      ElMessage.error('上传失败')
    }
  }
}

const removeAsset = (idx: number) => {
  assets.value.splice(idx, 1)
}

const switchToOCR = () => {
  selectedModel.value = ModelType.OCR
}

const startChat = async () => {
  if (!userInput.value.trim() && assets.value.length === 0) return;
  
  isActivating.value = true;
  
  chatStore.switchModel(selectedModel.value);
  
  router.push({
    path: "/chat",
    query: {
      q: userInput.value,
      model: selectedModel.value,
      mode: selectedModel.value === ModelType.ART ? 'image' : 'chat'
    }
  });

  (chatStore as any)._pendingAssets = [...assets.value];
};

const handleKeyDown = (e: KeyboardEvent) => {
  // If user presses Enter without Shift, Meta, or Ctrl -> Send
  if (e.key === 'Enter' && !e.shiftKey && !e.metaKey && !e.ctrlKey) {
    e.preventDefault();
    if (!isActivating.value && (userInput.value.trim() || assets.value.length > 0)) {
      startChat();
    }
  }
  // If user presses Cmd+Enter or Ctrl+Enter -> New Line
  // Note: standard textarea handles Shift+Enter natively, so we only need to manually insert for Cmd/Ctrl+Enter
  else if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
    e.preventDefault();
    userInput.value += '\n';
  }
};

// Configuration for Neural Background
const color = "#3b82f6"; // Primary Blue
const trailOpacity = 0.18;
const particleCount = 700;
const speed = 0.85;
const COLORS = ["#3b82f6", "#60a5fa", "#2563eb", "#1d4ed8"]; // Blue palette

// 打字机逻辑
const fullTitle = "今天想尝试点什么？";
const displayTitle = ref("");
const showCursor = ref(true);

const startTypewriter = () => {
  let i = 0;
  const timer = setInterval(() => {
    if (i < fullTitle.length) {
      displayTitle.value += fullTitle.charAt(i);
      i++;
    } else {
      clearInterval(timer);
    }
  }, 100);
};

// Particle Class
class Particle {
  x: number = 0; y: number = 0; vx: number = 0; vy: number = 0; age: number = 0; life: number = 0; width: number; height: number;
  constructor(w: number, h: number) { this.width = w; this.height = h; this.reset(); }
  update(w: number, h: number, mouseX: number, mouseY: number) {
    this.width = w; this.height = h;
    const angle = (Math.cos(this.x * 0.005) + Math.sin(this.y * 0.005)) * Math.PI;
    this.vx += Math.cos(angle) * 0.2 * speed;
    this.vy += Math.sin(angle) * 0.2 * speed;
    const dx = mouseX - this.x; const dy = mouseY - this.y; const distance = Math.sqrt(dx * dx + dy * dy);
    const interactionRadius = 150;
    if (distance < interactionRadius) {
      const force = (interactionRadius - distance) / interactionRadius;
      this.vx -= dx * force * 0.05; this.vy -= dy * force * 0.05;
    }
    this.x += this.vx; this.y += this.vy; this.vx *= 0.95; this.vy *= 0.95;
    this.age++; if (this.age > this.life) this.reset();
    if (this.x < 0) this.x = this.width; if (this.x > this.width) this.x = 0;
    if (this.y < 0) this.y = this.height; if (this.y > this.height) this.y = 0;
  }
  reset() { this.x = Math.random() * this.width; this.y = Math.random() * this.height; this.vx = 0; this.vy = 0; this.age = 0; this.life = Math.random() * 200 + 100; }
  draw(ctx: CanvasRenderingContext2D) {
    const pColor = COLORS[Math.floor((this.x + this.y) % COLORS.length)];
    ctx.fillStyle = pColor; 
    const alpha = 1 - Math.abs((this.age / this.life) - 0.5) * 2;
    ctx.globalAlpha = alpha * 0.6; 
    ctx.fillRect(this.x, this.y, 1.2, 1.2);
  }
}

onMounted(() => {
  startTypewriter();
  const canvas = bgCanvas.value; const container = containerRef.value;
  if (!canvas || !container) return;
  const ctx = canvas.getContext("2d"); if (!ctx) return;
  let width = container.clientWidth; let height = container.clientHeight; let particles: Particle[] = [];
  const init = () => {
    const dpr = window.devicePixelRatio || 1; canvas.width = width * dpr; canvas.height = height * dpr;
    ctx.scale(dpr, dpr); canvas.style.width = `${width}px`; canvas.style.height = `${height}px`;
    particles = []; for (let i = 0; i < particleCount; i++) particles.push(new Particle(width, height));
  };
  const animate = () => {
    ctx.globalAlpha = 1; ctx.fillStyle = `rgba(255, 255, 255, ${trailOpacity})`; ctx.fillRect(0, 0, width, height);
    particles.forEach((p) => { p.update(width, height, mouse.x, mouse.y); p.draw(ctx); });
    animationFrameId = requestAnimationFrame(animate);
  };
  const handleResize = () => { if (!container) return; width = container.clientWidth; height = container.clientHeight; init(); };
  const handleMouseMove = (e: MouseEvent) => { const rect = canvas.getBoundingClientRect(); mouse.x = e.clientX - rect.left; mouse.y = e.clientY - rect.top; };
  const handleMouseLeave = () => { mouse.x = -1000; mouse.y = -1000; };
  window.addEventListener("resize", handleResize); container.addEventListener("mousemove", handleMouseMove); container.addEventListener("mouseleave", handleMouseLeave);
  init(); animate();
  onUnmounted(() => {
    window.removeEventListener("resize", handleResize); container.removeEventListener("mousemove", handleMouseMove); container.removeEventListener("mouseleave", handleMouseLeave);
    if (animationFrameId) cancelAnimationFrame(animationFrameId);
  });
});
</script>

<template>
  <div ref="containerRef" class="relative min-h-screen bg-white flex flex-col items-center justify-center px-6 overflow-hidden">
    <!-- Neural Background -->
    <div class="absolute inset-0 pointer-events-none bg-slate-50/50">
      <canvas ref="bgCanvas" class="absolute inset-0 w-full h-full opacity-40 mix-blend-multiply"></canvas>
      <div class="absolute inset-0 bg-noise pointer-events-none opacity-[0.02]"></div>
      <div class="absolute inset-0 bg-gradient-to-b from-white/95 via-transparent to-white/95"></div>
    </div>

    <!-- Content -->
    <div class="relative z-10 w-full max-w-3xl flex flex-col items-center">
      <!-- Logo Area -->
      <div class="flex flex-col items-center mb-0 animate-entry-logo">
        <div class="w-16 h-16 mb-8 p-4 bg-white rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] border border-slate-100 hover:scale-105 transition-all duration-500 cursor-pointer">
          <img :src="deepseekLogo" alt="Logo" class="w-full h-full object-contain" />
        </div>
      </div>

      <!-- Title & Slogan -->
      <div class="mb-14 text-center animate-in fade-in slide-in-from-top-10 duration-1000">
        <h1 class="text-4xl md:text-6xl font-black text-slate-900 tracking-tight mb-4">
          {{ displayTitle }}<span v-if="showCursor" class="inline-block w-1.5 h-10 md:h-14 bg-blue-600 ml-1 animate-pulse"></span>
        </h1>
        <p class="text-slate-400 font-medium tracking-wide uppercase text-sm">DeepSeek Pro Multimodal Workspace</p>
      </div>

      <!-- Input Section: Premium Pillar -->
      <div class="max-w-3xl mx-auto w-full group relative mb-8">
        
        <div class="relative bg-white/80 backdrop-blur-2xl rounded-[32px] p-3 border-2 border-slate-100 shadow-[0_32px_64px_-16px_rgba(37,99,235,0.12)] transition-all duration-500 group-hover:border-blue-200 group-focus-within:border-blue-500 group-focus-within:ring-8 group-focus-within:ring-blue-500/5 flex flex-col min-h-[160px]">
          
          <!-- Massive Textarea -->
          <div class="p-2 flex-grow">
            <textarea 
              v-model="userInput" 
              placeholder="今天想尝试点什么？上传文档分析，或是随时开始对话..." 
              class="w-full bg-transparent border-none focus:outline-none focus:ring-0 resize-none px-2 pt-2 pb-0 text-xl md:text-2xl font-medium text-slate-800 placeholder:text-slate-300 min-h-[80px]"
              @keydown="handleKeyDown"
            ></textarea>
          </div>

          <!-- Asset Previews on Home -->
          <div v-if="assets.length > 0" class="px-4 pb-2 flex flex-wrap gap-3">
            <div v-for="(asset, idx) in assets" :key="idx" class="relative group/home-asset w-16 h-16 rounded-xl overflow-hidden border border-slate-100 shadow-sm animate-in zoom-in-50 duration-300">
              <img :src="asset.url" class="w-full h-full object-cover" />
              <div class="absolute inset-0 bg-black/40 opacity-0 group-hover/home-asset:opacity-100 transition-opacity flex items-center justify-center">
                <button @click="removeAsset(idx)" class="text-white hover:text-red-400"><el-icon><Close /></el-icon></button>
              </div>
            </div>
          </div>

          <!-- Internal Bottom Toolbar -->
          <div class="flex items-center justify-between px-2 pb-1 mt-auto">
            <div class="flex items-center gap-2">
              <!-- Upload Trigger -->
              <input type="file" ref="fileInput" class="hidden" multiple @change="onFileChange" />
              <button 
                @click="triggerUpload"
                class="w-10 h-10 flex items-center justify-center rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 transition-all"
                title="上传附件"
              >
                <el-icon class="text-2xl"><Plus /></el-icon>
              </button>

              <!-- Model Pill Switcher Inside -->
              <el-dropdown trigger="click" @command="handleModelChange" class="home-model-pill-dropdown">
                <div class="home-model-pill transition-all active:scale-95 shadow-sm shadow-blue-50 hover:border-blue-300 hover:bg-blue-50/50">
                  <el-icon class="text-blue-500 mr-1.5"><Cpu /></el-icon>
                  <span class="home-model-name text-[13px] font-bold text-slate-700">{{ modelLabel }}</span>
                  <el-icon class="ml-1.5 text-[10px] text-slate-400"><ArrowDown /></el-icon>
                  
                  <div v-if="selectedModel === ModelType.ART" class="status-dot bg-purple-500 animate-pulse ml-2" title="艺术模式已激活"></div>
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

              <Transition name="slide-fade">
                <div v-if="assets.length > 0 && !isVLM" class="home-vlm-warning">
                  <el-icon class="mr-1.5 text-lg"><Warning /></el-icon>
                  <span class="hidden sm:inline">模型不支持识别</span>
                  <button @click="switchToOCR" class="home-switch-link ml-1.5">切换 OCR</button>
                </div>
              </Transition>
            </div>
            
            <!-- Send Button Inside -->
            <button 
              @click="startChat" 
              :disabled="isActivating || (!userInput.trim() && assets.length === 0)"
              class="w-12 h-12 bg-blue-600 text-white rounded-[20px] flex items-center justify-center shadow-[0_8px_20px_rgba(37,99,235,0.3)] hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:scale-100 shrink-0 ml-4"
            >
              <el-icon v-if="isActivating" class="animate-spin text-2xl"><Loading /></el-icon>
              <el-icon v-else class="text-xl -ml-0.5"><Position /></el-icon>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
textarea { scrollbar-width: none; }
textarea::-webkit-scrollbar { display: none; }

@keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0; } }
.animate-blink { animation: blink 1s step-end infinite; }

.bg-noise {
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  mix-blend-mode: overlay;
}

@keyframes entry-logo { from { opacity: 0; transform: translateY(20px) scale(0.9); } to { opacity: 1; transform: translateY(0) scale(1); } }
@keyframes entry-input { from { opacity: 0; transform: translateY(40px); } to { opacity: 1; transform: translateY(0); } }
@keyframes entry-footer { from { opacity: 0; } to { opacity: 1; } }

.animate-entry-logo { animation: entry-logo 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) both; }
.animate-entry-input { animation: entry-input 1s cubic-bezier(0.2, 0.8, 0.2, 1) 0.5s both; }
.animate-entry-footer { animation: entry-footer 1s ease-out 1.2s both; }

.fade-enter-active, .fade-leave-active { transition: all 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; transform: translateY(5px); }

.hero-input :deep(.el-input__wrapper) {
  background: transparent !important;
  box-shadow: none !important;
  font-size: 18px;
  font-weight: 500;
  color: #1e293b;
  padding: 0 12px;
}

.home-model-pill {
  display: flex;
  align-items: center;
  padding: 8px 16px;
  background: white;
  border: 1px solid #f1f5f9;
  border-radius: 16px;
  cursor: pointer;
}

.status-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
}

.home-vlm-warning {
  display: flex;
  align-items: center;
  padding: 6px 14px;
  background: #fffafa;
  border: 1px solid #fee2e2;
  border-radius: 14px;
  font-size: 11px;
  font-weight: 700;
  color: #ef4444;
}

.home-switch-link {
  background: #ef4444;
  color: white;
  padding: 2px 8px;
  border-radius: 6px;
}

.premium-model-menu {
  border-radius: 16px !important;
  padding: 4px !important;
}

:deep(.premium-model-menu .el-dropdown-menu__item) {
  padding: 5px 12px !important;
  border-radius: 10px !important;
  margin-bottom: 2px;
}
:deep(.premium-model-menu .el-dropdown-menu__item:last-child) {
  margin-bottom: 0;
}
:deep(.premium-model-menu .el-dropdown-menu__item.is-active) {
  background-color: #eff6ff !important;
  color: #2563eb !important;
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
</style>