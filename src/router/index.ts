import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import { useAuthStore } from '@/stores/auth'

const APP_NAME = 'Strike Store'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
      meta: { title: 'Prodotti' },
    },
    {
      path: '/product/:id',
      name: 'product',
      component: () => import('@/views/ProductView.vue'),
      props: (route) => ({ id: Number(route.params.id) }),
      meta: { title: 'Dettaglio prodotto' },
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
      meta: { guestOnly: true, title: 'Accedi' },
    },
    {
      path: '/cart',
      name: 'cart',
      component: () => import('@/views/CartView.vue'),
      meta: { requiresAuth: true, title: 'Carrello' },
    },
    {
      path: '/wishlist',
      name: 'wishlist',
      component: () => import('@/views/WishlistView.vue'),
      meta: { requiresAuth: true, title: 'Wishlist' },
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'not-found',
      component: () => import('@/views/NotFoundView.vue'),
      meta: { title: 'Pagina non trovata' },
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    return savedPosition ?? { top: 0 }
  },
})

router.beforeEach((to) => {
  // useAuthStore() va chiamato DENTRO la guardia: al momento in cui
  // questo modulo viene valutato, Pinia non è ancora installata.
  const auth = useAuthStore()

  if (to.meta.requiresAuth && !auth.isAuthenticated) {
    return { name: 'login', query: { redirect: to.fullPath } }
  }

  if (to.meta.guestOnly && auth.isAuthenticated) {
    return { name: 'home' }
  }

  return true
})

router.afterEach((to) => {
  const title = to.meta.title as string | undefined
  document.title = title ? `${title} · ${APP_NAME}` : APP_NAME
})

export default router
