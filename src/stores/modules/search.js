import { defineStore } from 'pinia'
import { getSearchListAPI, getSuggestAPI } from '@/api/index.js'

const useSeach = defineStore({
    id: 'search',
    state: () => ({
        // 搜索列表数据
        searchList: [],
        // 搜索建议数据
        searchSuggest: [],
    }),

    getters: {},

    actions: {
        async getSearchList(keywords, type = '1') {
            const { data } = await getSearchListAPI(keywords, type)
            if (data.code === 200) {
                this.searchList = data.result
            } else {
                throw new Error('获取搜索列表数据失败！')
            }
        },
        // 获取搜索建议数据
        async getSearchSuggest(keywords) {
            const { data } = await getSuggestAPI(keywords)
            if (data.code === 200) {
                this.searchSuggest = data.result.songs
            } else {
                throw new Error('获取搜索建议失败！')
            }
        }
    }
})

export default useSeach