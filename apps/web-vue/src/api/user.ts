import request from '@/utils/request'

/**
 * 获取用户带查询
 */
export const fetchUsers = (data) => {
  return request({
    url: '/user/page',
    method: 'POST',
    data,
  })
}

/**
 * 创建用户
 */
export const fetchCreateUser = (data) => {
  return request({
    url: '/user/create',
    method: 'POST',
    data,
  })
}

/**
 * 更新用户
 */
export const fetchUpdateUser = (id, data) => {
  return request({
    url: `/user/${id}`,
    method: 'PATCH',
    data,
  })
}

/**
 * 删除用户
 */
export const fetchRemoveUser = (id) => {
  return request({
    url: `/user/${id}`,
    method: 'DELETE',
  })
}
