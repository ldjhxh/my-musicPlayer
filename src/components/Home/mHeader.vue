<template>
    <div class="header">
        <div class="header_left">
            <router-link to="/">
                <h3>我的音乐</h3>
            </router-link>
        </div>
        <div class="header_center">
            <router-link :to="item.path" v-for="item in paths" ref="titleRefs" :key="item.path">
                <span>{{ item.meta.title }}</span>
            </router-link>
        </div>
        <div class="header_right">
            <el-input class="w-50 m-2 search" size="large" v-model="keyword" placeholder="请输入关键字" />
            <el-button class="btn">搜索</el-button>
        </div>
    </div>
</template>

<script >
export default ({
    name: 'mHeader',
    data() {
        return {
            keyword: '', // 关键字
            paths: null
        }
    },

    mounted() {
        // this.$router.options中的routes属性 是个数组
        // 返回所有路由中带有meta配置项的路由
        this.paths = this.$router.options.routes.filter(item => item.meta)
    },

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

    .header_right {
        display: flex;
        margin: 20px 30px 20px 0;

        .search {
            width: 224px;
            height: 34px;
            margin-right: 10px;
        }

        .btn {
            color: #f8c7c7;

            :hover {
                color: #409eff;
            }
        }


    }

    .header_center {
        margin-top: 26px;
        font-size: 24px;
        letter-spacing: .1em;

        .active {
            margin: 0 10px;
            color: #fff;
        }
    }
}

.current span {
    padding-bottom: 3px;
    border-bottom: 2px solid #fff;
    color: #fff;
}
</style>