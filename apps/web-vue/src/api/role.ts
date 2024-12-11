import request from '@/utils/request'

/**
 * 获取角色带查询
 */
export const fetchRoles = (data) => {
  return request({
    url: '/role/page',
    method: 'POST',
    data,
  })
}

/**
 * 创建角色
 */
export const fetchCreateRole = (data) => {
  return request({
    url: '/role/create',
    method: 'POST',
    data,
  })
}

/**
 * 更新角色
 */
export const fetchUpdateRole = (id, data) => {
  return request({
    url: `/role/${id}`,
    method: 'PATCH',
    data,
  })
}

/**
 * 删除角色
 */
export const fetchRemoveRole = (id) => {
  return request({
    url: `/role/${id}`,
    method: 'DELETE',
  })
}

/**
 * 获取所有用户不带查询
 */
export const fetchAllRoles = () => {
  return request({
    url: `/role/all`,
    method: 'GET',
  })
}
