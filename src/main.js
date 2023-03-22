import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// pinia持久化存储
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
import App from './App.vue'
import router from './router'
// 关闭生产提示
Vue.config.productionTip = false
import './assets/main.css'
// 引入iconfont
import './assets/download/font_3436770_9p61skljumd/iconfont.css'
// 引入Header公共组件
import mHeader from '@/components/Home/mHeader.vue'
import Songs from '@/components/Home/Songs.vue'
import BackTop from '@/components/Home/BackTop.vue'
import MusicPlayer from '@/components/Home/MusicPlayer.vue'
// 引入element-ui
import { Button, Input, Card, Carousel, CarouselItem, Table, TableColumn, Message, Popconfirm, Pagination } from 'element-ui'

// 引入element-ui 样式
import 'element-ui/lib/theme-chalk/index.css'

// 注册全局组件
Vue.component('MyHeader', mHeader)
Vue.component('MySong', Songs)
Vue.component('MyBackTop', BackTop)
Vue.component('MyMusicPlayer', MusicPlayer)
Vue.use(PiniaVuePlugin)
Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(Card.name, Card)
Vue.component(Carousel.name, Carousel)
Vue.component(CarouselItem.name, CarouselItem)
Vue.component(Table.name, Table)
Vue.component(TableColumn.name, TableColumn)
Vue.component(Popconfirm.name, Popconfirm)
Vue.component(Pagination.name, Pagination)
Vue.prototype.$message = Message
new Vue({
  router,
  pinia,
  render: (h) => h(App)
}).$mount('#app')
