<template>
  <div class="grid grid-cols-3 sm:grid-cols-4 lg:grid-cols-3 gap-2.5 w-full">

    <button v-for="value in imageSizeOptions" :key="value.value" type="button" @click="$emit('update:modelValue', value.value)" :class="[
        'group relative flex flex-col items-center justify-center py-3 px-1 rounded-2xl border transition-all duration-300 ease-out outline-none',
        modelValue === value.value
          ? 'bg-blue-50/60 border-blue-500 shadow-[0_4px_12px_-4px_rgba(59,130,246,0.3)] ring-1 ring-blue-500/50 scale-[1.02]' 
          : 'bg-slate-50/50 border-slate-200 hover:bg-white hover:border-slate-300 hover:shadow-sm'
      ]">
      <div class="w-10 h-10 flex items-center justify-center mb-2">
        <div :class="[
            'transition-all duration-300 rounded-[3px] ring-1 ring-black/5',
            value.ratio,
            modelValue === value.value 
              ? 'bg-blue-500 shadow-sm scale-110' 
              : 'bg-slate-300 group-hover:bg-slate-400'
          ]"></div>
      </div>

      <span :class="[
          'text-[11px] font-semibold tracking-wide transition-colors',
          modelValue === value.value ? 'text-blue-600' : 'text-slate-500'
        ]">
        {{ value.label }}
      </span>

      <div v-if="modelValue === value.value" class="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-blue-500"></div>
    </button>

  </div>
</template>

<script setup lang="ts">
// 确保这个路径正确引入了你的配置
import { imageSizeOptions } from "../config/imageConfig";

defineProps<{
  modelValue: string;
}>();

defineEmits<{
  (e: "update:modelValue", value: string): void;
}>();
</script>

<style scoped>
/* ==========================================
   极致精简的比例 CSS
   ==========================================
   通过微调基础像素大小，我们让它在桌面和手机端都显得非常精致。
   彻底干掉了媒体查询 (@media)，因为图标本身做得小巧精致，在任何屏幕下都好看。
*/

.ratio-1-1 {
  width: 24px;
  height: 24px;
}
.ratio-3-4 {
  width: 21px;
  height: 28px;
}
.ratio-4-3 {
  width: 28px;
  height: 21px;
}
.ratio-16-9 {
  width: 32px;
  height: 18px;
}
.ratio-9-16 {
  width: 18px;
  height: 32px;
}
.ratio-3-2 {
  width: 30px;
  height: 20px;
}
.ratio-2-3 {
  width: 20px;
  height: 30px;
}
.ratio-1-2 {
  width: 16px;
  height: 32px;
}
.ratio-2-1 {
  width: 32px;
  height: 16px;
}

/* 其他你可能有的比例都可以在这里按比例微调... */
</style>