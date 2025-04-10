import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import ChatView from '../views/ChatView.vue'
import StreamView from '../views/StreamView.vue'
import ImageGenerationView from '../views/ImageGenerationView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/chat',
      name: 'chat',
      component: ChatView,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/stream',
      name: 'stream',
      component: StreamView,
      meta: {
        keepAlive: true
      }
    },
    {
      path: '/image',
      name: 'image',
      component: ImageGenerationView,
      meta: {
        keepAlive: true
      }
    }
  ],
})

export default router
