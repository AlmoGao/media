import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home/Home.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
  },
  {
    path: '/movies',
    name: 'movies',
    component: () => import("../views/Movie/Movie.vue"),
  },
  {
    path: '/gift',
    name: 'gift',
    component: () => import("../views/Gift/Gift.vue"),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import("../views/Search/Search.vue"),
  },
  {
    // 找不到路由时
    path: '/:pathMatch(.*)*',
    redirect: '/',
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.afterEach(() => {
  try {
    document.querySelector('#app').scrollTo(0, 0)
  } catch {}
})

export default router
