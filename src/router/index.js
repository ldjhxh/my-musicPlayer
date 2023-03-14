import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      meta: { title: '首页' },
      component: () => import('@/views/Home/IndexView.vue')
    },
    {
      path: '/newMusic',
      name: 'newMusic',
      meta: { title: '最新音乐' },
      component: () => import('@/views/NewMusic/IndexView.vue'),
    }
  ],
  linkActiveClass: 'active'
})

export default router