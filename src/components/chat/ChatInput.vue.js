import { ref } from "vue";
import { Position, Loading } from "@element-plus/icons-vue";
const props = defineProps();
const emit = defineEmits();
const message = ref("");
const handleSend = () => {
    const trimmedMessage = message.value.trim();
    if (!trimmedMessage || props.disabled)
        return;
    emit("send", trimmedMessage);
    setTimeout(() => {
        message.value = "";
    }, 50);
};
const handleNewline = (e) => {
    if (props.disabled) {
        e.preventDefault();
    }
};
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['pro-textarea', 'el-textarea__inner', 'pro-textarea', 'el-textarea__inner', 'pro-textarea', 'el-textarea__inner',];
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-full shrink-0 px-2 md:px-0") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("max-w-3xl mx-auto relative flex flex-col items-center") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: (([
                'group relative flex items-end w-full bg-white rounded-[28px] transition-all duration-300 ease-out',
                'border border-slate-200/80 shadow-[0_4px_24px_-6px_rgba(0,0,0,0.05)]',
                'focus-within:border-blue-400/50 focus-within:shadow-[0_12px_40px_-10px_rgba(59,130,246,0.12)] focus-within:ring-4 focus-within:ring-blue-500/10'
            ])) },
    });
    const __VLS_0 = {}.ElInput;
    /** @type { [typeof __VLS_components.ElInput, typeof __VLS_components.elInput, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onKeydown': {} },
        ...{ 'onKeydown': {} },
        modelValue: ((__VLS_ctx.message)),
        type: ("textarea"),
        autosize: (({ minRows: 1, maxRows: 8 })),
        resize: ("none"),
        placeholder: ("发送消息给 DeepSeek... (Shift + Enter 换行)"),
        disabled: ((__VLS_ctx.disabled)),
        ...{ class: ("pro-textarea flex-1") },
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onKeydown': {} },
        ...{ 'onKeydown': {} },
        modelValue: ((__VLS_ctx.message)),
        type: ("textarea"),
        autosize: (({ minRows: 1, maxRows: 8 })),
        resize: ("none"),
        placeholder: ("发送消息给 DeepSeek... (Shift + Enter 换行)"),
        disabled: ((__VLS_ctx.disabled)),
        ...{ class: ("pro-textarea flex-1") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_6;
    const __VLS_7 = {
        onKeydown: (__VLS_ctx.handleSend)
    };
    const __VLS_8 = {
        onKeydown: (__VLS_ctx.handleNewline)
    };
    let __VLS_3;
    let __VLS_4;
    var __VLS_5;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex items-center justify-center pr-1.5 pb-[6px] shrink-0") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (__VLS_ctx.handleSend) },
        disabled: ((!__VLS_ctx.message.trim() || __VLS_ctx.disabled)),
        ...{ class: (([
                'relative flex items-center justify-center w-10 h-10 rounded-[22px] transition-all duration-300 overflow-hidden',
                __VLS_ctx.message.trim() && !__VLS_ctx.disabled
                    ? 'bg-gradient-to-b from-blue-500 to-blue-600 text-white shadow-[0_2px_10px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_16px_rgba(59,130,246,0.4)] hover:-translate-y-[1px] active:translate-y-0 cursor-pointer'
                    : 'bg-slate-100 text-slate-400 cursor-not-allowed'
            ])) },
    });
    if (!__VLS_ctx.disabled) {
        const __VLS_9 = {}.ElIcon;
        /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
        // @ts-ignore
        const __VLS_10 = __VLS_asFunctionalComponent(__VLS_9, new __VLS_9({
            ...{ class: ("text-[18px] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5") },
        }));
        const __VLS_11 = __VLS_10({
            ...{ class: ("text-[18px] transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_10));
        const __VLS_15 = {}.Position;
        /** @type { [typeof __VLS_components.Position, ] } */ ;
        // @ts-ignore
        const __VLS_16 = __VLS_asFunctionalComponent(__VLS_15, new __VLS_15({}));
        const __VLS_17 = __VLS_16({}, ...__VLS_functionalComponentArgsRest(__VLS_16));
        __VLS_14.slots.default;
        var __VLS_14;
    }
    else {
        const __VLS_21 = {}.ElIcon;
        /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
        // @ts-ignore
        const __VLS_22 = __VLS_asFunctionalComponent(__VLS_21, new __VLS_21({
            ...{ class: ("text-[18px] animate-spin text-slate-500") },
        }));
        const __VLS_23 = __VLS_22({
            ...{ class: ("text-[18px] animate-spin text-slate-500") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_22));
        const __VLS_27 = {}.Loading;
        /** @type { [typeof __VLS_components.Loading, ] } */ ;
        // @ts-ignore
        const __VLS_28 = __VLS_asFunctionalComponent(__VLS_27, new __VLS_27({}));
        const __VLS_29 = __VLS_28({}, ...__VLS_functionalComponentArgsRest(__VLS_28));
        __VLS_26.slots.default;
        var __VLS_26;
    }
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("mt-3.5 mb-1 opacity-70 hover:opacity-100 transition-opacity") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("text-[12px] text-slate-400 font-medium tracking-wide") },
    });
    ['w-full', 'shrink-0', 'px-2', 'md:px-0', 'max-w-3xl', 'mx-auto', 'relative', 'flex', 'flex-col', 'items-center', 'group', 'relative', 'flex', 'items-end', 'w-full', 'bg-white', 'rounded-[28px]', 'transition-all', 'duration-300', 'ease-out', 'border', 'border-slate-200/80', 'shadow-[0_4px_24px_-6px_rgba(0,0,0,0.05)]', 'focus-within:border-blue-400/50', 'focus-within:shadow-[0_12px_40px_-10px_rgba(59,130,246,0.12)]', 'focus-within:ring-4', 'focus-within:ring-blue-500/10', 'pro-textarea', 'flex-1', 'flex', 'items-center', 'justify-center', 'pr-1.5', 'pb-[6px]', 'shrink-0', 'relative', 'flex', 'items-center', 'justify-center', 'w-10', 'h-10', 'rounded-[22px]', 'transition-all', 'duration-300', 'overflow-hidden', 'text-[18px]', 'transition-transform', 'duration-300', 'group-hover/btn:translate-x-0.5', 'group-hover/btn:-translate-y-0.5', 'text-[18px]', 'animate-spin', 'text-slate-500', 'mt-3.5', 'mb-1', 'opacity-70', 'hover:opacity-100', 'transition-opacity', 'text-[12px]', 'text-slate-400', 'font-medium', 'tracking-wide',];
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
            Position: Position,
            Loading: Loading,
            message: message,
            handleSend: handleSend,
            handleNewline: handleNewline,
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
//# sourceMappingURL=ChatInput.vue.js.map