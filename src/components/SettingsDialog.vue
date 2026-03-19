<script setup lang="ts">
import { ref } from 'vue'
import { useConfigStore } from '@/stores/config'
import { Setting } from '@element-plus/icons-vue'
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
    title="API 配置"
    width="500px"
    class="settings-dialog"
    append-to-body
  >
    <el-form :model="form" label-position="top">
      <el-form-item label="DeepSeek API Key">
        <el-input
          v-model="form.deepseekApiKey"
          placeholder="请输入 DeepSeek API Key (sk-...)"
          show-password
          type="password"
        />
        <div class="text-xs text-slate-400 mt-1">
          用于对话和推理功能。可以从 <a href="https://platform.deepseek.com/" target="_blank" class="text-blue-500 hover:underline">DeepSeek 开放平台</a> 获取。
        </div>
      </el-form-item>
      
      <el-form-item label="SiliconFlow API Key">
        <el-input
          v-model="form.siliconFlowApiKey"
          placeholder="请输入 SiliconFlow API Key (sk-...)"
          show-password
          type="password"
        />
        <div class="text-xs text-slate-400 mt-1">
          用于图像生成功能。可以从 <a href="https://cloud.siliconflow.cn/" target="_blank" class="text-blue-500 hover:underline">SiliconFlow</a> 获取。
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

:deep(.el-input__wrapper) {
  box-shadow: 0 0 0 1px #e2e8f0 inset;
  border-radius: 8px;
  padding: 4px 12px;
}

:deep(.el-input__wrapper.is-focus) {
  box-shadow: 0 0 0 1px #3b82f6 inset;
}
</style>
