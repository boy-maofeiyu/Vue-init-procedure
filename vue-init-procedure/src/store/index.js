/**
 * Vue Store
 */
import Vue from 'vue'
import Vuex from 'vuex'
import { getItem, setItem } from '../utils/storage'
Vue.use(Vuex)
// 定义token名称
const TOU_TIAO_USER = 'toutiao-user'
export default new Vuex.Store({
  state: {
    // 动态从本地存储中获取 token
    user: getItem(TOU_TIAO_USER)
  },
  mutations: {
    setUser (state, data) {
      // 获取token 转换为json 存储到本地
      setItem(TOU_TIAO_USER, data)
      state.user = data
    }
  },
  actions: {},
  modules: {}
})
