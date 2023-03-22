import { getCarouselAPI, getRecommendAPI, getNewMusicAPI, getMusicUrlAPI, getMusicDetailAPI } from '@/api/index.js'
import { defineStore } from "pinia";
import transfPlayCount from '@/hook/transfPlayCount.js'
import transPlayTime from '@/hook/transPlayTime.js'

const useCounterHome = defineStore({
    id: 'home',
    state: () => ({
        // 轮播图数据
        carouselData: [],
        // 推荐歌单数据
        RecommendData: [],
        // 推荐新音乐数据
        newMusicData: [],
        // 当前点击的音乐信息
        curMusicData: [],
        // 音乐详情信息
        musicDetail: [],
        // 本地音乐详情信息
        localData: [],
        // 当前播放的索引
        playI: 0,
    }),
    getters: {

    },
    actions: {
        // 获取轮播图数据
        async getCarData() {
            const res = await getCarouselAPI()
            if (res.status === 200) {
                this.carouselData = res.data
            } else {
                throw new Error('获取轮播图数据失败！')
            }
        },
        // 获取推荐歌单数据
        async getRcdData() {
            const { data } = await getRecommendAPI()
            if (data.code === 200) {
                this.RecommendData = data
                // 处理播放量
                data.result.forEach(item => {
                    item.playCount = transfPlayCount(item.playCount)
                })
            } else {
                throw new Error('获取推荐歌单数据失败！')
            }
        },
        // 获取推荐新音乐数据
        async getNewMus() {
            const { data } = await getNewMusicAPI()
            if (data.code === 200) {
                const { result } = data
                // 遍历数据
                result.forEach((item, i) => {
                    // 把每条数据中的音乐时长转为为  xx:xx
                    // 处理音乐的时长
                    result[i].song.hMusic.playTime = transPlayTime(item.song.hMusic.playTime)
                })
                this.newMusicData = data

            } else {
                throw new Error('获取推荐新音乐失败！')
            }
        },
        // 获取当前点击的音乐信息
        async getCurMusInfo(id) {
            const { data } = await getMusicUrlAPI(id)
            if (data.code === 200) {
                this.curMusicData = data.data
            } else {
                throw new Error('获取当前音乐信息失败！')
            }
        },
        // 获取音乐详情
        async getMusicDetail(ids) {
            const { data } = await getMusicDetailAPI(ids)
            if (data.code === 200) {
                this.musicDetail = data.songs
            } else {
                throw new Error('获取音乐详情数据失败！')
            }
        },
        // 获取本地音乐数据
        getLocalData() {
            const data = localStorage.getItem('my-musicList') ? JSON.parse(localStorage.getItem('my-musicList')) : []
            this.localData = data
        },
        // 修改本地音乐数据
        updateLocalData(data) {
            localStorage.setItem('my-musicList', JSON.stringify(data))
        }
    },

})

export default useCounterHome