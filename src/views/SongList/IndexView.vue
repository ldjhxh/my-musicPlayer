<template>
    <div class="container">
        <div class="info_l">
            <!-- 歌单封面 -->
            <div class="cover_a">
                <img :src="playlistDetail.coverImgUrl" alt="">
            </div>
            <!-- 简介 -->
            <p class="intr">歌单简介</p>
            <p class="intr_txt">{{ playlistDetail.description || '' }}</p>
        </div>
        <div class="info_r">
            <!-- 歌单标题 -->
            <h3 class="songlist_tit">{{ playlistDetail.name || '加载中' }}</h3>
            <div class="artist_box">
                <!-- 作者头像 -->
                <img :src="avatarUrl" alt="">
                <!-- 歌单作者 -->
                <p class="artist_name">{{ nickname || '' }}</p>
                <!-- 创建时间 -->
                <span class="create_time">{{ forTime && forTime + '创建' || '...' }}</span>
            </div>

            <!-- 类型 -->
            <p class="tags">标签：{{ sTags || '' }}</p>
            <!-- 一些功能 -->
            <div class="controls">
                <button round class="playall" @click="playAllSong">
                    <i class="iconfont icon-bofang_o icon_play"></i>
                    <span>播放全部</span>
                </button>
            </div>
            <el-table :data="playlistAll.slice((currentPage - 1) * pageSize, currentPage * pageSize)" stripe
                style="width: 100%">
                <!-- 自定义索引问题，由于分页效果，无法实现连续数据项的索引
                    自定义一个index
                -->
                <el-table-column type="index" :index="songIndex" width="60" align="center" class-name="i_order">
                </el-table-column>
                <el-table-column width="40" class-name="playIcons" align="left">
                    <template slot-scope="{row}">
                        <i class="el-icon-video-play" @click="playMusic(row.id, row)"></i>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="歌曲" width="360">
                </el-table-column>
                <el-table-column prop="ar[0].name" label="歌手" width="350">
                </el-table-column>
                <el-table-column prop="dt" label="时长" width="60">
                </el-table-column>

            </el-table>
            <!-- 将表格与分页器链接起来 -->
            <div class="pagination_con">
                <el-pagination class="custom_pagination_style" background layout="prev, pager, next"
                    :current-page="currentPage" :page-size="pageSize" :total="playlistAll.length"
                    @current-change="handleCurrent">
                </el-pagination>
            </div>

        </div>
    </div>
