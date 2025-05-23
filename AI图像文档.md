# AI图像生成完全指南

## 目录

1. [引言：了解AI图像生成](#1-引言了解ai图像生成)
2. [开始使用：界面与基本操作](#2-开始使用界面与基本操作)
3. [核心参数详解](#3-核心参数详解)
4. [提示词工程：创造力的艺术](#4-提示词工程创造力的艺术)
5. [实用案例与场景](#5-实用案例与场景)
6. [高级技巧与优化](#6-高级技巧与优化)
7. [常见问题与解决方案](#7-常见问题与解决方案)
8. [附录：资源与参考](#8-附录资源与参考)
9. [代码实现指南](#9-代码实现指南)

## 1. 引言：了解AI图像生成

### 什么是AI图像生成？

AI图像生成是一项革命性技术，让您能够通过文字描述创建精美图像。无需艺术技能，只要输入描述（称为"提示词"），AI就能将您的想象转化为视觉艺术。

### 工作原理

这项技术基于深度学习模型，特别是扩散模型。AI通过分析数百万图像学习了图像与文字之间的关系，使其能够理解并创建符合您描述的新图像。

### 应用场景

* 插图和艺术创作
* 产品设计与概念图
* 营销和广告素材
* 个人创意表达
* 游戏和娱乐内容
* 教育资源制作

## 2. 开始使用：界面与基本操作

### 界面概览

我们的AI图像生成界面分为两个主要区域：

* **左侧参数区**：设置和控制生成过程
* **右侧结果区**：显示生成的图像和结果信息

### 基本操作流程

1. **输入提示词**：在"提示词"文本框中描述您想要的图像
2. **设置参数**：调整尺寸、创意程度等参数（或使用默认值）
3. **点击生成**：点击"生成图片"按钮
4. **查看结果**：在右侧查看生成的图像
5. **下载或调整**：下载满意的图像或调整参数重新生成

### 快速模板使用

系统提供了预设模板，帮助您快速开始：

* **风景摄影**：适合自然风景和户外场景
* **人物肖像**：适合创建人物图像
* **抽象艺术**：适合创意和抽象作品

点击所需模板即可自动填充相关提示词和参数。

## 3. 核心参数详解

### 提示词 (Prompt)

这是最关键的参数，描述您想要什么样的图像。

* **作用**：告诉AI您想要生成什么内容、风格和细节
* **长度**：通常5-50个词效果最佳
* **细节**：越具体的描述，结果越接近您的期望

### 负面提示词 (Negative Prompt)

描述您不希望在图像中看到的元素。

* **作用**：排除不需要的内容或质量问题
* **常用词**：模糊、扭曲、畸形、低质量、粗糙等
* **建议**：排除常见的生成问题，如额外的肢体、不自然的表情等

### 图片尺寸

决定输出图像的分辨率和比例。

* **方形 (1024x1024)**：通用格式，适合多种用途
* **竖向 (960x1280)**：适合海报、手机壁纸
* **小尺寸 (768x1024)**：处理速度快，适合快速测试
* **高竖版 (720x1440)**：适合移动设备全屏内容
* **中等 (720x1280)**：平衡尺寸和速度

### 生成数量

一次生成的图像数量（1-4张）。

* **作用**：允许同时比较多个变体
* **注意**：数量越多，生成时间越长

### 创造性 (引导系数)

控制AI对提示词的遵循程度。

* **范围**：1-20
* **低值 (1-5)**：高创造性，但可能偏离提示词
* **中值 (7-10)**：平衡创意和准确性（推荐）
* **高值 (12-20)**：严格遵循提示词，创意性较低

### 细节程度 (推理步骤)

控制生成过程的迭代次数，影响细节和质量。

* **范围**：1-100
* **低 (10-20)**：生成速度快，细节较少
* **中 (30-50)**：平衡细节和速度（推荐）
* **高 (60-100)**：最大细节，生成时间长

### 随机种子

控制生成过程的随机性。

* **作用**：每个种子产生不同的结果组合
* **固定种子**：使用相同种子和参数可重现相同结果
* **建议**：记录喜欢结果的种子号，方便后续再创作

### 参考图片

上传图片作为生成参考。

* **作用**：引导AI生成与参考图相似风格的图像
* **适用场景**：想要特定风格、构图或色彩方案

## 4. 提示词工程：创造力的艺术

### 提示词的组成部分

有效的提示词通常包含以下元素：

* **主体**：图像的核心内容（人物、物体、场景等）
* **风格**：艺术风格、艺术家风格或媒介（油画、水彩、照片等）
* **环境**：场景、背景、氛围
* **光线**：光源、时间、光线质量
* **视角**：相机角度、距离、焦距
* **细节**：特定细节、纹理、材质
* **质量指标**：清晰度、分辨率描述

### 提示词模板

```
[主体描述], [风格], [环境], [光线], [视角], [细节], [质量描述]
```

示例：
```
宁静的山间湖泊, 油画风格, 被高山环绕, 黄昏光线穿透薄雾, 广角视角, 细腻的水面反射, 超高清细节
```

### 提示词技巧

#### 具体而非抽象
✅ 好：`一位穿着红色连衣裙的年轻女性站在雨中的巴黎街头`  
❌ 差：`一个人在城市里`

#### 使用具体艺术风格
✅ 好：`莫奈印象派风格`, `赛博朋克风格`, `宫崎骏动画风格`  
❌ 差：`好看的风格`, `艺术风格`

#### 增加技术细节
✅ 好：`50mm镜头, 浅景深, 工作室照明, 高对比度`  
❌ 差：`高质量照片`

#### 使用引用和参考
✅ 好：`类似于雷诺阿的绘画风格`, `如同80年代科幻电影场景`  
❌ 差：`好看的风格`

### 提示词优化方法

1. **添加描述层次**：由一般到具体
2. **使用明确的艺术术语**：了解并使用专业术语
3. **平衡描述元素**：不要只关注一个方面
4. **避免矛盾描述**：如同时要求"白天"和"夜晚"
5. **迭代改进**：根据结果调整提示词

## 5. 实用案例与场景

### 风景与自然场景

#### 山川湖泊
```
壮观的山脉与平静湖泊, 光线穿透云层形成光束, 细腻的水面倒影, 清晨薄雾, 广角构图, 高动态范围摄影, 逼真细节
```

#### 海滩日落
```
热带海滩日落, 金色和紫色的天空渐变, 剪影的棕榈树, 平静海面反射夕阳, 长曝光效果, 摄影作品, 细腻沙滩纹理
```

### 人物肖像

#### 专业人像
```
专业人像照片, 年轻女性, 自然妆容, 清晰的眼睛细节, 柔和侧光, 中性背景, 浅景深, 85mm人像镜头, 工作室照明
```

#### 角色概念
```
未来战士角色设计, 科幻装甲, 决心的表情, 未来都市背景, 动态姿势, 概念艺术, 精细细节, 专业角色设计, 电影质感
```

### 建筑与城市

#### 未来城市
```
未来主义城市天际线, 发光的霓虹灯, 高耸的玻璃建筑, 飞行器在建筑间穿梭, 夜景, 蓝色和紫色调, 科幻概念艺术, 细节丰富
```

#### 古典建筑
```
文艺复兴时期意大利广场, 大理石建筑与喷泉, 暖色阳光, 历史氛围, 细节丰富的雕刻, 对称构图, 高清建筑摄影
```

### 产品与商业

#### 产品展示
```
极简主义背景上的智能手表, 产品摄影, 工作室照明, 清晰细节, 轻微反光表面, 专业照明, 广告级质量, 白色背景
```

#### 食物摄影
```
精致的甜品摆盘, 宏观特写, 自然光线, 浅景深, 细腻纹理, 鲜艳色彩, 专业食物摄影, 餐厅菜单质量
```

## 6. 高级技巧与优化

### 提示词权重控制

通过添加括号和特殊符号控制提示词的重要性：

* `(重要词语)` - 适度增加重要性
* `((非常重要词语))` - 显著增加重要性
* `[次要词语]` - 减少重要性
* `[0.5:次要词语]` - 指定具体权重(0.1至10)

### 光线与氛围控制

光线对图像氛围影响巨大：

* **黄金时段**：温暖、柔和、浪漫
* **蓝调时分**：冷色调、神秘、安静
* **硬光源**：高对比度、戏剧性
* **漫射光**：柔和、均匀、适合肖像

指定具体光线：`侧逆光`, `漫射自然光`, `工作室三点照明`

### 风格与艺术家引用

引用特定艺术家或风格让AI更容易理解您想要的效果：

* `梵高风格` - 漩涡状笔触、生动色彩
* `赛博朋克风格` - 霓虹色彩、未来科技
* `电影黑色风格` - 高对比度、戏剧性光影
* `宫崎骏风格` - 明亮色彩、梦幻元素

### 相机与镜头参数

添加摄影术语提高照片般的真实感：

* `85mm人像镜头` - 人像摄影常用
* `超广角镜头` - 风景、建筑
* `f/1.4光圈` - 浅景深、背景模糊
* `长曝光` - 运动模糊、光轨效果
* `微距摄影` - 极近距离细节

### 分辨率与质量术语

添加这些术语可提升图像精细度：

* `超高清` - 增加细节
* `8K分辨率` - 最高级别细节
* `锐利细节` - 清晰的边缘和纹理
* `精细纹理` - 增强表面细节
* `电影质感` - 电影级色彩和表现力

## 7. 常见问题与解决方案

### 问题：图像缺乏细节或模糊

**解决方案：**
* 增加推理步骤(40-60)
* 添加"高细节"、"锐利"等关键词
* 使用更具体的描述
* 尝试增加引导系数(8-10)

### 问题：生成的图像与描述不符

**解决方案：**
* 提高引导系数(10-15)
* 使用括号强调重要元素：`((最重要的元素))`
* 简化提示词，减少矛盾内容
* 分成多个短句，用逗号分隔

### 问题：人物面部或手部变形

**解决方案：**
* 在负面提示词中添加：`变形，畸形手指，不对称面部，错误比例`
* 添加正面描述：`准确的人体比例，自然的手指，细致的面部特征`
* 调整引导系数到8-12之间
* 增加推理步骤以获得更精确的细节

### 问题：无法生成特定风格

**解决方案：**
* 使用更具体的艺术参考：`类似[艺术家名]的风格`
* 添加风格关键词：`[媒介类型]，[艺术运动]，[时代风格]`
* 使用参考图片上传功能
* 降低引导系数(5-7)以允许更多风格解释

### 问题：颜色不符合预期

**解决方案：**
* 使用具体的颜色描述：`主色调为湖蓝色和珊瑚色`
* 指定色彩关系：`高对比度配色`，`协调的暖色调`
* 添加光线描述：`温暖的金色光线`，`冷色调环境光`
* 参考特定风格：`宝丽来胶片色彩`，`电影调色`

## 8. 附录：资源与参考

### 提示词速查表

#### 艺术风格
- 油画、水彩、素描、数字艺术、版画、摄影、概念艺术、插画

#### 艺术运动
- 印象派、表现主义、超现实主义、极简主义、波普艺术、赛博朋克

#### 光线描述
- 自然光、工作室照明、金色时刻、蓝调时分、戏剧性光影、侧光、逆光

#### 视角术语
- 俯视图、特写、微距、广角、长焦、全景、鸟瞰图、蚁视图

#### 质量描述
- 超高清、8K分辨率、精细细节、锐利纹理、高质量、专业摄影

#### 常用负面提示词
- 模糊、变形、不自然、低分辨率、噪点、过度曝光、不对称、扭曲

### 常用模板集

#### 产品摄影模板
```
[产品名称], 干净简约背景, 工作室专业照明, 详细产品纹理, 商业摄影, 锐利细节, 广告级质量
```

#### 概念艺术模板
```
[主题]概念艺术, 由[艺术家名]设计, 复杂细节, 专业构图, 影视制作质量, 电影感氛围, 高级质感
```

#### 肖像摄影模板
```
[人物描述]的专业肖像照片, 85mm镜头, 浅景深, f/1.4光圈, 柔和侧光, 工作室背景, 清晰面部细节
```

#### 风景摄影模板
```
壮观的[景观类型], [时间]光线, [天气条件], 广角构图, 高动态范围, 锐利细节, 自然摄影, 风景大师作品
```

---

*本指南持续更新，希望它能帮助您创造出令人惊叹的AI艺术作品！*

## 9. 代码实现指南

本节将介绍如何使用Vue.js实现AI图像生成功能，包括界面构建、API调用和图像处理等关键部分。

### 基本组件结构

图像生成页面的基本组件结构如下：

```vue
<template>
  <div class="image-gen-view">
    <!-- 页面标题 -->
    <div class="page-header">
      <h1>AI 图像生成</h1>
      <p class="subtitle">使用人工智能创建高质量图片</p>
    </div>

    <div class="content-container">
      <!-- 左侧参数表单 -->
      <div class="form-container">
        <!-- 参数表单内容 -->
      </div>

      <!-- 右侧结果展示 -->
      <div class="results-container">
        <!-- 结果展示区域 -->
      </div>
    </div>
  </div>
</template>
```

### 参数表单实现

以下是参数表单部分的核心代码：

```vue
<el-form :model="formData" label-position="top" class="generation-form">
  <!-- 提示词输入 -->
  <el-form-item label="提示词 (Prompt)">
    <el-input v-model="formData.prompt" type="textarea" :rows="4" 
              placeholder="描述你想要生成的图片内容..." />
  </el-form-item>

  <!-- 负面提示词输入 -->
  <el-form-item label="负面提示词 (Negative Prompt)">
    <el-input v-model="formData.negative_prompt" type="textarea" :rows="2" 
              placeholder="描述你不希望出现在图片中的内容..." />
  </el-form-item>

  <!-- 图片尺寸选择 -->
  <el-form-item label="图片尺寸">
    <el-select v-model="formData.image_size" class="full-width">
      <el-option v-for="(value, key) in imageSizeOptions" 
                :key="key" :label="value.label" :value="value.value" />
    </el-select>
  </el-form-item>

  <!-- 批量生成数量 -->
  <el-form-item label="生成数量">
    <el-slider v-model="formData.batch_size" :min="1" :max="4" :step="1" 
              :marks="{1: '1', 2: '2', 3: '3', 4: '4'}" show-stops />
  </el-form-item>

  <!-- 其他参数控件... -->

  <!-- 生成按钮 -->
  <el-form-item>
    <el-button type="primary" class="generate-button" 
              @click="generateImage" :loading="loading" 
              :disabled="!formData.prompt || loading">
      {{ loading ? '生成中...' : '生成图片' }}
    </el-button>
  </el-form-item>
</el-form>
```

### 数据模型与响应式变量

设置图像生成所需的数据模型：

```javascript
// 图片尺寸选项
const imageSizeOptions = {
  Square: { value: ImageSize.Square, label: "方形 (1024x1024)" },
  Portrait: { value: ImageSize.Portrait, label: "竖向 (960x1280)" },
  Small: { value: ImageSize.Small, label: "小尺寸 (768x1024)" },
  Tall: { value: ImageSize.Tall, label: "高竖版 (720x1440)" },
  Medium: { value: ImageSize.Medium, label: "中等 (720x1280)" },
};

// 表单数据
const formData = reactive({
  prompt: "",
  negative_prompt: "",
  image_size: ImageSize.Square,
  batch_size: 1,
  num_inference_steps: 20,
  guidance_scale: 7.5,
  seed: undefined as number | undefined,
  image: undefined as string | undefined,
});

// 状态变量
const loading = ref(false);
const generatedImages = ref<{ url: string }[]>([]);
const lastSeed = ref<number | null>(null);
const generationTime = ref<number | null>(null);
```

### 加载状态与进度显示

添加加载状态和进度显示功能：

```vue
<div v-if="loading" class="loading-state">
  <el-icon class="loading-icon"><Loading /></el-icon>
  
  <!-- 进度条显示 -->
  <div class="progress-container">
    <div class="progress-bar" :style="{ width: `${progress}%` }"></div>
  </div>
  
  <p>AI 正在绘制你的图片，预计还需 {{ estimatedTime }}秒</p>
</div>
```

```javascript
// 进度变量
const progress = ref(0);
const estimatedTime = ref(20);
let progressTimer: number | null = null;

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
```

### 图像生成核心函数

图像生成的核心函数实现：

```javascript
// 生成图片
const generateImage = async () => {
  if (!formData.prompt) {
    ElMessage.warning("请输入提示词");
    return;
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

    ElMessage.success("图片生成成功");
  } catch (error: any) {
    ElMessage.error(`图片生成失败: ${error.message || "未知错误"}`);
    console.error("图片生成失败:", error);
  } finally {
    // 清除进度定时器
    if (progressTimer !== null) {
      clearInterval(progressTimer);
      progressTimer = null;
    }
    
    // 完成进度条
    progress.value = 100;
    setTimeout(() => {
      loading.value = false;
    }, 500);
  }
};
```

### API服务层实现

创建一个服务层来处理与API的通信：

```typescript
// imageService.ts
import axios from "axios";

// 图片尺寸枚举
export enum ImageSize {
  Square = "1024x1024",
  Portrait = "960x1280",
  Small = "768x1024",
  Tall = "720x1440",
  Medium = "720x1280",
}

// 图像生成请求参数接口
export interface ImageGenerationRequest {
  prompt: string;
  negative_prompt?: string;
  image_size: ImageSize;
  batch_size: number;
  num_inference_steps: number;
  guidance_scale: number;
  seed?: number;
  image?: string;
}

// 图像生成响应接口
export interface ImageGenerationResponse {
  images: { url: string }[];
  seed: number;
}

export const imageService = {
  // 生成图片
  async generateImage(
    params: ImageGenerationRequest
  ): Promise<ImageGenerationResponse> {
    try {
      const response = await axios.post("/api/image/generate", params);
      return response.data;
    } catch (error) {
      console.error("图像生成API调用失败:", error);
      throw error;
    }
  },

  // 将File对象转换为Base64字符串
  async fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  },
};
```

### 结果展示与交互

处理生成结果的展示和交互：

```vue
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
      <div class="image-wrapper">
        <img :src="image.url" alt="生成的图片" loading="lazy" @click="showPreview(image.url)" />
        <div class="image-overlay">
          <div class="image-actions">
            <el-button-group>
              <el-button size="small" type="primary" @click="handleImageAction('preview', image.url, index)">
                <el-icon><ZoomIn /></el-icon>
              </el-button>
              <el-button size="small" type="primary" @click="handleImageAction('download', image.url, index)">
                <el-icon><Download /></el-icon>
              </el-button>
              <el-button size="small" type="primary" @click="handleImageAction('use-seed', image.url, index)">
                <el-icon><CopyDocument /></el-icon>
              </el-button>
              <el-button size="small" type="primary" @click="handleImageAction('regenerate', image.url, index)">
                <el-icon><Edit /></el-icon>
              </el-button>
            </el-button-group>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
```

### 图像交互功能实现

实现图像交互功能，如下载、种子复制等：

```javascript
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

// 使用相同参数和种子重新生成
const regenerateWithSeed = async (seed: number | null): Promise<void> => {
  if (seed === null) return;
  formData.seed = seed;
  await generateImage();
};
```

### 后端API接口设计

假设使用Node.js和Express实现的后端API接口：

```javascript
// server.js (Node.js + Express)
const express = require('express');
const axios = require('axios');
const app = express();
app.use(express.json({ limit: '10mb' }));

// AI图像生成API接口
app.post('/api/image/generate', async (req, res) => {
  try {
    const {
      prompt,
      negative_prompt,
      image_size,
      batch_size,
      num_inference_steps,
      guidance_scale,
      seed,
      image
    } = req.body;

    // 调用外部AI图像服务API
    const response = await axios.post('https://api.example.com/v1/images/generations', {
      prompt,
      negative_prompt,
      size: image_size,
      n: batch_size,
      steps: num_inference_steps,
      guidance_scale,
      seed: seed || Math.floor(Math.random() * 1000000000),
      image: image || undefined
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.AI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });

    // 处理响应数据
    const result = {
      images: response.data.data.map(item => ({ url: item.url })),
      seed: response.data.seed || seed
    };

    res.json(result);
  } catch (error) {
    console.error('图像生成失败:', error);
    res.status(500).json({ 
      error: '图像生成失败', 
      message: error.message 
    });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`服务器运行在端口 ${PORT}`);
});
```

### 样式与UI美化

实现美观的用户界面样式：

```css
.image-gen-view {
  padding: 20px;
  background: #f5f7fa;
  min-height: calc(100vh - 60px);
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

.content-container {
  display: flex;
  gap: 24px;
}

/* 左侧表单样式 */
.form-container {
  flex: 1;
  min-width: 30%;
  max-width: 500px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

/* 右侧结果区域样式 */
.results-container {
  flex: 2;
  min-height: 500px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.1);
}

/* 进度条样式 */
.progress-container {
  width: 100%;
  height: 8px;
  background: #f0f0f0;
  border-radius: 4px;
  margin: 16px 0;
  overflow: hidden;
}

.progress-bar {
  height: 100%;
  background: linear-gradient(to right, #4e54c8, #8f94fb);
  transition: width 0.3s ease;
}

/* 响应式设计 */
@media (max-width: 992px) {
  .content-container {
    flex-direction: column;
  }

  .form-container {
    max-width: 100%;
  }
}
```

### 项目部署与环境配置

项目部署和环境配置指南：

```
# .env 文件示例
VUE_APP_API_URL=https://your-backend-api.com
VUE_APP_API_KEY=your_api_key_here
```

部署脚本示例：

```bash
# 前端构建
npm run build

# 使用Docker部署
docker build -t ai-image-generator .
docker run -p 80:80 -e API_KEY=your_api_key ai-image-generator
```

### 扩展和优化建议

1. **缓存机制**：实现图像缓存以提高性能
2. **分批处理**：添加分批处理大量图像生成请求
3. **历史记录**：保存用户生成历史
4. **图像编辑**：增加图像编辑功能
5. **提示词提示**：添加智能提示词建议
6. **风格迁移**：基于多个参考图像的风格迁移
7. **用户画廊**：社区共享生成结果功能
8. **批处理优化**：优化多图像并行生成
9. **响应式优化**：进一步优化移动设备体验
10. **性能监控**：添加性能和用量监控

以上代码示例展示了如何构建完整的AI图像生成应用，包括前端界面、后端API和部署配置。您可以根据自己的需求进一步扩展和优化这些代码。
