<template>
    <div class="album-box">
        <h4 class="play-count">{{ playCount }}</h4>
        <img :src="src" alt="">
        <p class="album-title">{{ sName }}</p>
        <svg t="1678804346850" class="icon player-icon" viewBox="0 0 1024 1024" version="1.1"
            xmlns="http://www.w3.org/2000/svg" p-id="2889" width="64" height="64" @click="playlistAll">
            <path
                d="M512 42.666667C252.793333 42.666667 42.666667 252.793333 42.666667 512s210.126667 469.333333 469.333333 469.333333 469.333333-210.126667 469.333333-469.333333S771.206667 42.666667 512 42.666667z m196.546667 500.493333l-266.666667 176A37.333333 37.333333 0 0 1 384 688V336.033333a37.333333 37.333333 0 0 1 57.893333-31.16l266.666667 176a37.333333 37.333333 0 0 1 0 62.32z"
                fill="#e6e6e6" p-id="2890"></path>
        </svg>
        <!-- 遮罩层 -->
        <div class="mask" @click="getSongListDetail"></div>

    </div>
</template>
<script>
import useStore from '@/stores/counter.js'
export default {
    name: 'Songs',
    props: ['src', 'sName', 'playCount', 'songlistId'],
    data() {
        return {
            flag: false, // 控制播放图标高亮
        }
    },
    methods: {
        showCurrent(e) {
            e.target.style.backgroundColor = '#d81e06'
        },
        getSongListDetail() {
            // this.songlistId 当前歌单的id
            // 路由跳转
            this.$router.push({ name: 'songlist', params: { id: this.songlistId } })
        },
        // 点击播放图标播放歌单中所有音乐
        playlistAll() {
            const { home, playlist } = useStore()
            playlist.getPlaylistAll(this.songlistId)
            const data = []
            playlist.playlistAll.forEach(item => {
                // 处理字段名称，因为字段名称不统一
                const obj = {
                    name: item.name,
                    id: item.id,
                    artists: item.ar,
                    alias: item.alia,
                    picUrl: item.al.picUrl,
                    duration: item.dt,
                    sqMusic: item.sq,
                    hMusic: item.h,
                    lMusic: item.l,
                    mMusic: item.m,
                    fee: item.fee,
                    cd: item.cd,
                    mvid: item.mv,
                    copyright: item.copyright,
                    popularity: item.pop,
                    version: item.version,
                }
                data.push(obj)
            })
            home.localData = data
            if (data.length && data[0].id !== null) {
                // 发请求获取播放地址, 播放第一首
                home.getCurMusInfo(data[0].id)
                home.updateLocalData(data)
            }

        }
    }
}
</script>

<style scoped lang="scss">
.album-box {
    position: relative;
    float: left;
    width: 203px;
    margin: 0 14px;
    margin-bottom: 14px;
    border-radius: 8px;
    overflow: hidden;
    cursor: pointer;

    .play-count {
        position: absolute;
        right: 10px;
        top: 5px;
        color: #fff;
        z-index: 777;
    }

    img {
        width: 100%;
        height: 209px;
        border-radius: 8px;
    }

    .album-title {
        width: 200px;
        height: 20px;
        margin-bottom: 5px;
        // 文本溢出隐藏
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    .player-icon {
        display: none;
        position: absolute;
        left: 50%;
        top: 80px;
        transform: translateX(-50%);
        z-index: 777;
    }

    .player-current {
        display: none;
        position: absolute;
        left: 50%;
        top: 80px;
        transform: translateX(-50%);
    }

    .mask {
        display: none;
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 209px;
        background-color: rgba(0, 0, 0, .3);
        z-index: 1;
    }
}

.album-box:hover .player-icon {
    display: block;
}

.album-box:hover .mask {
    display: block;
}

.album-box:hover .player-icon:hover path {
    fill: #d81e06;
}
</style>