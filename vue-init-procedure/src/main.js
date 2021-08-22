import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
// 加载全局样式文件index.less
import './styles/index.less'
// 加载vant组件库
import Vant from 'vant'
import 'vant/lib/index.css'
// 加载REM基准值
import 'amfe-flexible'

// 安装Vue插件
Vue.use(Vant)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
