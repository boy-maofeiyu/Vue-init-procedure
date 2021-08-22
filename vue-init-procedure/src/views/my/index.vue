<template>
  <div class="my-container">
    <!-- 我的页面头部 开始 -->
    <div class="my-header">
      <!-- 用户信息 开始 -->
      <!-- 登录状态 开始 -->
      <van-cell-group v-if="isLogin">
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
      <!-- 登录状态 结束 -->
      <div class="my-unlogin" v-else>
        <div class="phone-login">
          <img
            src="https://i0.hdslb.com/bfs/album/1492be6ec64e6328e1fe16540cdf2dee65ae1c8f.png"
          />
        </div>
        <div>点击登录</div>
      </div>
      <!-- 用户信息 结束 -->
    </div>
    <!-- 我的页面头部结束 -->
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
    <van-cell v-if="isLogin" value="退出登录" center @click="getCurrentInfo" />
    <!-- 退出登录 借宿 -->
  </div>
</template>

<script>
import { mapState } from 'vuex'
import { getUserInfo } from '../../api/user.js'
export default {
  name: 'MyIndex',
  data () {
    return {
      isLogin: true,
      currentUserInfo: {}
    }
  },
  methods: {
    async getCurrentInfo () {
      const { data } = await getUserInfo()
      this.currentUserInfo = data.data
    }
  },
  created () {
    this.getCurrentInfo()
  },
  computed: {
    ...mapState(['user'])
  }
}
</script>

<style scoped>
/* 未登录页面样式 */
.my-unlogin {
  background-color: skyblue;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 200px;
  width: 100%;
}
</style>
