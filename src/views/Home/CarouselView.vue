<template>
    <el-card class="box-card">
        <el-carousel :interval="4000" type="card" height="310px">
            <!-- key值绑定每项的图片地址 -->
            <el-carousel-item v-for="item in carData" :key="item.imageUrl">
                <img :src="item.imageUrl" alt="">
            </el-carousel-item>
        </el-carousel>
    </el-card>
</template>

<script>
import useStore from '@/stores/counter'
export default {
    name: 'CarouselView',
    data() {
        return {
        }
    },
    mounted() {
        // 使用pinia 先调用useStore()一下
        const { home } = useStore()
        // 派发action直接写home中的函数名即可
        home.getCarData()
    },
    computed: {
        carData() {
            const { home } = useStore()
            return home.carouselData.banners
        }
    }
}
</script>

<style scoped lang="scss">
.box-card {
    width: 1200px;
    height: 380px;
    margin: 10px auto;



    img {
        width: 100%;
        height: 100%;
    }
}
</style>