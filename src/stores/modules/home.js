import { getCarouselAPI } from '@/api/index.js'
import { defineStore } from "pinia";

const useCounterHome = defineStore({
    id: 'home',
    state: () => ({
        carouselData: []
    }),
    getters: {

    },
    actions: {
        async getCarData() {
            const res = await getCarouselAPI()
            if (res.status === 200) {
                this.carouselData = res.data
            } else {
                throw new Error('获取轮播图数据失败！')
            }
        }
    }
})

export default useCounterHome