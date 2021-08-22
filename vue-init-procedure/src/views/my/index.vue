<template>
  <div class="my-container">
    <!-- 我的页面头部开始 -->
    <div class="my-header">
      <!-- 用户信息开始 -->
      <van-cell-group>
        <van-cell title="单元格" center>
          <img
            slot="icon"
            src="https://img0.baidu.com/it/u=3419276493,3061530094&fm=26&fmt=auto&gp=0.jpg"
            style="width:100px;height:100px"
          />
          <span slot="title">有点66</span>
          <span slot="right-icon">11111</span>
        </van-cell>
        <van-cell>
          <van-grid :column-num="4">
            <van-grid-item icon="photo-o" text="头条">
              <span slot="icon">1111</span>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="关注">
              <span slot="icon">1111</span>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="粉丝">
              <span slot="icon">1111</span>
            </van-grid-item>
            <van-grid-item icon="photo-o" text="获赞">
              <span slot="icon">1111</span>
            </van-grid-item>
          </van-grid>
        </van-cell>
      </van-cell-group>
      <!-- 用户信息结束 -->
      <!-- 收藏 历史 开始 -->
      <van-grid :column-num="2">
        <van-grid-item icon="photo-o" text="收藏" />
        <van-grid-item icon="photo-o" text="历史" />
      </van-grid>
      <!-- 收藏 历史 结束 -->
      <!-- 小智同学 开始 -->
      <van-cell title="小智同学" is-link to="/home" />
      <!-- 小智同学 结束 -->
      <!-- 退出登录 开始 -->
      <van-cell value="退出登录" center />
      <!-- 退出登录 借宿 -->
    </div>
    <!-- 我的页面头部结束 -->
  </div>
</template>

<script>
export default {
  name: 'MyIndex'
}
</script>

<style scoped></style>
