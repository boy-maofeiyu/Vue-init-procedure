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
    <van-form @submit="onSubmit" ref="form">
      <van-cell-group>
        <van-field
          v-model="user.mobile"
          label="手机号"
          name="mobile"
          left-icon="smile-o"
          right-icon="warning-o"
          placeholder="请输入手机号"
          :rules="formRules.mobileRules"
        />
        <van-field
          v-model="user.code"
          name="code"
          clearable
          label="验证码"
          left-icon="music-o"
          placeholder="请输入验证码"
          :rules="formRules.codeRules"
        >
          <template #button>
            <!-- 发送验证码开始 -->
            <van-button
              v-if="countDown.isCountDown"
              size="small"
              type="primary"
              @click.prevent="clicksendSms"
              >获取验证码</van-button
            >
            <!-- 发送验证码结束 -->
            <!-- 验证码倒计时开始 -->
            <van-count-down
              v-else
              :time="countDown.time"
              :format="countDown.format"
              @finish="countFinish"
            />
            <!-- 验证码倒计时结束 -->
          </template>
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
      },
      // 验证码倒计时控制
      countDown: {
        time: '60000',
        isCountDown: true,
        format: 'ss'
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
        await this.$refs.form.validate('mobile')
        // 短信发送成功
        await sendSms(this.user.mobile)
        // 进入count状态
        this.countDown.isCountDown = false
      } catch (e) {
        // 短信发送失败
        console.log(e.message)
      }
    },
    // 验证码倒计时结束
    countFinish () {
      // 恢复发送code
      this.countDown.isCountDown = true
    }
  }
}
</script>

<style scoped></style>
