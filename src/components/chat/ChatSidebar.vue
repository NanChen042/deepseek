<script setup lang="ts">
import { useChatStore } from "@/stores/chat";
import { Plus, ChatLineRound, Delete } from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

const chatStore = useChatStore();
const router = useRouter();

const handleNewChat = () => {
  chatStore.createSession();
};

const handleSwitch = (id: string) => {
  chatStore.switchSession(id);
};

const handleDelete = (id: string) => {
  chatStore.deleteSession(id);
};

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  const now = new Date();
  if (date.toLocaleDateString() === now.toLocaleDateString()) {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  return date.toLocaleDateString();
};
</script>

<template>
  <div class="h-full flex flex-col bg-[#f9fbff] border-r border-slate-200/60 w-64 md:w-72 transition-all duration-300 fixed md:relative z-50 left-0 top-0 shadow-2xl md:shadow-none font-sans">
    <!-- Header: New Chat -->
    <div class="p-4 pt-6">
      <button
        @click="handleNewChat"
        class="w-full h-12 flex items-center justify-center gap-2.5 rounded-2xl bg-white border border-slate-200 text-slate-700 font-bold shadow-sm hover:shadow-md hover:border-blue-300 hover:text-blue-600 transition-all duration-300 active:scale-[0.98] group"
      >
        <div class="w-6 h-6 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors">
          <el-icon><Plus /></el-icon>
        </div>
        开启新对话
      </button>
    </div>

    <!-- History List -->
    <div class="flex-1 overflow-y-auto px-4 py-2 custom-scrollbar">
      <div class="text-[11px] font-bold text-slate-400 px-2 mb-4 uppercase tracking-[0.1em]">
        最近记录
      </div>
      
      <div v-if="chatStore.sessions.length === 0" class="px-3 py-10 text-center flex flex-col items-center gap-3">
        <div class="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-300">
           <el-icon class="text-xl"><ChatLineRound /></el-icon>
        </div>
        <span class="text-xs text-slate-400">还没有任何历史记录</span>
      </div>

      <div class="flex flex-col gap-1.5">
        <div
          v-for="session in chatStore.sessions"
          :key="session.id"
          class="group relative flex items-center gap-3 px-3 py-3.5 rounded-2xl cursor-pointer transition-all duration-300 border border-transparent"
          :class="chatStore.activeSessionId === session.id 
            ? 'bg-white border-slate-200 shadow-[0_4px_12px_rgba(0,0,0,0.03)] text-blue-600' 
            : 'text-slate-600 hover:bg-white hover:border-slate-100 hover:shadow-sm'"
          @click="handleSwitch(session.id)"
        >
          <div class="flex-1 overflow-hidden">
            <div class="text-[14px] font-semibold truncate leading-snug">{{ session.title }}</div>
            <div class="text-[11px] font-medium opacity-50 mt-1 flex items-center gap-1">
               {{ formatTime(session.updatedAt) }}
            </div>
          </div>

          <!-- Delete Action -->
          <button
            @click.stop="handleDelete(session.id)"
            class="opacity-0 group-hover:opacity-100 p-1.5 rounded-xl text-slate-300 hover:text-red-500 hover:bg-red-50 transition-all duration-200"
          >
            <el-icon class="text-sm"><Delete /></el-icon>
          </button>
        </div>
      </div>
    </div>

    <!-- Footer: User -->
    <div class="p-5 border-t border-slate-200/60 bg-white/40">
      <div class="flex items-center gap-3.5">
        <div class="relative">
          <div class="w-9 h-9 rounded-xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-bold text-xs ring-2 ring-white shadow-sm">
            NC
          </div>
          <div class="absolute -right-0.5 -bottom-0.5 w-3 h-3 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
        </div>
        <div class="flex-1 min-w-0">
          <div class="text-[13px] font-bold text-slate-800 truncate">NanChen042</div>
          <div class="text-[10px] font-semibold text-slate-400 truncate uppercase tracking-wider">Premium Account</div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.custom-scrollbar::-webkit-scrollbar {
  width: 3px;
}
.custom-scrollbar::-webkit-scrollbar-track {
  background: transparent;
}
.custom-scrollbar::-webkit-scrollbar-thumb {
  background-color: transparent;
  border-radius: 4px;
}
.custom-scrollbar:hover::-webkit-scrollbar-thumb {
  background-color: #d1d5db;
}
</style>
