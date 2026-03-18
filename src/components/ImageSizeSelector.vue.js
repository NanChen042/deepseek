import { imageSizeOptions } from "../config/imageConfig";
const __VLS_props = defineProps();
const __VLS_emit = defineEmits();
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2.5 w-full") },
    });
    for (const [value] of __VLS_getVForSourceType((__VLS_ctx.imageSizeOptions))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (...[$event]) => {
                    __VLS_ctx.$emit('update:modelValue', value.value);
                } },
            key: ((value.value)),
            type: ("button"),
            ...{ class: (([
                    'group relative flex flex-col items-center justify-center py-3 px-1 rounded-2xl border transition-all duration-300 ease-out outline-none',
                    __VLS_ctx.modelValue === value.value
                        ? 'bg-blue-50/60 border-blue-500 shadow-[0_4px_12px_-4px_rgba(59,130,246,0.3)] ring-1 ring-blue-500/50 scale-[1.02]'
                        : 'bg-slate-50/50 border-slate-200 hover:bg-white hover:border-slate-300 hover:shadow-sm'
                ])) },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("w-10 h-10 flex items-center justify-center mb-2") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: (([
                    'transition-all duration-300 rounded-[3px] ring-1 ring-black/5',
                    value.ratio,
                    __VLS_ctx.modelValue === value.value
                        ? 'bg-blue-500 shadow-sm scale-110'
                        : 'bg-slate-300 group-hover:bg-slate-400'
                ])) },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
            ...{ class: (([
                    'text-[11px] font-semibold tracking-wide transition-colors',
                    __VLS_ctx.modelValue === value.value ? 'text-blue-600' : 'text-slate-500'
                ])) },
        });
        (value.label);
        if (__VLS_ctx.modelValue === value.value) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-500") },
            });
        }
    }
    ['grid', 'grid-cols-3', 'sm:grid-cols-4', 'lg:grid-cols-3', 'gap-2.5', 'w-full', 'group', 'relative', 'flex', 'flex-col', 'items-center', 'justify-center', 'py-3', 'px-1', 'rounded-2xl', 'border', 'transition-all', 'duration-300', 'ease-out', 'outline-none', 'w-10', 'h-10', 'flex', 'items-center', 'justify-center', 'mb-2', 'transition-all', 'duration-300', 'rounded-[3px]', 'ring-1', 'ring-black/5', 'text-[11px]', 'font-semibold', 'tracking-wide', 'transition-colors', 'absolute', 'top-1.5', 'right-1.5', 'w-1.5', 'h-1.5', 'rounded-full', 'bg-blue-500',];
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
            imageSizeOptions: imageSizeOptions,
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
//# sourceMappingURL=ImageSizeSelector.vue.js.map