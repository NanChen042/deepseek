import { ref, nextTick } from 'vue';
import { ElMessage } from 'element-plus';
import { aiService, ModelType } from '../services/aiService';
const messages = ref([
    {
        role: 'assistant',
        content: '你好！我是 DeepSeek 流式输出模式，文字会实时生成。你可以问我任何问题。',
        reasoning_content: ''
    }
]);
const loading = ref(false);
// 处理模型切换
const handleModelChange = (model) => {
    aiService.updateConfig({
        model,
        stream: true,
        system_message: model === ModelType.Reasoner
            ? '你是一个专注于逻辑推理和问题分析的Deepseek。'
            : '你是一个友好的中文助手。'
    });
    ElMessage.success(`已切换至 ${model === ModelType.Reasoner ? 'DeepSeek-R1 (推理增强)' : 'DeepSeek-V3 (通用对话)'}`);
};
// 核心发送逻辑
const handleSend = async (message) => {
    // 1. 添加用户消息
    messages.value.push({ role: 'user', content: message });
    loading.value = true;
    // 2. 预先推入一个空的 AI 回复占位（包含 content 和 reasoning_content）
    const assistantMessage = {
        role: 'assistant',
        content: '',
        reasoning_content: ''
    };
    messages.value.push(assistantMessage);
    try {
        // 3. 调用流式接口
        await aiService.streamChat(messages.value.slice(0, -1), async (chunk) => {
            let hasUpdate = false;
            // 实时追加正文内容
            if (chunk.content) {
                assistantMessage.content += chunk.content;
                hasUpdate = true;
            }
            // 实时追加思考过程内容
            if (chunk.reasoning_content) {
                assistantMessage.reasoning_content += chunk.reasoning_content;
                hasUpdate = true;
            }
            if (hasUpdate) {
                // 关键点：创建一个新数组触发 Vue 深度响应，同时也触发 ChatContainer 的滚动监听
                messages.value = [...messages.value];
                await nextTick();
            }
        });
    }
    catch (error) {
        console.error('流式输出错误:', error);
        ElMessage.error('网络或服务异常，请重试');
        messages.value.pop(); // 发送失败时撤回那个空的 AI 气泡
    }
    finally {
        loading.value = false;
    }
};
// 清除聊天记录
const clearChat = () => {
    messages.value = [{
            role: 'assistant',
            content: '对话已清空。我们可以重新开始了。'
        }];
}; /* PartiallyEnd: #3632/scriptSetup.vue */
function __VLS_template() {
    const __VLS_ctx = {};
    let __VLS_components;
    let __VLS_directives;
    // CSS variable injection 
    // CSS variable injection end 
    __VLS_elementAsFunction(__VLS_intrinsicElements.div, __VLS_intrinsicElements.div)({
        ...{ class: ("h-[calc(100vh-72px)] w-full bg-white") },
    });
    const __VLS_0 = {}.ChatContainer;
    /** @type { [typeof __VLS_components.ChatContainer, ] } */ ;
    // @ts-ignore
    const __VLS_1 = __VLS_asFunctionalComponent(__VLS_0, new __VLS_0({
        ...{ 'onSend': {} },
        ...{ 'onClear': {} },
        ...{ 'onModelChange': {} },
        title: ("DeepSeek 流式输出"),
        messages: ((__VLS_ctx.messages)),
        loading: ((__VLS_ctx.loading)),
        streamMode: ((true)),
    }));
    const __VLS_2 = __VLS_1({
        ...{ 'onSend': {} },
        ...{ 'onClear': {} },
        ...{ 'onModelChange': {} },
        title: ("DeepSeek 流式输出"),
        messages: ((__VLS_ctx.messages)),
        loading: ((__VLS_ctx.loading)),
        streamMode: ((true)),
    }, ...__VLS_functionalComponentArgsRest(__VLS_1));
    let __VLS_6;
    const __VLS_7 = {
        onSend: (__VLS_ctx.handleSend)
    };
    const __VLS_8 = {
        onClear: (__VLS_ctx.clearChat)
    };
    const __VLS_9 = {
        onModelChange: (__VLS_ctx.handleModelChange)
    };
    let __VLS_3;
    let __VLS_4;
    var __VLS_5;
    ['h-[calc(100vh-72px)]', 'w-full', 'bg-white',];
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
            messages: messages,
            loading: loading,
            handleModelChange: handleModelChange,
            handleSend: handleSend,
            clearChat: clearChat,
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
//# sourceMappingURL=StreamView.vue.js.map