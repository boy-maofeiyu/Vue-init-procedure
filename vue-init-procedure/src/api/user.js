/**
 * 用户API模块
 */
import request from '@/utils/request'

/**
 * 登录请求
 */
export const login = data => {
    return request({
        method:'POST',
        url:'/app/v1_0/authorizations',
        data
    })
}
