<template>
    <div class="container">
        <el-card>
            <!-- 搜索模块 -->
            <div class="p-search">
                <div class="search-box">
                    <input type="text" v-model="keywords" @keyup="getSearchlList">
                    <button @click="getSearchlList">
                        <i class="el-icon-search"></i>
                    </button>
                </div>
                <!-- 搜索建议 -->
                <ul class="search_suggest" v-show="isShowList">
                    <li v-for="item in suggestData" @click="getKeyword($event, item.name, item.album.name)">{{ item.name
                    }}-{{
    item.album.name }}</li>
                </ul>
            </div>
            <!-- 搜索列表模块 -->
            <div class="m-search">
                <div class="m-result">搜索"{{ keyword }}", 找到 <span>{{ dataCount }}</span>首单曲</div>
                <ul class="m-tab">
                    <li v-for=" (item, i) in tabData" :key="item.name" @click="toggleType(item.type, i)">
                        <router-link
                            :to="{ name: 'searchContent', query: { keywords: keywords || oKeywords, type: item.type } }"
                            :key="item.type" exact active-class="c_active">{{
                                item.name }}</router-link>
                    </li>
                </ul>
                <!-- 搜索内容 -->
                <router-view :songData="mData"></router-view>
            </div>
        </el-card>
    </div>
</template>

<script>
import useStore from '@/stores/counter.js';
import transPlayTime from '@/hook/transPlayTime.js'
import { debounce } from 'lodash'
const { search } = useStore()
export default {
    name: 'Search',
    data() {
        return {
            keywords: '', // 搜索关键字
            oKeywords: '', // 存储旧内容
            tabData: [
                {
                    name: '单曲',
                    type: 1
                },
                {
                    name: '歌手',
                    type: 100

                },
                {
                    name: '专辑',
                    type: 10
                },
                {
                    name: '视频',
                    type: 1014
                },
                {
                    name: '歌单',
                    type: 1000
                },
                {
                    name: '用户',
                    type: 1002
                }
            ], // tab栏内容
            songData: [], // 歌曲数据
            suggestData: [],//搜索建议数据
            isShowList: false, //是否显示搜索建议框
        }
    },
    async mounted() {
        // 接收传递过来的id
        this.keywords = this.$route.query.keywords
        // 先存储关键字
        this.oKeywords = this.keywords
        // 判断搜索列表中是否有数据
        if (!this.songData.length) {
            // 没有就发请求
            await search.getSearchList(this.keywords, this.$route.query.type)
            // 转换时间
            search.searchList.songs.forEach(item => {
                if (typeof (item.dt) === 'number') {
                    item.dt = transPlayTime(item.dt)
                }
            })
            this.songData = search.searchList.songs
        }
        let that = this
        // 绑定全局事件
        window.addEventListener('click', that.closeList)
    },
    methods: {
        // 点击tab切换内容
        toggleType(type, i) {
            if (this.keywords) {
                // 派发请求
                search.getSearchList(this.keywords, type)
            }

        },
        // 获取搜索列表数据
        async getSearchlList(e) {
            // 按下回车派发请求或者按下搜索按钮
            if (e.key === 'Enter' || e.target.tagName === 'I') {
                // 清除字符两侧的空格
                if (this.keywords.trim() === '') {
                    this.keywords = ''
                    return
                }
                // 判断当前输入的关键字是否与上一次输入的关键字相同
                if (this.keywords === this.oKeywords) return
                // 路由跳转
                // 注意：type是字符型
                this.$router.push({ name: 'searchContent', query: { keywords: this.keywords, type: '1' } })
                // 存储关键字
                this.oKeywords = this.keywords
                await search.getSearchList(this.keywords, this.$route.query.type)
                // 转换时间
                search.searchList.songs.forEach(item => {
                    if (typeof (item.dt) === 'number') {
                        item.dt = transPlayTime(item.dt)
                    }
                })
                // 关闭搜索建议列表
                this.isShowList = false
            }
        },
        // 获取搜索建议数据
        async getKeyword(e, sName = '', aName = '') {
            console.log(e)
            const { search } = useStore()
            this.keywords = sName + '-' + aName
            // 隐藏搜索建议
            this.isShowList = false
            // 注意：type是字符型
            this.$router.push({ name: 'searchContent', query: { keywords: sName, type: '1' } })
            await search.getSearchList(sName, this.$route.query.type)
            // 转换时间
            search.searchList.songs.forEach(item => {
                if (typeof (item.dt) === 'number') {
                    item.dt = transPlayTime(item.dt)
                }
            })
        },
        // 点击页面，关闭搜索建议列表
        closeList(e) {
            // 判断点击的是否是input
            if (e.target.tagName === 'INPUT') return
            this.isShowList = false
        }
    },
    computed: {
        mData() {
            if (search.searchList.songs) {
                return search.searchList.songs
            } else {
                return this.songData
            }
        },
        // 搜索关键字
        keyword() {
            if (this.$route.query.keywords) {
                return this.$route.query.keywords
            } else {
                return ''
            }
        },
        // 搜索结果 例如：10首歌曲 ， 20首歌曲...
        dataCount() {
            if (search.searchList.songs) {
                return search.searchList.songs.length
            } else {
                return 0
            }
        }
    },
    watch: {
        // 监听关键字的变化
        keywords: {
            handler: debounce(async function (val) {
                const { search } = useStore()
                // 如果输入内容为空，则不需要发送请求
                if (val !== '') {
                    // 等待请求
                    await search.getSearchSuggest(val)
                    // 再进行赋值操作
                    this.suggestData = search.searchSuggest
                    if (this.suggestData) {
                        this.isShowList = true
                    }
                } else {
                    this.isShowList = false
                }

            }, 500),
        }
    },
    beforeDestroy() {
        // 解绑全局事件
        window.removeEventListener('click', this.closeList)
    }
}
</script>

<style scoped lang="scss">
.container {
    width: 1200px;
    margin: 0 auto;

    .p-search {
        .search-box {
            display: flex;
            width: 470px;
            margin: 0 auto;
            border: 1px solid #eee;

            input {
                width: 500px;
                height: 42px;
                padding-left: 10px;
                outline: none;
                border: none;
                flex: 1;
            }

            button {
                width: 60px;
                height: 42px;
                background-color: #e3222270;
                cursor: pointer;

                .el-icon-search {
                    width: 100%;
                    font-size: 26px;
                    color: #fff;
                }
            }
        }

        .search_suggest {
            position: absolute;
            top: 44px;
            left: 344px;
            width: 410px;
            border: 1px solid #ffdede;
            border-top: none;
            z-index: 888;

            li {
                height: 42px;
                line-height: 42px;
                background-color: #fff;
                padding-left: 6px;
                cursor: pointer;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            li:hover {
                background-color: #ffa5a5;
            }
        }

    }

    .m-search {

        .m-result {
            margin: 28px 0;
            margin-left: 22px;
            color: #999;

            span {
                margin: 0 4px;
                font-size: 20px;
                color: #ff6700;
            }
        }

        .m-tab {
            width: 1170px;
            height: 80px;

            li {
                float: left;
                padding: 0 30px;
                height: 40px;
                line-height: 40px;

                a {
                    color: #333;
                    font-weight: 700;
                    font-size: 16px;
                    padding-bottom: 4px;
                    transition: none;
                }

                a:hover {
                    border-bottom: 3px solid #e3222270;
                }

                a.c_active {
                    border-bottom: 3px solid #e3222270;
                }
            }
        }


    }
}
</style>