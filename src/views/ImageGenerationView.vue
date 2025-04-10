<template>
  <div class="image-gen-view">
    <div class="page-header">
      <h1>AI 图像生成</h1>
      <p class="subtitle">使用人工智能创建高质量图片</p>
    </div>

    <div class="content-container">
      <!-- 左侧参数表单 -->
      <div class="form-container">
        <el-form :model="formData" label-position="top" class="generation-form">
          <!-- 提示词模板选择 -->
          <div class="templates-section">
            <h3>快速模板</h3>
            <div class="template-grid">
              <el-button v-for="template in promptTemplates" :key="template.label" size="small" @click="applyTemplate(template)">
                {{ template.label }}
              </el-button>
            </div>
          </div>

          <!-- 提示词输入 -->
          <el-form-item label="提示词 (Prompt)">
            <el-input v-model="formData.prompt" type="textarea" :rows="4" placeholder="描述你想要生成的图片内容..." />
          </el-form-item>

          <!-- 参数预设选择 -->
          <div class="presets-section">
            <h3>参数预设</h3>
            <div class="preset-buttons">
              <el-button v-for="preset in parameterPresets" :key="preset.label" size="small" @click="applyPreset(preset)">
                {{ preset.label }}
              </el-button>
            </div>
          </div>

          <!-- 负面提示词输入 -->
          <el-form-item label="负面提示词 (Negative Prompt)">
            <el-input v-model="formData.negative_prompt" type="textarea" :rows="2" placeholder="描述你不希望出现在图片中的内容..." />
          </el-form-item>

          <!-- 图片尺寸选择 -->
          <el-form-item label="图片尺寸">
            <div class="size-selector">
              <div
                v-for="(value, key) in imageSizeOptions"
                :key="key"
                :class="['size-option', { active: formData.image_size === value.value }]"
                @click="formData.image_size = value.value"
              >
                <div class="size-preview" :class="value.ratio">
                  <div class="size-rectangle"></div>
                </div>
                <div class="size-label">{{ value.label }}</div>
              </div>
            </div>
          </el-form-item>

          <!-- 批量生成数量 -->
          <el-form-item label="生成数量">
            <el-slider v-model="formData.batch_size" :min="1" :max="4" :step="1" :marks="{1: '1', 2: '2', 3: '3', 4: '4'}" show-stops />
          </el-form-item>

          <!-- 引导系数 -->
          <el-form-item label="创造性 (引导系数)">
            <el-tooltip content="较低的值会产生更有创意但不太准确的结果，较高的值会使生成更忠于提示词但创意性较低" placement="top">
              <el-slider v-model="formData.guidance_scale" :min="1" :max="20" :step="0.5" :marks="{1: '高创造性', 10: '平衡', 20: '高精确性'}" />
            </el-tooltip>
          </el-form-item>

          <!-- 推理步骤 -->
          <el-form-item label="细节程度 (推理步骤)">
            <el-tooltip content="更高的值会产生更细致的图像，但需要更长时间生成。最大值为50。" placement="top">
              <el-slider v-model="formData.num_inference_steps" :min="1" :max="50" :step="1" :marks="{1: '低', 20: '中', 50: '高'}" />
            </el-tooltip>
          </el-form-item>

          <!-- 随机种子 -->
          <el-form-item label="随机种子 (可选)">
            <el-tooltip content="使用相同种子可以在其他参数相同时获得相似结果" placement="top">
              <div class="seed-input-group">
                <el-input v-model.number="formData.seed" type="number" placeholder="输入种子或留空随机生成" />
                <el-button @click="randomizeSeed">随机</el-button>
              </div>
            </el-tooltip>
          </el-form-item>

          <!-- 参考图片上传 -->
          <el-form-item label="参考图片 (可选)">
            <el-upload
              class="image-uploader"
              :show-file-list="false"
              :before-upload="beforeImageUpload"
              :auto-upload="true"
              :http-request="handleCustomUpload"
              action="#">
              <div v-if="imageUrl" class="image-preview">
                <img :src="imageUrl" class="uploaded-image" />
                <div class="remove-image" @click.stop="removeImage">
                  <el-icon>
                    <Delete />
                  </el-icon>
                </div>
              </div>
              <div v-else class="upload-placeholder">
                <el-icon class="upload-icon">
                  <Plus />
                </el-icon>
                <div class="upload-text">点击上传参考图片</div>
              </div>
            </el-upload>
            <div class="upload-tip">上传图片后，AI将生成与参考图片风格相似的图像</div>
          </el-form-item>

          <!-- 生成按钮 -->
          <el-form-item>
            <el-button type="primary" class="generate-button" @click="generateImage" :loading="loading" :disabled="!formData.prompt || loading">
              {{ loading ? '生成中...' : '生成图片' }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>

      <!-- 右侧结果展示 -->
      <div class="results-container">
        <div v-if="!generatedImages.length && !loading" class="empty-state">
          <div class="empty-state-content">
            <div class="illustration-container">
              <div class="illustration">
                <svg width="160" height="160" viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="30" y="40" width="100" height="80" rx="8" fill="#E6F0FF" stroke="#4E54C8" stroke-width="2" />
                  <circle cx="60" cy="60" r="12" fill="#8F94FB" />
                  <rect x="50" y="80" width="60" height="6" rx="3" fill="#A0C4FF" />
                  <rect x="50" y="94" width="40" height="6" rx="3" fill="#A0C4FF" />
                  <path d="M140 90L120 70L100 90L80 50L60 110" stroke="#4E54C8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
                  <circle cx="110" cy="50" r="20" fill="#FFD6E8" stroke="#4E54C8" stroke-width="2" />
                  <path d="M110 42V58M102 50H118" stroke="#4E54C8" stroke-width="2" stroke-linecap="round" />
                </svg>
              </div>
            </div>
            <h3 class="empty-title">开始创建您的AI图像</h3>
            <div class="empty-steps">
              <div class="step">
                <div class="step-number">1</div>
                <div class="step-content">
                  <h4>填写提示词</h4>
                  <p>详细描述您想要创建的图像，或使用模板快速开始</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">2</div>
                <div class="step-content">
                  <h4>选择参数</h4>
                  <p>调整尺寸、详细程度等参数以获得理想效果</p>
                </div>
              </div>
              <div class="step">
                <div class="step-number">3</div>
                <div class="step-content">
                  <h4>生成图像</h4>
                  <p>点击"生成图片"按钮，AI将为您创建独特图像</p>
                </div>
              </div>
            </div>
            <div class="empty-actions">
              <el-button type="primary" class="action-button" @click="applyRandomTemplate">
                <el-icon><Star /></el-icon>
                使用随机模板
              </el-button>
              <el-button class="action-button" @click="scrollToPrompt">
                <el-icon><Edit /></el-icon>
                开始创作
              </el-button>
            </div>
          </div>
        </div>

        <div v-if="loading" class="loading-state">
          <el-icon class="loading-icon">
            <Loading />
          </el-icon>

          <!-- 添加进度条显示 -->
          <div class="progress-container">
            <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
          </div>

          <p>AI 正在绘制你的图片，预计还需 {{ estimatedTime }}秒</p>
          <p class="progress-percentage">{{ progress }}%</p>
        </div>

        <div v-if="generatedImages.length > 0" class="generated-images">
          <div class="results-header">
            <h2>生成结果</h2>
            <div class="generation-info">
              <p v-if="generationTime">生成时间: {{ generationTime }}秒</p>
              <p v-if="lastSeed !== null">种子: {{ lastSeed }}</p>
            </div>
          </div>

          <div class="image-grid">
            <div v-for="(image, index) in generatedImages" :key="index" class="image-item">
              <div class="image-wrapper" :style="getAspectRatioStyle()">
                <img :src="image.url" alt="生成的图片" loading="lazy" @click="showPreview(image.url)" />
                <div class="image-overlay">
                  <div class="image-actions">

                    <div class="action-buttons">
                      <el-tooltip content="预览大图" placement="top">
                        <el-button size="small" type="primary" plain @click="handleImageAction('preview', image.url, index)">
                          <el-icon><ZoomIn /></el-icon>
                        </el-button>
                      </el-tooltip>
                      <el-tooltip content="下载图片" placement="top">
                        <el-button size="small" type="primary" plain @click="handleImageAction('download', image.url, index)">
                          <el-icon><Download /></el-icon>
                        </el-button>
                      </el-tooltip>
                      <el-tooltip content="复制图片种子值" placement="top">
                        <el-button size="small" type="primary" plain @click="handleImageAction('use-seed', image.url, index)">
                          <el-icon><CopyDocument /></el-icon>
                        </el-button>
                      </el-tooltip>
                      <el-tooltip content="使用该种子重新生成" placement="top">
                        <el-button size="small" type="primary" plain @click="handleImageAction('regenerate', image.url, index)">
                          <el-icon><Edit /></el-icon>
                        </el-button>
                      </el-tooltip>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 图片预览对话框 -->
    <el-dialog v-model="previewVisible" :title="previewTitle" class="preview-dialog" :append-to-body="true">
      <div class="flex" >
        <img :src="previewImage" class="preview-image" alt="预览图片" />
      </div>

      <template #footer>
        <div class="preview-actions">
          <el-button @click="previewVisible = false">关闭</el-button>
          <el-button type="primary" @click="downloadCurrentPreview">
            <el-icon><Download /></el-icon>
            下载图片
          </el-button>
          <el-button type="primary" @click="copySeedToClipboard" v-if="lastSeed !== null">
            <el-icon><CopyDocument /></el-icon>
            复制种子 ({{ lastSeed }})
          </el-button>
          <el-button type="primary" @click="useCurrentSeedAndClose" v-if="lastSeed !== null">
            <el-icon><Edit /></el-icon>
            使用此种子重新生成
          </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onUnmounted } from "vue";
