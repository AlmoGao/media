import { createRouter, createWebHashHistory } from 'vue-router'
import Movie from '../views/Movie/Movie.vue'

const routes = [
  {
    path: '/',
    name: 'home',
    redirect: '/movies'
  },
  {
    path: '/movies',
    name: 'movies',
    component: Movie,
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
    path: '/info',
    name: 'info',
    component: () => import("../views/Info/Info.vue"),
  },
  {
    path: '/wait',
    name: 'wait',
    component: () => import("../views/Home/Wait.vue"),
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

router.afterEach((to, from) => {
  try {
    if (['movies', 'search'].includes(to.name)) {
      let n = sessionStorage.getItem(`scroll_${to.name}`)
      document.querySelector('#app').scrollTo(0, 0)
      setTimeout(() => {
        document.querySelector('#app').scrollTo(0, n)
      }, 300)
    } else {
      document.querySelector('#app').scrollTo(0, 0)
    }
  } catch {}
})

export default router
