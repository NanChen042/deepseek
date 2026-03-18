import { ref, computed } from "vue";
import { CopyDocument, Select, ArrowRight } from "@element-plus/icons-vue";
import deepseekLogo from "@/assets/deepseeklogo.svg";
import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github-dark-dimmed.css";
const props = defineProps();
const emit = defineEmits();
const md = new MarkdownIt({
    html: true,
    linkify: true,
    breaks: true,
    highlight: function (str, lang) {
        if (lang && hljs.getLanguage(lang)) {
            try {
                return `<pre class="hljs p-4 rounded-xl overflow-x-auto text-sm leading-normal"><code>${hljs.highlight(str, { language: lang, ignoreIllegals: true }).value}</code></pre>`;
            }
            catch (__) { }
        }
        return `<pre class="hljs p-4 rounded-xl overflow-x-auto text-sm leading-normal"><code>${md.utils.escapeHtml(str)}</code></pre>`;
    },
});
const renderedContent = computed(() => md.render(props.content || ""));
const renderedReasoning = computed(() => md.render(props.reasoningContent || ""));
const isCopied = ref(false);
const handleCopy = async () => {
    if (!props.content)
        return;
    try {
        await navigator.clipboard.writeText(props.content);
        isCopied.value = true;
        setTimeout(() => {
            isCopied.value = false;
        }, 2000);
    }
    catch (err) {
        console.error("复制失败:", err);
    }
};
; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['custom-markdown', 'custom-markdown', 'custom-markdown', 'custom-markdown', 'custom-markdown', 'custom-markdown', 'custom-markdown', 'custom-markdown', 'custom-markdown', 'custom-markdown', 'custom-markdown', 'custom-markdown', 'custom-markdown', 'custom-markdown', 'custom-markdown', 'custom-markdown', 'custom-markdown', 'custom-markdown', 'custom-markdown', 'custom-markdown', 'custom-markdown', 'custom-markdown', 'custom-markdown',];
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("w-full flex transition-all") },
        ...{ class: (([
                __VLS_ctx.isUser ? 'justify-end' : 'justify-start',
                __VLS_ctx.isLastMessage ? 'pb-20' : ''
            ])) },
    });
    if (__VLS_ctx.isUser) {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("relative max-w-[85%] md:max-w-[75%]") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("px-5 py-3.5 bg-slate-100 text-slate-800 rounded-3xl rounded-tr-sm text-[15px] leading-relaxed break-words shadow-sm") },
        });
        (__VLS_ctx.content);
    }
    else {
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex w-full group") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("w-8 h-8 md:w-10 md:h-10 rounded-full border border-slate-200 flex items-center justify-center bg-white shadow-sm shrink-0 mt-1 md:mt-0 relative overflow-hidden") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.img)({
            src: ((__VLS_ctx.deepseekLogo)),
            alt: ("AI Avatar"),
            ...{ class: ("w-5 h-5 md:w-6 md:h-6 object-contain") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex-1 min-w-0 ml-4 max-w-[calc(100%-3rem)]") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("text-sm font-semibold text-slate-700 mb-1.5 flex items-center gap-2") },
        });
        if (__VLS_ctx.loading && __VLS_ctx.isLastMessage) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: ("w-1.5 h-3 bg-blue-500 animate-pulse") },
            });
        }
        if (__VLS_ctx.reasoningContent) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("mb-5") },
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.details, __VLS_intrinsicElements.details)({
                ...{ class: ("group/details border border-slate-200 rounded-xl bg-slate-50/50 overflow-hidden transition-all duration-300 open:bg-slate-50") },
                open: ((__VLS_ctx.loading && __VLS_ctx.isLastMessage)),
            });
            __VLS_elementAsFunction(__VLS_intrinsicElements.summary, __VLS_intrinsicElements.summary)({
                ...{ class: ("flex items-center gap-2 px-4 py-2.5 cursor-pointer list-none select-none text-slate-500 hover:text-slate-700 transition-colors") },
            });
            const __VLS_0 = {}.ElIcon;
            /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
            // @ts-ignore
            const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
                ...{ class: ("text-sm transition-transform duration-300 group-open/details:rotate-90") },
            }));
            const __VLS_2 = __VLS_1({
                ...{ class: ("text-sm transition-transform duration-300 group-open/details:rotate-90") },
            }, ...__VLS_functionalComponentArgsRest(__VLS_1));
            const __VLS_6 = {}.ArrowRight;
            /** @type { [typeof __VLS_components.ArrowRight, ] } */ ;
            // @ts-ignore
            const __VLS_7 = __VLS_asFunctionalComponent(__VLS_6, new __VLS_6({}));
            const __VLS_8 = __VLS_7({}, ...__VLS_functionalComponentArgsRest(__VLS_7));
            __VLS_5.slots.default;
            var __VLS_5;
            __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                ...{ class: ("text-sm font-medium") },
            });
            if (__VLS_ctx.loading && __VLS_ctx.isLastMessage) {
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: ("text-xs text-slate-400 ml-auto flex items-center gap-1") },
                });
                __VLS_elementAsFunction(__VLS_intrinsicElements.span, __VLS_intrinsicElements.span)({
                    ...{ class: ("animate-bounce") },
                });
            }
            __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
                ...{ class: ("px-5 pb-4 pt-2 text-sm text-slate-500 border-t border-slate-200/60 mt-1 custom-markdown opacity-90") },
            });
            __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.renderedReasoning) }, null, null);
        }
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("text-[15px] text-slate-800 break-words custom-markdown") },
        });
        __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.renderedContent) }, null, null);
        __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
            ...{ class: ("flex items-center gap-2 mt-3 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-200") },
        });
        __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
            ...{ onClick: (__VLS_ctx.handleCopy) },
            ...{ class: ("flex items-center justify-center w-7 h-7 rounded-md text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors bg-white shadow-sm md:shadow-none md:bg-transparent") },
            title: ((__VLS_ctx.isCopied ? '已复制' : '复制内容')),
        });
        if (__VLS_ctx.isCopied) {
            const __VLS_12 = {}.ElIcon;
            /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
            // @ts-ignore
            const __VLS_13 = __VLS_asFunctionalComponent(__VLS_12, new __VLS_12({
                ...{ class: ("text-green-500") },
            }));
            const __VLS_14 = __VLS_13({
                ...{ class: ("text-green-500") },
            }, ...__VLS_functionalComponentArgsRest(__VLS_13));
            const __VLS_18 = {}.Select;
            /** @type { [typeof __VLS_components.Select, ] } */ ;
            // @ts-ignore
            const __VLS_19 = __VLS_asFunctionalComponent(__VLS_18, new __VLS_18({}));
            const __VLS_20 = __VLS_19({}, ...__VLS_functionalComponentArgsRest(__VLS_19));
            __VLS_17.slots.default;
            var __VLS_17;
        }
        else {
            const __VLS_24 = {}.ElIcon;
            /** @type { [typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, typeof __VLS_components.ElIcon, typeof __VLS_components.elIcon, ] } */ ;
            // @ts-ignore
            const __VLS_25 = __VLS_asFunctionalComponent(__VLS_24, new __VLS_24({}));
            const __VLS_26 = __VLS_25({}, ...__VLS_functionalComponentArgsRest(__VLS_25));
            const __VLS_30 = {}.CopyDocument;
            /** @type { [typeof __VLS_components.CopyDocument, ] } */ ;
            // @ts-ignore
            const __VLS_31 = __VLS_asFunctionalComponent(__VLS_30, new __VLS_30({}));
            const __VLS_32 = __VLS_31({}, ...__VLS_functionalComponentArgsRest(__VLS_31));
            __VLS_29.slots.default;
            var __VLS_29;
        }
        if (!__VLS_ctx.loading && __VLS_ctx.isLastMessage) {
            __VLS_elementAsFunction(__VLS_intrinsicElements.button, __VLS_intrinsicElements.button)({
                ...{ onClick: (...[$event]) => {
                        if (!(!((__VLS_ctx.isUser))))
                            return;
                        if (!((!__VLS_ctx.loading && __VLS_ctx.isLastMessage)))
                            return;
                        __VLS_ctx.$emit('continue', __VLS_ctx.content);
                    } },
                ...{ class: ("text-xs font-medium text-slate-500 px-3 py-1.5 rounded-md hover:bg-slate-100 transition-colors bg-white shadow-sm md:shadow-none md:bg-transparent border border-slate-200 md:border-transparent") },
            });
        }
    }
    ['w-full', 'flex', 'transition-all', 'relative', 'max-w-[85%]', 'md:max-w-[75%]', 'px-5', 'py-3.5', 'bg-slate-100', 'text-slate-800', 'rounded-3xl', 'rounded-tr-sm', 'text-[15px]', 'leading-relaxed', 'break-words', 'shadow-sm', 'flex', 'w-full', 'group', 'w-8', 'h-8', 'md:w-10', 'md:h-10', 'rounded-full', 'border', 'border-slate-200', 'flex', 'items-center', 'justify-center', 'bg-white', 'shadow-sm', 'shrink-0', 'mt-1', 'md:mt-0', 'relative', 'overflow-hidden', 'w-5', 'h-5', 'md:w-6', 'md:h-6', 'object-contain', 'flex-1', 'min-w-0', 'ml-4', 'max-w-[calc(100%-3rem)]', 'text-sm', 'font-semibold', 'text-slate-700', 'mb-1.5', 'flex', 'items-center', 'gap-2', 'w-1.5', 'h-3', 'bg-blue-500', 'animate-pulse', 'mb-5', 'group/details', 'border', 'border-slate-200', 'rounded-xl', 'bg-slate-50/50', 'overflow-hidden', 'transition-all', 'duration-300', 'open:bg-slate-50', 'flex', 'items-center', 'gap-2', 'px-4', 'py-2.5', 'cursor-pointer', 'list-none', 'select-none', 'text-slate-500', 'hover:text-slate-700', 'transition-colors', 'text-sm', 'transition-transform', 'duration-300', 'group-open/details:rotate-90', 'text-sm', 'font-medium', 'text-xs', 'text-slate-400', 'ml-auto', 'flex', 'items-center', 'gap-1', 'animate-bounce', 'px-5', 'pb-4', 'pt-2', 'text-sm', 'text-slate-500', 'border-t', 'border-slate-200/60', 'mt-1', 'custom-markdown', 'opacity-90', 'text-[15px]', 'text-slate-800', 'break-words', 'custom-markdown', 'flex', 'items-center', 'gap-2', 'mt-3', 'opacity-100', 'md:opacity-0', 'md:group-hover:opacity-100', 'transition-opacity', 'duration-200', 'flex', 'items-center', 'justify-center', 'w-7', 'h-7', 'rounded-md', 'text-slate-400', 'hover:text-slate-700', 'hover:bg-slate-100', 'transition-colors', 'bg-white', 'shadow-sm', 'md:shadow-none', 'md:bg-transparent', 'text-green-500', 'text-xs', 'font-medium', 'text-slate-500', 'px-3', 'py-1.5', 'rounded-md', 'hover:bg-slate-100', 'transition-colors', 'bg-white', 'shadow-sm', 'md:shadow-none', 'md:bg-transparent', 'border', 'border-slate-200', 'md:border-transparent',];
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
            CopyDocument: CopyDocument,
            Select: Select,
            ArrowRight: ArrowRight,
            deepseekLogo: deepseekLogo,
            renderedContent: renderedContent,
            renderedReasoning: renderedReasoning,
            isCopied: isCopied,
            handleCopy: handleCopy,
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
//# sourceMappingURL=MessageBubble.vue.js.map