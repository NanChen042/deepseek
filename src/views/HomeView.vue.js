import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
import { ChatLineRound, Lightning, Connection, ArrowRight, Position, } from "@element-plus/icons-vue";
const router = useRouter();
// 控制各部分的入场动画，营造错落有致的高级感
const isHeroVisible = ref(false);
const isFeaturesVisible = ref(false);
onMounted(() => {
    setTimeout(() => {
        isHeroVisible.value = true;
    }, 100);
    setTimeout(() => {
        isFeaturesVisible.value = true;
    }, 300);
});
const features = [
    {
        icon: ChatLineRound,
        title: "自然流畅对话",
        description: "具备强大的上下文记忆与逻辑推理能力，像人类一样自然交流，理解你的每一个意图。",
        color: "text-blue-500",
        bg: "bg-blue-50",
    },
    {
        icon: Lightning,
        title: "毫秒级极速响应",
        description: "采用最新一代流式输出技术，拒绝漫长等待，思考与回答同步进行，丝滑体验。",
        color: "text-cyan-500",
        bg: "bg-cyan-50",
    },
    {
        icon: Connection,
        title: "多模态深度理解",
        description: "不仅仅是文字，更能处理代码、逻辑分析与复杂任务拆解，做你的全能副驾驶。",
        color: "text-indigo-500",
        bg: "bg-indigo-50",
    },
];
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("relative min-h-screen bg-[#fafcff] overflow-hidden font-sans text-slate-800") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("absolute inset-0 z-0 pointer-events-none") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("absolute -top-[20%] left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-blue-400/20 rounded-full blur-[120px] opacity-70") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("absolute top-[20%] -right-[10%] w-[500px] h-[500px] bg-cyan-300/20 rounded-full blur-[100px] opacity-50") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.main, __VLS_intrinsicElements.main)({
        ...{ class: ("relative z-10 w-full max-w-7xl mx-auto px-6 pt-16 pb-24 md:pt-24 lg:pt-32") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: (([
                'max-w-4xl mx-auto text-center transition-all duration-1000 ease-out',
                __VLS_ctx.isHeroVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
            ])) },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("inline-flex items-center gap-2 px-3 py-1.5 mb-8 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("relative flex h-2 w-2") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("relative inline-flex rounded-full h-2 w-2 bg-blue-500") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.h1, __VLS_intrinsicElements.h1)({
        ...{ class: ("text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight leading-[1.15] mb-6") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.br)({
        ...{ class: ("hidden sm:block") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
        ...{ class: ("bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-400 bg-clip-text text-transparent") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
        ...{ class: ("text-lg md:text-xl text-slate-500 mb-10 max-w-2xl mx-auto leading-relaxed") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("flex flex-col sm:flex-row items-center justify-center gap-4") },
    });
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ onClick: (...[$event]) => {
                __VLS_ctx.router.push('/chat');
            } },
        ...{ class: ("group w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-white rounded-full bg-blue-600 hover:bg-blue-700 transition-all duration-300 shadow-[0_8px_20px_rgba(37,99,235,0.25)] hover:shadow-[0_12px_25px_rgba(37,99,235,0.35)] hover:-translate-y-0.5") },
    });
    const __VLS_0 = {}.ElIcon;
    /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ class: ("text-lg transition-transform duration-300 group-hover:translate-x-1") },
    }));
    const __VLS_2 = __VLS_1({
        ...{ class: ("text-lg transition-transform duration-300 group-hover:translate-x-1") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    const __VLS_6 = {}.ArrowRight;
    /** @type { [typeof __VLS_components.ArrowRight, ] } */ ;
    // @ts-ignore
    const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
    const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
    __VLS_5.slots.default;
    var __VLS_5;
    __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
        ...{ class: ("w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 text-base font-semibold text-slate-600 rounded-full bg-white border border-slate-200 hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 shadow-sm hover:-translate-y-0.5") },
    });
    const __VLS_12 = {}.ElIcon;
    /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
    // @ts-ignore
    const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
        ...{ class: ("text-lg") },
    }));
    const __VLS_14 = __VLS_13({
        ...{ class: ("text-lg") },
    }, ...__VLS_functionalComponentArgsRest(__VLS_13));
    const __VLS_18 = {}.Position;
    /** @type { [typeof __VLS_components.Position, ] } */ ;
    // @ts-ignore
    const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({}));
    const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
    __VLS_17.slots.default;
    var __VLS_17;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: (([
                'mt-24 md:mt-32 grid grid-cols-1 md:grid-cols-3 gap-8 transition-all duration-1000 ease-out delay-200',
                __VLS_ctx.isFeaturesVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
            ])) },
    });
    for (const [item, index] of __VLS_getVForSourceType((__VLS_ctx.features))) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            key: ((index)),
            ...{ class: ("group relative p-8 rounded-3xl bg-white border border-slate-100 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)] hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)] transition-all duration-300 hover:-translate-y-1") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-t-3xl") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ((['w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3', item.bg, item.color])) },
        });
        const __VLS_24 = {}.ElIcon;
        /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
        // @ts-ignore
        const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({
            ...{ class: ("text-2xl") },
        }));
        const __VLS_26 = __VLS_25({
            ...{ class: ("text-2xl") },
        }, ...__VLS_functionalComponentArgsRest(__VLS_25));
        const __VLS_30 = ((item.icon));
        // @ts-ignore
        const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({}));
        const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
        __VLS_29.slots.default;
        var __VLS_29;
        __VLS_elementAsFunction(__VLS_intrinsicElements.h3, __VLS_intrinsicElements.h3)({
            ...{ class: ("text-xl font-bold text-slate-800 mb-3") },
        });
        (item.title);
        __VLS_elementAsFunction(__VLS_intrinsicElements.p, __VLS_intrinsicElements.p)({
            ...{ class: ("text-slate-500 leading-relaxed") },
        });
        (item.description);
    }
    ['relative', 'min-h-screen', 'bg-[#fafcff]', 'overflow-hidden', 'font-sans', 'text-slate-800', 'absolute', 'inset-0', 'z-0', 'pointer-events-none', 'absolute', 'inset-0', 'bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)]', 'bg-[size:24px_24px]', 'absolute', '-top-[20%]', 'left-1/2', '-translate-x-1/2', 'w-[800px]', 'h-[600px]', 'bg-blue-400/20', 'rounded-full', 'blur-[120px]', 'opacity-70', 'absolute', 'top-[20%]', '-right-[10%]', 'w-[500px]', 'h-[500px]', 'bg-cyan-300/20', 'rounded-full', 'blur-[100px]', 'opacity-50', 'relative', 'z-10', 'w-full', 'max-w-7xl', 'mx-auto', 'px-6', 'pt-16', 'pb-24', 'md:pt-24', 'lg:pt-32', 'max-w-4xl', 'mx-auto', 'text-center', 'transition-all', 'duration-1000', 'ease-out', 'inline-flex', 'items-center', 'gap-2', 'px-3', 'py-1.5', 'mb-8', 'rounded-full', 'bg-blue-50', 'border', 'border-blue-100', 'text-blue-600', 'text-sm', 'font-medium', 'relative', 'flex', 'h-2', 'w-2', 'animate-ping', 'absolute', 'inline-flex', 'h-full', 'w-full', 'rounded-full', 'bg-blue-400', 'opacity-75', 'relative', 'inline-flex', 'rounded-full', 'h-2', 'w-2', 'bg-blue-500', 'text-5xl', 'md:text-6xl', 'lg:text-7xl', 'font-extrabold', 'tracking-tight', 'leading-[1.15]', 'mb-6', 'hidden', 'sm:block', 'bg-gradient-to-r', 'from-blue-600', 'via-blue-500', 'to-cyan-400', 'bg-clip-text', 'text-transparent', 'text-lg', 'md:text-xl', 'text-slate-500', 'mb-10', 'max-w-2xl', 'mx-auto', 'leading-relaxed', 'flex', 'flex-col', 'sm:flex-row', 'items-center', 'justify-center', 'gap-4', 'group', 'w-full', 'sm:w-auto', 'inline-flex', 'items-center', 'justify-center', 'gap-2', 'px-8', 'py-4', 'text-base', 'font-semibold', 'text-white', 'rounded-full', 'bg-blue-600', 'hover:bg-blue-700', 'transition-all', 'duration-300', 'shadow-[0_8px_20px_rgba(37,99,235,0.25)]', 'hover:shadow-[0_12px_25px_rgba(37,99,235,0.35)]', 'hover:-translate-y-0.5', 'text-lg', 'transition-transform', 'duration-300', 'group-hover:translate-x-1', 'w-full', 'sm:w-auto', 'inline-flex', 'items-center', 'justify-center', 'gap-2', 'px-8', 'py-4', 'text-base', 'font-semibold', 'text-slate-600', 'rounded-full', 'bg-white', 'border', 'border-slate-200', 'hover:bg-slate-50', 'hover:border-slate-300', 'transition-all', 'duration-300', 'shadow-sm', 'hover:-translate-y-0.5', 'text-lg', 'mt-24', 'md:mt-32', 'grid', 'grid-cols-1', 'md:grid-cols-3', 'gap-8', 'transition-all', 'duration-1000', 'ease-out', 'delay-200', 'group', 'relative', 'p-8', 'rounded-3xl', 'bg-white', 'border', 'border-slate-100', 'shadow-[0_4px_20px_-4px_rgba(0,0,0,0.03)]', 'hover:shadow-[0_8px_30px_-4px_rgba(0,0,0,0.08)]', 'transition-all', 'duration-300', 'hover:-translate-y-1', 'absolute', 'top-0', 'left-0', 'w-full', 'h-1', 'bg-gradient-to-r', 'from-blue-500', 'to-cyan-400', 'opacity-0', 'group-hover:opacity-100', 'transition-opacity', 'duration-300', 'rounded-t-3xl', 'w-14', 'h-14', 'rounded-2xl', 'flex', 'items-center', 'justify-center', 'mb-6', 'transition-transform', 'duration-300', 'group-hover:scale-110', 'group-hover:rotate-3', 'text-2xl', 'text-xl', 'font-bold', 'text-slate-800', 'mb-3', 'text-slate-500', 'leading-relaxed',];
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
            ArrowRight: ArrowRight,
            Position: Position,
            router: router,
            isHeroVisible: isHeroVisible,
            isFeaturesVisible: isFeaturesVisible,
            features: features,
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
//# sourceMappingURL=HomeView.vue.js.map