/**
 * 用户API模块
 */
import request from '@/utils/request'
import store from '../store/index'
/**
 * 登录请求
 */
export const login = data => {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data
  })
}
/**
 * 发送验证码模块
 */
export const sendSms = mobile => {
  return request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`
  })
}
/**
 * 获取用户个人信息
 */
export const getUserInfo = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user',
    headers: {
      Authorization: `Bearer ${store.state.user.token}`
    }
  })
}
