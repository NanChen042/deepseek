<script setup lang="ts">
import { ref } from 'vue'
import { useConfigStore } from '@/stores/config'
import { Setting, InfoFilled } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'

const configStore = useConfigStore()
const dialogVisible = ref(false)

const form = ref({
  deepseekApiKey: configStore.config.deepseekApiKey,
  siliconFlowApiKey: configStore.config.siliconFlowApiKey
})

const handleSave = () => {
  configStore.setDeepSeekKey(form.value.deepseekApiKey)
  configStore.setSiliconFlowKey(form.value.siliconFlowApiKey)
  ElMessage.success('配置已保存')
  dialogVisible.value = false
}

// 检查是否为内置密钥
const isDeepSeekDefault = (key: string) => key === import.meta.env.VITE_DEEPSEEK_API_KEY
const isSiliconFlowDefault = (key: string) => key === import.meta.env.VITE_SILICONFLOW_API_KEY

const show = () => {
  form.value.deepseekApiKey = configStore.config.deepseekApiKey
  form.value.siliconFlowApiKey = configStore.config.siliconFlowApiKey
  dialogVisible.value = true
}

defineExpose({
  show
})
</script>

<template>
  <el-dialog
    v-model="dialogVisible"
    title="系统设置与 API 配置"
    width="550px"
    class="settings-dialog"
    append-to-body
  >
    <div class="mb-6 p-4 rounded-xl bg-blue-50/50 border border-blue-100 flex items-start gap-3">
       <el-icon class="text-blue-500 mt-0.5 text-lg"><InfoFilled /></el-icon>
       <div class="text-[13px] text-slate-600 leading-relaxed">
          <p class="font-bold text-slate-800 mb-1">关于密钥配置</p>
          系统会自动检测内置密钥。如果您拥有个人密钥，可以在下方输入并保存，您的私有密钥将优先于系统默认密钥生效。
       </div>
    </div>

    <el-form :model="form" label-position="top" class="premium-form">
      <el-form-item>
        <template #label>
          <div class="flex items-center justify-between w-full">
            <span class="font-bold text-slate-700">DeepSeek API Key</span>
            <el-tag v-if="isDeepSeekDefault(form.deepseekApiKey)" size="small" type="success" effect="plain" class="border-none bg-emerald-50 text-emerald-600 font-bold scale-90">
              内置密钥已启用
            </el-tag>
            <el-tag v-else-if="form.deepseekApiKey" size="small" type="primary" effect="plain" class="border-none bg-blue-50 text-blue-600 font-bold scale-90">
              个人密钥已就绪
            </el-tag>
          </div>
        </template>
        <el-input
          v-model="form.deepseekApiKey"
          placeholder="请输入您的 DeepSeek API Key (sk-...)"
          show-password
          type="password"
          class="premium-input"
        />
        <div class="text-[12px] text-slate-400 mt-2 flex items-center justify-between">
           <span>用于对话与深度思考功能</span>
           <a href="https://platform.deepseek.com/" target="_blank" class="text-blue-500 hover:text-blue-600 transition-colors font-medium">获取密钥 →</a>
        </div>
      </el-form-item>
      
      <el-form-item class="mt-8">
        <template #label>
          <div class="flex items-center justify-between w-full">
            <span class="font-bold text-slate-700">SiliconFlow API Key</span>
            <el-tag v-if="isSiliconFlowDefault(form.siliconFlowApiKey)" size="small" type="success" effect="plain" class="border-none bg-emerald-50 text-emerald-600 font-bold scale-90">
              内置密钥已启用
            </el-tag>
            <el-tag v-else-if="form.siliconFlowApiKey" size="small" type="primary" effect="plain" class="border-none bg-blue-50 text-blue-600 font-bold scale-90">
              个人密钥已就绪
            </el-tag>
          </div>
        </template>
        <el-input
          v-model="form.siliconFlowApiKey"
          placeholder="请输入您的 SiliconFlow API Key (sk-...)"
          show-password
          type="password"
          class="premium-input"
        />
        <div class="text-[12px] text-slate-400 mt-2 flex items-center justify-between">
           <span>用于 AI 图像生成功能</span>
           <a href="https://cloud.siliconflow.cn/" target="_blank" class="text-blue-500 hover:text-blue-600 transition-colors font-medium">获取密钥 →</a>
        </div>
      </el-form-item>
    </el-form>
    
    <template #footer>
      <div class="flex justify-end gap-3">
        <el-button @click="dialogVisible = false">取消</el-button>
        <el-button type="primary" @click="handleSave">保存配置</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped>
:deep(.settings-dialog) {
  border-radius: 16px;
  overflow: hidden;
}

:deep(.el-dialog__header) {
  margin-right: 0;
  padding: 20px 24px;
  border-bottom: 1px solid #f1f5f9;
}

:deep(.el-dialog__title) {
  font-weight: 600;
  color: #1e293b;
}

:deep(.el-dialog__body) {
  padding: 24px;
}

:deep(.el-form-item__label) {
  font-weight: 500;
  color: #475569;
}

:deep(.premium-input .el-input__wrapper) {
  box-shadow: 0 0 0 1px #e2e8f0 inset !important;
  border-radius: 10px;
  padding: 8px 12px;
  background-color: #f8fafc;
  transition: all 0.2s ease;
}

:deep(.premium-input .el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #cbd5e1 inset !important;
  background-color: #ffffff;
}

:deep(.el-form-item) {
  margin-bottom: 12px;
}
</style>
