<template>
    <div class="backTop" @click="backTop" ref="backTopRef" v-show="isShow">
        <div class="up-arrows">
            <i></i>
        </div>
    </div>
</template>
<script>
export default {
    name: 'BackTop',
    data() {
        return {
            isShow: false
        }
    },
    mounted() {
        let that = this
        window.addEventListener('scroll', function () {
            this.setTimeout(() => {
                if (document.documentElement.scrollTop > 400) {
                    that.isShow = true
                } else {
                    that.isShow = false
                }
            }, 100)
        })
    },
    methods: {
        backTop() {
            // 页面顶部滚动位置为0
            document.documentElement.scrollTop = 0
        },

    },
    beforeDestroy() {
        // 解绑window事件
        // removeEventListener(window, function () {
        //     this.setTimeout(() => {
        //         if (document.documentElement.scrollTop > 400) {
        //             that.isShow = true
        //         } else {
        //             that.isShow = false
        //         }
        //     }, 100)
        // })
    }
}
</script>
<style scoped lang="scss">
.backTop {
    position: fixed;
    right: 30px;
    bottom: 120px;
    width: 50px;
    height: 50px;
    background-color: #fff;
    box-shadow: 0 0 8px #ccc;
    text-align: center;
    cursor: pointer;
    z-index: 999;

    .up-arrows {
        position: relative;

        i {
            position: absolute;
            left: 14px;
            top: 20px;
            display: block;
            width: 20px;
            height: 20px;
            border-top: 3px solid #e3222270;
            border-right: 3px solid #e3222270;
            transform: rotate(-45deg);
        }
    }
}
</style>