import type { MenuRecordRaw } from '@/typings/menu'

type AccessToken = null | string

interface AccessState {
  /**
   * 可访问的菜单列表
   */
  accessMenus: MenuRecordRaw[]
  /**
   * 可访问的路由列表
   */
  accessRoutes: RouteRecordRaw[]
  /**
   * 登录 accessToken
   */
  accessToken: AccessToken
  /**
   * 是否已经检查过权限
   */
  isAccessChecked: boolean
  /**
   * 登录是否过期
   */
  loginExpired?: boolean
  /**
   * 更新 accessToken
   */
  refreshToken?: AccessToken
}

export type { AccessToken, AccessState }
