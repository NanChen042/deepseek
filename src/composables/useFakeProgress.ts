import { ref, onUnmounted } from 'vue';

export function useFakeProgress(initialEstimatedTime: number = 20) {
  const progress = ref(0);
  const estimatedTime = ref(initialEstimatedTime);
  let progressTimer: number | null = null;

  const startProgressTimer = () => {
    progress.value = 0;
    estimatedTime.value = initialEstimatedTime;
    
    if (progressTimer !== null) {
      window.clearInterval(progressTimer);
    }

    progressTimer = window.setInterval(() => {
      if (progress.value < 99) {
        // 增加1-5的随机值
        const increment = Math.floor(Math.random() * 5) + 1;
        progress.value = Math.min(99, progress.value + increment);

        // 更新估计时间
        const remainingProgress = 100 - progress.value;
        estimatedTime.value = Math.max(1, Math.round(remainingProgress / 5));
      }
    }, 800);
  };

  const clearProgressTimer = () => {
    if (progressTimer !== null) {
      window.clearInterval(progressTimer);
      progressTimer = null;
    }
  };

  const finishProgress = () => {
    progress.value = 100;
  };
  
  const resetProgress = () => {
    progress.value = 0;
  };

  onUnmounted(() => {
    clearProgressTimer();
  });

  return {
    progress,
    estimatedTime,
    startProgressTimer,
    clearProgressTimer,
    finishProgress,
    resetProgress
  };
}
