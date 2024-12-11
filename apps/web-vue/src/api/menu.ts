import request from '@/utils/request'

/**
 * 获取所有权限菜单
 */
export const fetchMenuTree = () => {
  return request({
    url: '/permission/tree',
    method: 'GET',
  })
}
