<template>
  <div class="relative flex gap-5 group pb-10 last:pb-0">

    <div class="absolute top-12 bottom-0 left-[23px] w-[2px] bg-slate-100 group-last:hidden transition-colors duration-300 group-hover:bg-blue-100/60"></div>

    <div class="relative z-10 flex shrink-0 items-center justify-center w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-[0_2px_8px_-4px_rgba(0,0,0,0.05)] text-slate-400 group-hover:text-blue-500 group-hover:border-blue-200 group-hover:bg-blue-50/50 group-hover:shadow-[0_8px_16px_-6px_rgba(59,130,246,0.2)] group-hover:-translate-y-0.5 transition-all duration-300 ease-out">
      <i class="flex text-xl not-italic">
        <slot name="icon"></slot>
      </i>
    </div>

    <div class="flex-1 pt-2.5">
      <h3 class="text-base font-bold text-slate-800 mb-1.5 group-hover:text-blue-600 transition-colors duration-300">
        <slot name="heading"></slot>
      </h3>

      <div class="text-[14.5px] text-slate-500 leading-relaxed">
        <slot></slot>
      </div>
    </div>

  </div>
</template>

<style scoped>
</style>