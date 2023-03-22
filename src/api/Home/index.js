import request from '@/utils/request.js'

// 请求轮播图数据
export const getCarousel = () => request({ url: '/banner' })

// 获取推荐歌单数据
export const getRecommend = () => request({ url: '/personalized', params: { limit: 10 } })

// 获取推荐新音乐数据
export const getNewMusic = () => request({ url: '/personalized/newsong' })

// 获取音乐url
export const getMusicUrl = (id) => request({ url: `/song/url`, params: { id } })

// 获取音乐详情
export const getMusicDetail = (ids) => request({ url: '/song/detail', params: { ids } })