import { ElMessage } from "element-plus";
import {
  Delete,
  Plus,
  Picture,
  Download,
  CopyDocument,
  Loading,
  ZoomIn,
  Edit,
  Star,
} from "@element-plus/icons-vue";
import {
  imageService,
  ImageSize,
  type ImageGenerationResponse,
} from "../services/imageService";

// 类型定义
type ImageAction = "preview" | "download" | "use-seed" | "regenerate";

// 更新图片尺寸选项，添加比例标识
const imageSizeOptions = {
  Square: {
    value: ImageSize.Square,
    label: "1:1 方形",
    ratio: "ratio-1-1"
  },
  Portrait: {
    value: ImageSize.Portrait,
    label: "3:4 竖向",
    ratio: "ratio-3-4"
  },
  Small: {
    value: ImageSize.Small,
    label: "3:4 小尺寸",
    ratio: "ratio-3-4"
  },
  Tall: {
    value: ImageSize.Tall,
    label: "1:2 高竖版",
    ratio: "ratio-1-2"
  },
  Medium: {
    value: ImageSize.Medium,
    label: "9:16 中等",
    ratio: "ratio-9-16"
  },
  Wide: {
    value: ImageSize.Wide,
    label: "3:2 宽幅",
    ratio: "ratio-3-2"
  },
  Widescreen: {
    value: ImageSize.Widescreen,
    label: "16:9 宽屏",
    ratio: "ratio-16-9"
  },
};

