// 引入Home中的API
import { getCarousel, getRecommend, getNewMusic, getMusicUrl, getMusicDetail } from './Home/index'
import { getTrackAll, getPlaylistDetail } from '@/api/Playlist/index.js'
import { getSearchList, getSuggest } from '@/api/Search/search.js'

export const getCarouselAPI = getCarousel

export const getRecommendAPI = getRecommend

export const getNewMusicAPI = getNewMusic

export const getMusicUrlAPI = getMusicUrl

export const getMusicDetailAPI = getMusicDetail

export const getTrackAllAPI = getTrackAll

export const getPlaylistDetailAPI = getPlaylistDetail

export const getSearchListAPI = getSearchList

export const getSuggestAPI = getSuggest

