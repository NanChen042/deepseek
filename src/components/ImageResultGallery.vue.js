import { PictureFilled, Timer, Key, ZoomIn, Download, CopyDocument, RefreshRight, } from "@element-plus/icons-vue";
const props = defineProps();
const __VLS_emit = defineEmits();
// 修复比例计算逻辑：适配新版的文本标识
const getAspectRatioStyle = () => {
    const size = props.imageSize;
    // 16:9 横图
    if (size === "Landscape") {
        return { paddingBottom: "56.25%", height: "0" };
    }
    // 3:4 竖图
    if (size === "Portrait") {
        return { paddingBottom: "133.33%", height: "0" };
    }
    // 默认 1:1 方图
    return { paddingBottom: "100%", height: "0" };
};
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['action-btn', 'action-btn',];
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-full h-full flex flex-col items-center") },
    });
    if (__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex flex-col justify-center items-center w-full max-w-md mx-auto mt-20 p-8 rounded-3xl bg-white/50 backdrop-blur-sm") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("relative flex items-center justify-center w-20 h-20 mb-6") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("absolute inset-0 rounded-full border-t-2 border-b-2 border-blue-500 animate-[spin_2s_linear_infinite] opacity-50") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("absolute inset-2 rounded-full border-r-2 border-l-2 border-indigo-400 animate-[spin_3s_linear_infinite_reverse] opacity-50") },
        });
        const __VLS_0 = {}.ElIcon;
        /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
        // @ts-ignore
        const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
            ...{ class: ("text-3xl text-blue-500 animate-pulse") },
        }));
        const __VLS_2 = __VLS_1({
            ...{ class: ("text-3xl text-blue-500 animate-pulse") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_1));
        const __VLS_6 = {}.PictureFilled;
        /** @type { [typeof __VLS_components.PictureFilled, ] } */ ;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
        const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
        __VLS_5.slots.default;
        var __VLS_5;
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            ...{ class: ("text-lg font-semibold text-slate-800 mb-2") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-sm text-slate-500 mb-6") },
        });
        (__VLS_ctx.estimatedTime);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("w-full h-2 bg-slate-100 rounded-full overflow-hidden shadow-inner") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full transition-all duration-500 ease-out relative") },
            ...{ style: (({ width: `${__VLS_ctx.progress}%` })) },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("absolute top-0 bottom-0 left-0 right-0 bg-white/20 animate-[translateX_2s_ease-in-out_infinite]") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("mt-2 text-right w-full text-xs font-medium text-slate-400") },
        });
        (__VLS_ctx.progress);
    }
    if (__VLS_ctx.generatedImages.length > 0 && !__VLS_ctx.loading) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("w-full max-w-6xl mx-auto pb-32") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex flex-wrap items-center justify-between gap-4 mb-8") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
            ...{ class: ("text-2xl font-bold text-slate-800 tracking-tight m-0") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex items-center gap-3 px-4 py-2 bg-slate-50 border border-slate-100 rounded-full shadow-sm text-xs font-medium text-slate-500") },
        });
        if (__VLS_ctx.generationTime) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: ("flex items-center gap-1") },
            });
            const __VLS_12 = {}.ElIcon;
            /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
            // @ts-ignore
            const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({}));
            const __VLS_14 = __VLS_13({}, ...__VLS_functionalComponentArgsRest(__VLS_13));
            const __VLS_18 = {}.Timer;
            /** @type { [typeof __VLS_components.Timer, ] } */ ;
            // @ts-ignore
            const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({}));
            const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
            __VLS_17.slots.default;
            var __VLS_17;
            (__VLS_ctx.generationTime);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("w-px h-3 bg-slate-200") },
        });
        if (__VLS_ctx.lastSeed !== null) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: ("flex items-center gap-1") },
            });
            const __VLS_24 = {}.ElIcon;
            /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
            // @ts-ignore
            const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
            const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
            const __VLS_30 = {}.Key;
            /** @type { [typeof __VLS_components.Key, ] } */ ;
            // @ts-ignore
            const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({}));
            const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
            __VLS_29.slots.default;
            var __VLS_29;
            (__VLS_ctx.lastSeed);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full") },
        });
        for (const [image, index] of __VLS_getVForSourceType((__VLS_ctx.generatedImages))) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                key: ((image.url)),
                ...{ class: ("group relative rounded-3xl overflow-hidden bg-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] transition-all duration-500 hover:-translate-y-1.5 hover:shadow-[0_12px_30px_-10px_rgba(59,130,246,0.3)]") },
                ...{ style: ((__VLS_ctx.getAspectRatioStyle())) },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("absolute inset-0 bg-gradient-to-br from-slate-100 to-slate-200 animate-pulse -z-10") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
                ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.generatedImages.length > 0 && !__VLS_ctx.loading)))
                            return;
                        __VLS_ctx.$emit('preview', image.url);
                    } },
                src: ((image.url)),
                alt: ("AI 生成的图像"),
                loading: ("lazy"),
                ...{ class: ("absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 cursor-zoom-in") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("absolute inset-0 bg-slate-900/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex flex-col justify-end p-4") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("flex gap-2 justify-center translate-y-4 group-hover:translate-y-0 transition-transform duration-300 ease-out") },
            });
            const __VLS_36 = {}.ElTooltip;
            /** @type { [typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ] } */ ;
            // @ts-ignore
            const __VLS_37 = __VLS_asFunctionalComponent(__VLS_36, new __VLS_36({
                content: ("预览大图"),
                placement: ("top"),
                showAfter: ((200)),
            }));
            const __VLS_38 = __VLS_37({
                content: ("预览大图"),
                placement: ("top"),
                showAfter: ((200)),
            }, ...__VLS_functionalComponentArgsRest(__VLS_37));
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.generatedImages.length > 0 && !__VLS_ctx.loading)))
                            return;
                        __VLS_ctx.$emit('preview', image.url);
                    } },
                ...{ class: ("action-btn") },
            });
            const __VLS_42 = {}.ElIcon;
            /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
            // @ts-ignore
            const __VLS_43 = __VLS_asFunctionalComponent(__VLS_42, new __VLS_42({}));
            const __VLS_44 = __VLS_43({}, ...__VLS_functionalComponentArgsRest(__VLS_43));
            const __VLS_48 = {}.ZoomIn;
            /** @type { [typeof __VLS_components.ZoomIn, ] } */ ;
            // @ts-ignore
            const __VLS_49 = __VLS_asFunctionalComponent(__VLS_48, new __VLS_48({}));
            const __VLS_50 = __VLS_49({}, ...__VLS_functionalComponentArgsRest(__VLS_49));
            __VLS_47.slots.default;
            var __VLS_47;
            __VLS_41.slots.default;
            var __VLS_41;
            const __VLS_54 = {}.ElTooltip;
            /** @type { [typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ] } */ ;
            // @ts-ignore
            const __VLS_55 = __VLS_asFunctionalComponent(__VLS_54, new __VLS_54({
                content: ("下载原图"),
                placement: ("top"),
                showAfter: ((200)),
            }));
            const __VLS_56 = __VLS_55({
                content: ("下载原图"),
                placement: ("top"),
                showAfter: ((200)),
            }, ...__VLS_functionalComponentArgsRest(__VLS_55));
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.generatedImages.length > 0 && !__VLS_ctx.loading)))
                            return;
                        __VLS_ctx.$emit('download', image.url, index);
                    } },
                ...{ class: ("action-btn") },
            });
            const __VLS_60 = {}.ElIcon;
            /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
            // @ts-ignore
            const __VLS_61 = __VLS_asFunctionalComponent(__VLS_60, new __VLS_60({}));
            const __VLS_62 = __VLS_61({}, ...__VLS_functionalComponentArgsRest(__VLS_61));
            const __VLS_66 = {}.Download;
            /** @type { [typeof __VLS_components.Download, ] } */ ;
            // @ts-ignore
            const __VLS_67 = __VLS_asFunctionalComponent(__VLS_66, new __VLS_66({}));
            const __VLS_68 = __VLS_67({}, ...__VLS_functionalComponentArgsRest(__VLS_67));
            __VLS_65.slots.default;
            var __VLS_65;
            __VLS_59.slots.default;
            var __VLS_59;
            const __VLS_72 = {}.ElTooltip;
            /** @type { [typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ] } */ ;
            // @ts-ignore
            const __VLS_73 = __VLS_asFunctionalComponent(__VLS_72, new __VLS_72({
                content: ("复制种子值"),
                placement: ("top"),
                showAfter: ((200)),
            }));
            const __VLS_74 = __VLS_73({
                content: ("复制种子值"),
                placement: ("top"),
                showAfter: ((200)),
            }, ...__VLS_functionalComponentArgsRest(__VLS_73));
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.generatedImages.length > 0 && !__VLS_ctx.loading)))
                            return;
                        __VLS_ctx.$emit('use-seed', __VLS_ctx.lastSeed);
                    } },
                ...{ class: ("action-btn") },
            });
            const __VLS_78 = {}.ElIcon;
            /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
            // @ts-ignore
            const __VLS_79 = __VLS_asFunctionalComponent(__VLS_78, new __VLS_78({}));
            const __VLS_80 = __VLS_79({}, ...__VLS_functionalComponentArgsRest(__VLS_79));
            const __VLS_84 = {}.CopyDocument;
            /** @type { [typeof __VLS_components.CopyDocument, ] } */ ;
            // @ts-ignore
            const __VLS_85 = __VLS_asFunctionalComponent(__VLS_84, new __VLS_84({}));
            const __VLS_86 = __VLS_85({}, ...__VLS_functionalComponentArgsRest(__VLS_85));
            __VLS_83.slots.default;
            var __VLS_83;
            __VLS_77.slots.default;
            var __VLS_77;
            const __VLS_90 = {}.ElTooltip;
            /** @type { [typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, typeof __VLS_components.ElTooltip, typeof __VLS_components.elTooltip, ] } */ ;
            // @ts-ignore
            const __VLS_91 = __VLS_asFunctionalComponent(__VLS_90, new __VLS_90({
                content: ("以此为基础重新生成"),
                placement: ("top"),
                showAfter: ((200)),
            }));
            const __VLS_92 = __VLS_91({
                content: ("以此为基础重新生成"),
                placement: ("top"),
                showAfter: ((200)),
            }, ...__VLS_functionalComponentArgsRest(__VLS_91));
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!((__VLS_ctx.generatedImages.length > 0 && !__VLS_ctx.loading)))
                            return;
                        __VLS_ctx.$emit('regenerate', __VLS_ctx.lastSeed);
                    } },
                ...{ class: ("action-btn") },
            });
            const __VLS_96 = {}.ElIcon;
            /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
            // @ts-ignore
            const __VLS_97 = __VLS_asFunctionalComponent(__VLS_96, new __VLS_96({}));
            const __VLS_98 = __VLS_97({}, ...__VLS_functionalComponentArgsRest(__VLS_97));
            const __VLS_102 = {}.RefreshRight;
            /** @type { [typeof __VLS_components.RefreshRight, ] } */ ;
            // @ts-ignore
            const __VLS_103 = __VLS_asFunctionalComponent(__VLS_102, new __VLS_102({}));
            const __VLS_104 = __VLS_103({}, ...__VLS_functionalComponentArgsRest(__VLS_103));
            __VLS_101.slots.default;
            var __VLS_101;
            __VLS_95.slots.default;
            var __VLS_95;
        }
    }
    ['w-full', 'h-full', 'flex', 'flex-col', 'items-center', 'flex', 'flex-col', 'justify-center', 'items-center', 'w-full', 'max-w-md', 'mx-auto', 'mt-20', 'p-8', 'rounded-3xl', 'bg-white/50', 'backdrop-blur-sm', 'relative', 'flex', 'items-center', 'justify-center', 'w-20', 'h-20', 'mb-6', 'absolute', 'inset-0', 'rounded-full', 'border-t-2', 'border-b-2', 'border-blue-500', 'animate-[spin_2s_linear_infinite]', 'opacity-50', 'absolute', 'inset-2', 'rounded-full', 'border-r-2', 'border-l-2', 'border-indigo-400', 'animate-[spin_3s_linear_infinite_reverse]', 'opacity-50', 'text-3xl', 'text-blue-500', 'animate-pulse', 'text-lg', 'font-semibold', 'text-slate-800', 'mb-2', 'text-sm', 'text-slate-500', 'mb-6', 'w-full', 'h-2', 'bg-slate-100', 'rounded-full', 'overflow-hidden', 'shadow-inner', 'h-full', 'bg-gradient-to-r', 'from-blue-500', 'to-indigo-500', 'rounded-full', 'transition-all', 'duration-500', 'ease-out', 'relative', 'absolute', 'top-0', 'bottom-0', 'left-0', 'right-0', 'bg-white/20', 'animate-[translateX_2s_ease-in-out_infinite]', 'mt-2', 'text-right', 'w-full', 'text-xs', 'font-medium', 'text-slate-400', 'w-full', 'max-w-6xl', 'mx-auto', 'pb-32', 'flex', 'flex-wrap', 'items-center', 'justify-between', 'gap-4', 'mb-8', 'text-2xl', 'font-bold', 'text-slate-800', 'tracking-tight', 'm-0', 'flex', 'items-center', 'gap-3', 'px-4', 'py-2', 'bg-slate-50', 'border', 'border-slate-100', 'rounded-full', 'shadow-sm', 'text-xs', 'font-medium', 'text-slate-500', 'flex', 'items-center', 'gap-1', 'w-px', 'h-3', 'bg-slate-200', 'flex', 'items-center', 'gap-1', 'grid', 'grid-cols-1', 'sm:grid-cols-2', 'lg:grid-cols-3', 'xl:grid-cols-4', 'gap-6', 'w-full', 'group', 'relative', 'rounded-3xl', 'overflow-hidden', 'bg-slate-100', 'shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)]', 'transition-all', 'duration-500', 'hover:-translate-y-1.5', 'hover:shadow-[0_12px_30px_-10px_rgba(59,130,246,0.3)]', 'absolute', 'inset-0', 'bg-gradient-to-br', 'from-slate-100', 'to-slate-200', 'animate-pulse', '-z-10', 'absolute', 'inset-0', 'w-full', 'h-full', 'object-cover', 'transition-transform', 'duration-700', 'group-hover:scale-105', 'cursor-zoom-in', 'absolute', 'inset-0', 'bg-slate-900/40', 'backdrop-blur-[2px]', 'opacity-0', 'group-hover:opacity-100', 'transition-all', 'duration-300', 'flex', 'flex-col', 'justify-end', 'p-4', 'flex', 'gap-2', 'justify-center', 'translate-y-4', 'group-hover:translate-y-0', 'transition-transform', 'duration-300', 'ease-out', 'action-btn', 'action-btn', 'action-btn', 'action-btn',];
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
            PictureFilled: PictureFilled,
            Timer: Timer,
            Key: Key,
            ZoomIn: ZoomIn,
            Download: Download,
            CopyDocument: CopyDocument,
            RefreshRight: RefreshRight,
            getAspectRatioStyle: getAspectRatioStyle,
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
//# sourceMappingURL=ImageResultGallery.vue.js.map