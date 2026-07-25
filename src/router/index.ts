import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      // Lazy loading: il dettaglio non serve al primo caricamento.
      path: '/product/:id',
      name: 'product',
      component: () => import('@/views/ProductView.vue'),
      // props come funzione: il componente riceve un number,
      // non la stringa grezza di route.params.
      props: (route) => ({ id: Number(route.params.id) }),
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
})

export default router