// 提示词模板
const promptTemplates = [
  {
    label: "风景摄影",
    prompt:
      "一个美丽的自然风景，阳光透过云层，远处有连绵的山脉，前景是一片野花盛开的草地",
    negative_prompt: "模糊，过度曝光，人工痕迹",
    parameters: {
      guidance_scale: 8.5,
      num_inference_steps: 30,
    },
  },
  {
    label: "人物肖像",
    prompt: "一张专业的人物肖像照片，自然光线，浅景深，柔和的背景虚化",
    negative_prompt: "变形，扭曲，不自然的姿势",
    parameters: {
      guidance_scale: 7.0,
      num_inference_steps: 25,
    },
  },
  {
    label: "抽象艺术",
    prompt: "现代抽象艺术作品，充满活力的色彩，流动的形状，富有表现力的笔触",
    negative_prompt: "具象物体，照片级真实感",
    parameters: {
      guidance_scale: 5.5,
      num_inference_steps: 40,
    },
  },
  {
    label: "城市夜景",
    prompt: "繁华都市的夜景，霓虹灯闪烁，高楼大厦，街道上的车流形成光线轨迹",
    negative_prompt: "模糊，过度曝光，不自然的光源",
    parameters: {
      guidance_scale: 7.0,
      num_inference_steps: 30,
    },
  },
  {
    label: "美食摄影",
    prompt: "精致美食特写，完美的摆盘，柔和的自然光线，清晰的质感和细节",
    negative_prompt: "模糊，不自然的颜色，低质量",
    parameters: {
      guidance_scale: 7.5,
      num_inference_steps: 35,
    },
  },
  {
    label: "科幻场景",
    prompt: "未来主义科幻场景，先进的技术，飞行器，全息投影，科技感的建筑",
    negative_prompt: "老旧，乡村，自然，原始",
    parameters: {
      guidance_scale: 8.0,
      num_inference_steps: 40,
    },
  },
  {
    label: "水下世界",
    prompt: "梦幻的水下场景，五彩缤纷的珊瑚礁，热带鱼群，柔和的水下光线穿透水面",
    negative_prompt: "模糊，污染，黑暗",
    parameters: {
      guidance_scale: 7.5,
      num_inference_steps: 30,
    },
  },
  {
    label: "卡通风格",
    prompt: "卡通风格的插图，明亮饱和的色彩，简洁的线条，可爱的角色设计",
    negative_prompt: "现实主义，照片级真实感，恐怖，暗黑",
    parameters: {
      guidance_scale: 6.0,
      num_inference_steps: 25,
    },
  },
];

