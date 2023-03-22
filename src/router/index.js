import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
// 解决vue-router报NavigationDuplicated: Avoided redundant navigation to current location 的问题
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
Vue.use(VueRouter)

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes: [
    // 首页
    {
      path: '/',
      name: 'home',
      meta: { title: '首页' },
      component: () => import('@/views/Home/IndexView.vue')
    },
    //新音乐
    {
      path: '/newMusic',
      name: 'newMusic',
      meta: { title: '最新音乐' },
      component: () => import('@/views/NewMusic/IndexView.vue'),
    },
    // 歌单
    {
      path: '/songlist/:id',
      name: 'songlist',
      component: () => import('@/views/SongList/IndexView.vue')
    },
    // 搜索
    {
      path: '/search',
      name: 'search',
      redirect: '/search/m',
      component: () => import('@/views/Search/Index.vue'),
      children: [
        {
          path: 'm',
          name: 'searchContent',
          component: () => import('@/views/Search/SearchContent.vue')
        }
      ]
    },
    // 歌手区域
    {
      path: '/artist',
      name: 'artist',
      component: () => import('@/views/Artist/Index.vue')
    }
  ],
  linkActiveClass: 'active'
})

export default router