</template>
<script>
import useStore from '@/stores/counter.js'
const { playlist, home } = useStore()
export default {
    name: 'SongList',
    data() {
        return {
            currentPage: 1, // 当前页
            pageSize: 15, // 显示数据的条数
            sIndex: 1,
            playlistAll: [], // 歌单列表所有音乐
            playlistDetail: [], // 歌单详情

        }
    },
    async mounted() {
        // 接收传递进来的歌单id
        // 派发action
        await playlist.getPlaylistAll(this.$route.params.id)
        await playlist.getPlaylistDetail(this.$route.params.id)
        this.playlistAll = playlist.playlistAll
        this.playlistDetail = playlist.playlistDetail
    },
    methods: {
        // 当前页发生变化，会触发这个回调
        handleCurrent(val) {
            this.currentPage = val
        },
        songIndex(index) {
            // index = (index + 1) + (页数 - 1) * 每页条数
            return index + 1 + (this.currentPage - 1) * this.pageSize
        },
        // 点击播放图标播放音乐
        async playMusic(id, info) {
            // 派发action
            await home.getCurMusInfo(id)
            // 获取音乐详情
            home.getMusicDetail(id)
            // 重置播放顺序
            home.playI = 0
            // 音乐开始播放，判断当前音乐是否有url
            if (!home.curMusicData[0].url) return

            // 处理字段名称，因为字段名称不统一
            const obj = {
                name: info.name,
                id: id,
                artists: info.ar,
                alias: info.alia,
                picUrl: info.al.picUrl,
                duration: info.dt,
                sqMusic: info.sq,
                hMusic: info.h,
                lMusic: info.l,
                mMusic: info.m,
                fee: info.fee,
                cd: info.cd,
                mvid: info.mv,
                copyright: info.copyright,
                popularity: info.pop,
                version: info.version,
            }
            let data = []
            // 存储音乐信息
            const arr = localStorage.getItem('my-musicList') ? JSON.parse(localStorage.getItem('my-musicList')) : []
            if (arr.length) {
                // 返回歌曲id不重复，重复表示已经存在 不需要再添加
                data = arr.filter(item => info.id !== item.id)
            }
            // 把当前点击的音乐信息存储到本地
            data.unshift(obj)
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
        },
        // 播放所有歌曲
        playAllSong() {
            const data = []
            // 处理歌单中所有数据
            this.playlistAll.forEach(item => {
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
            // 发请求获取播放地址, 播放第一首
            home.getCurMusInfo(data[0].id)
            localStorage.setItem('my-musicList', JSON.stringify(data))
        }
    },
    computed: {
        sTags() {
            const { tags } = this.playlistDetail
            // 判断 tags字段必须是数组
            if (tags instanceof Array) {
                return tags.join(',')
            }
        },
        // 格式化时间
        forTime() {
            if (this.playlistDetail.createTime !== undefined) {
                const date = new Date(this.playlistDetail.createTime)
                const y = date.getFullYear()
                let m = date.getMonth() + 1
                m = m < 10 ? '0' + m : m
                let d = date.getDay()
                d = d < 10 ? '0' + d : d
                return `${y}-${m}-${d}`
            }


        },
        // 作者头像
        avatarUrl() {
            if (this.playlistDetail.id) {
                return this.playlistDetail.creator.avatarUrl
            }
        },
        // 作者名字
        nickname() {
            if (this.playlistDetail.id) {
                return this.playlistDetail.creator.nickname
            }
        }
    }
}
</script>

<style scoped lang="scss">
.container {
    display: flex;
    justify-content: space-between;
    width: 1216px;
    margin: 0 auto;

    .info_l {
        width: 24%;
        margin-top: 47px;

        .intr {
            margin-top: 30px;
            font-size: 24px;
            font-weight: 700;
        }

        .intr_txt {
            margin-top: 2px;
            font-size: 16px;
            color: #333;
        }

        .cover_a {
            width: 260px;
            height: 260px;

            img {
                width: 100%;
                height: 100%;
            }
        }
    }

    .info_r {
        width: 76%;
        margin-top: 57px;
        margin-left: 60px;
        margin-bottom: 80px;



        .artist_box {
            display: flex;
            height: 36px;
            line-height: 36px;
            margin: 10px 0;

            img {
                width: 37px;
                height: 37px;
            }

            .artist_name {
                font-size: 14px;
                color: #666;
                margin: 0 10px;
            }

            .create_time {
                margin-left: 8px;
            }
        }

        .pagination_con {
            margin-top: 24px;
            text-align: center;
        }

        .playIcons {
            .el-icon-video-play {
                margin-top: 1px;
                font-size: 20px;
                cursor: pointer;
            }
        }

        .songlist_tit {
            font-size: 30px;
            font-weight: 700;
        }



        .tags {
            color: #e3222270;
        }

        .controls {
            margin: 32px 0;

            .playall {
                position: relative;
                width: 130px;
                height: 40px;
                color: #fff;
                background-color: #e3222270;
                border-radius: 25px;
                padding: 0;
                font-size: 16px;
                padding-left: 20px;
                cursor: pointer;

                .icon_play {
                    position: absolute;
                    left: 11px;
                    top: 4px;
                    font-size: 32px;
                }


            }




        }


    }
}
</style>

<style lang="scss">
.el-table .el-table__row .i_order div {
    font-weight: 700;
}

.pagination_con {
    .custom_pagination_style.is-background .el-pager li:not(.disabled).active {
        background-color: #e3222270;
    }
}
</style>