import { computed } from "vue";
import { ElMessage } from "element-plus";
import { Download, CopyDocument, RefreshRight, Close, } from "@element-plus/icons-vue";
const props = defineProps();
const emit = defineEmits();
const dialogVisible = computed({
    get: () => props.visible,
    set: (val) => emit("update:visible", val),
});
// 下载当前预览的图片
const downloadCurrentPreview = () => {
    if (!props.imageUrl)
        return;
    const a = document.createElement("a");
    a.href = props.imageUrl;
    a.download = `deepseek-art-${props.seed || Date.now()}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    ElMessage.success({ message: "图片下载已开始", grouping: true });
};
// 复制种子到剪贴板
const copySeedToClipboard = async () => {
    if (props.seed === null)
        return;
    try {
        await navigator.clipboard.writeText(props.seed.toString());
        ElMessage.success({
            message: `已复制种子 (${props.seed})`,
            grouping: true,
        });
    }
    catch (err) {
        const textArea = document.createElement("textarea");
        textArea.value = props.seed.toString();
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        ElMessage.success({
            message: `已复制种子 (${props.seed})`,
            grouping: true,
        });
    }
};
// 使用当前种子并关闭预览
const useCurrentSeedAndClose = () => {
    if (props.seed !== null) {
        emit("use-seed", props.seed);
        dialogVisible.value = false;
    }
};
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['ultra-preview-dialog', 'ultra-preview-dialog', 'ultra-preview-dialog',];
    // CSS variable injection 
    // CSS variable injection end 
    const __VLS_0 = {}.ElDialog;
    /** @type { [typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        modelValue: ((__VLS_ctx.dialogVisible)),
        showClose: ((false)),
        appendToBody: ((true)),
        alignCenter: (true),
        ...{ class: ("ultra-preview-dialog") },
        width: ("90%"),
        ...{ style: ({}) },
    }));
    const __VLS_2 = __VLS_1({
        modelValue: ((__VLS_ctx.dialogVisible)),
        showClose: ((false)),
        appendToBody: ((true)),
        alignCenter: (true),
        ...{ class: ("ultra-preview-dialog") },
        width: ("90%"),
        ...{ style: ({}) },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    var __VLS_6 = {};
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("relative flex flex-col items-center justify-center w-full min-h-[50vh]") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.dialogVisible = false;
            } },
        ...{ class: ("absolute -top-10 right-0 md:-right-10 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/25 text-white/80 hover:text-white backdrop-blur-md transition-all duration-300 z-50") },
    });
    const __VLS_7 = {}.ElIcon;
    /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
    // @ts-ignore
    const __VLS_8 = __VLS_asFunctionalComponent(__VLS_7, new __VLS_7({
        ...{ class: ("text-xl") },
    }));
    const __VLS_9 = __VLS_8({
        ...{ class: ("text-xl") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_8));
    const __VLS_13 = {}.Close;
    /** @type { [typeof __VLS_components.Close, ] } */ ;
    // @ts-ignore
    const __VLS_14 = __VLS_asFunctionalComponent(__VLS_13, new __VLS_13({}));
    const __VLS_15 = __VLS_14({}, ...__VLS_functionalComponentArgsRest(__VLS_14));
    __VLS_12.slots.default;
    var __VLS_12;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("relative group") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
        src: ((__VLS_ctx.imageUrl)),
        ...{ class: ("max-w-full max-h-[75vh] object-contain rounded-2xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)] transition-transform duration-500") },
        alt: ("AI生成的绝美图像"),
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("absolute inset-0 rounded-2xl ring-1 ring-white/20 pointer-events-none") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("mt-8 flex flex-wrap justify-center gap-3 md:gap-4 px-6 py-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full shadow-2xl z-50") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.downloadCurrentPreview) },
        ...{ class: ("flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/90 hover:text-white hover:bg-white/15 transition-all duration-300") },
    });
    const __VLS_19 = {}.ElIcon;
    /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
    // @ts-ignore
    const __VLS_20 = __VLS_asFunctionalComponent(__VLS_19, new __VLS_19({
        ...{ class: ("text-lg") },
    }));
    const __VLS_21 = __VLS_20({
        ...{ class: ("text-lg") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_20));
    const __VLS_25 = {}.Download;
    /** @type { [typeof __VLS_components.Download, ] } */ ;
    // @ts-ignore
    const __VLS_26 = __VLS_asFunctionalComponent(__VLS_25, new __VLS_25({}));
    const __VLS_27 = __VLS_26({}, ...__VLS_functionalComponentArgsRest(__VLS_26));
    __VLS_24.slots.default;
    var __VLS_24;
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("hidden sm:inline") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-px h-6 bg-white/20 self-center hidden sm:block") },
    });
    if (__VLS_ctx.seed !== null) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.copySeedToClipboard) },
            ...{ class: ("flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium text-white/90 hover:text-white hover:bg-white/15 transition-all duration-300") },
        });
        const __VLS_31 = {}.ElIcon;
        /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
        // @ts-ignore
        const __VLS_32 = __VLS_asFunctionalComponent(__VLS_31, new __VLS_31({
            ...{ class: ("text-lg") },
        }));
        const __VLS_33 = __VLS_32({
            ...{ class: ("text-lg") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_32));
        const __VLS_37 = {}.CopyDocument;
        /** @type { [typeof __VLS_components.CopyDocument, ] } */ ;
        // @ts-ignore
        const __VLS_38 = __VLS_asFunctionalComponent(__VLS_37, new __VLS_37({}));
        const __VLS_39 = __VLS_38({}, ...__VLS_functionalComponentArgsRest(__VLS_38));
        __VLS_36.slots.default;
        var __VLS_36;
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("hidden sm:inline") },
        });
        (__VLS_ctx.seed);
    }
    if (__VLS_ctx.seed !== null) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.useCurrentSeedAndClose) },
            ...{ class: ("flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-[0_4px_12px_rgba(59,130,246,0.4)] hover:shadow-[0_6px_20px_rgba(59,130,246,0.6)] hover:-translate-y-0.5 transition-all duration-300") },
        });
        const __VLS_43 = {}.ElIcon;
        /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
        // @ts-ignore
        const __VLS_44 = __VLS_asFunctionalComponent(__VLS_43, new __VLS_43({
            ...{ class: ("text-lg") },
        }));
        const __VLS_45 = __VLS_44({
            ...{ class: ("text-lg") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_44));
        const __VLS_49 = {}.RefreshRight;
        /** @type { [typeof __VLS_components.RefreshRight, ] } */ ;
        // @ts-ignore
        const __VLS_50 = __VLS_asFunctionalComponent(__VLS_49, new __VLS_49({}));
        const __VLS_51 = __VLS_50({}, ...__VLS_functionalComponentArgsRest(__VLS_50));
        __VLS_48.slots.default;
        var __VLS_48;
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({});
    }
    __VLS_5.slots.default;
    var __VLS_5;
    ['ultra-preview-dialog', 'relative', 'flex', 'flex-col', 'items-center', 'justify-center', 'w-full', 'min-h-[50vh]', 'absolute', '-top-10', 'right-0', 'md:-right-10', 'w-10', 'h-10', 'flex', 'items-center', 'justify-center', 'rounded-full', 'bg-white/10', 'hover:bg-white/25', 'text-white/80', 'hover:text-white', 'backdrop-blur-md', 'transition-all', 'duration-300', 'z-50', 'text-xl', 'relative', 'group', 'max-w-full', 'max-h-[75vh]', 'object-contain', 'rounded-2xl', 'shadow-[0_20px_60px_-15px_rgba(0,0,0,0.5)]', 'transition-transform', 'duration-500', 'absolute', 'inset-0', 'rounded-2xl', 'ring-1', 'ring-white/20', 'pointer-events-none', 'mt-8', 'flex', 'flex-wrap', 'justify-center', 'gap-3', 'md:gap-4', 'px-6', 'py-3', 'bg-white/10', 'backdrop-blur-xl', 'border', 'border-white/20', 'rounded-full', 'shadow-2xl', 'z-50', 'flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'rounded-full', 'text-sm', 'font-medium', 'text-white/90', 'hover:text-white', 'hover:bg-white/15', 'transition-all', 'duration-300', 'text-lg', 'hidden', 'sm:inline', 'w-px', 'h-6', 'bg-white/20', 'self-center', 'hidden', 'sm:block', 'flex', 'items-center', 'gap-2', 'px-4', 'py-2', 'rounded-full', 'text-sm', 'font-medium', 'text-white/90', 'hover:text-white', 'hover:bg-white/15', 'transition-all', 'duration-300', 'text-lg', 'hidden', 'sm:inline', 'flex', 'items-center', 'gap-2', 'px-5', 'py-2', 'rounded-full', 'text-sm', 'font-semibold', 'bg-gradient-to-r', 'from-blue-500', 'to-indigo-500', 'text-white', 'shadow-[0_4px_12px_rgba(59,130,246,0.4)]', 'hover:shadow-[0_6px_20px_rgba(59,130,246,0.6)]', 'hover:-translate-y-0.5', 'transition-all', 'duration-300', 'text-lg',];
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
            Download: Download,
            CopyDocument: CopyDocument,
            RefreshRight: RefreshRight,
            Close: Close,
            dialogVisible: dialogVisible,
            downloadCurrentPreview: downloadCurrentPreview,
            copySeedToClipboard: copySeedToClipboard,
            useCurrentSeedAndClose: useCurrentSeedAndClose,
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
//# sourceMappingURL=ImagePreviewModal.vue.js.map