import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { imageService } from '../services/imageService';
import { errorMessageMap } from '../config/imageConfig';
import { useFakeProgress } from './useFakeProgress';
export function useImageGeneration() {
    const loading = ref(false);
    const generatedImages = ref([]);
    const lastSeed = ref(null);
    const generationTime = ref(null);
    const { progress, estimatedTime, startProgressTimer, clearProgressTimer, finishProgress, resetProgress } = useFakeProgress(20);
    const generateImage = async (formData) => {
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
        resetProgress();
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
            generationTime.value = parseFloat(((endTime - startTime) / 1000).toFixed(1));
            // 更新生成的图片和种子
            generatedImages.value = result.images;
            lastSeed.value = result.seed;
            finishProgress();
            ElMessage.success("图片生成成功");
        }
        catch (error) {
            resetProgress();
            let errorMessage = error.message || "未知错误";
            let errorCode = "";
            try {
                if (typeof errorMessage === 'string' && errorMessage.includes('{')) {
                    const errorObj = JSON.parse(errorMessage.substring(errorMessage.indexOf('{')));
                    errorCode = errorObj.code?.toString() || "";
                    errorMessage = errorObj.message || errorMessage;
                }
            }
            catch (e) {
                console.error("Error parsing error message:", e);
            }
            if (errorCode && errorMessageMap[errorCode]) {
                ElMessage.error(errorMessageMap[errorCode]);
            }
            else {
                const knownError = Object.keys(errorMessageMap).find(key => errorMessage.toLowerCase().includes(key.toLowerCase()));
                if (knownError) {
                    ElMessage.error(errorMessageMap[knownError]);
                }
                else {
                    ElMessage.error(`图片生成失败: ${errorMessage}`);
                }
            }
            console.error("图片生成失败:", error);
        }
        finally {
            clearProgressTimer();
            setTimeout(() => {
                loading.value = false;
            }, 500);
        }
    };
    return {
        loading,
        progress,
        estimatedTime,
        generatedImages,
        lastSeed,
        generationTime,
        generateImage
    };
}
//# sourceMappingURL=useImageGeneration.js.map