# 登录注册

![image-20210814133432168](https://i0.hdslb.com/bfs/album/4cf80527bf57efe29f8605f1120ffc735b842c50.png)

## 1. 学习目标

- 能实现登录页面的布局
- 能实现基本登录功能
- 能掌握 Vant 中 Toast 提示组件的使用
- 能理解 API 请求模块的封装
- 能理解发送验证码的实现思路
- 能理解 Vant Form 实现表单验证的使用
- 先快速布局,再调节样式

## 2. 页面布局`先布局,再调节`

### 2.1 结构

这里主要使用到三个 Vant 组件：

- [NavBar 导航栏](https://youzan.github.io/vant/#/zh-CN/nav-bar)

- [Field 输入框](https://youzan.github.io/vant/#/zh-CN/field)

- [Button 按钮](https://youzan.github.io/vant/#/zh-CN/button)

一个经验：`使用组件库中的现有组件`快速布局，再慢慢调整细节，效率更高（刚开始可能会感觉有点麻烦，越用越熟）。

![image-20210808175929311](https://i0.hdslb.com/bfs/album/a8308723316a791c46033416f4cf1177138516d5.png)

```VUe
<template>
  <div class="login-container">
    <van-nav-bar
      title="登录"
      left-arrow
      @click-left="$router.back()"
    />

    <!-- 登录表单 -->
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        left-icon="smile-o"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="user.code"
        clearable
        left-icon="music-o"
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button
            size="small"
            round
          >发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <van-button type="info" block>登录</van-button>
    <!-- /登录表单 -->
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less"></style>
```



### 2.2 样式

> 写样式的原则：将公共样式写到全局（`src/styles/index.less`），将局部样式写到组件内部。

#### 2.2.1 全局样式 `src/styles/index.less`

```CSS
/**
 * 全局样式
 */
@import "./icon.less";

body {
  background-color: #f5f7f9;
}

.app-nav-bar {
  background-color: #3296fa !important;
  .van-nav-bar__title {
    color: #fff;
  }
  .van-icon {
    color: #fff !important;
  }
}
```

#### 2.2.2 登录页面局部样式 `src/views/login/index.vue`。

```html
<template>
  <div class="login-container">
    <!-- 导航栏 -->
    <van-nav-bar
      class="app-nav-bar"
      title="注册 / 登录"
      left-arrow
      @click-left="$router.back()"
    />
    <!-- /导航栏 -->

    <!-- 登录表单 -->
    <van-cell-group>
      <van-field
        v-model="user.mobile"
        icon-prefix="toutiao"
        left-icon="shouji"
        placeholder="请输入手机号"
      />
      <van-field
        v-model="user.code"
        clearable
        icon-prefix="toutiao"
        left-icon="yanzhengma"
        placeholder="请输入验证码"
      >
        <template #button>
          <van-button
            class="send-btn"
            size="mini"
            round
          >发送验证码</van-button>
        </template>
      </van-field>
    </van-cell-group>
    <div class="login-btn-wrap">
      <van-button class="login-btn" type="info" block>登录</van-button>
    </div>
    <!-- /登录表单 -->
  </div>
</template>

<script>
export default {
  name: 'LoginIndex',
  components: {},
  props: {},
  data () {
    return {
      user: {
        mobile: '', // 手机号
        code: '' // 验证码
      }
    }
  },
  computed: {},
  watch: {},
  created () {},
  mounted () {},
  methods: {}
}
</script>

<style scoped lang="less">
.login-container {
  .send-btn {
    width: 76px;
    height: 23px;
    background-color: #ededed;
    .van-button__text {
      font-size: 11px;
      color: #666666;
    }
  }
  .login-btn-wrap {
    padding: 26px 16px;
    .login-btn {
      background-color: #6db4fb;
      border: none;
      .van-button__text {
        font-size: 15px;
      }
    }
  }
}
</style>
```



## 3. 实现基本的登录功能

思路：

- 注册登录按钮点击事件

- 获取表单数据（根据接口要求使用 v-model 绑定）

- 表单验证

- 请求提交

- 处理响应结果

### **（1）根据接口要求绑定获取表单数据**



在登录页面组件的实例选项 data 中添加 `user` 数据字段：



```
...
data () {
  return {
    user: {
      mobile: '',
      code: ''
    }
  }
}
```



在表单中使用 `v-model` 绑定对应数据：

```html
<!-- van-cell-group 仅仅是提供了一个上下外边框，能看到包裹的区域 -->
<van-cell-group>
  <van-field
    v-model="user.mobile"
    required
    clearable
    label="手机号"
    placeholder="请输入手机号"
  />

  <van-field
    v-model="user.code"
    type="number"
    label="验证码"
    placeholder="请输入验证码"
    required
  />
</van-cell-group>
```

最后测试

>  一个小技巧：使用 VueDevtools 调试工具查看是否绑定成功。

### **（2）请求登录**

创建 `src/api/user.js` 模块，封装登录请求方法：

```js
/**
 * 用户相关的请求模块
 */
import request from "@/utils/request"

/**
 * 用户登录
 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
```

给登录按钮注册点击事件

登录处理函数如下

```js
import { login } from '@/api/user'

async onLogin () {
  try {
    const res = await login(this.user)
    console.log('登录成功', res)
  } catch (err) {
    if (err.response.status === 400) {
     	console.log('登录失败', err)
    }
  }
}
```

最后测试

## 4. 登录状态提示

![image-20210814133527958](https://i0.hdslb.com/bfs/album/c12314942c91e844bba68406f86803c8e7162e76.png)

![image-20210814133551172](https://i0.hdslb.com/bfs/album/fdc38b931ff01072adf27969426234d0108af0b1.png)

![image-20210814133605304](https://i0.hdslb.com/bfs/album/4d89d4aedd74bae4326853bdda9d44bd3cacf345.png)

Vant 中内置了[Toast 轻提示](https://youzan.github.io/vant/#/zh-CN/toast)组件，可以实现移动端常见的提示效果。

```JS
// 简单文字提示
Toast("提示内容");

// loading 转圈圈提示
Toast.loading({
  duration: 0, // 持续展示 toast
  message: "加载中...",
  forbidClick: true // 是否禁止背景点击
});

// 成功提示
Ttoast.success("成功文案");

// 失败提示
Toast.fail("失败文案");
```

> 提示：在组件中可以直接通过 `this.$toast` 调用

另外需要注意的是：Toast 默认采用单例模式，即同一时间只会存在一个 Toast，如果需要在同一时间弹出多个 Toast，可以参考下面的示例

```js
Toast.allowMultiple();

const toast1 = Toast('第一个 Toast');
const toast2 = Toast.success('第二个 Toast');

toast1.clear();
toast2.clear();
```

下面是为我们的登录功能增加 toast 交互提示。

```JS
async onLogin () {
  // 开始转圈圈
  this.$toast.loading({
    duration: 0, // 持续时间，0表示持续展示不停止
    forbidClick: true, // 是否禁止背景点击
    message: '登录中...' // 提示消息
  })

  try {
    const res = await request({
      method: 'POST',
      url: '/app/v1_0/authorizations',
      data: this.user
    })
    console.log('登录成功', res)
    // 提示 success 或者 fail 的时候，会先把其它的 toast 先清除
    this.$toast.success('登录成功')
  } catch (err) {
    console.log('登录失败', err)
    this.$toast.fail('登录失败，手机号或验证码错误')
  }
}
```



## 5. 表单验证

> 参考文档：[Form 表单验证](https://youzan.github.io/vant/#/zh-CN/form#xiao-yan-gui-ze)

### （1）基本使用



-  使用 van-form 组件包裹所有的表单项 van-field 

-  监听 form 的 submit 事件 

- 当表单提交的时候会触发 submit 事件

- 只有表单验证通过，它才会被触发调用

-  使用 Field 的 rules 属性定义校验规则 

下面是一个基本示例：

```HTML
<van-form @submit="onSubmit">
  <van-field
    v-model="username"
    name="用户名"
    label="用户名"
    placeholder="用户名"
    :rules="[{ required: true, message: '请填写用户名' }]"
  />
  <van-field
    v-model="password"
    type="password"
    name="密码"
    label="密码"
    placeholder="密码"
    :rules="[{ required: true, message: '请填写密码' }]"
  />
  <div style="margin: 16px;">
    <van-button round block type="info" native-type="submit">
      提交
    </van-button>
  </div>
</van-form>
export default {
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    onSubmit(values) {
      console.log('submit', values);
    },
  },
};
```

### （2）校验规则

使用 Field 的 `rules` 属性可以定义校验规则，可选属性如下：

| 键名               | 说明                                             | 类型                                  |
| ------------------ | ------------------------------------------------ | ------------------------------------- |
| required           | 是否为必选字段                                   | *boolean*                             |
| message `v2.5.3`   | 错误提示文案                                     | *string \| (value, rule) => string*   |
| validator `v2.5.3` | 通过函数进行校验                                 | *(value, rule) => boolean \| Promise* |
| pattern `v2.5.3`   | 通过正则表达式进行校验                           | *RegExp*                              |
| trigger `v2.5.2`   | 本项规则的触发时机，可选值为`onChange`、`onBlur` | *string*                              |
| formatter `v2.5.3` | 格式化函数，将表单项的值转换后进行校验           | *(value, rule) => any*                |



详细用法参考这里：https://youzan.github.io/vant/#/zh-CN/form#xiao-yan-gui-ze。

### （3）自定义错误提示消息

关闭 `van-form` 组件的默认消息提示，监听它的 `failed` 事件。

```HTML
<van-form
  :show-error="false"
  :show-error-message="false"
  @failed="onFailed"
>
	...
</van-form>
```

当表单验证失败会触发 `failed` 事件，我们可以在该事件处理中拿到验证失败的信息，然后使用 toast 提示：

```JS
onFailed (error) {
  if (error.errors[0]) {
    this.$toast({
      message: error.errors[0].message, // 提示消息
      position: 'top' // 防止手机键盘太高看不见提示消息
    })
  }
}
```

## 6. 验证码处理

给发送验证码按钮注册点击事件，在事件处理函数中：

### 6.1  验证手机号

发送验证码之前需要校验手机号是否有效，而不是校验整个表单。

通过查阅文档可以看到 Form 组件的实例方法 `validate` 可以用来手动触发表单验证，并且支持传入 `name` 来验证单个表单项。

下面是具体的处理流程。

- 给 Form 添加 ref 属性用来获取组件实例

- 给 Field 添加 name 属性用来验证单个表单项

- 监听发送按钮的点击事件 

- 由于 Form 中的任何按钮点击都会触发表单的默认提交行为，所以这里使用 `.prevent` 修饰符阻止默认行为

`onSendSmd` 处理函数：



```js
async onSendSms () {
  try {
    // 校验手机号码
    await this.$refs['login-form'].validate('mobile')
		// 验证通过 -> 请求发送验证码 -> 用户接收短信 -> 输入验证码 -> 请求登录
    // 请求发送验证码 -> 隐藏发送按钮，显示倒计时
    // 倒计时结束 -> 隐藏倒计时，显示发送按钮
  } catch (err) {
    this.$toast({
      message: err.message,
      position: 'top'
    })
  }
}
```



### 6.2 请求发送短信

在 `api/user.js` 中添加封装发送短信的数据接口：

```js
/**
 * 发送短信验证码
 */
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
```

在登录页面加载调用：

```JS
import { login, sendSms } from '@/api/user'
```

```JS
async onSendSms () {
  try {
    // 校验手机号码
    await this.$refs['login-form'].validate('mobile')
    // 验证通过，请求发送验证码
    await sendSms(this.user.mobile)
  } catch (err) {
    // try 里面任何代码的错误都会进入 catch
    // 不同的错误需要有不同的提示，那就需要判断了
    let message = ''
    if (err && err.response && err.response.status === 429) {
      // 发送短信失败的错误提示
      message = '发送太频繁了，请稍后重试'
    } else if (err.name === 'mobile') {
      // 表单验证失败的错误提示
      message = err.message
    } else {
      // 未知错误
      message = '发送失败，请稍后重试'
    }

    // 提示用户
    this.$toast({
      message,
      position: 'top'
    })
  }
}
```

### 6.3 请求期间禁用按钮点击

记住一个原则：任何和网络交互有关的视图都应该在网络请求期间禁用，防止请求过慢导致多次触发请求行为。

这里我们给发送验证码按钮添加一个 loading 效果，用来防止这种情况。

在 data 中添加数据用来控制按钮的 loading 状态：

```JS
data () {
  ...
  isSendSmsLoading: false
}
```

将数据绑定给发送按钮的 loading 属性：

```HTML
<van-button
  v-else
  class="send-btn"
  size="mini"
  round
  :loading="isSendSmsLoading"
  @click.prevent="onSendSms"
>发送验证码</van-button>
```

在请求开始展示 loading，请求结束关闭 loading：

```JS
async onSendSms () {
  try {
    // 校验手机号码
    await this.$refs['login-form'].validate('mobile')

    // 验证通过，请求发送验证码
+    this.isSendSmsLoading = true // 展示按钮的 loading 状态，防止网络慢用户多次点击触发发送行为
    await sendSms(this.user.mobile)

    // 短信发出去了，隐藏发送按钮，显示倒计时

    // 倒计时结束 -> 隐藏倒计时，显示发送按钮（监视倒计时的 finish 事件处理）
  } catch (err) {
    // try 里面任何代码的错误都会进入 catch
    // 不同的错误需要有不同的提示，那就需要判断了
    let message = ''
    if (err && err.response && err.response.status === 429) {
      // 发送短信失败的错误提示
      message = '发送太频繁了，请稍后重试'
    } else if (err.name === 'mobile') {
      // 表单验证失败的错误提示
      message = err.message
    } else {
      // 未知错误
      message = '发送失败，请稍后重试'
    }

    // 提示用户
    this.$toast({
      message,
      position: 'top'
    })
  }

  // 无论发送验证码成功还是失败，最后都要关闭发送按钮的 loading 状态
+  this.isSendSmsLoading = false
}
```

### 6.4 处理倒计时

我们可以使用 Vant 中的 [CountDown 倒计时](https://youzan.github.io/vant/#/zh-CN/count-down) 轻松的实现这个功能。下面是具体的处理流程。

在 data 中添加数据用来控制倒计时的显示和隐藏：

将倒计时组件和发送验证码按钮放到一起：

```HTML
<template #button>
  <van-count-down
    v-if="isCountDownShow"
    :time="1000 * 60"
    format="ss s"
    @finish="isCountDownShow = false"
  />
  <van-button
    v-else
    class="send-btn"
    size="mini"
    round
    :loading="isSendSmsLoading"
    @click.prevent="onSendSms"
  >发送验证码</van-button>
</template>
```

- 使用 v-if 和 v-else 控制切换显示

- 倒计时组件 

- time：倒计时时长，单位毫秒，默认是 `0`

- format：[时间格式](https://youzan.github.io/vant/#/zh-CN/count-down#format-ge-shi)，默认是 `HH:mm:ss`

- finish：倒计时结束时触发，这里我们的处理逻辑是结束之后关闭倒计时

  最后在发送验证码的处理中：

```JS
async onSendSms () {
  try {
    // 校验手机号码
    await this.$refs['login-form'].validate('mobile')

    // 验证通过，请求发送验证码
    this.isSendSmsLoading = true // 展示按钮的 loading 状态，防止网络慢用户多次点击触发发送行为
    await sendSms(this.user.mobile)

    // 短信发出去了,显示倒计时，关闭发送按钮
+    this.isCountDownShow = true

    // 倒计时结束 -> 隐藏倒计时，显示发送按钮（监视倒计时的 finish 事件处理）
  } catch (err) {
    // try 里面任何代码的错误都会进入 catch
    // 不同的错误需要有不同的提示，那就需要判断了
    let message = ''
    if (err && err.response && err.response.status === 429) {
      // 发送短信失败的错误提示
      message = '发送太频繁了，请稍后重试'
    } else if (err.name === 'mobile') {
      // 表单验证失败的错误提示
      message = err.message
    } else {
      // 未知错误
      message = '发送失败，请稍后重试'
    }

    // 提示用户
    this.$toast({
      message,
      position: 'top'
    })
  }

  // 无论发送验证码成功还是失败，最后都要关闭发送按钮的 loading 状态
  this.isSendSmsLoading = false
  
  // 发送失败，显示发送按钮，关闭倒计时
+  this.isCountDownShow = false
}
```



## 7. 存储用户Token

我们可以看到登录成功的接口中返回了 token 等数据：

Token 是用户登录成功之后服务端返回的一个身份令牌，在项目中的多个业务中需要使用到

- 校验页面的访问权限

- 访问需要授权的 API 接口

- ...



但是我们只有在第一次用户登录成功之后才能拿到 Token。

所以为了能在其它模块中获取到 Token 数据，我们需要把它存储到一个公共的位置，方便随时取用。

往哪儿存？



- 本地存储（不推荐） 

- 获取麻烦

- 数据不是响应式

 

- Vuex 容器（推荐） 

- 获取方便

- 响应式的

 

使用容器存储 Token 的思路：

- 登录成功，将 Token 存储到 Vuex 容器中 

- 获取方便

- 响应式

 

- 为了持久化，还需要把 Token 放到本地存储 

- 持久化

下面是具体实现。



在容器模块中处理用来存储登录状态的逻辑：

```js
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // 用户的登录状态信息
    user: JSON.parse(window.localStorage.getItem('TOUTIAO_USER'))
  },
  mutations: {
    setUser (state, data) {
      state.user = data
      window.localStorage.setItem('TOUTIAO_USER', JSON.stringify(user))
    }
  },
  actions: {
  },
  modules: {
  }
})
```

登录成功以后将后端返回的 token 相关数据存储到容器中：

```js
async onLogin () {
  // Toast.loading({
  this.$toast.loading({
    message: '登录中...', // 提示文本
    forbidClick: true, // 禁止背景点击
    duration: 0 // 展示时长(ms)，值为 0 时，toast 不会消失
  })
  // 1. 找到数据接口
  // 2. 封装请求方法
  // 3. 请求调用登录
  try {
    const { data } = await login(this.user)

    // 4. 处理响应结果
    this.$toast.success('登录成功')

    // 将后端返回的用户登录状态（token等数据）放到 Vuex 容器中
+    this.$store.commit('setUser', data.data)
  } catch (err) {
    console.log(err)
    this.$toast.fail('登录失败，手机号或验证码错误')
  }
},
```

## 8. 优化封装本地存储操作模块

在我们项目的后续业务中的很多地方都需要操作本地存储，如果每次都像上面那样写的话比较麻烦，所以我们这里建议把操作本地存储的代码封装到一个单独的模块中进行处理。

创建 `src/utils/storage.js` 模块。

```js
/**
 * 本地存储封装模块
 */
export const getItem = name => {
  const data = window.localStorage.getItem(name)
  // 为什么把 JSON.parse 放到 try-catch 中？
  // 因为 data 可能不是 JSON 格式字符串
  try {
    // 尝试把 data 转为 JavaScript 对象
    return JSON.parse(data)
  } catch (err) {
    // data 不是 JSON 格式字符串，直接原样返回
    return data
  }
}

export const setItem = (name, value) => {
  // 如果 value 是对象，就把 value 转为 JSON 格式字符串再存储
  if (typeof value === 'object') {
    value = JSON.stringify(value)
  }
  window.localStorage.setItem(name, value)
}

export const removeItem = name => {
  window.localStorage.removeItem(name)
}
```

在容器模块中加载使用：

```js
import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '@/utils/storage'

Vue.use(Vuex)

// 这样做的目的可以避免访问和获取数据的名字不一致导致的问题
const USER_KEY = 'TOUTIAO_USER'

export default new Vuex.Store({
  state: {
    user: getItem(USER_KEY) // 当前登录用户的登录状态（token等数据）
    // user: JSON.parse(window.localStorage.getItem('user')) // 当前登录用户的登录状态（token等数据）
  },
  mutations: {
    setUser (state, data) {
      state.user = data

      // 为了防止页面刷新数据丢失，我们还需要把数据放到本地存储中，这里仅仅是为了持久化数据
      setItem(USER_KEY, state.user)
      // window.localStorage.setItem('user', JSON.stringify(state.user))
    }
  },
  actions: {
  },
  modules: {
  }
})
```



## 9. 关于 Token 过期问题

登录成功之后后端会返回两个 Token：



- `token`：访问令牌，有效期2小时

- `refresh_token`：刷新令牌，有效期14天，用于访问令牌过期之后重新获取新的访问令牌



我们的项目接口中设定的 `Token` 有效期是 `2 小时`，超过有效期服务端会返回 `401` 表示 Token 无效或过期了。

为什么过期时间这么短？



- 为了安全，例如 Token 被别人盗用



过期了怎么办？



- 让用户重新登录，用户体验太差了

- 使用 `refresh_token` 解决 `token` 过期



如何使用 `refresh_token` 解决 `token` 过期？



到课程的后面我们开发的业务功能丰富起来之后，再给大家讲解 Token 过期处理。

 

大家需要注意的是**在学习测试的时候如果收到 401 响应码，请重新登录再测试**。

概述：服务器生成token的过程中，会有两个时间，一个是token失效时间，一个是token刷新时间，刷新时间肯定比失效时间长，当用户的 `token` 过期时，你可以拿着过期的token去换取新的token，来保持用户的登陆状态，当然你这个过期token的过期时间必须在刷新时间之内，如果超出了刷新时间，那么返回的依旧是 401。

处理流程：



1. 在axios的拦截器中加入token刷新逻辑

1. 当用户token过期时，去向服务器请求新的 token

1. 把旧的token替换为新的token

1. 然后继续用户当前的请求



在请求的响应拦截器中统一处理 token 过期：

```js
/**
 * 封装 axios 请求模块
 */
import axios from "axios";
import jsonBig from "json-bigint";
import store from "@/store";
import router from "@/router";

// axios.create 方法：复制一个 axios
const request = axios.create({
  baseURL: "http://ttapi.research.itcast.cn/" // 基础路径
});

/**
 * 配置处理后端返回数据中超出 js 安全整数范围问题
 */
request.defaults.transformResponse = [
  function(data) {
    try {
      return jsonBig.parse(data);
    } catch (err) {
      return {};
    }
  }
];

// 请求拦截器
request.interceptors.request.use(
  function(config) {
    const user = store.state.user;
    if (user) {
      config.headers.Authorization = `Bearer ${user.token}`;
    }
    // Do something before request is sent
    return config;
  },
  function(error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// 响应拦截器
request.interceptors.response.use(
  // 响应成功进入第1个函数
  // 该函数的参数是响应对象
  function(response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
  },
  // 响应失败进入第2个函数，该函数的参数是错误对象
  async function(error) {
    // Any status codes that falls outside the range of 2xx cause this function to trigger
    // Do something with response error
    // 如果响应码是 401 ，则请求获取新的 token

    // 响应拦截器中的 error 就是那个响应的错误对象
    console.dir(error);
    if (error.response && error.response.status === 401) {
      // 校验是否有 refresh_token
      const user = store.state.user;

      if (!user || !user.refresh_token) {
        router.push("/login");

        // 代码不要往后执行了
        return;
      }

      // 如果有refresh_token，则请求获取新的 token
      try {
        const res = await axios({
          method: "PUT",
          url: "http://ttapi.research.itcast.cn/app/v1_0/authorizations",
          headers: {
            Authorization: `Bearer ${user.refresh_token}`
          }
        });

        // 如果获取成功，则把新的 token 更新到容器中
        console.log("刷新 token  成功", res);
        store.commit("setUser", {
          token: res.data.data.token, // 最新获取的可用 token
          refresh_token: user.refresh_token // 还是原来的 refresh_token
        });

        // 把之前失败的用户请求继续发出去
        // config 是一个对象，其中包含本次失败请求相关的那些配置信息，例如 url、method 都有
        // return 把 request 的请求结果继续返回给发请求的具体位置
        return request(error.config);
      } catch (err) {
        // 如果获取失败，直接跳转 登录页
        console.log("请求刷线 token 失败", err);
        router.push("/login");
      }
    }

    return Promise.reject(error);
  }
);

export default request;
```

