import { ref } from 'vue';
import { ElMessage } from 'element-plus';
import { Plus, Delete } from '@element-plus/icons-vue';
import { imageService } from '../services/imageService';
import { promptTemplates, parameterPresets } from '../config/imageConfig';
import ImageSizeSelector from './ImageSizeSelector.vue';
const props = defineProps();
const emit = defineEmits();
const imageUrl = ref("");
// 随机化种子
const randomizeSeed = () => {
    props.formData.seed = Math.floor(Math.random() * 1000000000);
};
// 自定义上传处理
const handleCustomUpload = async (options) => {
    const { file } = options;
    try {
        const base64 = await imageService.fileToBase64(file);
        props.formData.image = base64;
        imageUrl.value = base64;
        ElMessage.success('参考图片上传成功');
    }
    catch (error) {
        ElMessage.error("图片处理失败");
        console.error("图片处理错误:", error);
    }
};
// 图片上传前预处理
const beforeImageUpload = (file) => {
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
// 移除上传的图片
const removeImage = () => {
    imageUrl.value = "";
    props.formData.image = undefined;
};
// 应用提示词模板
const applyTemplate = (template) => {
    props.formData.prompt = template.prompt;
    props.formData.negative_prompt = template.negative_prompt;
    if (template.parameters) {
        props.formData.guidance_scale = template.parameters.guidance_scale;
        props.formData.num_inference_steps = template.parameters.num_inference_steps;
    }
    ElMessage.success("已应用模板");
};
// 应用参数预设
const applyPreset = (preset) => {
    props.formData.num_inference_steps = preset.value.num_inference_steps;
    props.formData.guidance_scale = preset.value.guidance_scale;
    ElMessage.success("已应用参数预设");
};
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['preset-buttons', 'el-button', 'generate-button',];
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex-1 min-w-[30%] max-w-lg bg-white rounded-xl p-6 shadow-[0_2px_12px_rgba(0,0,0,0.1)]") },
    });
    const __VLS_0 = {}.ElForm;
    /** @type { [typeof __VLS_components.ElForm, typeof __VLS_components.elForm, typeof __VLS_components.ElForm, typeof __VLS_components.elForm, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        model: ((__VLS_ctx.formData)),
        labelPosition: ("top"),
        ...{ class: ("grid grid-cols-1 gap-4") },
    }));
    const __VLS_2 = __VLS_1({
        model: ((__VLS_ctx.formData)),
        labelPosition: ("top"),
        ...{ class: ("grid grid-cols-1 gap-4") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("mb-5 p-4 bg-gray-50 rounded-lg") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: ("text-sm text-gray-600 mb-3 font-medium") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("grid grid-cols-2 min-[400px]:grid-cols-3 gap-2 w-full") },
    });
    for (const [template] of __VLS_getVForSourceType((__VLS_ctx.promptTemplates))) {
        const __VLS_6 = {}.ElButton;
        /** @type { [typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ] } */ ;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
            ...{ 'onClick': {} },
            key: ((template.label)),
            size: ("small"),
        }));
        const __VLS_8 = __VLS_7({
            ...{ 'onClick': {} },
            key: ((template.label)),
            size: ("small"),
        }, ...__VLS_functionalComponentArgsRest(__VLS_7));
        let __VLS_12;
        const __VLS_13 = {
            onClick: (...[$event]) => {
                __VLS_ctx.applyTemplate(template);
            }
        };
        let __VLS_9;
        let __VLS_10;
        (template.label);
        __VLS_11.slots.default;
        var __VLS_11;
    }
    const __VLS_14 = {}.ElFormItem;
    /** @type { [typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ] } */ ;
    // @ts-ignore
    const __VLS_15 = __VLS_asFunctionalComponent(__VLS_14, new __VLS_14({
        label: ("提示词 (Prompt)"),
    }));
    const __VLS_16 = __VLS_15({
        label: ("提示词 (Prompt)"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_15));
    const __VLS_20 = {}.ElInput;
    /** @type { [typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ] } */ ;
    // @ts-ignore
    const __VLS_21 = __VLS_asFunctionalComponent(__VLS_20, new __VLS_20({
        modelValue: ((__VLS_ctx.formData.prompt)),
        type: ("textarea"),
        rows: ((4)),
        placeholder: ("描述你想要生成的图片内容..."),
    }));
    const __VLS_22 = __VLS_21({
        modelValue: ((__VLS_ctx.formData.prompt)),
        type: ("textarea"),
        rows: ((4)),
        placeholder: ("描述你想要生成的图片内容..."),
    }, ...__VLS_functionalComponentArgsRest(__VLS_21));
    __VLS_19.slots.default;
    var __VLS_19;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("mb-5 p-4 bg-gray-50 rounded-lg") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
        ...{ class: ("text-sm text-gray-600 mb-3 font-medium") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-wrap gap-2 preset-buttons") },
    });
    for (const [preset] of __VLS_getVForSourceType((__VLS_ctx.parameterPresets))) {
        const __VLS_26 = {}.ElButton;
        /** @type { [typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ] } */ ;
        // @ts-ignore
        const __VLS_27 = __VLS_asFunctionalComponent(__VLS_26, new __VLS_26({
            ...{ 'onClick': {} },
            key: ((preset.label)),
            size: ("small"),
        }));
        const __VLS_28 = __VLS_27({
            ...{ 'onClick': {} },
            key: ((preset.label)),
            size: ("small"),
        }, ...__VLS_functionalComponentArgsRest(__VLS_27));
        let __VLS_32;
        const __VLS_33 = {
            onClick: (...[$event]) => {
                __VLS_ctx.applyPreset(preset);
            }
        };
        let __VLS_29;
        let __VLS_30;
        (preset.label);
        __VLS_31.slots.default;
        var __VLS_31;
    }
    const __VLS_34 = {}.ElFormItem;
    /** @type { [typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ] } */ ;
    // @ts-ignore
    const __VLS_35 = __VLS_asFunctionalComponent(__VLS_34, new __VLS_34({
        label: ("负面提示词 (Negative Prompt)"),
    }));
    const __VLS_36 = __VLS_35({
        label: ("负面提示词 (Negative Prompt)"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_35));
    const __VLS_40 = {}.ElInput;
    /** @type { [typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ] } */ ;
    // @ts-ignore
    const __VLS_41 = __VLS_asFunctionalComponent(__VLS_40, new __VLS_40({
        modelValue: ((__VLS_ctx.formData.negative_prompt)),
        type: ("textarea"),
        rows: ((2)),
        placeholder: ("描述你不希望出现在图片中的内容..."),
    }));
    const __VLS_42 = __VLS_41({
        modelValue: ((__VLS_ctx.formData.negative_prompt)),
        type: ("textarea"),
        rows: ((2)),
        placeholder: ("描述你不希望出现在图片中的内容..."),
    }, ...__VLS_functionalComponentArgsRest(__VLS_41));
    __VLS_39.slots.default;
    var __VLS_39;
    const __VLS_46 = {}.ElFormItem;
    /** @type { [typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ] } */ ;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
        label: ("图片尺寸"),
    }));
    const __VLS_48 = __VLS_47({
        label: ("图片尺寸"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_47));
    // @ts-ignore
    /** @type { [typeof ImageSizeSelector, ] } */ ;
    // @ts-ignore
    const __VLS_52 = __VLS_asFunctionalComponent(ImageSizeSelector, new ImageSizeSelector({
        modelValue: ((__VLS_ctx.formData.image_size)),
    }));
    const __VLS_53 = __VLS_52({
        modelValue: ((__VLS_ctx.formData.image_size)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_52));
    __VLS_51.slots.default;
    var __VLS_51;
    const __VLS_57 = {}.ElFormItem;
    /** @type { [typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ] } */ ;
    // @ts-ignore
    const __VLS_58 = __VLS_asFunctionalComponent(__VLS_57, new __VLS_57({
        label: ("生成数量"),
    }));
    const __VLS_59 = __VLS_58({
        label: ("生成数量"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_58));
    const __VLS_63 = {}.ElSlider;
    /** @type { [typeof __VLS_components.ElSlider, typeof __VLS_components.elSlider, ] } */ ;
    // @ts-ignore
    const __VLS_64 = __VLS_asFunctionalComponent(__VLS_63, new __VLS_63({
        modelValue: ((__VLS_ctx.formData.batch_size)),
        min: ((1)),
        max: ((4)),
        step: ((1)),
        marks: (({ 1: '1', 2: '2', 3: '3', 4: '4' })),
        showStops: (true),
    }));
    const __VLS_65 = __VLS_64({
        modelValue: ((__VLS_ctx.formData.batch_size)),
        min: ((1)),
        max: ((4)),
        step: ((1)),
        marks: (({ 1: '1', 2: '2', 3: '3', 4: '4' })),
        showStops: (true),
    }, ...__VLS_functionalComponentArgsRest(__VLS_64));
    __VLS_62.slots.default;
    var __VLS_62;
    const __VLS_69 = {}.ElFormItem;
    /** @type { [typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ] } */ ;
    // @ts-ignore
    const __VLS_70 = __VLS_asFunctionalComponent(__VLS_69, new __VLS_69({
        label: ("创造性 (引导系数)"),
    }));
    const __VLS_71 = __VLS_70({
        label: ("创造性 (引导系数)"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_70));
    const __VLS_75 = {}.ElTooltip;
    /** @type { [typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ] } */ ;
    // @ts-ignore
    const __VLS_76 = __VLS_asFunctionalComponent(__VLS_75, new __VLS_75({
        content: ("较低的值会产生更有创意但不太准确的结果，较高的值会使生成更忠于提示词但创意性较低"),
        placement: ("top"),
    }));
    const __VLS_77 = __VLS_76({
        content: ("较低的值会产生更有创意但不太准确的结果，较高的值会使生成更忠于提示词但创意性较低"),
        placement: ("top"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_76));
    const __VLS_81 = {}.ElSlider;
    /** @type { [typeof __VLS_components.ElSlider, typeof __VLS_components.elSlider, ] } */ ;
    // @ts-ignore
    const __VLS_82 = __VLS_asFunctionalComponent(__VLS_81, new __VLS_81({
        modelValue: ((__VLS_ctx.formData.guidance_scale)),
        min: ((1)),
        max: ((20)),
        step: ((0.5)),
        marks: (({ 1: '高创造性', 10: '平衡', 20: '高精确性' })),
    }));
    const __VLS_83 = __VLS_82({
        modelValue: ((__VLS_ctx.formData.guidance_scale)),
        min: ((1)),
        max: ((20)),
        step: ((0.5)),
        marks: (({ 1: '高创造性', 10: '平衡', 20: '高精确性' })),
    }, ...__VLS_functionalComponentArgsRest(__VLS_82));
    __VLS_80.slots.default;
    var __VLS_80;
    __VLS_74.slots.default;
    var __VLS_74;
    const __VLS_87 = {}.ElFormItem;
    /** @type { [typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ] } */ ;
    // @ts-ignore
    const __VLS_88 = __VLS_asFunctionalComponent(__VLS_87, new __VLS_87({
        label: ("细节程度 (推理步骤)"),
    }));
    const __VLS_89 = __VLS_88({
        label: ("细节程度 (推理步骤)"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_88));
    const __VLS_93 = {}.ElTooltip;
    /** @type { [typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ] } */ ;
    // @ts-ignore
    const __VLS_94 = __VLS_asFunctionalComponent(__VLS_93, new __VLS_93({
        content: ("更高的值会产生更细致的图像，但需要更长时间生成。最大值为50。"),
        placement: ("top"),
    }));
    const __VLS_95 = __VLS_94({
        content: ("更高的值会产生更细致的图像，但需要更长时间生成。最大值为50。"),
        placement: ("top"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_94));
    const __VLS_99 = {}.ElSlider;
    /** @type { [typeof __VLS_components.ElSlider, typeof __VLS_components.elSlider, ] } */ ;
    // @ts-ignore
    const __VLS_100 = __VLS_asFunctionalComponent(__VLS_99, new __VLS_99({
        modelValue: ((__VLS_ctx.formData.num_inference_steps)),
        min: ((1)),
        max: ((50)),
        step: ((1)),
        marks: (({ 1: '低', 20: '中', 50: '高' })),
    }));
    const __VLS_101 = __VLS_100({
        modelValue: ((__VLS_ctx.formData.num_inference_steps)),
        min: ((1)),
        max: ((50)),
        step: ((1)),
        marks: (({ 1: '低', 20: '中', 50: '高' })),
    }, ...__VLS_functionalComponentArgsRest(__VLS_100));
    __VLS_98.slots.default;
    var __VLS_98;
    __VLS_92.slots.default;
    var __VLS_92;
    const __VLS_105 = {}.ElFormItem;
    /** @type { [typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ] } */ ;
    // @ts-ignore
    const __VLS_106 = __VLS_asFunctionalComponent(__VLS_105, new __VLS_105({
        label: ("随机种子 (可选)"),
    }));
    const __VLS_107 = __VLS_106({
        label: ("随机种子 (可选)"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_106));
    const __VLS_111 = {}.ElTooltip;
    /** @type { [typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ] } */ ;
    // @ts-ignore
    const __VLS_112 = __VLS_asFunctionalComponent(__VLS_111, new __VLS_111({
        content: ("使用相同种子可以在其他参数相同时获得相似结果"),
        placement: ("top"),
    }));
    const __VLS_113 = __VLS_112({
        content: ("使用相同种子可以在其他参数相同时获得相似结果"),
        placement: ("top"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_112));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex gap-2") },
    });
    const __VLS_117 = {}.ElInput;
    /** @type { [typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ] } */ ;
    // @ts-ignore
    const __VLS_118 = __VLS_asFunctionalComponent(__VLS_117, new __VLS_117({
        modelValue: ((__VLS_ctx.formData.seed)),
        modelModifiers: { number: true, },
        type: ("number"),
        placeholder: ("输入种子或留空随机生成"),
    }));
    const __VLS_119 = __VLS_118({
        modelValue: ((__VLS_ctx.formData.seed)),
        modelModifiers: { number: true, },
        type: ("number"),
        placeholder: ("输入种子或留空随机生成"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_118));
    const __VLS_123 = {}.ElButton;
    /** @type { [typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ] } */ ;
    // @ts-ignore
    const __VLS_124 = __VLS_asFunctionalComponent(__VLS_123, new __VLS_123({
        ...{ 'onClick': {} },
    }));
    const __VLS_125 = __VLS_124({
        ...{ 'onClick': {} },
    }, ...__VLS_functionalComponentArgsRest(__VLS_124));
    let __VLS_129;
    const __VLS_130 = {
        onClick: (__VLS_ctx.randomizeSeed)
    };
    let __VLS_126;
    let __VLS_127;
    __VLS_128.slots.default;
    var __VLS_128;
    __VLS_116.slots.default;
    var __VLS_116;
    __VLS_110.slots.default;
    var __VLS_110;
    const __VLS_131 = {}.ElFormItem;
    /** @type { [typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ] } */ ;
    // @ts-ignore
    const __VLS_132 = __VLS_asFunctionalComponent(__VLS_131, new __VLS_131({
        label: ("参考图片 (可选)"),
    }));
    const __VLS_133 = __VLS_132({
        label: ("参考图片 (可选)"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_132));
    const __VLS_137 = {}.ElUpload;
    /** @type { [typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, ] } */ ;
    // @ts-ignore
    const __VLS_138 = __VLS_asFunctionalComponent(__VLS_137, new __VLS_137({
        ...{ class: ("w-full h-[148px] border border-dashed border-gray-300 rounded-md cursor-pointer relative overflow-hidden transition-colors flex justify-center items-center hover:border-blue-400") },
        showFileList: ((false)),
        beforeUpload: ((__VLS_ctx.beforeImageUpload)),
        autoUpload: ((true)),
        httpRequest: ((__VLS_ctx.handleCustomUpload)),
        action: ("#"),
    }));
    const __VLS_139 = __VLS_138({
        ...{ class: ("w-full h-[148px] border border-dashed border-gray-300 rounded-md cursor-pointer relative overflow-hidden transition-colors flex justify-center items-center hover:border-blue-400") },
        showFileList: ((false)),
        beforeUpload: ((__VLS_ctx.beforeImageUpload)),
        autoUpload: ((true)),
        httpRequest: ((__VLS_ctx.handleCustomUpload)),
        action: ("#"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_138));
    if (__VLS_ctx.imageUrl) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("relative w-full h-full flex justify-center items-center") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
            src: ((__VLS_ctx.imageUrl)),
            ...{ class: ("max-w-full max-h-[146px] object-contain") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ onClick: (__VLS_ctx.removeImage) },
            ...{ class: ("absolute top-[5px] right-[5px] bg-black/60 text-white w-6 h-6 rounded-full flex justify-center items-center cursor-pointer transition-all hover:bg-black/80 hover:scale-110") },
        });
        const __VLS_143 = {}.ElIcon;
        /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
        // @ts-ignore
        const __VLS_144 = __VLS_asFunctionalComponent(__VLS_143, new __VLS_143({}));
        const __VLS_145 = __VLS_144({}, ...__VLS_functionalComponentArgsRest(__VLS_144));
        const __VLS_149 = {}.Delete;
        /** @type { [typeof __VLS_components.Delete, ] } */ ;
        // @ts-ignore
        const __VLS_150 = __VLS_asFunctionalComponent(__VLS_149, new __VLS_149({}));
        const __VLS_151 = __VLS_150({}, ...__VLS_functionalComponentArgsRest(__VLS_150));
        __VLS_148.slots.default;
        var __VLS_148;
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex flex-col justify-center items-center h-full text-gray-400") },
        });
        const __VLS_155 = {}.ElIcon;
        /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
        // @ts-ignore
        const __VLS_156 = __VLS_asFunctionalComponent(__VLS_155, new __VLS_155({
            ...{ class: ("text-[28px] text-gray-400") },
        }));
        const __VLS_157 = __VLS_156({
            ...{ class: ("text-[28px] text-gray-400") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_156));
        const __VLS_161 = {}.Plus;
        /** @type { [typeof __VLS_components.Plus, ] } */ ;
        // @ts-ignore
        const __VLS_162 = __VLS_asFunctionalComponent(__VLS_161, new __VLS_161({}));
        const __VLS_163 = __VLS_162({}, ...__VLS_functionalComponentArgsRest(__VLS_162));
        __VLS_160.slots.default;
        var __VLS_160;
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("text-sm mt-2") },
        });
    }
    __VLS_142.slots.default;
    var __VLS_142;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("text-xs text-gray-600 mt-2") },
    });
    __VLS_136.slots.default;
    var __VLS_136;
    const __VLS_167 = {}.ElFormItem;
    /** @type { [typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, typeof __VLS_components.ElFormItem, typeof __VLS_components.elFormItem, ] } */ ;
    // @ts-ignore
    const __VLS_168 = __VLS_asFunctionalComponent(__VLS_167, new __VLS_167({}));
    const __VLS_169 = __VLS_168({}, ...__VLS_functionalComponentArgsRest(__VLS_168));
    const __VLS_173 = {}.ElButton;
    /** @type { [typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ] } */ ;
    // @ts-ignore
    const __VLS_174 = __VLS_asFunctionalComponent(__VLS_173, new __VLS_173({
        ...{ 'onClick': {} },
        type: ("primary"),
        ...{ class: ("generate-button w-full h-11 text-base mt-4 border-none") },
        loading: ((__VLS_ctx.loading)),
        disabled: ((!__VLS_ctx.formData.prompt || __VLS_ctx.loading)),
    }));
    const __VLS_175 = __VLS_174({
        ...{ 'onClick': {} },
        type: ("primary"),
        ...{ class: ("generate-button w-full h-11 text-base mt-4 border-none") },
        loading: ((__VLS_ctx.loading)),
        disabled: ((!__VLS_ctx.formData.prompt || __VLS_ctx.loading)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_174));
    let __VLS_179;
    const __VLS_180 = {
        onClick: (...[$event]) => {
            __VLS_ctx.$emit('generate');
        }
    };
    let __VLS_176;
    let __VLS_177;
    (__VLS_ctx.loading ? '生成中...' : '生成图片');
    __VLS_178.slots.default;
    var __VLS_178;
    __VLS_172.slots.default;
    var __VLS_172;
    __VLS_5.slots.default;
    var __VLS_5;
    ['flex-1', 'min-w-[30%]', 'max-w-lg', 'bg-white', 'rounded-xl', 'p-6', 'shadow-[0_2px_12px_rgba(0,0,0,0.1)]', 'grid', 'grid-cols-1', 'gap-4', 'mb-5', 'p-4', 'bg-gray-50', 'rounded-lg', 'text-sm', 'text-gray-600', 'mb-3', 'font-medium', 'grid', 'grid-cols-2', 'min-[400px]:grid-cols-3', 'gap-2', 'w-full', 'mb-5', 'p-4', 'bg-gray-50', 'rounded-lg', 'text-sm', 'text-gray-600', 'mb-3', 'font-medium', 'flex', 'flex-wrap', 'gap-2', 'preset-buttons', 'flex', 'gap-2', 'w-full', 'h-[148px]', 'border', 'border-dashed', 'border-gray-300', 'rounded-md', 'cursor-pointer', 'relative', 'overflow-hidden', 'transition-colors', 'flex', 'justify-center', 'items-center', 'hover:border-blue-400', 'relative', 'w-full', 'h-full', 'flex', 'justify-center', 'items-center', 'max-w-full', 'max-h-[146px]', 'object-contain', 'absolute', 'top-[5px]', 'right-[5px]', 'bg-black/60', 'text-white', 'w-6', 'h-6', 'rounded-full', 'flex', 'justify-center', 'items-center', 'cursor-pointer', 'transition-all', 'hover:bg-black/80', 'hover:scale-110', 'flex', 'flex-col', 'justify-center', 'items-center', 'h-full', 'text-gray-400', 'text-[28px]', 'text-gray-400', 'text-sm', 'mt-2', 'text-xs', 'text-gray-600', 'mt-2', 'generate-button', 'w-full', 'h-11', 'text-base', 'mt-4', 'border-none',];
    var __VLS_slots;
    var $slots;
    let __VLS_inheritedAttrs;
    var $attrs;
    const __VLS_refs = {};
    var $refs;
    var $el;
    return {
        attrs: {},
        slots: __VLS_slots,
        refs: $refs,
        rootEl: $el,
    };
}
;
const __VLS_self = (await import('vue')).defineComponent({
    setup() {
        return {
            Plus: Plus,
            Delete: Delete,
            promptTemplates: promptTemplates,
            parameterPresets: parameterPresets,
            ImageSizeSelector: ImageSizeSelector,
            imageUrl: imageUrl,
            randomizeSeed: randomizeSeed,
            handleCustomUpload: handleCustomUpload,
            beforeImageUpload: beforeImageUpload,
            removeImage: removeImage,
            applyTemplate: applyTemplate,
            applyPreset: applyPreset,
        };
    },
    __typeEmits: {},
    __typeProps: {},
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEmits: {},
    __typeProps: {},
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=ImagePromptForm.vue.js.map