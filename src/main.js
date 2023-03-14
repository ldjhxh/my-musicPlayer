import Vue from 'vue'
import { createPinia, PiniaVuePlugin } from 'pinia'

import App from './App.vue'
import router from './router'
// 关闭生产提示
Vue.config.productionTip = false
import './assets/main.css'
// 引入Header公共组件
import mHeader from '@/components/Home/mHeader.vue'
// 引入element-ui
import { Button, Input, Card, Carousel, CarouselItem } from 'element-ui'
// 引入element-ui 样式
import 'element-ui/lib/theme-chalk/index.css'
// 注册全局组件
Vue.component('myHeader', mHeader)
Vue.use(PiniaVuePlugin)

Vue.component(Button.name, Button)
Vue.component(Input.name, Input)
Vue.component(Card.name, Card)
Vue.component(Carousel.name, Carousel)
Vue.component(CarouselItem.name, CarouselItem)
new Vue({
  router,
  pinia: createPinia(),
  render: (h) => h(App)
}).$mount('#app')
