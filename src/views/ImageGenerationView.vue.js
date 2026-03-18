import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
// 引入图标
import { MagicStick, Operation, Picture, Refresh, Loading, } from "@element-plus/icons-vue";
import { promptTemplates } from "../config/imageConfig";
import { imageService, ImageSize } from "../services/imageService";
import { useImageGeneration } from "../composables/useImageGeneration";
import ImageResultGallery from "../components/ImageResultGallery.vue";
import ImagePreviewModal from "../components/ImagePreviewModal.vue";
const formData = reactive({
    prompt: "",
    negative_prompt: "",
    image_size: ImageSize.Square,
    batch_size: 1,
    num_inference_steps: 20,
    guidance_scale: 7.5,
    seed: undefined,
    image: undefined,
});
const { loading, progress, estimatedTime, generatedImages, lastSeed, generationTime, generateImage: performGenerate, } = useImageGeneration();
// 生成图片
const generateImage = async () => {
    if (!formData.prompt.trim()) {
        ElMessage.warning("请输入提示词描述");
        return;
    }
    await performGenerate(formData);
};
// 随机化种子
const randomizeSeed = () => {
    formData.seed = Math.floor(Math.random() * 1000000000);
    ElMessage.success(`已应用随机种子: ${formData.seed}`);
};
// 自定义上传处理
const handleCustomUpload = async (options) => {
    const file = options.raw; // 获取原生文件
    if (!file || !beforeImageUpload(file))
        return;
    try {
        const base64 = await imageService.fileToBase64(file);
        formData.image = base64;
        ElMessage.success("参考图片上传成功");
    }
    catch (error) {
        ElMessage.error("图片处理失败");
        console.error("图片处理错误:", error);
    }
};
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
// 使用当前图片的种子
const useImageSeed = (seed) => {
    if (seed !== null) {
        formData.seed = parseInt(seed);
        ElMessage.success(`已设置种子: ${seed}`);
    }
};
const previewVisible = ref(false);
const previewImage = ref("");
const showPreview = (image) => {
    previewImage.value = image;
    previewVisible.value = true;
};
const downloadImage = (url, index) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `deepseek-art-${lastSeed.value || Date.now()}-${index}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
};
const applyTemplate = (template) => {
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
// 像素级对齐的滚动
const scrollToPrompt = () => {
    const promptElement = document.querySelector(".pro-textarea textarea");
    if (promptElement) {
        promptElement.scrollIntoView({ behavior: "smooth", block: "center" });
        promptElement.focus();
    }
};
const regenerateWithSeed = async (seed) => {
    if (seed === null)
        return;
    formData.seed = parseInt(seed);
    await generateImage();
};
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['pro-textarea', 'el-textarea__inner', 'pro-textarea', 'el-textarea__inner', 'capsule-radio-group', 'el-radio-button__inner', 'capsule-radio-group', 'el-radio-button__inner', 'param-popper', 'param-popper', 'param-popper', 'custom-scrollbar', 'custom-scrollbar', 'custom-scrollbar',];
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("relative min-h-[calc(100vh-64px)] w-full bg-slate-50/50 overflow-hidden text-slate-800 font-sans") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
        ...{ class: ("w-full pt-6 pb-32 overflow-y-auto h-[calc(100vh-64px)] custom-scrollbar") },
    });
    if (__VLS_ctx.generatedImages.length === 0 && !__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex flex-col items-center justify-center min-h-[70vh] z-0 transition-opacity px-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("w-24 h-24 mb-6 rounded-[2rem] bg-white flex items-center justify-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] border border-slate-100 opacity-80") },
        });
        const __VLS_0 = {}.ElIcon;
        /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
            ...{ class: ("text-5xl text-indigo-400") },
        }));
        const __VLS_2 = __VLS_1({
            ...{ class: ("text-5xl text-indigo-400") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        const __VLS_6 = {}.Picture;
        /** @type { [typeof __VLS_components.Picture, ] } */ ;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
        const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
        __VLS_5.slots.default;
        var __VLS_5;
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
            ...{ class: ("text-3xl font-extrabold text-slate-800 tracking-tight mb-3") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-slate-500 text-lg max-w-md text-center leading-relaxed") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex gap-3 mt-10 max-w-3xl flex-wrap justify-center") },
        });
        for (const [tpl, idx] of __VLS_getVForSourceType((__VLS_ctx.promptTemplates.slice(0, 4)))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.generatedImages.length === 0 && !__VLS_ctx.loading)))
                            return;
                        __VLS_ctx.applyTemplate(tpl);
                    } },
                key: ((idx)),
                ...{ class: ("px-5 py-2.5 rounded-full bg-white border border-slate-200 cursor-pointer hover:border-indigo-300 hover:shadow-md hover:text-indigo-600 transition-all text-sm text-slate-600 font-medium") },
            });
            (tpl.prompt.slice(0, 20));
        }
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-full px-4 md:px-8 z-10 relative max-w-7xl mx-auto") },
    });
    // @ts-ignore
    /** @type { [typeof ImageResultGallery, ] } */ ;
    // @ts-ignore
    const __VLS_12 = __VLS_asFunctionalComponent(ImageResultGallery, new ImageResultGallery({
        ...{ 'onApplyRandomTemplate': {} },
        ...{ 'onScrollToPrompt': {} },
        ...{ 'onPreview': {} },
        ...{ 'onDownload': {} },
        ...{ 'onUseSeed': {} },
        ...{ 'onRegenerate': {} },
        loading: ((__VLS_ctx.loading)),
        progress: ((__VLS_ctx.progress)),
        estimatedTime: ((__VLS_ctx.estimatedTime)),
        generatedImages: ((__VLS_ctx.generatedImages)),
        generationTime: ((__VLS_ctx.generationTime)),
        lastSeed: ((__VLS_ctx.lastSeed)),
        imageSize: ((__VLS_ctx.formData.image_size)),
    }));
    const __VLS_13 = __VLS_12({
        ...{ 'onApplyRandomTemplate': {} },
        ...{ 'onScrollToPrompt': {} },
        ...{ 'onPreview': {} },
        ...{ 'onDownload': {} },
        ...{ 'onUseSeed': {} },
        ...{ 'onRegenerate': {} },
        loading: ((__VLS_ctx.loading)),
        progress: ((__VLS_ctx.progress)),
        estimatedTime: ((__VLS_ctx.estimatedTime)),
        generatedImages: ((__VLS_ctx.generatedImages)),
        generationTime: ((__VLS_ctx.generationTime)),
        lastSeed: ((__VLS_ctx.lastSeed)),
        imageSize: ((__VLS_ctx.formData.image_size)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_12));
    let __VLS_17;
    const __VLS_18 = {
        onApplyRandomTemplate: (__VLS_ctx.applyRandomTemplate)
    };
    const __VLS_19 = {
        onScrollToPrompt: (__VLS_ctx.scrollToPrompt)
    };
    const __VLS_20 = {
        onPreview: (__VLS_ctx.showPreview)
    };
    const __VLS_21 = {
        onDownload: (__VLS_ctx.downloadImage)
    };
    const __VLS_22 = {
        onUseSeed: (...[$event]) => {
            __VLS_ctx.useImageSeed($event);
        }
    };
    const __VLS_23 = {
        onRegenerate: (__VLS_ctx.regenerateWithSeed)
    };
    let __VLS_14;
    let __VLS_15;
    var __VLS_16;
    __VLS_elementAsFunction(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)({
        ...{ class: ("absolute bottom-6 left-0 right-0 z-30 px-4 md:px-0 pointer-events-none") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("max-w-4xl mx-auto w-full flex flex-col gap-3 items-center pointer-events-auto generation-form") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: (([
                'relative flex flex-col w-full rounded-[32px] border transition-all duration-300 ease-out p-5 md:p-6',
                'bg-white/95 backdrop-blur-xl border-slate-200/60 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1),0_10px_20px_-5px_rgba(0,0,0,0.04)]',
                'focus-within:border-indigo-300 focus-within:shadow-[0_25px_65px_-15px_rgba(79,70,229,0.15)] focus-within:ring-4 focus-within:ring-indigo-500/10'
            ])) },
    });
    const __VLS_24 = {}.ElInput;
    /** @type { [typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ] } */ ;
    // @ts-ignore
    const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
        ...{ 'onKeydown': {} },
        modelValue: ((__VLS_ctx.formData.prompt)),
        type: ("textarea"),
        autosize: (({ minRows: 2, maxRows: 6 })),
        resize: ("none"),
        placeholder: ("描述你想生成的图像，例如：'一只身穿赛博朋克装甲的波斯猫在霓虹街道上...'"),
        ...{ class: ("pro-textarea mb-4") },
    }));
    const __VLS_26 = __VLS_25({
        ...{ 'onKeydown': {} },
        modelValue: ((__VLS_ctx.formData.prompt)),
        type: ("textarea"),
        autosize: (({ minRows: 2, maxRows: 6 })),
        resize: ("none"),
        placeholder: ("描述你想生成的图像，例如：'一只身穿赛博朋克装甲的波斯猫在霓虹街道上...'"),
        ...{ class: ("pro-textarea mb-4") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_25));
    let __VLS_30;
    const __VLS_31 = {
        onKeydown: (__VLS_ctx.generateImage)
    };
    let __VLS_27;
    let __VLS_28;
    var __VLS_29;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-wrap gap-4 items-center justify-between pt-4 border-t border-slate-100/80") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-wrap items-center gap-2 md:gap-3") },
    });
    const __VLS_32 = {}.ElRadioGroup;
    /** @type { [typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, typeof __VLS_components.ElRadioGroup, typeof __VLS_components.elRadioGroup, ] } */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        modelValue: ((__VLS_ctx.formData.image_size)),
        size: ("small"),
        ...{ class: ("capsule-radio-group") },
    }));
    const __VLS_34 = __VLS_33({
        modelValue: ((__VLS_ctx.formData.image_size)),
        size: ("small"),
        ...{ class: ("capsule-radio-group") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    const __VLS_38 = {}.ElRadioButton;
    /** @type { [typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, ] } */ ;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
        value: ((__VLS_ctx.ImageSize.Square)),
    }));
    const __VLS_40 = __VLS_39({
        value: ((__VLS_ctx.ImageSize.Square)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_39));
    __VLS_43.slots.default;
    var __VLS_43;
    const __VLS_44 = {}.ElRadioButton;
    /** @type { [typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, ] } */ ;
    // @ts-ignore
    const __VLS_45 = __VLS_asFunctionalComponent(__VLS_44, new __VLS_44({
        value: ((__VLS_ctx.ImageSize.Portrait)),
    }));
    const __VLS_46 = __VLS_45({
        value: ((__VLS_ctx.ImageSize.Portrait)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_45));
    __VLS_49.slots.default;
    var __VLS_49;
    const __VLS_50 = {}.ElRadioButton;
    /** @type { [typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, typeof __VLS_components.ElRadioButton, typeof __VLS_components.elRadioButton, ] } */ ;
    // @ts-ignore
    const __VLS_51 = __VLS_asFunctionalComponent(__VLS_50, new __VLS_50({
        value: ((__VLS_ctx.ImageSize.Widescreen)),
    }));
    const __VLS_52 = __VLS_51({
        value: ((__VLS_ctx.ImageSize.Widescreen)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_51));
    __VLS_55.slots.default;
    var __VLS_55;
    __VLS_37.slots.default;
    var __VLS_37;
    const __VLS_56 = {}.ElUpload;
    /** @type { [typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, typeof __VLS_components.ElUpload, typeof __VLS_components.elUpload, ] } */ ;
    // @ts-ignore
    const __VLS_57 = __VLS_asFunctionalComponent(__VLS_56, new __VLS_56({
        action: ("#"),
        autoUpload: ((false)),
        showFileList: ((false)),
        onChange: ((__VLS_ctx.handleCustomUpload)),
        beforeUpload: ((__VLS_ctx.beforeImageUpload)),
    }));
    const __VLS_58 = __VLS_57({
        action: ("#"),
        autoUpload: ((false)),
        showFileList: ((false)),
        onChange: ((__VLS_ctx.handleCustomUpload)),
        beforeUpload: ((__VLS_ctx.beforeImageUpload)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_57));
    const __VLS_62 = {}.ElTooltip;
    /** @type { [typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ] } */ ;
    // @ts-ignore
    const __VLS_63 = __VLS_asFunctionalComponent(__VLS_62, new __VLS_62({
        content: ("上传参考图"),
        placement: ("top"),
    }));
    const __VLS_64 = __VLS_63({
        content: ("上传参考图"),
        placement: ("top"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_63));
    const __VLS_68 = {}.ElButton;
    /** @type { [typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ] } */ ;
    // @ts-ignore
    const __VLS_69 = __VLS_asFunctionalComponent(__VLS_68, new __VLS_68({
        circle: (true),
        size: ("default"),
        ...{ class: ((['!bg-slate-50 !border-slate-200 hover:!border-indigo-400 hover:!text-indigo-500 hover:!bg-white', __VLS_ctx.formData.image ? '!border-indigo-500 !text-indigo-600 !bg-indigo-50' : ''])) },
    }));
    const __VLS_70 = __VLS_69({
        circle: (true),
        size: ("default"),
        ...{ class: ((['!bg-slate-50 !border-slate-200 hover:!border-indigo-400 hover:!text-indigo-500 hover:!bg-white', __VLS_ctx.formData.image ? '!border-indigo-500 !text-indigo-600 !bg-indigo-50' : ''])) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_69));
    const __VLS_74 = {}.ElIcon;
    /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
    // @ts-ignore
    const __VLS_75 = __VLS_asFunctionalComponent(__VLS_74, new __VLS_74({}));
    const __VLS_76 = __VLS_75({}, ...__VLS_functionalComponentArgsRest(__VLS_75));
    const __VLS_80 = {}.Picture;
    /** @type { [typeof __VLS_components.Picture, ] } */ ;
    // @ts-ignore
    const __VLS_81 = __VLS_asFunctionalComponent(__VLS_80, new __VLS_80({}));
    const __VLS_82 = __VLS_81({}, ...__VLS_functionalComponentArgsRest(__VLS_81));
    __VLS_79.slots.default;
    var __VLS_79;
    __VLS_73.slots.default;
    var __VLS_73;
    __VLS_67.slots.default;
    var __VLS_67;
    __VLS_61.slots.default;
    var __VLS_61;
    const __VLS_86 = {}.ElPopover;
    /** @type { [typeof __VLS_components.ElPopover, typeof __VLS_components.elPopover, typeof __VLS_components.ElPopover, typeof __VLS_components.elPopover, ] } */ ;
    // @ts-ignore
    const __VLS_87 = __VLS_asFunctionalComponent(__VLS_86, new __VLS_86({
        placement: ("top-start"),
        width: ((320)),
        trigger: ("click"),
        popperClass: ("param-popper rounded-2xl"),
    }));
    const __VLS_88 = __VLS_87({
        placement: ("top-start"),
        width: ((320)),
        trigger: ("click"),
        popperClass: ("param-popper rounded-2xl"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_87));
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        const { reference: __VLS_thisSlot } = __VLS_91.slots;
        const __VLS_92 = {}.ElTooltip;
        /** @type { [typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ] } */ ;
        // @ts-ignore
        const __VLS_93 = __VLS_asFunctionalComponent(__VLS_92, new __VLS_92({
            content: ("高级参数"),
            placement: ("top"),
        }));
        const __VLS_94 = __VLS_93({
            content: ("高级参数"),
            placement: ("top"),
        }, ...__VLS_functionalComponentArgsRest(__VLS_93));
        const __VLS_98 = {}.ElButton;
        /** @type { [typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ] } */ ;
        // @ts-ignore
        const __VLS_99 = __VLS_asFunctionalComponent(__VLS_98, new __VLS_98({
            circle: (true),
            size: ("default"),
            ...{ class: ("!bg-slate-50 !border-slate-200 hover:!border-indigo-400 hover:!text-indigo-500 hover:!bg-white") },
        }));
        const __VLS_100 = __VLS_99({
            circle: (true),
            size: ("default"),
            ...{ class: ("!bg-slate-50 !border-slate-200 hover:!border-indigo-400 hover:!text-indigo-500 hover:!bg-white") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_99));
        const __VLS_104 = {}.ElIcon;
        /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
        // @ts-ignore
        const __VLS_105 = __VLS_asFunctionalComponent(__VLS_104, new __VLS_104({}));
        const __VLS_106 = __VLS_105({}, ...__VLS_functionalComponentArgsRest(__VLS_105));
        const __VLS_110 = {}.Operation;
        /** @type { [typeof __VLS_components.Operation, ] } */ ;
        // @ts-ignore
        const __VLS_111 = __VLS_asFunctionalComponent(__VLS_110, new __VLS_110({}));
        const __VLS_112 = __VLS_111({}, ...__VLS_functionalComponentArgsRest(__VLS_111));
        __VLS_109.slots.default;
        var __VLS_109;
        __VLS_103.slots.default;
        var __VLS_103;
        __VLS_97.slots.default;
        var __VLS_97;
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("p-3 flex flex-col gap-5") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
        ...{ class: ("m-0 text-sm font-bold text-slate-800") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col gap-1.5") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("text-xs font-semibold text-slate-500") },
    });
    const __VLS_116 = {}.ElInput;
    /** @type { [typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ] } */ ;
    // @ts-ignore
    const __VLS_117 = __VLS_asFunctionalComponent(__VLS_116, new __VLS_116({
        modelValue: ((__VLS_ctx.formData.negative_prompt)),
        type: ("textarea"),
        rows: ((2)),
        resize: ("none"),
        placeholder: ("不想出现的元素..."),
        size: ("small"),
    }));
    const __VLS_118 = __VLS_117({
        modelValue: ((__VLS_ctx.formData.negative_prompt)),
        type: ("textarea"),
        rows: ((2)),
        resize: ("none"),
        placeholder: ("不想出现的元素..."),
        size: ("small"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_117));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col gap-1.5") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("text-xs font-semibold text-slate-500 flex justify-between") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("text-indigo-600") },
    });
    (__VLS_ctx.formData.num_inference_steps);
    const __VLS_122 = {}.ElSlider;
    /** @type { [typeof __VLS_components.ElSlider, typeof __VLS_components.elSlider, ] } */ ;
    // @ts-ignore
    const __VLS_123 = __VLS_asFunctionalComponent(__VLS_122, new __VLS_122({
        modelValue: ((__VLS_ctx.formData.num_inference_steps)),
        min: ((10)),
        max: ((50)),
        step: ((1)),
        size: ("small"),
    }));
    const __VLS_124 = __VLS_123({
        modelValue: ((__VLS_ctx.formData.num_inference_steps)),
        min: ((10)),
        max: ((50)),
        step: ((1)),
        size: ("small"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_123));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col gap-1.5") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.label, __VLS_intrinsicElements.label)({
        ...{ class: ("text-xs font-semibold text-slate-500") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex gap-2") },
    });
    const __VLS_128 = {}.ElInput;
    /** @type { [typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ] } */ ;
    // @ts-ignore
    const __VLS_129 = __VLS_asFunctionalComponent(__VLS_128, new __VLS_128({
        modelValue: ((__VLS_ctx.formData.seed)),
        placeholder: ("自动"),
        size: ("small"),
        ...{ class: ("flex-1") },
        type: ("number"),
    }));
    const __VLS_130 = __VLS_129({
        modelValue: ((__VLS_ctx.formData.seed)),
        placeholder: ("自动"),
        size: ("small"),
        ...{ class: ("flex-1") },
        type: ("number"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_129));
    const __VLS_134 = {}.ElButton;
    /** @type { [typeof __VLS_components.ElButton, typeof __VLS_components.elButton, typeof __VLS_components.ElButton, typeof __VLS_components.elButton, ] } */ ;
    // @ts-ignore
    const __VLS_135 = __VLS_asFunctionalComponent(__VLS_134, new __VLS_134({
        ...{ 'onClick': {} },
        size: ("small"),
        circle: (true),
    }));
    const __VLS_136 = __VLS_135({
        ...{ 'onClick': {} },
        size: ("small"),
        circle: (true),
    }, ...__VLS_functionalComponentArgsRest(__VLS_135));
    let __VLS_140;
    const __VLS_141 = {
        onClick: (__VLS_ctx.randomizeSeed)
    };
    let __VLS_137;
    let __VLS_138;
    const __VLS_142 = {}.ElIcon;
    /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
    // @ts-ignore
    const __VLS_143 = __VLS_asFunctionalComponent(__VLS_142, new __VLS_142({}));
    const __VLS_144 = __VLS_143({}, ...__VLS_functionalComponentArgsRest(__VLS_143));
    const __VLS_148 = {}.Refresh;
    /** @type { [typeof __VLS_components.Refresh, ] } */ ;
    // @ts-ignore
    const __VLS_149 = __VLS_asFunctionalComponent(__VLS_148, new __VLS_148({}));
    const __VLS_150 = __VLS_149({}, ...__VLS_functionalComponentArgsRest(__VLS_149));
    __VLS_147.slots.default;
    var __VLS_147;
    __VLS_139.slots.default;
    var __VLS_139;
    var __VLS_91;
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.generateImage) },
        disabled: ((!__VLS_ctx.formData.prompt.trim() || __VLS_ctx.loading)),
        ...{ class: (([
                'flex items-center justify-center gap-2 px-8 h-11 rounded-[22px] text-base font-bold transition-all duration-300 w-full md:w-auto',
                __VLS_ctx.formData.prompt.trim() && !__VLS_ctx.loading
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-[0_8px_20px_rgba(99,102,241,0.3)] hover:shadow-[0_12px_28px_rgba(99,102,241,0.4)] hover:-translate-y-0.5 cursor-pointer'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            ])) },
    });
    if (__VLS_ctx.loading) {
        const __VLS_154 = {}.ElIcon;
        /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
        // @ts-ignore
        const __VLS_155 = __VLS_asFunctionalComponent(__VLS_154, new __VLS_154({
            ...{ class: ("animate-spin text-lg") },
        }));
        const __VLS_156 = __VLS_155({
            ...{ class: ("animate-spin text-lg") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_155));
        const __VLS_160 = {}.Loading;
        /** @type { [typeof __VLS_components.Loading, ] } */ ;
        // @ts-ignore
        const __VLS_161 = __VLS_asFunctionalComponent(__VLS_160, new __VLS_160({}));
        const __VLS_162 = __VLS_161({}, ...__VLS_functionalComponentArgsRest(__VLS_161));
        __VLS_159.slots.default;
        var __VLS_159;
    }
    else {
        const __VLS_166 = {}.ElIcon;
        /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
        // @ts-ignore
        const __VLS_167 = __VLS_asFunctionalComponent(__VLS_166, new __VLS_166({
            ...{ class: ("text-lg") },
        }));
        const __VLS_168 = __VLS_167({
            ...{ class: ("text-lg") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_167));
        const __VLS_172 = {}.MagicStick;
        /** @type { [typeof __VLS_components.MagicStick, ] } */ ;
        // @ts-ignore
        const __VLS_173 = __VLS_asFunctionalComponent(__VLS_172, new __VLS_172({}));
        const __VLS_174 = __VLS_173({}, ...__VLS_functionalComponentArgsRest(__VLS_173));
        __VLS_171.slots.default;
        var __VLS_171;
    }
    (__VLS_ctx.loading ? '绘制中...' : '生成创意');
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex items-center gap-2 opacity-70 hover:opacity-100 transition-opacity") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("text-[11px] text-slate-400 font-medium tracking-wide") },
    });
    // @ts-ignore
    /** @type { [typeof ImagePreviewModal, ] } */ ;
    // @ts-ignore
    const __VLS_178 = __VLS_asFunctionalComponent(ImagePreviewModal, new ImagePreviewModal({
        ...{ 'onUseSeed': {} },
        visible: ((__VLS_ctx.previewVisible)),
        imageUrl: ((__VLS_ctx.previewImage)),
        seed: ((__VLS_ctx.lastSeed)),
    }));
    const __VLS_179 = __VLS_178({
        ...{ 'onUseSeed': {} },
        visible: ((__VLS_ctx.previewVisible)),
        imageUrl: ((__VLS_ctx.previewImage)),
        seed: ((__VLS_ctx.lastSeed)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_178));
    let __VLS_183;
    const __VLS_184 = {
        onUseSeed: (...[$event]) => {
            __VLS_ctx.useImageSeed($event);
        }
    };
    let __VLS_180;
    let __VLS_181;
    var __VLS_182;
    ['relative', 'min-h-[calc(100vh-64px)]', 'w-full', 'bg-slate-50/50', 'overflow-hidden', 'text-slate-800', 'font-sans', 'w-full', 'pt-6', 'pb-32', 'overflow-y-auto', 'h-[calc(100vh-64px)]', 'custom-scrollbar', 'flex', 'flex-col', 'items-center', 'justify-center', 'min-h-[70vh]', 'z-0', 'transition-opacity', 'px-4', 'w-24', 'h-24', 'mb-6', 'rounded-[2rem]', 'bg-white', 'flex', 'items-center', 'justify-center', 'shadow-[0_8px_30px_rgba(0,0,0,0.04)]', 'border', 'border-slate-100', 'opacity-80', 'text-5xl', 'text-indigo-400', 'text-3xl', 'font-extrabold', 'text-slate-800', 'tracking-tight', 'mb-3', 'text-slate-500', 'text-lg', 'max-w-md', 'text-center', 'leading-relaxed', 'flex', 'gap-3', 'mt-10', 'max-w-3xl', 'flex-wrap', 'justify-center', 'px-5', 'py-2.5', 'rounded-full', 'bg-white', 'border', 'border-slate-200', 'cursor-pointer', 'hover:border-indigo-300', 'hover:shadow-md', 'hover:text-indigo-600', 'transition-all', 'text-sm', 'text-slate-600', 'font-medium', 'w-full', 'px-4', 'md:px-8', 'z-10', 'relative', 'max-w-7xl', 'mx-auto', 'absolute', 'bottom-6', 'left-0', 'right-0', 'z-30', 'px-4', 'md:px-0', 'pointer-events-none', 'max-w-4xl', 'mx-auto', 'w-full', 'flex', 'flex-col', 'gap-3', 'items-center', 'pointer-events-auto', 'generation-form', 'relative', 'flex', 'flex-col', 'w-full', 'rounded-[32px]', 'border', 'transition-all', 'duration-300', 'ease-out', 'p-5', 'md:p-6', 'bg-white/95', 'backdrop-blur-xl', 'border-slate-200/60', 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1),0_10px_20px_-5px_rgba(0,0,0,0.04)]', 'focus-within:border-indigo-300', 'focus-within:shadow-[0_25px_65px_-15px_rgba(79,70,229,0.15)]', 'focus-within:ring-4', 'focus-within:ring-indigo-500/10', 'pro-textarea', 'mb-4', 'flex', 'flex-wrap', 'gap-4', 'items-center', 'justify-between', 'pt-4', 'border-t', 'border-slate-100/80', 'flex', 'flex-wrap', 'items-center', 'gap-2', 'md:gap-3', 'capsule-radio-group', '!bg-slate-50', '!border-slate-200', 'hover:!border-indigo-400', 'hover:!text-indigo-500', 'hover:!bg-white', '!bg-slate-50', '!border-slate-200', 'hover:!border-indigo-400', 'hover:!text-indigo-500', 'hover:!bg-white', 'p-3', 'flex', 'flex-col', 'gap-5', 'm-0', 'text-sm', 'font-bold', 'text-slate-800', 'flex', 'flex-col', 'gap-1.5', 'text-xs', 'font-semibold', 'text-slate-500', 'flex', 'flex-col', 'gap-1.5', 'text-xs', 'font-semibold', 'text-slate-500', 'flex', 'justify-between', 'text-indigo-600', 'flex', 'flex-col', 'gap-1.5', 'text-xs', 'font-semibold', 'text-slate-500', 'flex', 'gap-2', 'flex-1', 'flex', 'items-center', 'justify-center', 'gap-2', 'px-8', 'h-11', 'rounded-[22px]', 'text-base', 'font-bold', 'transition-all', 'duration-300', 'w-full', 'md:w-auto', 'animate-spin', 'text-lg', 'text-lg', 'flex', 'items-center', 'gap-2', 'opacity-70', 'hover:opacity-100', 'transition-opacity', 'text-[11px]', 'text-slate-400', 'font-medium', 'tracking-wide',];
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
            MagicStick: MagicStick,
            Operation: Operation,
            Picture: Picture,
            Refresh: Refresh,
            Loading: Loading,
            promptTemplates: promptTemplates,
            ImageSize: ImageSize,
            ImageResultGallery: ImageResultGallery,
            ImagePreviewModal: ImagePreviewModal,
            formData: formData,
            loading: loading,
            progress: progress,
            estimatedTime: estimatedTime,
            generatedImages: generatedImages,
            lastSeed: lastSeed,
            generationTime: generationTime,
            generateImage: generateImage,
            randomizeSeed: randomizeSeed,
            handleCustomUpload: handleCustomUpload,
            beforeImageUpload: beforeImageUpload,
            useImageSeed: useImageSeed,
            previewVisible: previewVisible,
            previewImage: previewImage,
            showPreview: showPreview,
            downloadImage: downloadImage,
            applyTemplate: applyTemplate,
            applyRandomTemplate: applyRandomTemplate,
            scrollToPrompt: scrollToPrompt,
            regenerateWithSeed: regenerateWithSeed,
        };
    },
});
export default (await import('vue')).defineComponent({
    setup() {
        return {};
    },
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=ImageGenerationView.vue.js.map