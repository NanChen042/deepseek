import { defineStore } from 'pinia';
import { ref, watch } from 'vue';
import { aiService, ModelType } from '@/services/aiService';
const STORAGE_KEY = 'deepseek_chat_history';
export const useChatStore = defineStore('chat', () => {
    // 从 localStorage 恢复历史记录，如果没有则使用初始欢迎语
    const loadMessages = () => {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            if (stored) {
                return JSON.parse(stored);
            }
        }
        catch (e) {
            console.error('Failed to parse chat history', e);
        }
        return [{
                role: 'assistant',
                content: '你好！我是Deepseek 官方 AI 模型，具备强大的思考推理与代码编写能力，有什么我可以帮你的？'
            }];
    };
    const messages = ref(loadMessages());
    const loading = ref(false);
    // 自动保存所有的消息到 localStorage
    watch(() => messages.value, (newVals) => {
        // 只有在非加载态（即生成完毕后）持久化，或者可以在这随时持久化
        localStorage.setItem(STORAGE_KEY, JSON.stringify(newVals));
    }, { deep: true });
    // 真正的流式发送逻辑
    const streamMessage = async (newMessages) => {
        loading.value = true;
        // 添加一个空的 assistant 消息用于接收流式数据
        messages.value.push({
            role: 'assistant',
            content: '',
            reasoning_content: ''
        });
        const targetIdx = messages.value.length - 1;
        try {
            await aiService.streamChat(newMessages, (chunk) => {
                if (chunk.reasoning_content) {
                    messages.value[targetIdx].reasoning_content = (messages.value[targetIdx].reasoning_content || '') + chunk.reasoning_content;
                }
                if (chunk.content) {
                    messages.value[targetIdx].content += chunk.content;
                }
            });
        }
        catch (error) {
            console.error('Error during streaming:', error);
            messages.value[targetIdx].content += '\n\n**[网络连接中断致使回答未完成，或者发生了 API 错误]**';
            throw error;
        }
        finally {
            loading.value = false;
        }
    };
    // 发送消息
    const sendMessage = async (message) => {
        messages.value.push({
            role: 'user',
            content: message
        });
        // 去除特定无用属性以防API报错，转化成传输格式
        const payload = messages.value.map(m => ({
            role: m.role,
            content: m.content,
            prefix: m.prefix
        }));
        await streamMessage(payload);
    };
    // 前缀续写：继续由AI完成当前的回答
    const continueGenerating = async (prefixText) => {
        // 将最后一条消息改为包含前缀，然后发起请求
        const latestMessage = messages.value[messages.value.length - 1];
        if (latestMessage.role !== 'assistant') {
            messages.value.push({ role: 'assistant', content: prefixText, prefix: true });
        }
        else {
            latestMessage.content = prefixText;
            latestMessage.prefix = true;
        }
        const payload = messages.value.map(m => ({
            role: m.role,
            content: m.content,
            prefix: m.prefix
        }));
        // 因为我们是前缀续写，不要新加一行 Assistant 消息，而是复用最后一行
        loading.value = true;
        const targetIdx = messages.value.length - 1;
        // 取消 prefix 的 true 状态，以便之后可以正常使用
        messages.value[targetIdx].prefix = undefined;
        try {
            await aiService.streamChat(payload, (chunk) => {
                if (chunk.content) {
                    messages.value[targetIdx].content += chunk.content;
                }
            });
        }
        catch (error) {
            console.error('Error doing prefix completion:', error);
            throw error;
        }
        finally {
            loading.value = false;
        }
    };
    // 清空对话
    const clearChat = () => {
        messages.value = [{
                role: 'assistant',
                content: '你好！我是Deepseek 官方 AI 模型，具备强大的思考推理与代码编写能力，有什么我可以帮你的？'
            }];
    };
    // 切换模型
    const switchModel = (model) => {
        aiService.updateConfig({
            model,
            system_message: model === ModelType.Reasoner
                ? '你是一个专注于逻辑推理和问题分析的Deepseek。不要在回答中过早下结论。'
                : '你是一个友好的中文助手。'
        });
    };
    return {
        messages,
        loading,
        sendMessage,
        continueGenerating,
        clearChat,
        switchModel
    };
});
//# sourceMappingURL=chat.js.map