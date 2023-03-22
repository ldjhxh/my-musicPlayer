<template>
    <div>
        <CarouselView />
        <RecommendView />
        <NewMusicView />
    </div>
</template>
<script>
import CarouselView from './CarouselView.vue'
import RecommendView from '@/views/Home/RecommendView.vue'
import NewMusicView from './NewMusicView.vue';
export default {
    name: 'IndexView',
    components: {
        CarouselView,
        RecommendView,
        NewMusicView
    }
}
</script>

<style></style>