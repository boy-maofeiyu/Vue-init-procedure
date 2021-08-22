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
    <van-form @submit="onSubmit">
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          label="手机号"
          left-icon="smile-o"
          right-icon="warning-o"
          placeholder="请输入手机号"
          :rules="formRules.mobileRules"
        />
        <van-field
          v-model="user.code"
          clearable
          label="验证码"
          left-icon="music-o"
          placeholder="请输入验证码"
          :rules="formRules.codeRules"
        >
          <!-- 发送验证码开始 -->
          <template #button>
            <van-button
              size="small"
              type="primary"
              @click.prevent="clicksendSms"
              >获取验证码</van-button
            >
          </template>
          <!-- 发送验证码结束 -->
        </van-field>
      </van-cell-group>
      <!-- 登录按钮开始 -->
      <van-button type="primary" size="large">登录</van-button>
      <!-- 登录按钮结束 -->
    </van-form>
    <!-- 表单结束 -->
  </div>
</template>

<script>
import { login, sendSms } from '../../api/user.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      // 表单数据
      user: {
        mobile: '13911111111', // 用户手机号
        code: '246810' // 用户验证码
      },
      // 表单校验规则
      formRules: {
        mobileRules: [{ required: true, message: '请填写手机号' }],
        codeRules: [{ required: true, message: '请填写验证码' }]
      }
    }
  },
  methods: {
    // 登录 表单提交事件
    async onSubmit () {
      try {
        const { data } = await login(this.user)
        console.log('登录成功', data)
      } catch (e) {
        // 登录失败操作
      }
    },
    // 发送短信验证码
    async clicksendSms () {
      try {
        // 短信发送成功
        await sendSms(this.user.mobile)
      } catch (e) {
        // 短信发送失败
      }
    }
  }
}
</script>

<style scoped></style>
