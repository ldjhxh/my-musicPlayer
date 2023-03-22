<template>
    <div class="m-content">
        <div class="type_song">
            <el-table :data="songData.slice((currentPage - 1) * pageSize, currentPage * pageSize)" v-show="type === '1'"
                stripe style="width: 100%;">
                <el-table-column type="index" width="60" :index="songIndex" align="center"
                    class-name="i_order"></el-table-column>
                <el-table-column width="40" class-name="playIcons" align="left">
                    <template slot-scope="{row}">
                        <i class="el-icon-video-play" style="font-size: 18px; cursor: pointer;"
                            @click="playMusic(row.id, row)"></i>
                    </template>
                </el-table-column>
                <el-table-column prop="name" label="歌曲" width="330"></el-table-column>
                <el-table-column label="歌手" width="290">
                    <template slot-scope="{row}">
                        <div class="text">
                            <span>{{ row.ar[0].name }}</span>
                        </div>
                    </template>
                </el-table-column>
                <!-- 添加播放 -->
                <el-table-column width="30" class-name="addPlay_box">
                    <template slot-scope="{row}">
                        <i class="el-icon-plus" @click="addPlaylist(row)"></i>
                    </template>
                </el-table-column>
                <el-table-column label="专辑" width="290">
                    <template slot-scope="{row}">
                        <div class="album">{{ row.al.id && `《${row.al.name}》` }}</div>
                    </template>
                </el-table-column>
                <el-table-column prop="dt" label="时长" width="60"></el-table-column>
            </el-table>
            <!-- 将表格与分页器链接起来 -->
            <div class="pagination_con">
                <el-pagination class="custom_pagination_style" background layout="prev, pager, next"
                    :current-page="currentPage" :page-size="pageSize" :total="songData.length"
                    @current-change="handleCurrent">
                </el-pagination>
            </div>
        </div>
        <h4 v-show="$route.query.type === 100">歌手封面</h4>
    </div>
</template>

<script>
import useStore from '@/stores/counter.js'
export default {
    name: 'SearchContent',
    props: ['songData'],
    data() {
        return {
            currentPage: 1,//当前页数
            pageSize: 15, //显示数据的条数
            type: this.$route.query.type,
        }
    },
    mounted() {
    },
    methods: {
        // 当前页数发送变化
        handleCurrent(val) {
            this.currentPage = val
        },
        // 播放音乐
        async playMusic(id, info) {
            const { home } = useStore()
            // 判断播放的是否为同一首音乐
            if (home.curMusicData.length && id === home.curMusicData[0].id) return
            // 获取播放地址
            await home.getCurMusInfo(id)
            // 获取音乐详情
            home.getMusicDetail(id)

            // 重置播放顺序
            home.playI = 0
            let data = []
            // 获取本地数据
            const arr = home.localData
            // 判断是否有url
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
            if (arr.length) {
                data = arr.filter(item => info.id !== item.id)
            }
            // 把当前点击的音乐信息存储到本地
            data.unshift(obj)
            // 更新本地
            home.updateLocalData(data)
            // 保存本地数据
            home.getLocalData()
        },

        songIndex(index) {
            // index = (index + 1) + (页数 - 1) * 每页条数
            return index + 1 + (this.currentPage - 1) * this.pageSize
        },
        // 点击+图标，把当前音乐信息添加到播放列表中
        addPlaylist(row) {
            const { home } = useStore()
            // 如果添加的音乐与正在播放的音乐信息一样，则不需要再添加
            if (home.curMusicData.length && home.localData.length && row.id === home.curMusicData[0].id) return
            const flag = home.localData.every(item => row.id !== item.id)
            if (!flag) return
            // 处理字段名称
            const obj = {
                name: row.name,
                id: row.id,
                artists: row.ar,
                alias: row.alia,
                picUrl: row.al.picUrl,
                duration: row.dt,
                sqMusic: row.sq,
                hMusic: row.h,
                lMusic: row.l,
                mMusic: row.m,
                fee: row.fee,
                cd: row.cd,
                mvid: row.mv,
                copyright: row.copyright,
                popularity: row.pop,
                version: row.version,
            }
            home.localData.push(obj)
            // 保存数据
            home.updateLocalData(home.localData)
        }
    },
    computed: {
    }
}
</script>

<style scoped lang="scss">
.m-content {
    margin-left: 22px;

    .type_song {
        margin-bottom: 80px;

        .pagination_con {
            text-align: center;
            margin-top: 20px;
        }

        .text {
            width: 130px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }

        .album {
            width: 130px;
            text-overflow: ellipsis;
            white-space: nowrap;
            overflow: hidden;
        }
    }

    .addPlay_box {
        .el-icon-plus {
            display: none;
            margin-left: -10px;
            cursor: pointer;
        }

    }



}
</style>

<style lang="scss">
.el-table .el-table__row .i_order div {
    font-weight: 700;
}

// 经过行时，显示+图标
.el-table .el-table__row:hover .addPlay_box .el-icon-plus {
    display: block;
}

.pagination_con {
    .custom_pagination_style.is-background .el-pager li:not(.disabled).active {
        background-color: #e3222270;
    }
}
</style>