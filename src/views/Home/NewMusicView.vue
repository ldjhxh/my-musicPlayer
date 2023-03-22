<template>
    <div class="container">
        <div class="title">
            <h4>新音乐</h4>
        </div>
        <el-card class="box-card">
            <div class="newMusic-box">
                <div class="music-card" v-for="item in newMusicData" :key="item.id" @dblclick="playSong(item.id, item)">
                    <div class="music-cover">
                        <!-- 音乐封面 -->
                        <img :src="item.picUrl" alt="">
                        <svg t="1678804346850" class="icon player-icon" viewBox="0 0 1024 1024" version="1.1"
                            @click="playSong(item.id, item)" xmlns="http://www.w3.org/2000/svg" p-id="2889" width="64"
                            height="64">
                            <path
                                d="M512 42.666667C252.793333 42.666667 42.666667 252.793333 42.666667 512s210.126667 469.333333 469.333333 469.333333 469.333333-210.126667 469.333333-469.333333S771.206667 42.666667 512 42.666667z m196.546667 500.493333l-266.666667 176A37.333333 37.333333 0 0 1 384 688V336.033333a37.333333 37.333333 0 0 1 57.893333-31.16l266.666667 176a37.333333 37.333333 0 0 1 0 62.32z"
                                fill="#e6e6e6" p-id="2890"></path>
                        </svg>
                    </div>
                    <!-- 音乐名 -->
                    <h4 class="music-title">{{ item.name }}</h4>
                    <!-- 歌手 -->
                    <p class="actor">{{ item.song.artists[0].name }}</p>
                    <!-- 音乐时长 -->
                    <span class="duration">{{ item.song.hMusic.playTime }}</span>
                    <!-- 遮罩层 -->
                    <div class="mask"></div>
                </div>

            </div>
        </el-card>
    </div>
</template>
<script>
import useStore from '@/stores/counter.js'
import transPlayTime from '@/hook/transPlayTime.js'
const { home } = useStore()
export default {
    name: 'NewMusicView',
    data() {
        return {}
    },
    mounted() {
        // 派发请求
        home.getNewMus()
    },
    methods: {
        // 双击播放当前音乐
        playSong(id, info) {
            // 获取当前音乐的信息
            home.getCurMusInfo(id)
            // 获取音乐详情
            home.getMusicDetail(id)
            // 重置播放索引
            home.playI = 0
            // 对字段进行处理，因为字段不统一
            const { name, picUrl, type, song: { ...songs } } = info
            const handleInfo = { id, name, picUrl, type, ...songs }
            let data = []
            // 存储音乐信息
            const arr = localStorage.getItem('my-musicList') ? JSON.parse(localStorage.getItem('my-musicList')) : []
            if (arr.length) {
                // 返回歌曲id不重复，重复表示已经存在 不需要再添加
                data = arr.filter(item => handleInfo.sId !== item.id)
            }
            // 把当前点击的音乐信息存储到本地
            data.unshift(handleInfo)
            // 把所有的duration都转换为， mm:ss 格式
            data.forEach(item => {
                // 如果时间已经转换了，就不需要再转换
                if (typeof (item.duration) === 'number') {
                    item.duration = transPlayTime(item.duration)
                }
            })
            localStorage.setItem('my-musicList', JSON.stringify(data))
            // 保存数据
            home.getLocalData()
        }
    },
    computed: {
        newMusicData() {
            return home.newMusicData.result
        }
    }

}
</script>
<style scoped lang="scss">
.container {
    width: 1200px;
    margin: 20px auto;

    .title {
        margin: 20px 0 20px 0;

        h4 {
            font-size: 20px;
            font-weight: 700;
            cursor: pointer;

        }
    }

    .box-card {
        margin-bottom: 80px;

        .newMusic-box {
            display: flex;
            flex-wrap: wrap;
            justify-content: space-between;

            .music-card {
                display: flex;
                position: relative;
                width: 550px;
                height: 90px;
                margin-bottom: 28px;

                .music-cover {
                    position: relative;
                    width: 100px;
                    height: 100%;

                    img {
                        width: 100%;
                        height: 100%;
                    }

                    .player-icon {
                        display: none;
                        position: absolute;
                        left: 50%;
                        top: 14px;
                        transform: translateX(-50%);
                        z-index: 888;
                        cursor: pointer;
                    }
                }

                .music-title {
                    font-size: 20px;
                    margin: 2px 0 10px 10px;
                }

                .actor {
                    position: absolute;
                    left: 112px;
                    bottom: 10px;
                    color: #afafaf;
                }

                .duration {
                    position: absolute;
                    right: 18px;
                    top: 30px;
                    font-size: 20px;
                    color: #515151;
                }

                .mask {
                    display: none;
                    position: absolute;
                    left: 0;
                    top: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, .1);
                }
            }

            .music-card:hover .mask {
                display: block;
            }

            .music-card:hover .player-icon {
                display: block;
            }

            .music-card:hover .player-icon:hover path {
                fill: #d81e06;
            }
        }
    }
}
</style>