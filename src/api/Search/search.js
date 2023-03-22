import request from '@/utils/request.js'

// 获取搜索列表数据
export const getSearchList = (keywords, type) => request({ url: `/cloudsearch`, params: { keywords, type } })

// 获取搜索建议
export const getSuggest = (keywords) => request({ url: `/search/suggest`, params: { keywords } })