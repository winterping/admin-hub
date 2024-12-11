import request from '@/utils/request'

/**
 * 登录
 */
export const loginUser = (data) => {
  return request({
    url: '/auth/login',
    method: 'POST',
    data,
  })
}

/**
 * 退出登录
 */
export const logoutUser = () => {
  return request({
    url: '/auth/logout',
    method: 'POST',
  })
}
