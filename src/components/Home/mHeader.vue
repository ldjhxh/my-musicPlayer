<template>
    <div class="header">
        <div class="header_left">
            <router-link to="/">
                <h3>我的音乐</h3>
            </router-link>
        </div>
        <div class="header_center">
            <!-- exact开启精确匹配 -->
            <router-link :to="item.path" v-for="item in paths" ref="titleRefs" :key="item.path" active-class="active" exact>
                <span>{{ item.meta.title }}</span>
            </router-link>
        </div>
        <div class="header_right">
            <div class="search_box">
                <i class="el-icon-search" @click="getSearchlList"></i>
                <input class="search" v-model="keywords" placeholder="请输入关键字" @keyup="getSearchlList" />
            </div>
            <!-- 搜索建议 -->
            <ul class="search_suggest" v-show="isShowList">
                <li v-for="item in suggestData" @click="getKeyword(item.name, item.album.name)">{{ item.name }}-{{
                    item.album.name }}</li>
            </ul>
        </div>
    </div>
</template>

<script>
import useStore from '@/stores/counter.js'
import transPlayTime from '@/hook/transPlayTime.js'
// 引入lodash的防抖函数
import { debounce } from 'lodash'
export default ({
    name: 'mHeader',
    data() {
        return {
            keywords: '', // 关键字
            oKeywords: '', // 旧关键字
            paths: null,
            isShowList: false, // 是否显示搜索建议
            suggestData: [] // 搜索建议数据
        }
    },

    mounted() {
        // this.$router.options中的routes属性 是个数组
        // 返回所有路由中带有meta配置项的路由
        this.paths = this.$router.options.routes.filter(item => item.meta)
    },

    methods: {
        // 获取搜索列表数据
        async getSearchlList(e) {
            const { search } = useStore()
            // 按下回车派发请求
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
                // 清空内容
                this.keywords = ''

            }
        },
        // 获取关键字，发送请求
        async getKeyword(sName, aName) {
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
    }
})

</script>
<style scoped lang="scss">
.header {
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 80px;
    background-color: #e3222270;

    .header_left {
        width: 300px;
        height: 80px;
        line-height: 80px;
        margin-left: 50px;
        font-size: 24px;

        h3 {
            color: #ffffff;
        }
    }

    .header_center {
        a {
            margin: 0 8px;
        }
    }

    .header_right {
        display: flex;
        margin: 20px 30px 20px 0;
        position: relative;

        .search_box {
            position: relative;
            width: 224px;
            height: 36px;
            margin-right: 10px;

            .search {
                width: 100%;
                height: 100%;
                border: 1px solid #cee;
                border-radius: 20px;
                outline: none;
                padding-left: 32px;
            }

            .el-icon-search {
                position: absolute;
                left: 10px;
                top: 7px;
                font-size: 20px;
                z-index: 666;
                cursor: pointer;
                color: #eee;
            }
        }

        .search_suggest {
            position: absolute;
            top: 37px;
            left: 3px;
            width: 222px;
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
                background-color: #e3222270;
            }
        }

    }

    .active {
        color: #fff;
    }

    .header_center {
        margin-top: 26px;
        font-size: 24px;
        letter-spacing: .1em;

    }
}

.current span {
    padding-bottom: 3px;
    border-bottom: 2px solid #fff;
    color: #fff;
}
</style>