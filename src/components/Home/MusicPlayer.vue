<template>
    <div class="container" ref="containerRef">
        <!-- 控制音乐播放器的展示 -->
        <div class="controller-song" @click="lock">
            <svg t="1660918815210" v-if="islock === false" class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="2743" width="28" height="28">
                <path
                    d="M512 726.8352c-11.264 0-20.48-9.216-20.48-20.48V601.7024c0-11.264 9.216-20.48 20.48-20.48s20.48 9.216 20.48 20.48v104.5504c0 11.3664-9.216 20.5824-20.48 20.5824z"
                    p-id="2744" fill="#515151"></path>
                <path
                    d="M790.3232 436.3264H324.7104l0.512-57.7536c0-101.9904 83.456-185.4464 185.4464-185.4464 82.432 0 152.7808 54.5792 176.7424 129.3312 3.6864 11.3664 16.384 17.2032 27.4432 12.4928 9.728-4.096 14.7456-14.9504 11.5712-24.9856-29.2864-91.2384-115.0976-157.696-215.6544-157.696-124.5184 0-226.4064 101.888-226.4064 226.4064l-0.512 57.6512h-50.176c-22.528 0-40.96 18.432-40.96 40.96v353.4848c0 22.528 18.432 40.96 40.96 40.96h556.6464c22.528 0 40.96-18.432 40.96-40.96V477.2864c0-22.528-18.432-40.96-40.96-40.96z m0 374.0672c0 11.264-9.216 20.48-20.48 20.48H254.1568c-11.264 0-20.48-9.216-20.48-20.48V497.5616c0-11.264 9.216-20.48 20.48-20.48h515.6864c11.264 0 20.48 9.216 20.48 20.48v312.832z"
                    p-id="2745" fill="#515151"></path>
            </svg>
            <svg t="1660958645593" v-else class="icon" viewBox="0 0 1024 1024" version="1.1"
                xmlns="http://www.w3.org/2000/svg" p-id="4356" width="28" height="28">
                <path
                    d="M790.3232 436.3264h-53.248v-57.6512c0-124.5184-101.888-226.4064-226.4064-226.4064s-226.4064 101.888-226.4064 226.4064l-0.512 57.6512h-50.176c-22.528 0-40.96 18.432-40.96 40.96v353.4848c0 22.528 18.432 40.96 40.96 40.96h556.6464c22.528 0 40.96-18.432 40.96-40.96V477.2864c0.1024-22.528-18.3296-40.96-40.8576-40.96z m-465.1008-57.7536c0-101.9904 83.456-185.4464 185.4464-185.4464s185.4464 83.456 185.4464 185.4464v57.7536H324.7104l0.512-57.7536z m465.1008 431.8208c0 11.264-9.216 20.48-20.48 20.48H254.1568c-11.264 0-20.48-9.216-20.48-20.48V497.5616c0-11.264 9.216-20.48 20.48-20.48h515.6864c11.264 0 20.48 9.216 20.48 20.48v312.832z"
                    p-id="4357" fill="#d81e06"></path>
                <path
                    d="M512 581.2224c-11.264 0-20.48 9.216-20.48 20.48v104.5504c0 11.264 9.216 20.48 20.48 20.48s20.48-9.216 20.48-20.48V601.7024c0-11.264-9.216-20.48-20.48-20.48z"
                    p-id="4358" fill="#d81e06"></path>
            </svg>
        </div>
        <!-- 歌曲信息区域 -->
        <div class="song-info" ref="songinfoRef">
            <!-- 歌曲封面 -->
            <div class="pic_box">
                <img :src="musicListData.length && songPic" alt="">
            </div>
            <!-- 歌曲的描述信息 -->
            <div class="song-desc" ref="songdescRef">
                <div class="song-title">
                    <!--歌曲名和歌手名 -->
                    <h4 class="song-name">{{ musicListData.length && songName + '-' || '我的音乐-与你同行' }}{{
                        musicListData.length &&
                        artists || '' }}</h4>
                    <!-- 时长 -->
                    <p class="duration">
                        <span class="cur_dur">{{ trTime(curTime) }}/</span>
                        <span class="total_dur">{{ sDuration || initTime }}</span>
                    </p>
                </div>
                <div class="progress">
                    <div class="progress_bg" @click="clickProgress" @mousedown.prevent="updateTime" ref="progressRef">
                        <div class="inner">
                            <!-- 当前进度 -->
                            <div class="progress_in" ref="pgs_in"></div>
                            <!-- 小圆点 -->
                            <div class="dot"></div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
        <!-- 音乐控件区域 -->
        <div class="song-controls">
            <div class="controller">
                <i class="iconfont icon-zuobofang left-btn" @click="prevMusic"></i>
                <i v-show="isPlay === true" class="iconfont icon-bofang_o center-btn" @click="playMusic"></i>
                <i v-show="isPlay === false" class="iconfont icon-zanting_o center-btn" @click="pauseMusic"></i>
                <i class="iconfont icon-youbofang right-btn" @click="nextMusic"></i>
            </div>
        </div>

        <!-- 设置音乐的一些操作 -->
        <div class="set-songInfo" ref="songInfoRef">
            <i class="iconfont icon-xiazai contr"></i>
            <i class="iconfont icon-pinglun contr"></i>
            <span class="playIcon order-play" v-show="order === 1" @click="order = 2">
                <i class="iconfont icon-23_shunxubofang" title="顺序播放"></i>
            </span>
            <span class="playIcon radom-play" v-show="order === 2" @click="order = 3">
                <i class="iconfont icon-suijibofang" title="随机播放"></i>
            </span>
            <span class="playIcon one-play" v-show="order === 3" @click="order = 4">
                <i class="iconfont icon-hanhan-01-01" title="单曲循环"></i>
            </span>
            <span class="playIcon loop-play" v-show="order === 4" @click="order = 1">
                <i class="iconfont icon-bofang-xunhuanbofang" title="循环播放"></i>
            </span>
            <i class="iconfont icon-24gf-playlistMusic2  contr show-list" @click="isShowTable = true">
            </i>
            <div class="quality-box contr">
                <span class="quality">高品</span>
            </div>
            <div class="volume contr" ref="volumeCRef">
                <i class="iconfont icon-yinliang volume_btn" style="font-size:22px;" v-show="isMute === false"
                    @click="mute"></i>
                <i class="iconfont icon-jingyin" style="font-size: 22px;" v-show="isMute === true" @click="playBack"></i>
                <!-- 音量 -->
                <div class="volume_progress">
                    <div class="volume_progress_bg" ref="volumeBgRef" @click="clickChangeVolumn"
                        @mousedown.prevent="handleVol">
                        <div class="volume_inner">
                            <div class="volume_progress_in" ref="volumeInRef"></div>
                            <div class="volume_dot"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 歌曲列表 -->
        <el-table :data="musicListData" height="450" style="width: 512px" v-show="isShowTable"
            class="songList customer-table" cell-class-name="columnList" ref="tableRef">
            <el-table-column width="34px" type="index" align="left" class="musi_index">
            </el-table-column>
            <el-table-column width="230px" class-name="artist-col">
                <template slot="header" slot-scope="scope">
                    <h4 class="playCount">播放列表({{ `共 ${musicListData.length} 首` || 0 }})</h4>
                </template>
                <template slot-scope="{row,$index}">
                    <div class="artist_name">{{ row.name }}</div>
                </template>
            </el-table-column>
            <el-table-column width="230px" align="right">
                <template slot="header" slot-scope="scope">
                    <el-popconfirm confirm-button-text='清空' title="确定清空当前列表？" @confirm="clearList">
                        <h4 class="clearData" slot="reference">清空列表</h4>
                    </el-popconfirm>
                    <span class="close" @click="isShowTable = false">X</span>
                </template>
                <template slot-scope="{row,$index}">
                    <i class="iconfont icon-bofang_o icon-play" ref="playIconRef" @click="playCurMusic(row, $index)"></i>
                    <i class="el-icon-delete delete_icon_btn" @click="delCureentM(row, $index)"></i>
                    <span style="font-size: 16px; font-weight: 700;">{{ row.duration }}</span>
                    <div class="playing" :ref="'playingRef' + $index">
                        <span :class="['side1', isPlaying]"></span>
                        <span :class="['side2', isPlaying]"></span>
                        <span :class="['side3', isPlaying]"></span>
                    </div>
                </template>
            </el-table-column>
        </el-table>

        <audio :src="musicUrl.length > 0 ? musicUrl[0].url : ''" autoplay ref="audio" @play="onplay" @canplay="getDuration"
            @ended="playNextMusic" @timeupdate="onTimeUpdate">
            <p>抱歉，您的浏览器不支持mp3格式</p>
        </audio>
    </div>