// 参数预设
const parameterPresets = [
  {
    label: "快速生成",
    value: {
      num_inference_steps: 20,
      guidance_scale: 7.0,
    },
  },
  {
    label: "标准质量",
    value: {
      num_inference_steps: 30,
      guidance_scale: 7.5,
    },
  },
  {
    label: "高质量",
    value: {
      num_inference_steps: 50,
      guidance_scale: 8.0,
    },
  },
];

// 表单数据
const formData = reactive({
  prompt: "",
  negative_prompt: "",
  image_size: ImageSize.Square as ImageSize | string,
  batch_size: 1,
  num_inference_steps: 20,
  guidance_scale: 7.5,
  seed: undefined as number | undefined,
  image: undefined as string | undefined,
});

// 状态变量
const loading = ref(false);
const imageUrl = ref("");
const generatedImages = ref<{ url: string }[]>([]);
const lastSeed = ref<number | null>(null);
const generationTime = ref<number | null>(null);

// 添加进度状态变量
const progress = ref(0);
const estimatedTime = ref(20);
let progressTimer: number | null = null;

// 图片预览状态
const previewVisible = ref<boolean>(false);
const previewImage = ref<string>("");
const previewTitle = ref<string>("");

// 错误消息映射
const errorMessageMap: Record<string, string> = {
  "network error": "网络连接错误，请检查您的网络连接",
  "timeout": "请求超时，服务器可能繁忙，请稍后再试",
  "server error": "服务器错误，请联系管理员",
  "invalid_api_key": "API密钥无效，请检查您的设置",
  "invalid_prompt": "提示词格式错误，请修改后重试",
  "content_policy_violation": "提示词内容不符合使用政策，请修改后重试",
  "20015": "推理步骤必须小于或等于50",
};

// 随机化种子
const randomizeSeed = () => {
  formData.seed = Math.floor(Math.random() * 1000000000);
};

// 自定义上传处理
const handleCustomUpload = async (options: any) => {
  const { file } = options;
  try {
    // 转换为base64
    const base64 = await imageService.fileToBase64(file);
    formData.image = base64;
    imageUrl.value = base64;
    ElMessage.success('参考图片上传成功');
  } catch (error) {
    ElMessage.error("图片处理失败");
    console.error("图片处理错误:", error);
  }
};

// 图片上传前预处理
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

  return true; // 允许上传
};

// 图片上传成功处理 (不会执行，因为我们禁用了自动上传)
const handleImageSuccess = () => {};

// 移除上传的图片
const removeImage = () => {
  imageUrl.value = "";
  formData.image = undefined;
};

