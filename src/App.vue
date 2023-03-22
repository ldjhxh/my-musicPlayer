<script>
export default {
}
</script>

<template>
  <div id="app">
    <!-- 头部组件 -->
    <My-Header></My-Header>
    <!-- 返回顶部组件 -->
    <My-BackTop></My-BackTop>
    <!-- 音乐播放器组件 -->
    <My-MusicPlayer></My-MusicPlayer>
    <!-- 路由入口 -->
    <router-view></router-view>

  </div>
</template>

<style>
/* 自定义加载进度条样式 */
#nprogress .bar {
  background-color: #e3222270 !important;
}
</style>