</template>
<script>
import useStore from '@/stores/counter.js'
import transPlayTime from '@/hook/transPlayTime'
export default {
    name: 'MusicPlayer',
    data() {
        return {
            islock: false, // 控制底部栏是否锁定
            isPlay: true,// 控制音乐播放控件的展示
            isShow: false, //
            curMusicUrl: [], // 当前音乐的url
            initTime: '00:00', // 初始时间
            curTime: '00:00', // 当前播放时间
            isTouching: false, //是否在拖动
            isShowTable: false, // 是否显示表格
            order: 1, // 控制播放顺序，1：顺序播放，2：随机播放，3：单曲循环 4: 循环播放
            isPlaying: 'pause',
            isTouchV: false,//是否正在拖动音量条
            isMute: false, //是否为静音状态
            isInit: false,
        }
    },
    async mounted() {
        const { home } = useStore()
        // 获取本地数据
        home.getLocalData()
        if (home.localData.length) {
            // 页面一打开就发请求
            await home.getCurMusInfo(this.musicListData[0].id)
            // 页面刚打开不用播放音乐
            this.$refs.audio.pause()
        }

    },
    methods: {
        // 点击小锁图标，固定音乐播放器
        lock() {
            this.islock = !this.islock
            this.$refs.containerRef.style.bottom = this.islock ? '0' : '-70px'
        },
        // 播放音乐
        playMusic() {
            // 发请求获取音乐url
            const { home } = useStore()
            if (this.musicListData.length) {
                // 如果正在播放当前音乐，则不需要再发请求
                if (home.localData[home.playI].id !== home.localData[home.playI].id) {
                    home.getCurMusInfo(home.localData[home.playI].id)
                }
            }
            // 判断是否有音源
            if (this.musicUrl.length && this.musicListData.length) {
                this.isPlay = false
                this.$refs.audio.play()
                // 获取当前播放的音乐id与表格中对应的id，的索引号
                const rows = this.$refs.tableRef.$children
                const index = rows[rows.length - 1].data.findIndex(item => item.id === home.curMusicData[0].id)
                this.$refs['playingRef' + index].style.display = 'block'
            }
        },
        // 停止播放
        pauseMusic() {
            if (this.musicUrl.length) {
                this.isPlay = true
                this.$refs.audio.pause()
                // (停止播放)
                this.isPlaying = 'pause'
            }
        },
        // 当音乐开始播放
        onplay() {
            this.isPlay = false
            if (!this.musicUrl[0].url) return
            const { home } = useStore()
            const rows = this.$refs.tableRef.$children
            let index
            // 排它
            rows[rows.length - 1].data.forEach((item, i) => {
                this.$refs['playingRef' + i].style.display = 'none'
                if (item.id === home.curMusicData[0].id) {
                    index = i
                }
            })
            // (播放中)
            this.isPlaying = 'playing_now'
            this.$refs['playingRef' + index].style.display = 'block'
        },
        // 获取音乐总时长
        getDuration(res) {
            // console.log(res.target.duration)
            // 取整
            const timeCount = parseInt(res.target.duration)
            this.initTime = this.trTime(timeCount)
        },
        // 播放音乐时，会不断触发这个函数
        onTimeUpdate(res) {
            this.curTime = parseInt(res.target.currentTime)  //取整
            const { currentTime, duration } = res.target
            // 播放步长值
            let step = 370 / duration
            let temp = currentTime * step
            // 不是在拖动状态就执行 
            if (!this.isTouching) {
                this.$refs.pgs_in.style.width = temp + 'px'
            }
            // 播放完毕后，停止播放
            if (this.$refs.audio.ended) {
                this.isPlay = true
            }
        },
        // 点击进度条，把点击的进度赋值给当前播放时间
        clickProgress(e) {
            // 是否有音乐 不执行操作
            if (!this.musicUrl.length) return
            // 是否在拖动 不执行操作
            if (this.isTouching) return
            // 点击的是小圆点 不执行操作
            if (e.target.className === 'dot') return
            // 计算步长     容器宽度 / 总时长
            const step = 370 / this.$refs.audio.duration
            this.$refs.audio.currentTime = e.offsetX / step
        },
        // 更新当前播放进度
        updateTime() {
            // 判断是否有音乐
            if (!this.musicUrl.length) return
            // const step = 370 / this.$refs.audio.duration
            // this.$refs.audio.currentTime = e.offsetX / step
            // 绑定鼠标移动和鼠标弹起事件
            window.addEventListener('mousemove', this.handleMove)
            window.addEventListener('mouseup', this.handleUp)
        },
        handleMove(e) {
            this.isTouching = true //正在拖动
            if (!this.isTouching) return
            // 移动距离 = song-info距离浏览器左侧的距离 + 进度条距离浏览器左侧的距离
            const totalLeft = this.$refs.songinfoRef.offsetLeft + this.$refs.songdescRef.offsetLeft
            // 移动的X轴距离：当前鼠标的X轴距离浏览器左侧距离 - 移动距离
            let moveX = e.pageX - totalLeft
            let maxW = this.$refs.progressRef.offsetWidth
            // 边界值  370像素
            if (moveX >= maxW) moveX = maxW
            // 让进度条的进度等于当前拖动的进度即可
            this.$refs.pgs_in.style.width = moveX + 'px'
        },
        handleUp() {
            this.isTouching = false // 取消拖动
            const step = 370 / this.$refs.audio.duration
            // 当鼠标松开时，当前播放进度 = 进度条的宽 / 步长
            this.$refs.audio.currentTime = this.$refs.pgs_in.offsetWidth / step
            // 鼠标释放时，清除window事件  注意解绑的事件类型
            window.removeEventListener('mousemove', this.handleMove)
            window.removeEventListener('mouseup', this.handleUp)
        },
        // 时间转换器  格式： mm:ss
        trTime(sec) {
            // 秒数 = 总秒数 % 60
            const ss = sec % 60 < 10 ? ('0' + sec % 60) : sec % 60 // 秒数
            // 分钟 = 总秒数 / 60
            const mm = Math.floor(sec / 60) < 10 ? ('0' + Math.floor(sec / 60)) : Math.floor(sec / 60)
            if (!isNaN(ss)) {
                return mm + ':' + ss
            } else {
                return '00' + ':' + '00'
            }
        },
        // 切换上一首
        prevMusic() {
            const { home } = useStore()
            // 先判断本地中是否有数据
            if (!home.localData.length) return
            // 判断是否为随机播放
            if (this.order === 2) {
                // 生成随机数
                const radom = Math.floor(Math.random() * this.musicListData.length - 1)
                // 修改当前播放的索引
                home.playI = radom
                // 派发action
                home.getCurMusInfo(this.musicListData[home.playI].id)
            } else if (this.order === 3) {
                // 单曲循环
                this.playMusic()
            } else {
                home.playI--
                // 如果播放索引小于0，则播放最后一首
                if (home.playI < 0) {
                    home.playI = this.musicListData.length - 1
                }
                // 派发action
                home.getCurMusInfo(this.musicListData[home.playI].id)
            }

        },
        // 切换下一首
        nextMusic() {
            const { home } = useStore()
            // 先判断本地中是否有数据
            if (!home.localData.length) return
            if (this.order === 2) {
                const radom = Math.floor(Math.random() * this.musicListData.length - 1)
                home.playI = radom
                home.getCurMusInfo(this.musicListData[home.playI].id)
            } else if (this.order === 3) {
                // 重新播放
                this.playMusic()
            } else {
                home.playI++
                if (home.playI > this.musicListData.length - 1) {
                    home.playI = 0
                }
                // 派发action   
                home.getCurMusInfo(this.musicListData[home.playI].id)
            }

        },
        // 音乐播放完毕后触发
        playNextMusic() {
            // 这里只需要判断是否为顺序播放，如果播放到最后一首音乐，则停止播放
            const i = this.curMusicUrl[0].id === this.musicListData[this.musicListData.length - 1].id
            if (this.order === 1 && i) {
                // 暂停播放
                this.pauseMusic()
                this.isPlaying = 'pause'
            } else {
                // 播放下一首
                this.nextMusic()
            }
        },

        // 播放点击icon的音乐
        playCurMusic(row, i) {
            // 表格中的子元素
            const rows = this.$refs.tableRef.$children
            const { home } = useStore()
            // 如果播放的音乐与当前正在播放的音乐一致，则不需要执行操作（节省资源）
            if (this.isInit && home.curMusicData.length && row.id === home.curMusicData[0].id) {
                return
            }
            home.getCurMusInfo(row.id)
            // 判断url是否请求成功
            if (home.curMusicData.length) {
                if (!this.isInit) this.$refs.audio.play()
                this.isInit = true
                // 修改当前播放的索引
                home.playI = i
                // 排它
                // 遍历表格中最后一个子元素中的data, data存储了表格中每一条数据
                rows[rows.length - 1].data.forEach((item, i) => {
                    this.$refs['playingRef' + i].style.display = 'none'
                })
                // 让当前的icon显示(播放中)
                this.$refs['playingRef' + i].style.display = 'block'
                this.isPlaying = 'playing_now'
            }
        },


        // 点击音量容器，改变音量大小
        clickChangeVolumn(e) {
            // 存储当前音量
            let volume = this.$refs.audio.volume * 100
            volume = e.offsetX + 14
            // 是否正在拖动
            if (this.isTouchV) return
            // 点击的是否是小圆点
            if (e.target.className === 'volume_dot') return
            // 改变音量大小
            this.$refs.audio.volume = volume / 100
            this.$refs.volumeInRef.style.width = (volume - 14) + 'px'
        },
        // 当鼠标按下时，进行一些操作
        handleVol() {
            // 绑定鼠标移动和鼠标弹起事件
            window.addEventListener('mousemove', this.moveVolume)
            window.addEventListener('mouseup', this.changeVolumn)
        },
        // 移动音量条
        moveVolume(e) {
            this.isTouchV = true
            if (!this.isTouchV) return
            // 拖动的位置 = 鼠标在页面中的坐标 - (右侧区域容器距离左侧 + 音量容器距离左侧)
            let moveX = e.pageX - (this.$refs.songInfoRef.offsetLeft + this.$refs.volumeCRef.offsetLeft) - 30
            // 边界值
            const maxW = this.$refs.volumeBgRef.offsetWidth
            if (moveX >= maxW) moveX = maxW
            // 音量容器的宽度随着拖动而变化
            this.$refs.volumeInRef.style.width = moveX + 'px'
        },
        // 移动结束
        changeVolumn() {
            this.isTouchV = false
            // 进度条的宽度是86 ，取整
            // 音量大小 = 当前音量进度的宽 / 100
            // 修改音量大小
            this.$refs.audio.volume = (this.$refs.volumeInRef.offsetWidth + 14) / 100
            // 解绑事件
            window.removeEventListener('mousemove', this.moveVolume)
            window.removeEventListener('mouseup', this.changeVolumn)
        },
        // 静音
        mute() {
            this.isMute = true
            this.$refs.audio.volume = 0
            this.$refs.volumeInRef.style.width = 0
        },
        // 放声
        playBack() {
            this.isMute = false
            this.$refs.audio.volume = 1
            this.$refs.volumeInRef.style.width = this.$refs.volumeBgRef.offsetWidth + 'px'
        },

        // 删除音乐列表中所选的音乐
        delCureentM(row, i) {
            const { home } = useStore()
            home.playI = this.musicListData.findIndex(item => this.curMusicUrl[0].id === item.id)
            this.musicListData.splice(i, 1)
            // 如果数据只剩下一条
            if (this.musicListData.length < 1) {
                home.playI = 0
                this.isPlay = true
                this.$refs.audio.currentTime = 0
                this.$refs.pgs_in.style.width = 0
                this.$refs.audio.pause()
                this.curMusicUrl = []
                this.initTime = ''
                this.sDuration = this.initTime
                this.curTime = this.initTime
                home.updateLocalData([])
                return
            }
            // 播放中的音乐和播放列表中的音乐信息一致，则发请求获取下一首音乐信息
            if (this.curMusicUrl && row.id === this.curMusicUrl[0].id) {
                home.getCurMusInfo(this.musicListData[home.playI].id)
            }
            // 修改本地数据
            home.updateLocalData(this.musicListData)
        },
        // 清除音乐列表
        clearList() {
            const { home } = useStore()
            home.localData = []
            home.curMusicData = []
            home.playI = 0
            this.isPlay = true
            this.$refs.pgs_in.style.width = 0
            this.sDuration = this.initTime
            this.curTime = '00:00'
            localStorage.setItem('my-musicList', JSON.stringify(home.localData))
        }
    },
    computed: {
        // 音乐的mp3地址
        musicUrl() {
            const { home } = useStore()
            return this.curMusicUrl = home.curMusicData
        },
        // 音乐详情信息
        musicDetail() {
            const { home } = useStore()
            home.musicDetail.forEach(item => {
                item.dt = transPlayTime(item.dt)
            })
            return home.musicDetail
        },
        musicListData() {
            const { home } = useStore()
            return home.localData
        },
        // 歌曲封面
        songPic() {
            const { home } = useStore()
            if (home.localData.length) {
                return home.localData[home.playI].picUrl || ''
            }
        },
        // 歌曲名
        songName() {
            const { home } = useStore()
            if (home.localData.length) {
                return home.localData[home.playI].name || ''
            }
        },
        // 歌手名
        artists() {
            const { home } = useStore()
            // 如果本地有数据，则返回
            if (home.localData.length) {
                return home.localData[home.playI].artists[0].name || ''
            }
        },
        // 歌曲时长
        sDuration: {
            get() {
                const { home } = useStore()
                if (home.localData.length) {
                    return home.localData[home.playI].duration
                }
            },
            set(val) {
                this.initTime = '00:00'
            }

        },
    }

}
</script>
<style scoped lang="scss">
.container {
    display: flex;
    justify-content: space-between;
    position: relative;
    position: fixed;
    left: 0;
    bottom: -70px;
    width: 100%;
    height: 70px;
    background-color: #fff;
    box-shadow: 0 0 10px #ccc;
    padding: 0 160px;
    z-index: 999;
    transition: all .8s;

    .controller-song {
        position: absolute;
        right: 110px;
        bottom: 69px;
        width: 50px;
        background-color: #fff;
        box-shadow: 0 0 8px #fff;
        border-top-left-radius: 24px;
        border-top-right-radius: 24px;
        text-align: center;
        cursor: pointer;
    }

    .song-info {
        display: flex;
        width: 480px;
        height: 70px;

        .pic_box {
            width: 70px;
            height: 70px;
            margin-right: 20px;

            img {
                width: 100%;
                height: 100%;
            }
        }

        .song-desc {
            display: flex;
            width: 370px;
            flex-wrap: wrap;

            .song-title {
                display: flex;
                width: 370px;
                justify-content: space-between;
                margin-top: 18px;
                font-size: 16px;

                h4 {
                    cursor: pointer;
                    // 溢出文本隐藏
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                    font-size: #666;
                }

                .duration {
                    display: flex;

                    .cur_dur {
                        margin-right: 4px;
                    }
                }
            }

            .progress {
                width: 370px;

                .progress_bg {
                    position: relative;
                    width: 100%;
                    height: 3px;
                    background-color: rgba(0, 0, 0, .05);
                    cursor: pointer;
                    border-radius: 2px;

                    .inner {
                        display: flex;
                        align-items: center;
                        position: absolute;
                        left: 0;
                        top: 0;

                        .progress_in {
                            height: 3px;
                            background-color: #e3222270;
                        }

                        .dot {
                            position: absolute;
                            top: -4px;
                            right: -4px;
                            width: 10px;
                            height: 10px;
                            background: #fff;
                            border-radius: 50%;
                            box-shadow: 0 0 9px #ccc;
                        }

                        .dot::before {
                            content: '';
                            position: absolute;
                            top: 50%;
                            left: 50%;
                            transform: translate(-50%, -50%);
                            width: 4px;
                            height: 4px;
                            border-radius: 50%;
                            background-color: #e3222270;
                        }

                        .dot:hover {
                            width: 13px;
                            height: 13px;
                            top: -6px;
                        }
                    }
                }

            }
        }
    }


    .song-controls {
        width: 200px;
        height: 70px;
        line-height: 70px;
        margin-left: 10px;

        .controller {
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0 10px;
            margin-bottom: 20px;

            .left-btn {
                font-size: 23px;
                margin-top: 8px;
                cursor: pointer;
            }

            .center-btn {
                font-size: 66px;
                cursor: pointer;
            }

            .right-btn {
                font-size: 23px;
                margin-top: 8px;
                cursor: pointer;

            }

        }
    }

    .set-songInfo {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        width: 470px;
        margin-top: 4px;

        .playIcon {
            margin-right: 28px;

            i {
                font-size: 20px;
                cursor: pointer;
            }
        }

        .contr {
            margin-right: 28px;
            font-size: 20px;
            cursor: pointer;
        }

        .quality-box {
            position: relative;
            width: 58px;
            height: 24px;
            line-height: 22px;
            border: 1px solid #999;
            border-radius: 14px;
            font-size: 14px;
            cursor: pointer;
            padding-left: 3px;

            .quality {
                margin-left: 10px;
            }

            .quality::before {
                position: absolute;
                right: 9px;
                top: 5px;
                display: inline-block;
                content: '';
                width: 5px;
                height: 5px;
                border-left: 2px solid #999;
                border-bottom: 2px solid #999;
                transform: rotate(-45deg);
                margin-left: 4px;
            }
        }

        .volume {
            display: flex;
            align-items: center;

            .volume_progress {
                width: 86px;
                margin-left: 10px;

                .volume_progress_bg {
                    position: relative;
                    width: 100%;
                    height: 3px;
                    background-color: rgba(0, 0, 0, .05);
                    cursor: pointer;
                    border-radius: 2px;

                    .volume_inner {
                        display: flex;
                        align-items: center;
                        position: absolute;
                        left: 0;
                        top: 0;

                        .volume_progress_in {
                            width: 86px;
                            height: 3px;
                            background-color: #e3222270;
                        }

                        .volume_dot {
                            position: absolute;
                            right: -4px;
                            top: -3px;
                            width: 8px;
                            height: 8px;
                            border-radius: 50%;
                            background: #fff;
                            box-shadow: 0 0 8px #ccc;
                        }
                    }
                }
            }
        }
    }

    // el-table 表格
    .songList {
        position: absolute;
        right: 160px;
        top: -485px;

        .artist-col {
            .artist_name {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
            }
        }

        .playing {
            display: none;
            position: absolute;
            right: 80px;
            top: 50%;
            transform: translateY(-50%);
            width: 30px;
            height: 30px;
            z-index: 555;
            padding: 0 5px;

            .playing_now {
                animation-play-state: running;
            }





            .side1 {
                position: absolute;
                bottom: 6px;
                left: 0;
                width: 3px;
                height: 5px;
                background-color: #e3222270;
                animation: playing .8s linear infinite;
            }

            .side2 {
                position: absolute;
                bottom: 6px;
                left: 4.5px;
                width: 3px;
                height: 7px;
                background-color: #e3222270;
                animation: playing 1.1s linear infinite;
                animation-delay: .7s;
            }

            .side3 {
                position: absolute;
                bottom: 6px;
                left: 9px;
                width: 3px;
                height: 9px;
                background-color: #e3222270;
                animation: playing 1.3s linear infinite;
                animation-delay: 1s;
            }

            .pause {
                animation-play-state: paused;
            }

            @keyframes playing {
                to {
                    height: 2px;
                }

                from {
                    height: 10px;
                }
            }
        }

        // 单元格
        .columnList:hover .icon-play {
            display: block;
        }

        .columnList:hover .delete_icon_btn {
            display: block;
        }

        .playCount {
            font-size: 18px;
            font-weight: 700;
            color: #333;
        }

        .clearData {
            font-size: 16px;
            margin-right: 50px;
            cursor: pointer;
        }

        .icon-play {
            display: none;
            position: absolute;
            right: 72px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 24px;
            z-index: 666;
            cursor: pointer;
        }

        .delete_icon_btn {
            display: none;
            position: absolute;
            right: 54px;
            top: 50%;
            transform: translateY(-50%);
            font-size: 19px;
            z-index: 666;
            cursor: pointer;
        }

        .close {
            position: absolute;
            right: 30px;
            top: -4px;
            font-size: 20px;
            cursor: pointer;
        }
    }

}


.container:hover {
    bottom: 0 !important;
}
</style>

<style>
.el-table {
    overflow: none !important;
}

.el-table .cell {
    word-break: normal !important;
}

/* 覆盖table边框 */
.customer-table .el-table__row .el-table__cell {
    border: 0;
    font-size: 16px;
    color: #333;
}
</style>