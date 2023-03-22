import request from '@/utils/request.js'

// 获取歌单所有歌曲
export const getTrackAll = (id) => request({ url: '/playlist/track/all', params: { id } })

// 获取歌单详情
export const getPlaylistDetail = (id, type = 1) => request({ url: `/playlist/detail?id=${id}&${type}` }) 