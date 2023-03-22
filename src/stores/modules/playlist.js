import { defineStore } from 'pinia'
import { getTrackAllAPI, getPlaylistDetailAPI } from '@/api/index'
import transPlayTime from '@/hook/transPlayTime.js'

const usePlaylist = defineStore({
    id: 'playlist',
    state: () => ({
        // 歌单所有歌曲数据
        playlistAll: [],
        // 歌单详情数据
        playlistDetail: [],
        // 记录几组数据  一组为0~99，以此类推
        groupI: 0,
    }),

    getters: {},
    actions: {
        // 获取歌单所有歌曲
        async getPlaylistAll(id) {
            const { data } = await getTrackAllAPI(id)
            if (data.code === 200) {
                data.songs.forEach(item => {
                    item.dt = transPlayTime(item.dt)
                }
                )
                this.playlistAll = data.songs
            } else {
                throw new Error('获取歌单所有歌曲失败！')
            }
        },
        // 获取歌单详情
        async getPlaylistDetail(id) {
            const { data } = await getPlaylistDetailAPI(id)
            if (data.code === 200) {
                this.playlistDetail = data.playlist
            }
        },

    }
})

export default usePlaylist