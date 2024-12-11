import type { RouteRecordRaw, Router } from 'vue-router'

interface GenerateMenuAndRoutesOptions {
  forbiddenComponent?: RouteRecordRaw['component']
  roles?: string[]
  router: Router
  routes: RouteRecordRaw[]
}

// 定义模块类型
interface RouteModuleType {
  default: RouteRecordRaw[]
}

/**
 * 扩展路由原始对象
 */
type ExRouteRecordRaw = {
  parent?: string
  parents?: string[]
  path?: any
} & RouteRecordRaw

export type { GenerateMenuAndRoutesOptions, RouteModuleType, ExRouteRecordRaw }
