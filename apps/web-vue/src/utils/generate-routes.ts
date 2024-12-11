import type { RouteRecordRaw } from 'vue-router'
import type { GenerateMenuAndRoutesOptions } from '@/typings/route'

import { filterTree, mapTree } from './tree'
import { cloneDeep } from 'lodash-es'

/**
 * Generate routes
 * @param mode
 * @param options
 */
async function generateRoutes(options: GenerateMenuAndRoutesOptions) {
  const { forbiddenComponent, roles, routes, router } = options
  const newRoutes = cloneDeep(routes)
  let resultRoutes: RouteRecordRaw[] = []
  resultRoutes = await generateRoutesByFrontend(
    newRoutes,
    roles || [],
    forbiddenComponent,
  )

  /**
   * 调整路由树，做以下处理：
   * 1. 对未添加redirect的路由添加redirect
   */
  resultRoutes = mapTree(resultRoutes, (route) => {
    // 如果有redirect或者没有子路由，则直接返回
    if (route.redirect || !route.children || route.children.length === 0) {
      return route
    }
    const firstChild = route.children[0]

    // 如果子路由不是以/开头，则直接返回,这种情况需要计算全部父级的path才能得出正确的path，这里不做处理
    if (!firstChild?.path || !firstChild.path.startsWith('/')) {
      return route
    }

    route.redirect = firstChild.path
    return route
  })

  // 动态添加到router实例内
  resultRoutes.forEach((route) => {
    router.addRoute(route)
  })

  return resultRoutes
}
/**
 * 动态生成路由 - 前端方式
 */
async function generateRoutesByFrontend(
  routes: RouteRecordRaw[],
  roles: string[],
  forbiddenComponent?: RouteRecordRaw['component'],
): Promise<RouteRecordRaw[]> {
  // 根据角色标识过滤路由表,判断当前用户是否拥有指定权限
  const finalRoutes = filterTree(routes, (route) => {
    return hasAuthority(route, roles)
  })

  if (!forbiddenComponent) {
    return finalRoutes
  }

  // 如果有禁止访问的页面，将禁止访问的页面替换为403页面
  return mapTree(finalRoutes, (route) => {
    if (menuHasVisibleWithForbidden(route)) {
      route.component = forbiddenComponent
    }
    return route
  })
}

/**
 * 判断路由是否有权限访问
 * @param route
 * @param access
 */
function hasAuthority(route: RouteRecordRaw, access: string[]) {
  const authority = route.meta?.authority
  // console.log('authority',authority);
  if (!authority) {
    return true
  }
  // console.log("access", access);
  const canAccess = access.some((value) =>
    (authority as string[]).includes(value),
  )

  return canAccess || (!canAccess && menuHasVisibleWithForbidden(route))
}

/**
 * 判断路由是否在菜单中显示，但是访问会被重定向到403
 * @param route
 */
function menuHasVisibleWithForbidden(route: RouteRecordRaw) {
  return (
    !!route.meta?.authority &&
    Reflect.has(route.meta || {}, 'menuVisibleWithForbidden') &&
    !!route.meta?.menuVisibleWithForbidden
  )
}

export { generateRoutesByFrontend, hasAuthority, generateRoutes }
