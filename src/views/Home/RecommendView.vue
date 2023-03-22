<template>
    <div class="container">
        <div class="title">
            <h4>推荐歌单</h4>
        </div>
        <el-card class="box-card">
            <div class="album-body">
                <My-Song v-for="(item, i) in rcdData.result" :key="item.id" :src="item.picUrl" :sName="item.name"
                    :playCount="item.playCount" :songlistId="item.id"></My-Song>
                {{ playCountD }}
            </div>
        </el-card>
    </div>
</template>
<script>
import useStore from '@/stores/counter'
const { home } = useStore()
export default {
    name: 'RecommendView',
    data() {
        return {

        }
    },
    mounted() {
        // 派发请求
        home.getRcdData()
    },
    methods: {
        // 获取歌单列表信息
        getSongListInfo(e) {
            // 路由跳转
            // this.$router.push({name:'songlist',params: {id}})
        }
    },
    computed: {
        // 推荐歌单数据
        rcdData() {
            return home.RecommendData
        },
        playCountD() {
            return home.handleRcdData
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
        .album-body {
            display: flex;
            flex-wrap: wrap;

        }
    }
}
</style>