import { defineStore } from 'pinia'
import { ref, watch, computed } from 'vue'
import { aiService, ModelType, ChatCompletionRequestMessage, MultimodalContent, isVLMModel } from '@/services/aiService'
import { imageService } from '@/services/imageService'

export interface MessageAsset {
  type: 'image' | 'video' | 'audio' | 'pdf'
  url: string // Base64 or ObjectURL
  name?: string
}

export interface Message {
  role: 'user' | 'assistant' | 'system'
  type: 'text' | 'image'
  content: string
  reasoning_content?: string
  images?: string[] // Generated images (Art)
  assets?: MessageAsset[] // Input assets (Multimodal)
  progress?: number
  loading?: boolean
  batchSize?: number
  usage?: {
    total_tokens: number
    speed: number // tokens/s
  }
}

export interface ChatSession {
  id: string
  title: string
  messages: Message[]
  updatedAt: number
  model?: string // Session-specific model
}

const STORAGE_KEY = 'deepseek_chat_sessions'

export const useChatStore = defineStore('chat', () => {
  const loadSessions = (): ChatSession[] => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) return JSON.parse(stored)
    } catch (e) {
      console.error('Failed to parse chat sessions', e)
    }
    return []
  }

  const sessions = ref<ChatSession[]>(loadSessions())
  const activeSessionId = ref<string>(sessions.value[0]?.id || '')
  const loading = ref(false)
  const currentModel = ref<ModelType>(ModelType.V3)

  const activeSession = computed(() => 
    sessions.value.find(s => s.id === activeSessionId.value)
  )

  const messages = computed(() => activeSession.value?.messages || [])

  // 用于控制中断正在进行中的请求
  const activeAbortController = ref<AbortController | null>(null)

  const abortGeneration = () => {
    if (activeAbortController.value) {
      activeAbortController.value.abort()
      activeAbortController.value = null
    }
    loading.value = false
  }

  watch(sessions, (newSessions) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newSessions))
  }, { deep: true })

  const createSession = (initialTitle = '新对话'): string => {
    abortGeneration() // 打断当前生成
    const id = Date.now().toString()
    sessions.value.unshift({ id, title: initialTitle, messages: [], updatedAt: Date.now() })
    activeSessionId.value = id
    return id
  }

  const switchSession = (id: string) => { 
    abortGeneration() // 打断当前生成
    activeSessionId.value = id 
  }
  
  const deleteSession = (id: string) => {
    const index = sessions.value.findIndex(s => s.id === id)
    if (index !== -1) {
      if (activeSessionId.value === id) abortGeneration() // 如果删除的是当前正在生成的会话，则打断
      sessions.value.splice(index, 1)
      if (activeSessionId.value === id) activeSessionId.value = sessions.value[0]?.id || ''
    }
  }

  const updateSessionTitle = (sessionId: string, text: string) => {
    const session = sessions.value.find(s => s.id === sessionId)
    if (session && session.title === '新对话') {
      session.title = text.slice(0, 20) || '新对话'
    }
  }

  // --- TEXT STREAMING WITH METRICS ---
  const streamMessage = async (sessionId: string, payload: ChatCompletionRequestMessage[]) => {
    const session = sessions.value.find(s => s.id === sessionId)
    if (!session) return

    loading.value = true
    
    // 初始化 AbortController
    abortGeneration()
    const controller = new AbortController()
    activeAbortController.value = controller

    session.messages.push({ role: 'assistant', type: 'text', content: '', reasoning_content: '', loading: true })
    const targetIdx = session.messages.length - 1
    
    // Track timing for speed calculation
    const startTime = performance.now()

    try {
      await aiService.streamChat(payload, (chunk) => {
        if (chunk.reasoning_content) {
          session.messages[targetIdx].reasoning_content = (session.messages[targetIdx].reasoning_content || '') + chunk.reasoning_content
        }
        if (chunk.content) {
          session.messages[targetIdx].content += chunk.content
        }
        
        // Update usage and calculate speed
        if (chunk.usage) {
          const endTime = performance.now()
          const durationSec = (endTime - startTime) / 1000
          session.messages[targetIdx].usage = {
            total_tokens: chunk.usage.total_tokens,
            speed: parseFloat((chunk.usage.completion_tokens / durationSec).toFixed(2))
          }
        }
        session.updatedAt = Date.now()
      }, { signal: controller.signal })
    } catch (error: any) {
      if (error.name === 'AbortError') {
        console.log('User naturally aborted the stream.')
        return
      }
      console.error('Error during streaming:', error)
      session.messages[targetIdx].content += '\n\n**[网络连接中断]**'
      throw error
    } finally {
      if (activeAbortController.value === controller) {
        activeAbortController.value = null
        loading.value = false
      }
      if (session.messages[targetIdx]) {
        session.messages[targetIdx].loading = false
      }
    }
  }

  // --- IMAGE GENERATION (ART STUDIO) ---
  const generateImageInChat = async (sessionId: string, prompt: string, options: any = {}) => {
    const session = sessions.value.find(s => s.id === sessionId)
    if (!session) return

    loading.value = true
    
    session.messages.push({
      role: 'assistant',
      type: 'image',
      content: '正在为您创作艺术画作...',
      images: [],
      loading: true,
      progress: 0,
      batchSize: options.batch_size || 1
    })
    const targetIdx = session.messages.length - 1

    try {
      const progInt = setInterval(() => {
        if (session.messages[targetIdx].progress! < 90) {
          session.messages[targetIdx].progress! += 5
        }
      }, 800)

      const response = await imageService.generateImage({
        prompt,
        image_size: options.size || '1024x1024',
        num_inference_steps: options.steps || 20,
        batch_size: options.batch_size || 1,
        guidance_scale: options.guidance_scale || 7.5,
        negative_prompt: options.negative_prompt || '',
        seed: options.seed ? parseInt(options.seed) : undefined,
        image: options.image || undefined
      })

      clearInterval(progInt)
      
      session.messages[targetIdx].images = (response.images || []).map(img => img.url)
      session.messages[targetIdx].progress = 100
      session.messages[targetIdx].content = '绘制完成'
      session.messages[targetIdx].loading = false
      session.updatedAt = Date.now()
    } catch (error: any) {
      console.error('Image gen error:', error)
      session.messages[targetIdx].content = `图像生成失败: ${error.message || '未知错误'}`
      session.messages[targetIdx].loading = false
      throw error
    } finally {
      loading.value = false
    }
  }

  // --- MULTIMODAL SENDING ---
  const sendMessage = async (message: string, mode: 'chat' | 'image' = 'chat', options: any = {}) => {
    if (!activeSessionId.value) createSession()
    const sessionId = activeSessionId.value
    const session = sessions.value.find(s => s.id === sessionId)
    if (!session) return

    if (session.messages.length === 0) updateSessionTitle(sessionId, message)

    const assets: MessageAsset[] = options.assets || []
    session.messages.push({ 
      role: 'user', 
      type: mode === 'image' ? 'image' : 'text', 
      content: message,
      assets: assets.length > 0 ? assets : undefined
    })

    if (mode === 'image') {
      await generateImageInChat(sessionId, message, options)
    } else {
      // Build Payload based on model capabilities
      const isVLM = isVLMModel(currentModel.value)

      const payload: ChatCompletionRequestMessage[] = session.messages
        .filter(m => m.type === 'text')
        .map(m => {
          // Case 1: Model supports Multimodal and message has assets
          if (isVLM && m.assets && m.assets.length > 0) {
            const contentParts: MultimodalContent[] = []
            
            // Add media first
            m.assets.forEach(asset => {
              if (asset.type === 'image' || asset.type === 'pdf') {
                contentParts.push({ type: 'image_url', image_url: { url: asset.url, detail: 'high' } })
              } else if (asset.type === 'audio') {
                contentParts.push({ type: 'audio_url', audio_url: { url: asset.url } })
              } else if (asset.type === 'video') {
                contentParts.push({ type: 'video_url', video_url: { url: asset.url, detail: 'high' } })
              }
            })

            // No manual tagging needed for SiliconFlow API
            const textContent = m.content

            // Add text part
            contentParts.push({ type: 'text', text: textContent })
            return { role: m.role, content: contentParts }
          }
          
          // Case 2: Model is TEXT-ONLY or message has no assets
          return { role: m.role, content: m.content }
        })

      await streamMessage(sessionId, payload)
    }
  }

  // --- REGENERATE MESSAGE ---
  const regenerateMessage = async (index: number) => {
    if (!activeSessionId.value) return
    const sessionId = activeSessionId.value
    const session = sessions.value.find(s => s.id === sessionId)
    if (!session || !session.messages[index]) return
    
    // Drop the target assistant message and anything after it
    session.messages.splice(index)
    
    // Build context payload up to the user message
    const isVLM = isVLMModel(currentModel.value)
    const payload: ChatCompletionRequestMessage[] = session.messages
      .filter(m => m.type === 'text')
      .map(m => {
        if (isVLM && m.assets && m.assets.length > 0) {
          const contentParts: MultimodalContent[] = []
          m.assets.forEach(asset => {
            if (asset.type === 'image' || asset.type === 'pdf') {
              contentParts.push({ type: 'image_url', image_url: { url: asset.url, detail: 'high' } })
            } else if (asset.type === 'audio') {
              contentParts.push({ type: 'audio_url', audio_url: { url: asset.url } })
            } else if (asset.type === 'video') {
              contentParts.push({ type: 'video_url', video_url: { url: asset.url, detail: 'high' } })
            }
          })
          contentParts.push({ type: 'text', text: m.content })
          return { role: m.role, content: contentParts }
        }
        return { role: m.role, content: m.content }
      })

    await streamMessage(sessionId, payload)
  }

  const clearChat = () => {
    if (activeSession.value) {
      activeSession.value.messages = []
      activeSession.value.title = '新对话'
    }
  }

  const switchModel = (model: ModelType) => {
    if (!model) return
    currentModel.value = model
    aiService.updateConfig({ model })
    ElMessage({
      message: `已切换至：${model.split('/').pop()}`,
      type: 'success',
      plain: true,
      duration: 1500
    })
  }

  return {
    sessions,
    activeSessionId,
    activeSession,
    messages,
    loading,
    currentModel,
    createSession,
    switchSession,
    deleteSession,
    sendMessage,
    regenerateMessage,
    clearChat,
    switchModel
  }
})
