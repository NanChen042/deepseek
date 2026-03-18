import { ref, onMounted, nextTick, watch } from "vue";
import { Delete } from "@element-plus/icons-vue";
import { ModelType } from "@/services/aiService";
import deepseekLogo from "@/assets/deepseeklogo.svg";
const props = defineProps();
const emit = defineEmits();
const messagesContainer = ref(null);
const initialLoad = ref(true);
const showConfirmDialog = ref(false);
const modelOptions = {
    [ModelType.Chat]: "DeepSeek V3",
    [ModelType.Reasoner]: "DeepSeek R1",
};
const currentModel = ref(ModelType.Chat);
watch(currentModel, (newModel) => {
    emit("modelChange", newModel);
});
const scrollToBottom = async () => {
    await nextTick();
    if (messagesContainer.value) {
        const container = messagesContainer.value;
        container.scrollTo({
            top: container.scrollHeight,
            behavior: initialLoad.value ? "auto" : "smooth",
        });
    }
};
watch(() => props.messages, () => scrollToBottom(), { deep: true, immediate: true });
watch(() => props.loading, (newVal) => {
    if (newVal)
        scrollToBottom();
}, { immediate: true });
onMounted(() => {
    scrollToBottom();
    nextTick(() => {
        initialLoad.value = false;
    });
});
const showClearConfirm = () => {
    showConfirmDialog.value = true;
};
const handleClear = () => {
    showConfirmDialog.value = false;
    emit("clear");
};
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['custom-scrollbar', 'custom-scrollbar', 'custom-scrollbar', 'minimal-select', 'minimal-select', 'el-input__wrapper', 'minimal-select', 'minimal-dialog', 'minimal-dialog', 'minimal-dialog',];
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("relative flex flex-col h-full w-full bg-white overflow-hidden text-slate-800") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.header, __VLS_intrinsicElements.header)({
        ...{ class: ("absolute top-0 left-0 right-0 z-20 flex justify-between items-center px-4 md:px-6 py-3 bg-gradient-to-b from-white via-white/90 to-transparent pb-6 pointer-events-none") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("pointer-events-auto flex items-center gap-2") },
    });
    const __VLS_0 = {}.ElSelect;
    /** @type { [typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, typeof __VLS_components.ElSelect, typeof __VLS_components.elSelect, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        modelValue: ((__VLS_ctx.currentModel)),
        ...{ class: ("minimal-select") },
        disabled: ((__VLS_ctx.loading)),
    }));
    const __VLS_2 = __VLS_1({
        modelValue: ((__VLS_ctx.currentModel)),
        ...{ class: ("minimal-select") },
        disabled: ((__VLS_ctx.loading)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    __VLS_elementAsFunction(__VLS_intrinsicElements.template, __VLS_intrinsicElements.template)({});
    {
        const { prefix: __VLS_thisSlot } = __VLS_5.slots;
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("flex h-2 w-2 relative ml-1") },
        });
        if (__VLS_ctx.loading) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: ("animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75") },
            });
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("relative inline-flex rounded-full h-2 w-2") },
            ...{ class: ((__VLS_ctx.loading ? 'bg-blue-500' : 'bg-slate-300')) },
        });
    }
    for (const [label, model] of __VLS_getVForSourceType((__VLS_ctx.modelOptions))) {
        const __VLS_6 = {}.ElOption;
        /** @type { [typeof __VLS_components.ElOption, typeof __VLS_components.elOption, ] } */ ;
        // @ts-ignore
        const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({
            key: ((model)),
            label: ((label)),
            value: ((model)),
        }));
        const __VLS_8 = __VLS_7({
            key: ((model)),
            label: ((label)),
            value: ((model)),
        }, ...__VLS_functionalComponentArgsRest(__VLS_7));
    }
    var __VLS_5;
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.showClearConfirm) },
        ...{ class: ("pointer-events-auto flex items-center justify-center w-9 h-9 rounded-full bg-white border border-slate-200 text-slate-400 hover:text-red-500 hover:border-red-200 hover:bg-red-50 transition-all shadow-sm") },
        title: ("清空对话"),
    });
    const __VLS_12 = {}.ElIcon;
    /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        ...{ class: ("text-base") },
    }));
    const __VLS_14 = __VLS_13({
        ...{ class: ("text-base") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    const __VLS_18 = {}.Delete;
    /** @type { [typeof __VLS_components.Delete, ] } */ ;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({}));
    const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
    __VLS_17.slots.default;
    var __VLS_17;
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
        ...{ class: ("flex-1 overflow-y-auto w-full pt-20 pb-40 scroll-smooth custom-scrollbar") },
        ref: ("messagesContainer"),
    });
    // @ts-ignore navigation for `const messagesContainer = ref()`
    /** @type { typeof __VLS_ctx.messagesContainer } */ ;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("max-w-3xl mx-auto px-4 md:px-0 flex flex-col gap-8") },
    });
    if (__VLS_ctx.messages.length === 0) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex flex-col items-center justify-center mt-20 opacity-60") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("w-16 h-16 mb-6") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
            src: ((__VLS_ctx.deepseekLogo)),
            alt: ("Deepseek Logo"),
            ...{ class: ("w-full h-full grayscale") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.h2, __VLS_intrinsicElements.h2)({
            ...{ class: ("text-2xl font-bold text-slate-700 mb-2") },
        });
    }
    for (const [message, index] of __VLS_getVForSourceType((__VLS_ctx.messages))) {
        const __VLS_24 = {}.MessageBubble;
        /** @type { [typeof __VLS_components.MessageBubble, ] } */ ;
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
            ...{ 'onContinue': {} },
            key: ((index)),
            content: ((message.content)),
            reasoningContent: ((message.reasoning_content)),
            isUser: ((message.role === 'user')),
            loading: ((__VLS_ctx.loading)),
            isLastMessage: ((index === __VLS_ctx.messages.length - 1)),
            timestamp: ((Date.now())),
        }));
        const __VLS_26 = __VLS_25({
            ...{ 'onContinue': {} },
            key: ((index)),
            content: ((message.content)),
            reasoningContent: ((message.reasoning_content)),
            isUser: ((message.role === 'user')),
            loading: ((__VLS_ctx.loading)),
            isLastMessage: ((index === __VLS_ctx.messages.length - 1)),
            timestamp: ((Date.now())),
        }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        let __VLS_30;
        const __VLS_31 = {
            onContinue: (...[$event]) => {
                __VLS_ctx.$emit('continue', message.content);
            }
        };
        let __VLS_27;
        let __VLS_28;
        var __VLS_29;
    }
    const __VLS_32 = {}.Transition;
    /** @type { [typeof __VLS_components.Transition, typeof __VLS_components.Transition, ] } */ ;
    // @ts-ignore
    const __VLS_33 = __VLS_asFunctionalComponent(__VLS_32, new __VLS_32({
        name: ("fade"),
    }));
    const __VLS_34 = __VLS_33({
        name: ("fade"),
    }, ...__VLS_functionalComponentArgsRest(__VLS_33));
    if (__VLS_ctx.loading && (!__VLS_ctx.messages.length || __VLS_ctx.messages[__VLS_ctx.messages.length - 1].role === 'user')) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex items-start gap-4") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("w-8 h-8 rounded-full border border-slate-100 flex items-center justify-center bg-white shadow-sm shrink-0") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
            src: ((__VLS_ctx.deepseekLogo)),
            ...{ class: ("w-5 h-5 animate-pulse") },
            alt: ("AI Avatar"),
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex flex-col gap-1 mt-1") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("text-sm font-semibold text-slate-700") },
        });
        (__VLS_ctx.currentModel === __VLS_ctx.ModelType.Reasoner ? 'DeepSeek-R1' : 'DeepSeek-V3');
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex items-center gap-1.5 h-6") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.3s]") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("w-2 h-2 bg-slate-300 rounded-full animate-bounce [animation-delay:-0.15s]") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: ("w-2 h-2 bg-slate-300 rounded-full animate-bounce") },
        });
    }
    __VLS_37.slots.default;
    var __VLS_37;
    __VLS_elementAsFunction(__VLS_intrinsicElements.footer, __VLS_intrinsicElements.footer)({
        ...{ class: ("absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-white via-white to-transparent pt-10 pb-6 px-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("max-w-3xl mx-auto w-full") },
    });
    const __VLS_38 = {}.ChatInput;
    /** @type { [typeof __VLS_components.ChatInput, ] } */ ;
    // @ts-ignore
    const __VLS_39 = __VLS_asFunctionalComponent(__VLS_38, new __VLS_38({
        ...{ 'onSend': {} },
        disabled: ((__VLS_ctx.loading)),
    }));
    const __VLS_40 = __VLS_39({
        ...{ 'onSend': {} },
        disabled: ((__VLS_ctx.loading)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_39));
    let __VLS_44;
    const __VLS_45 = {
        onSend: (...[$event]) => {
            __VLS_ctx.$emit('send', $event);
        }
    };
    let __VLS_41;
    let __VLS_42;
    var __VLS_43;
    const __VLS_46 = {}.ElDialog;
    /** @type { [typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, typeof __VLS_components.ElDialog, typeof __VLS_components.elDialog, ] } */ ;
    // @ts-ignore
    const __VLS_47 = __VLS_asFunctionalComponent(__VLS_46, new __VLS_46({
        modelValue: ((__VLS_ctx.showConfirmDialog)),
        width: ("340px"),
        showClose: ((false)),
        alignCenter: (true),
        ...{ class: ("minimal-dialog") },
    }));
    const __VLS_48 = __VLS_47({
        modelValue: ((__VLS_ctx.showConfirmDialog)),
        width: ("340px"),
        showClose: ((false)),
        alignCenter: (true),
        ...{ class: ("minimal-dialog") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_47));
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("p-4 text-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h4, __VLS_intrinsicElements.h4)({
        ...{ class: ("text-lg font-bold text-slate-900 mb-2") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-sm text-slate-500 mb-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col gap-2.5") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleClear) },
        ...{ class: ("w-full py-2.5 rounded-xl bg-red-500 text-white font-medium hover:bg-red-600 transition-colors") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.showConfirmDialog = false;
            } },
        ...{ class: ("w-full py-2.5 rounded-xl bg-slate-100 text-slate-700 font-medium hover:bg-slate-200 transition-colors") },
    });
    __VLS_51.slots.default;
    var __VLS_51;
    ['relative', 'flex', 'flex-col', 'h-full', 'w-full', 'bg-white', 'overflow-hidden', 'text-slate-800', 'absolute', 'top-0', 'left-0', 'right-0', 'z-20', 'flex', 'justify-between', 'items-center', 'px-4', 'md:px-6', 'py-3', 'bg-gradient-to-b', 'from-white', 'via-white/90', 'to-transparent', 'pb-6', 'pointer-events-none', 'pointer-events-auto', 'flex', 'items-center', 'gap-2', 'minimal-select', 'flex', 'h-2', 'w-2', 'relative', 'ml-1', 'animate-ping', 'absolute', 'inline-flex', 'h-full', 'w-full', 'rounded-full', 'bg-blue-400', 'opacity-75', 'relative', 'inline-flex', 'rounded-full', 'h-2', 'w-2', 'pointer-events-auto', 'flex', 'items-center', 'justify-center', 'w-9', 'h-9', 'rounded-full', 'bg-white', 'border', 'border-slate-200', 'text-slate-400', 'hover:text-red-500', 'hover:border-red-200', 'hover:bg-red-50', 'transition-all', 'shadow-sm', 'text-base', 'flex-1', 'overflow-y-auto', 'w-full', 'pt-20', 'pb-40', 'scroll-smooth', 'custom-scrollbar', 'max-w-3xl', 'mx-auto', 'px-4', 'md:px-0', 'flex', 'flex-col', 'gap-8', 'flex', 'flex-col', 'items-center', 'justify-center', 'mt-20', 'opacity-60', 'w-16', 'h-16', 'mb-6', 'w-full', 'h-full', 'grayscale', 'text-2xl', 'font-bold', 'text-slate-700', 'mb-2', 'flex', 'items-start', 'gap-4', 'w-8', 'h-8', 'rounded-full', 'border', 'border-slate-100', 'flex', 'items-center', 'justify-center', 'bg-white', 'shadow-sm', 'shrink-0', 'w-5', 'h-5', 'animate-pulse', 'flex', 'flex-col', 'gap-1', 'mt-1', 'text-sm', 'font-semibold', 'text-slate-700', 'flex', 'items-center', 'gap-1.5', 'h-6', 'w-2', 'h-2', 'bg-slate-300', 'rounded-full', 'animate-bounce', '[animation-delay:-0.3s]', 'w-2', 'h-2', 'bg-slate-300', 'rounded-full', 'animate-bounce', '[animation-delay:-0.15s]', 'w-2', 'h-2', 'bg-slate-300', 'rounded-full', 'animate-bounce', 'absolute', 'bottom-0', 'left-0', 'right-0', 'z-20', 'bg-gradient-to-t', 'from-white', 'via-white', 'to-transparent', 'pt-10', 'pb-6', 'px-4', 'max-w-3xl', 'mx-auto', 'w-full', 'minimal-dialog', 'p-4', 'text-center', 'text-lg', 'font-bold', 'text-slate-900', 'mb-2', 'text-sm', 'text-slate-500', 'mb-6', 'flex', 'flex-col', 'gap-2.5', 'w-full', 'py-2.5', 'rounded-xl', 'bg-red-500', 'text-white', 'font-medium', 'hover:bg-red-600', 'transition-colors', 'w-full', 'py-2.5', 'rounded-xl', 'bg-slate-100', 'text-slate-700', 'font-medium', 'hover:bg-slate-200', 'transition-colors',];
    var __VLS_slots;
    var $slots;
    let __VLS_inheritedAttrs;
    var $attrs;
    const __VLS_refs = {
        'messagesContainer': __VLS_nativeElements['main'],
    };
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
            Delete: Delete,
            ModelType: ModelType,
            deepseekLogo: deepseekLogo,
            messagesContainer: messagesContainer,
            showConfirmDialog: showConfirmDialog,
            modelOptions: modelOptions,
            currentModel: currentModel,
            showClearConfirm: showClearConfirm,
            handleClear: handleClear,
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
    __typeRefs: {},
    __typeEl: {},
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=ChatContainer.vue.js.map