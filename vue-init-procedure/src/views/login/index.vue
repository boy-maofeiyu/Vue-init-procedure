<template>
  <div class="login-container">
    <!-- nav-bar导航栏开始 -->
    <van-nav-bar
      title="注册/登录"
      left-text="返回"
      left-arrow
      @click-left="this.$router.back()"
    />
    <!-- nav-bar导航栏结束 -->
    <!-- 表单开始 -->
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        label="手机号"
        left-icon="smile-o"
        right-icon="warning-o"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="user.code"
        clearable
        label="验证码"
        left-icon="music-o"
        placeholder="请输入验证码"
      >
        <!-- 发送验证码开始 -->
        <template #button>
          <van-button size="small" type="primary">获取验证码</van-button>
        </template>
        <!-- 发送验证码结束 -->
      </van-field>
    </van-cell-group>
    <!-- 表单结束 -->
    <!-- 登录按钮开始 -->
    <van-button type="primary" size="large">登录</van-button>
    <!-- 登录按钮结束 -->
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  data () {
    return {
      // 表单数据
      user: {
        mobile: '17715319639', // 用户手机号
        code: '245810' // 用户验证码
      }
    }
  },
  methods: {}
}
</script>

<style scoped></style>
