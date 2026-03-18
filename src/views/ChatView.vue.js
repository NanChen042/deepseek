import { ElMessage, ElMessageBox } from 'element-plus';
import { useChatStore } from '../stores/chat';
import { ModelType } from '@/services/aiService';
const chatStore = useChatStore();
// 处理模型切换
const handleModelChange = (model) => {
    chatStore.switchModel(model);
    ElMessage.success(`已切换至 ${model === ModelType.Reasoner ? '推理增强模型' : '通用对话模型'}`);
};
const handleSend = async (message) => {
    try {
        await chatStore.sendMessage(message);
    }
    catch (error) {
        ElMessage.error({
            message: '服务器无响应，请刷新重试',
            duration: 5000,
            showClose: true
        });
        ElMessageBox.confirm('服务器连接失败，是否刷新页面重试？', '连接错误', {
            confirmButtonText: '刷新页面',
            cancelButtonText: '取消',
            type: 'warning'
        })
            .then(() => {
            window.location.reload();
        })
            .catch(() => {
            // 用户取消刷新
        });
    }
};
const handleContinue = async (prefix) => {
    try {
        await chatStore.continueGenerating(prefix);
    }
    catch (error) {
        ElMessage.error({
            message: '续写请求失败，请稍后重试',
            duration: 3000,
            showClose: true
        });
    }
}; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("p-5 bg-[#f5f7fa] h-[calc(100vh-60px)] overflow-hidden box-border [&_.message-content]:leading-[1.6]") },
    });
    const __VLS_0 = {}.ChatContainer;
    /** @type { [typeof __VLS_components.ChatContainer, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onSend': {} },
        ...{ 'onContinue': {} },
        ...{ 'onClear': {} },
        ...{ 'onModelChange': {} },
        title: ("Deepseek Chat"),
        messages: ((__VLS_ctx.chatStore.messages)),
        loading: ((__VLS_ctx.chatStore.loading)),
        preventEnterNewline: ((true)),
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onSend': {} },
        ...{ 'onContinue': {} },
        ...{ 'onClear': {} },
        ...{ 'onModelChange': {} },
        title: ("Deepseek Chat"),
        messages: ((__VLS_ctx.chatStore.messages)),
        loading: ((__VLS_ctx.chatStore.loading)),
        preventEnterNewline: ((true)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_6;
    const __VLS_7 = {
        onSend: (__VLS_ctx.handleSend)
    };
    const __VLS_8 = {
        onContinue: (__VLS_ctx.handleContinue)
    };
    const __VLS_9 = {
        onClear: (__VLS_ctx.chatStore.clearChat)
    };
    const __VLS_10 = {
        onModelChange: (__VLS_ctx.handleModelChange)
    };
    let __VLS_3;
    let __VLS_4;
    var __VLS_5;
    ['p-5', 'bg-[#f5f7fa]', 'h-[calc(100vh-60px)]', 'overflow-hidden', 'box-border', '[&_.message-content]:leading-[1.6]',];
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
            chatStore: chatStore,
            handleModelChange: handleModelChange,
            handleSend: handleSend,
            handleContinue: handleContinue,
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
//# sourceMappingURL=ChatView.vue.js.map