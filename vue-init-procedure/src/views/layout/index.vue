<template>
  <div class="layout-container">
    <van-tabbar route>
      <van-tabbar-item icon="home-o" to="home">主页</van-tabbar-item>
      <van-tabbar-item icon="search">标签</van-tabbar-item>
      <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/login">我的</van-tabbar-item>
    </van-tabbar>
    <!-- 路由占位符 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'LayoutIndex'
}
</script>

<style scoped></style>
