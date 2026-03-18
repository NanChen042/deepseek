import { ref, watch, computed, onUnmounted } from 'vue';
// @ts-ignore
import MarkdownIt from 'markdown-it';
// 实例化markdown-it
const md = new MarkdownIt({
    html: true, // 启用HTML标签
    breaks: true, // 转换 '\n' 为 <br>
    linkify: true, // 自动转换URL为链接
    typographer: true, // 启用一些语言中性的替换和引号
    highlight: function (str, lang) {
        // 确保代码不会被转义
        const escapedStr = str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
        // 添加代码语言标识和复制按钮
        let languageClass = lang ? `language-${lang}` : '';
        let languageText = lang ? `<div class="code-language">${lang}</div>` : '';
        let copyButton = `<button class="copy-button" onclick="copyCode(this)">复制</button>`;
        return `<div class="code-block-wrapper">
              <div class="code-block-header">
                ${languageText}
                ${copyButton}
              </div>
              <pre class="${languageClass}"><code>${escapedStr}</code></pre>
            </div>`;
    }
});
const props = defineProps();
const emit = defineEmits();
// 组件状态
const displayText = ref('');
let currentIndex = 0;
let timer = null;
// 处理后的Markdown文本
const processedText = computed(() => md.render(displayText.value));
// 打字效果实现
const startTyping = () => {
    if (currentIndex < props.text.length) {
        displayText.value = props.text.slice(0, currentIndex + 1);
        emit('textUpdate', displayText.value);
        currentIndex++;
        timer = window.setTimeout(startTyping, props.speed || 30);
    }
    else {
        emit('complete');
    }
};
// 监听文本变化
watch(() => props.text, () => {
    if (timer) {
        clearTimeout(timer);
    }
    currentIndex = 0;
    displayText.value = '';
    timer = window.setTimeout(startTyping, props.delay || 0);
}, { immediate: true });
// 组件卸载时清理定时器
onUnmounted(() => {
    if (timer) {
        clearTimeout(timer);
    }
}); /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    ['markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'code-block-header', 'markdown-content', 'markdown-content', 'markdown-content', 'copy-button', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'markdown-content', 'code-block-header', 'markdown-content', 'code-language', 'markdown-content', 'copy-button', 'markdown-content',];
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("markdown-content") },
    });
    __VLS_asFunctionalDirective(__VLS_directives.vHtml)(null, { ...__VLS_directiveBindingRestFields, value: (__VLS_ctx.processedText) }, null, null);
    ['markdown-content',];
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
            processedText: processedText,
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
});
; /* PartiallyEnd: #4569/main.vue */
//# sourceMappingURL=TypeWriter.vue.js.map