import request from '@/utils/request.js'

// 请求轮播图数据
export const getCarousel = () => request({ url: '/banner' })

// 获取推荐歌单数据
export const getRecommend = () => request({ url: '/personalized', params: { limit: 10 } })