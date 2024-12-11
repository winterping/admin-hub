import type { RouteRecordRaw } from 'vue-router'
import { coreRoutes, notFoundRoute } from './core'
import { mergeRouteModules } from '@/utils/merge-route-modules'
import { traverseTreeValues } from '@/utils/tree'

const dynamicRouteFiles = import.meta.glob('./modules/**/*.ts', {
  eager: true,
})

// 获取动态路由
const dynamicRoutes: RouteRecordRaw[] = mergeRouteModules(dynamicRouteFiles)

/** 有权限校验的路由列表 */
const accessRoutes = [...dynamicRoutes]

const routes: RouteRecordRaw[] = [...coreRoutes, notFoundRoute]

/** 基本路由列表，这些路由不需要进入权限拦截 */
const coreRouteNames = traverseTreeValues(coreRoutes, (route) => route.name)

export { routes, accessRoutes, coreRouteNames }