// 生成图片
const generateImage = async () => {
  if (!formData.prompt) {
    ElMessage.warning("请输入提示词");
    return;
  }

  // 确保推理步骤不超过50
  if (formData.num_inference_steps > 50) {
    formData.num_inference_steps = 50;
    ElMessage.warning("推理步骤已自动调整为最大值50");
  }

  loading.value = true;
  generationTime.value = null;

  // 启动进度模拟
  startProgressTimer();

  try {
    const startTime = Date.now();
    const result = await imageService.generateImage({
      prompt: formData.prompt,
      negative_prompt: formData.negative_prompt || undefined,
      image_size: formData.image_size,
      batch_size: formData.batch_size,
      num_inference_steps: formData.num_inference_steps,
      guidance_scale: formData.guidance_scale,
      seed: formData.seed,
      image: formData.image,
    });

    const endTime = Date.now();
    generationTime.value = parseFloat(
      ((endTime - startTime) / 1000).toFixed(1)
    );

    // 更新生成的图片和种子
    generatedImages.value = result.images;
    lastSeed.value = result.seed;

    // 完成进度
    progress.value = 100;

    ElMessage.success("图片生成成功");
  } catch (error: any) {
    progress.value = 0;

    // 根据错误类型显示更友好的错误消息
    let errorMessage = error.message || "未知错误";
    let errorCode = "";

    // 尝试解析错误对象
    try {
      if (typeof errorMessage === 'string' && errorMessage.includes('{')) {
        const errorObj = JSON.parse(errorMessage.substring(errorMessage.indexOf('{')));
        errorCode = errorObj.code?.toString() || "";
        errorMessage = errorObj.message || errorMessage;
      }
    } catch (e) {
      console.error("Error parsing error message:", e);
    }

    // 检查错误代码映射
    if (errorCode && errorMessageMap[errorCode]) {
      ElMessage.error(errorMessageMap[errorCode]);
    } else {
      // 检查错误消息映射
      const knownError = Object.keys(errorMessageMap).find(key =>
        errorMessage.toLowerCase().includes(key.toLowerCase())
      );

      if (knownError) {
        ElMessage.error(errorMessageMap[knownError]);
      } else {
        ElMessage.error(`图片生成失败: ${errorMessage}`);
      }
    }

    console.error("图片生成失败:", error);
  } finally {
    // 清除进度定时器
    if (progressTimer !== null) {
      clearInterval(progressTimer);
      progressTimer = null;
    }

    // 延迟关闭loading状态，让用户看到100%的进度
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
};

// 模拟进度更新
const startProgressTimer = () => {
  progress.value = 0;
  estimatedTime.value = 20;

  progressTimer = window.setInterval(() => {
    if (progress.value < 99) {
      // 增加1-5的随机值
      const increment = Math.floor(Math.random() * 5) + 1;
      progress.value = Math.min(99, progress.value + increment);

      // 更新估计时间
      const remainingProgress = 100 - progress.value;
      estimatedTime.value = Math.max(1, Math.round(remainingProgress / 5));
    }
  }, 800);
};

// 在组件卸载时清除定时器
onUnmounted(() => {
  if (progressTimer !== null) {
    clearInterval(progressTimer);
  }
});

// 下载图片
const downloadImage = (url: string, index: number) => {
  const a = document.createElement("a");
  a.href = url;
  a.download = `generated-image-${lastSeed.value || Date.now()}-${index}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
};

// 使用当前图片的种子
const useImageSeed = (seed: number | null) => {
  if (seed !== null) {
    formData.seed = seed;
    ElMessage.success(`已设置种子: ${seed}`);
  }
};

// 应用提示词模板
const applyTemplate = (template: (typeof promptTemplates)[0]) => {
  formData.prompt = template.prompt;
  formData.negative_prompt = template.negative_prompt;
  if (template.parameters) {
    formData.guidance_scale = template.parameters.guidance_scale;
    formData.num_inference_steps = template.parameters.num_inference_steps;
  }
  ElMessage.success("已应用模板");
};

// 应用参数预设
const applyPreset = (preset: (typeof parameterPresets)[0]) => {
  formData.num_inference_steps = preset.value.num_inference_steps;
  formData.guidance_scale = preset.value.guidance_scale;
  ElMessage.success("已应用参数预设");
};

// 显示图片预览
const showPreview = (image: string): void => {
  previewImage.value = image;
  previewVisible.value = true;
  previewTitle.value = `生成图片 (种子: ${lastSeed.value || "随机"})`;
};

// 图片操作菜单
const handleImageAction = (
  action: ImageAction,
  image: string,
  index: number
): void => {
  switch (action) {
    case "preview":
      showPreview(image);
      break;
    case "download":
      downloadImage(image, index);
      break;
    case "use-seed":
      useImageSeed(lastSeed.value);
      break;
    case "regenerate":
      regenerateWithSeed(lastSeed.value);
      break;
  }
};

// 使用相同参数和种子重新生成
const regenerateWithSeed = async (seed: number | null): Promise<void> => {
  if (seed === null) return;
  formData.seed = seed;
  await generateImage();
};

// 下载当前预览的图片
const downloadCurrentPreview = () => {
  if (!previewImage.value) return;
  const a = document.createElement("a");
  a.href = previewImage.value;
  a.download = `generated-image-${lastSeed.value || Date.now()}.png`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  ElMessage.success("图片下载已开始");
};

// 复制种子到剪贴板
const copySeedToClipboard = async () => {
  if (lastSeed.value === null) return;

  try {
    await navigator.clipboard.writeText(lastSeed.value.toString());
    ElMessage.success(`已复制种子(${lastSeed.value})到剪贴板`);
  } catch (err) {
    // 降级方案
    const textArea = document.createElement("textarea");
    textArea.value = lastSeed.value.toString();
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand("copy");
    document.body.removeChild(textArea);
    ElMessage.success(`已复制种子(${lastSeed.value})到剪贴板`);
  }
};

// 使用当前种子并关闭预览
const useCurrentSeedAndClose = () => {
  if (lastSeed.value !== null) {
    formData.seed = lastSeed.value;
    ElMessage.success(`已设置种子: ${lastSeed.value}`);
    previewVisible.value = false;
  }
};

// 根据选择的图片尺寸获取对应的长宽比样式
const getAspectRatioStyle = () => {
  const sizeValue = formData.image_size;
  const dimensions = sizeValue.split('x');
  if (dimensions.length === 2) {
    const width = parseInt(dimensions[0]);
    const height = parseInt(dimensions[1]);
    const ratio = (height / width) * 100;
    return {
      paddingBottom: `${ratio}%`,
      height: '0',
    };
  }
  // 默认1:1比例
  return {
    paddingBottom: '100%',
    height: '0',
  };
};

// 随机应用一个模板
const applyRandomTemplate = () => {
  const randomIndex = Math.floor(Math.random() * promptTemplates.length);
  applyTemplate(promptTemplates[randomIndex]);
};

// 滚动到提示词输入区域
const scrollToPrompt = () => {
  const promptElement = document.querySelector('.generation-form');
  if (promptElement) {
    promptElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
};
</script>

<style scoped>
.image-gen-view {
  padding: 20px;
  background: #f5f7fa;
  min-height: calc(100vh - 64px); /* 修正高度计算，匹配App.vue的header高度 */
  box-sizing: border-box;
}

.page-header {
  text-align: center;
  margin-bottom: 32px;
}

.page-header h1 {
  font-size: 2.5rem;
  margin-bottom: 8px;
  background: linear-gradient(135deg, #4e54c8, #8f94fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.subtitle {
  font-size: 1.1rem;
  color: #606266;
  margin: 0;
}

.content-container {
  display: grid;
  grid-template-columns: minmax(300px, 1fr) 2fr;
  gap: 24px;
}

.form-container {
  flex: 1;
  min-width: 30%;
  max-width: 500px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

.results-container {
  flex: 2;
  min-height: 500px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
}

.generation-form {
  display: grid;
  grid-template-columns: 1fr;
  gap: 16px;
}

.full-width {
  width: 100%;
}

.seed-input-group {
  display: flex;
  gap: 8px;
}

/* 图片上传区域样式 */
.image-uploader {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: border-color 0.3s;
  width: 100%;
  height: 148px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.image-uploader:hover {
  border-color: #409eff;
}

.upload-icon {
  font-size: 28px;
  color: #8c939d;
}

.upload-tip {
  font-size: 12px;
  color: #606266;
  margin-top: 8px;
}

.image-preview {
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.uploaded-image {
  max-width: 100%;
  max-height: 146px;
  object-fit: contain;
}

.remove-image {
  position: absolute;
  top: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.6);
  color: white;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transition: all 0.3s;
}

.remove-image:hover {
  background: rgba(0, 0, 0, 0.8);
  transform: scale(1.1);
}

/* 生成按钮样式 */
.generate-button {
  width: 100%;
  height: 44px;
  font-size: 16px;
  margin-top: 16px;
  background: linear-gradient(135deg, #4e54c8, #8f94fb);
  border: none;
}

.generate-button:hover:not(:disabled) {
  background: linear-gradient(135deg, #454ebd, #8288fb);
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(78, 84, 200, 0.3);
}

/* 空状态样式 */
.empty-state {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  padding: 20px;
}

.empty-state-content {
  max-width: 640px;
  background: white;
  border-radius: 16px;
  padding: 32px 24px;
  text-align: center;
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.05);
  border: 1px solid #f0f0f0;
}

.illustration-container {
  display: flex;
  justify-content: center;
  margin-bottom: 24px;
}

.illustration {
  position: relative;
}

.illustration svg {
  filter: drop-shadow(0px 4px 8px rgba(0, 0, 0, 0.1));
}

.empty-title {
  font-size: 24px;
  font-weight: 600;
  color: #303133;
  margin-bottom: 32px;
  background-image: linear-gradient(135deg, #4e54c8, #8f94fb);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.empty-steps {
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 32px;
}

.step {
  display: flex;
  align-items: flex-start;
  gap: 16px;
  text-align: left;
  padding: 12px 16px;
  background-color: #f8f9fb;
  border-radius: 8px;
  transition: all 0.3s;
}

.step:hover {
  background-color: #f0f7ff;
  transform: translateY(-2px);
}

.step-number {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 28px;
  height: 28px;
  border-radius: 50%;
  background: linear-gradient(135deg, #4e54c8, #8f94fb);
  color: white;
  font-weight: 600;
  flex-shrink: 0;
}

.step-content {
  flex: 1;
}

.step-content h4 {
  font-size: 16px;
  font-weight: 600;
  color: #303133;
  margin: 0 0 4px 0;
}

.step-content p {
  font-size: 14px;
  color: #606266;
  margin: 0;
  line-height: 1.5;
}

.empty-actions {
  display: flex;
  justify-content: center;
  gap: 16px;
  margin-top: 16px;
}

.action-button {
  min-width: 140px;
  height: 40px;
}

.action-button :deep(.el-icon) {
  margin-right: 4px;
}

@media (max-width: 600px) {
  .empty-state-content {
    padding: 24px 16px;
  }

  .empty-steps {
    gap: 12px;
  }

  .step {
    padding: 10px 12px;
  }

  .empty-actions {
    flex-direction: column;
    gap: 12px;
  }

  .action-button {
    width: 100%;
  }
}

/* 加载状态 */
.loading-state {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #606266;
  text-align: center;
}

.loading-icon {
  font-size: 48px;
  margin-bottom: 16px;
  animation: spin 2s linear infinite;
}

.loading-tip {
  font-size: 14px;
  color: #909399;
  margin-top: 8px;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

/* 生成结果样式 */
.results-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 16px;
  padding-bottom: 16px;
  border-bottom: 1px solid #ebeef5;
}

.results-header h2 {
  margin: 0;
  font-size: 1.5rem;
}

.generation-info {
  font-size: 14px;
  color: #606266;
}

.generation-info p {
  margin: 4px 0;
}

.image-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
  width: 100%;
}

.image-item {
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s;
}

.image-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
}

.image-item img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: cover;
  display: block;
}

.image-wrapper {
  position: relative;
  width: 100%;
  overflow: hidden;
  border-radius: 8px;
  cursor: pointer;
  background-color: #f0f2f5;
}

.image-wrapper img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s;
}

.image-wrapper:hover img {
  transform: scale(1.05);
}

.image-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: 0;
  transition: opacity 0.3s;
}

.image-wrapper:hover .image-overlay {
  opacity: 1;
}

.image-actions {
  transform: translateY(20px);
  transition: transform 0.3s;
}

.image-wrapper:hover .image-actions {
  transform: translateY(0);
}

/* 预览对话框样式 */
.preview-dialog :deep(.el-dialog) {
  border-radius: 12px;
  overflow: hidden;
}

.preview-dialog :deep(.el-dialog__header) {
  padding: 16px 24px;
  margin: 0;
  border-bottom: 1px solid #eee;
}

.preview-dialog :deep(.el-dialog__body) {
  padding: 24px;
  text-align: center;
}

.preview-image {
  max-width: 100%;
  max-height: 70vh;
  object-fit: contain;
  border-radius: 4px;
}

/* 图片操作按钮样式 */
.action-buttons {
  display: flex;
  gap: 8px;
}

.image-actions :deep(.el-button) {
  background: rgba(255, 255, 255, 0.9);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: #409eff;
  backdrop-filter: blur(4px);
  transition: all 0.3s;
}

.image-actions :deep(.el-button:hover) {
  background: rgba(255, 255, 255, 1);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  color: #2c84e9;
  border-color: #d8e6fd;
}

.image-actions :deep(.el-button .el-icon) {
  margin-right: 0;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .content-container {
    grid-template-columns: 1fr;
  }

  .template-grid {
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  }

  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    gap: 16px;
  }
}

@media (max-width: 600px) {
  .template-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .image-grid {
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 12px;
  }

  /* 其他移动端优化 */
  .templates-section,
  .presets-section {
    padding: 12px;
  }

  .preview-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .preview-actions .el-button {
    width: 100%;
    margin-left: 0;
  }

  .preview-dialog :deep(.el-dialog__title) {
    font-size: 16px;
  }
}

.templates-section,
.presets-section {
  margin-bottom: 20px;
  padding: 16px;
  background: #f8f9fa;
  border-radius: 8px;
}

.templates-section h3,
.presets-section h3 {
  font-size: 14px;
  color: #606266;
  margin: 0 0 12px 0;
}

.template-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(120px, 1fr));
  gap: 8px;
  width: 100%;
}

.template-buttons,
.preset-buttons {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.template-buttons :deep(.el-button),
.preset-buttons :deep(.el-button) {
  background: white;
  border: 1px solid #dcdfe6;
}

.template-buttons :deep(.el-button:hover),
.preset-buttons :deep(.el-button:hover) {
  background: #f5f7fa;
  border-color: #409eff;
  color: #409eff;
  transform: translateY(-1px);
  box-shadow: 0 2px 8px rgba(64, 158, 255, 0.1);
}

/* 进度条样式 */
.progress-container {
  width: 80%;
  height: 8px;
  background: #ebeef5;
  border-radius: 4px;
  margin: 16px 0;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(90deg, #4e54c8, #8f94fb);
  transition: width 0.5s ease;
  border-radius: 4px;
}

.progress-percentage {
  font-size: 16px;
  font-weight: 500;
  color: #606266;
  margin-top: 8px;
}

/* 图片尺寸选择器样式 */
.size-selector {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  width: 100%;
}

.size-option {
  flex: 1;
  min-width: 70px;
  max-width: 100px;
  height: 72px;
  border: 1px solid #dcdfe6;
  border-radius: 6px;
  padding: 8px 4px 4px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background-color: white;
  transition: all 0.3s;
}

.size-option:hover {
  border-color: #c6e2ff;
  background-color: #f5f7fa;
  transform: translateY(-2px);
}

.size-option.active {
  border-color: #409eff;
  background-color: #ecf5ff;
}

.size-preview {
  width: 40px;
  height: 40px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.size-rectangle {
  background-color: #a0cfff;
  transition: all 0.3s;
  border-radius: 2px;
}

.size-option:hover .size-rectangle {
  background-color: #79bbff;
}

.size-option.active .size-rectangle {
  background-color: #409eff;
}

/* 不同比例的长方形 */
.ratio-1-1 .size-rectangle {
  width: 36px;
  height: 36px;
}

.ratio-3-4 .size-rectangle {
  width: 30px;
  height: 40px;
}

.ratio-1-2 .size-rectangle {
  width: 20px;
  height: 40px;
}

.ratio-9-16 .size-rectangle {
  width: 23px;
  height: 40px;
}

.ratio-3-2 .size-rectangle {
  width: 40px;
  height: 27px;
}

.ratio-16-9 .size-rectangle {
  width: 40px;
  height: 23px;
}

.size-label {
  font-size: 12px;
  color: #606266;
  margin-top: 4px;
  text-align: center;
}

.size-option.active .size-label {
  color: #409eff;
  font-weight: 500;
}

/* 响应式调整 */
@media (max-width: 600px) {
  .size-selector {
    gap: 8px;
  }

  .size-option {
    min-width: 60px;
    height: 64px;
    padding: 6px 2px 2px;
  }

  .size-preview {
    width: 32px;
    height: 32px;
  }

  .size-label {
    font-size: 10px;
  }

  /* 调整不同比例的长方形尺寸 */
  .ratio-1-1 .size-rectangle {
    width: 28px;
    height: 28px;
  }

  .ratio-3-4 .size-rectangle {
    width: 24px;
    height: 32px;
  }

  .ratio-1-2 .size-rectangle {
    width: 16px;
    height: 32px;
  }

  .ratio-9-16 .size-rectangle {
    width: 18px;
    height: 32px;
  }

  .ratio-3-2 .size-rectangle {
    width: 32px;
    height: 21px;
  }

  .ratio-16-9 .size-rectangle {
    width: 32px;
    height: 18px;
  }
}
.flex{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
}

.upload-placeholder {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
  color: #8c939d;
}

.upload-text {
  font-size: 14px;
  margin-top: 8px;
}
</style>
